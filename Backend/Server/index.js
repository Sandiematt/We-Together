const express = require('express');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const app = express();
const PORT = 5000;
const MONGODB_URI = 'mongodb+srv://sandeepmathew:sandie123@wetogether.ejhyhqg.mongodb.net/';

(async () => {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
        
    // Select the database and collections
    const db = client.db('wetogether');
    const usersCollection = db.collection('user');
    const jobsCollection = db.collection('job');
    const jobApplicantsCollection = db.collection('jobapplicants');
    const eventsCollection = db.collection('event');
    const attendanceCollection = db.collection('eventattendance');
    const loansCollection = db.collection('loan');
    const loanApplicantsCollection=db.collection('loanapplicants')
    const postsCollection = db.collection('forum');

    // Middleware to parse JSON requests
    app.use(express.json());

    // Health check endpoint
    app.get('/', (req, res) => {
      return res.status(200).send('Server Running');
    });

    // User authentication (login) endpoint
    app.post('/login', async (req, res) => {
      try {
        const { username, password } = req.body;
        const user = await usersCollection.findOne({ username });
        
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        if (user.password.toString() !== password) {
          return res.status(404).json({ error: 'Incorrect Password' });
        }
    
        // Include the username in the response
        res.status(200).json({ 
          message: 'Login successful', 
          isAdmin: user.isadmin, 
          username: user.username // Include username
        });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // User registration endpoint
    app.post('/register', async (req, res) => {
      try {
        const { username, name, email, contact, gender, password } = req.body;
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });
        
        // Insert new user
        const result = await usersCollection.insertOne({
          username, name, email, contact, gender, password, isadmin: false
        });
        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });


    // Fetch user count endpoint
    app.get('/userCount', async (req, res) => {
      try {
        const count = await usersCollection.countDocuments();
        res.status(200).json({ count });
      } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Fetch all events
    app.get('/events', async (req, res) => {
      try {
        const events = await eventsCollection.find({}).toArray();
        res.status(200).json(events);
      } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Create a new event
    app.post('/events', async (req, res) => {
      try {
        const { title, description, venue, place, date, time } = req.body;
        if (!title || !description || !venue || !place || !date || !time) {
          return res.status(400).json({ error: 'All fields are required' });
        }
        const result = await eventsCollection.insertOne({ title, description, venue, place, date, time });
        res.status(201).json({ message: 'Event added successfully', eventId: result.insertedId });
      } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Register user attendance for an event
    app.post('/attend', async (req, res) => {
      try {
        const { name, email, eventTitle } = req.body;
        if (!name || !email || !eventTitle) {
          return res.status(400).json({ error: 'Please provide all required fields' });
        }
        const event = await eventsCollection.findOne({ title: eventTitle });
        if (!event) return res.status(404).json({ error: 'Event not found' });

        // Insert new attendance record
        await attendanceCollection.insertOne({ name, email, eventTitle });
        res.status(201).json({ message: 'User registered successfully for event' });
      } catch (error) {
        console.error('Error registering attendance:', error);
        res.status(500).json({ error: 'Failed to register for event' });
      }
    });

    // Fetch attendees with optional event title filter
    app.get('/attendees', async (req, res) => {
      try {
        const { eventTitle } = req.query;
        const query = eventTitle ? { eventTitle } : {};
        const attendees = await attendanceCollection.find(query).toArray();
        res.status(200).json(attendees);
      } catch (error) {
        console.error('Error fetching attendees:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Update attendance status
    app.post('/updateAttendance', async (req, res) => {
      try {
        const { name, status } = req.body;
        if (!name || !status) return res.status(400).json({ message: 'Name and status are required.' });

        const result = await attendanceCollection.findOneAndUpdate(
          { name },
          { $set: { status } },
          { returnDocument: false }
        );
        if (!result.value) return res.status(404).json({ message: 'Attendance record not found.' });

        res.json({ message: 'Attendance status updated successfully.', participant: result.value });
      } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).json({ message: 'Failed to update attendance status.' });
      }
    });

    // Fetch jobs
    app.get('/jobs', async (req, res) => {
      try {
        const jobs = await jobsCollection.find().toArray();
        res.status(200).json(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Create a new job
    app.post('/jobs', async (req, res) => {
      try {
        const { title, location, type, level, salary } = req.body;
        const result = await jobsCollection.insertOne({ title, location, type, level, salary });
        res.status(201).json({ message: 'Job created successfully', jobId: result.insertedId });
      } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Job application submission endpoint
    app.post('/api/jobapplicants', async (req, res) => {
      try {
        const { name, email, phone, address, aadhaar, jobtitle, applicationdate } = req.body;
        if (!name || !email || !phone || !address || !aadhaar || !jobtitle || !applicationdate) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        // Insert new job application
        const result = await jobApplicantsCollection.insertOne({
          name, email, phone, address, aadhaar, jobtitle, applicationdate
        });
        res.status(201).json({ message: 'Application submitted successfully', applicantId: result.insertedId });
      } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Fetch job applicants with optional job title filter
    app.get('/api/jobapplicants', async (req, res) => {
      try {
        const { jobtitle } = req.query;
        const query = jobtitle ? { jobtitle } : {};
        const applicants = await jobApplicantsCollection.find(query).toArray();
        res.status(200).json(applicants);
      } catch (error) {
        console.error('Error fetching applicants:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Fetch all loans
    app.get('/loans', async (req, res) => {
      try {
        const loans = await loansCollection.find({}).toArray();
        res.status(200).json(loans);
      } catch (error) {
        console.error('Error fetching loans:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Add a loan (POST /loans)
    app.post('/loans', async (req, res) => {
      const { title, description, interest, amount } = req.body;
      if (!title || !description || !interest || !amount) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const newLoan = {title,description,interest,amount,};
      try {
        await loansCollection.insertOne(newLoan); 
        res.status(201).json({ message: 'Loan added successfully' });
      } catch (error) {
        console.error('Error adding loan:', error);
        res.status(500).json({ error: 'Failed to add loan. Please try again.' });
      }
    });

    app.post('/loanapplicants', async (req, res) => {
      try {
        const { name, email, phone, address, aadhaar, loantitle } = req.body;
        
        // Check if all required fields are provided
        if (!name || !email || !phone || !address || !aadhaar || !loantitle) {
          return res.status(400).json({ error: 'Please provide all required fields' });
        }
        
        // Assuming you have a loans collection to check the existence of the loan title
        const loan = await loansCollection.findOne({ title: loantitle });
        
        if (!loan) {
          return res.status(404).json({ error: 'Loan not found' });
        }
        
        // Insert new loan application record
        await loanApplicantsCollection.insertOne({ name, email, phone, address, aadhaar, loantitle });
        res.status(201).json({ message: 'Loan application submitted successfully' });
      } catch (error) {
        console.error('Error submitting loan application:', error);
        res.status(500).json({ error: 'Failed to submit loan application' });
      }
    });

    app.get('/loanapplicants', async (req, res) => {
      try {
          const { name } = req.query; // Only need the username for filtering
          const query = name ? { name } : {}; // Filter by username if provided
  
          const applicants = await loanApplicantsCollection.find(query).toArray();
          res.status(200).json(applicants);
      } catch (error) {
          console.error('Error fetching loan applicants:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  });

  app.get('/loanapplicantsadmin', async (req, res) => {
    const { loantitle } = req.query;
  
    try {
      // Check if the loan title is provided
      if (!loantitle) {
        return res.status(400).json({ error: 'Loan title is required' });
      }
  
      // Fetch applicants based on the loan title
      const applicants = await loanApplicantsCollection.find({ loantitle }).toArray(); // Ensure to match the field name in the collection
      res.status(200).json(applicants);
    } catch (error) {
      console.error('Error fetching loan applicants:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
    
    // Update loan status
    app.post('/updateLoanStatus', async (req, res) => {
      try {
        const { name, status } = req.body;
        if (!name || !status) {
          return res.status(400).json({ message: 'Name and status are required.' });
        }
    
        const result = await loanApplicantsCollection.findOneAndUpdate(
          { name },
          { $set: { status } },
          { returnDocument: false } // Return the updated document
        );
    
        if (!result.value) {
          return res.status(404).json({ message: 'Loan applicant not found.' });
        }
        res.json({ message: 'Loan status updated successfully.', applicant: result.value });
      } catch (error) {
      }
    });

    
    // Create a forum post
    

    // Fetch all forum posts
    app.get('/posts', async (req, res) => {
      try {
        const posts = await postsCollection.find({}).toArray();
        res.status(200).json(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    app.post('/posts', async (req, res) => {
      try {
        const { user, content, image } = req.body;
        if (!content && !image) {
          return res.status(400).json({ error: 'Please provide content or an image' });
        }
    
        // Ensure likes is an array when creating a new post
        const result = await postsCollection.insertOne({
          user,
          content,
          image,
          likes: [] // Set likes as an empty array
        });
        res.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.put('/posts/:id/like', async (req, res) => {
      const { id } = req.params;
      const { user } = req.body;
      try {
        // Attempt to find the post
        const postId = new ObjectId(id); // Use this line if IDs are ObjectId in DB
        const post = await postsCollection.findOne({ _id: postId });
        
        if (!post) {
          console.log('Post not found'); // Log if post not found
          return res.status(404).send({ message: 'Post not found' });
        }
    
        // Check if the user has already liked the post
        const userHasLiked = post.likes.includes(user);
        if (userHasLiked) {
          // Handle unliking logic
          post.likes = post.likes.filter(like => like !== user);
        } else {
          // Handle liking logic
          post.likes.push(user);
        }
    
        // Update the post in the database
        await postsCollection.updateOne(
          { _id: postId },
          { $set: { likes: post.likes } }
        );
    
        res.send({ message: userHasLiked ? 'Post unliked successfully' : 'Post liked successfully', updatedPost: post });
      } catch (error) {
        console.error('Error in /posts/:id/like:', error);
        res.status(500).send({ message: 'Server error' });
      }
    });


    app.put('/posts/:id/unlike', async (req, res) => {
      try {
          const { id } = req.params;
          const { user } = req.body; // Current user unliking the post
  
          // Convert string ID to ObjectId
          const postId = new ObjectId(id);
  
          // Find the post by ID
          const post = await postsCollection.findOne({ _id: postId });
          if (!post) {
              return res.status(404).send({ message: 'Post not found' });
          }
  
          // Check if the user has already unliked the post
          if (!post.likes.includes(user)) {
              return res.status(400).send({ message: 'User has not liked this post' });
          }
  
          // Remove the user from the likes array
          post.likes = post.likes.filter(like => like !== user);
  
          // Update the post with the new likes array
          await postsCollection.updateOne(
              { _id: postId }, 
              { $set: { likes: post.likes } }
          );
  
          // Return the updated post
          res.send({ message: 'Post unliked successfully', updatedPost: post });
      } catch (error) {
          console.error(error);
          res.status(500).send({ message: 'Server error' });
      }
  });
  
    
    

    app.put('/makeAdmin', async (req, res) => {
      try {
        const { username } = req.body;
        console.log('Received username:', username); // Debugging log
    
        // Check if the username is provided
        if (!username) {
          return res.status(400).json({ error: 'Username is required' });
        }
    
        // Update the user's isadmin field to true
        const result = await usersCollection.findOneAndUpdate(
          { username: username }, // Find user by username
          { $set: { isadmin: true } }, // Set isadmin to true
          { returnDocument: 'after' } // Return the updated document
        );
    
        console.log('Database update result:', result); // Debugging log
    
        // Check if the user was found and updated
        if (!result) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Respond with success message and updated user details
        res.status(200).json({ message: 'User updated successfully', updatedUser: result.value });
      } catch (error) {
        console.error('Error making user admin:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.get('/users/:username', async (req, res) => {
      try {
        const username = req.params.username;
        const user = await usersCollection.findOne({ username });
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    });


    app.get('/loanss', async (req, res) => {
      try {
          const { title } = req.query;
          // Validate title format
          if (title && typeof title !== 'string') {
              return res.status(400).json({ error: 'Invalid title format' });
          }
          // Construct query with case-insensitive search
          const query = title ? { title: { $regex: new RegExp(title, 'i') } } : {};
  
          // Pagination parameters
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
  
          // Fetch loans with pagination
          const loans = await loansCollection.find(query).skip((page - 1) * limit).limit(limit).toArray();
  
          res.status(200).json({ total: loans.length, loans });
      } catch (error) {
          console.error('Error fetching loans:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  });
  

  
  

    
    
    

  

    
   
  
  


    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
})();