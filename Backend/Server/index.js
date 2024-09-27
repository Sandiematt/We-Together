const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 5000;
const MONGODB_URI = 'mongodb+srv://sandeepmathew:sandie123@wetogether.ejhyhqg.mongodb.net/';

(async () => {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    const db = client.db('wetogether');
    const usersCollection = db.collection('user');
    const eventsCollection = db.collection('event');
    const jobsCollection = db.collection('job');
    const jobApplicantsCollection = db.collection('jobapplicants');
    const attendanceCollection = db.collection('eventattendance');
    const loansCollection = db.collection('loan');
    const postsCollection = db.collection('forum');

    // Middleware to parse JSON requests
    app.use(express.json());

    // Health check endpoint
    app.get('/', (req, res) => {
      return res.status(200).send('Server Running');
    });

    // Login endpoint
    app.post('/login', async (req, res) => {
      try {
        const { username, password } = req.body;
        const user = await usersCollection.findOne({ username });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        if (user.password.toString() !== password) {
          return res.status(404).json({ error: 'Incorrect Password' });
        }
        res.status(200).json({ message: 'Login successful', isAdmin: user.isadmin });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Register endpoint
    app.post('/register', async (req, res) => {
      try {
        const { username, name, email, contact, gender, password } = req.body;

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
        }

        // Insert new user into the database
        const result = await usersCollection.insertOne({
          username,
          name,
          email,
          contact,
          gender,
          password,
          isadmin: false,
        });

        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Fetch user count
    app.get('/userCount', async (req, res) => {
      try {
        const count = await usersCollection.countDocuments();
        res.status(200).json({ count });
      } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Fetch events endpoint
    app.get('/events', async (req, res) => {
      try {
        const events = await eventsCollection.find({}).toArray();
        res.status(200).json(events);
      } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Create event endpoint
    app.post('/events', async (req, res) => {
      try {
        const { title, description, venue, place, date, time } = req.body;

        if (!title || !description || !venue || !place || !date || !time) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        const result = await eventsCollection.insertOne({
          title,
          description,
          venue,
          place,
          date,
          time,
        });

        res.status(201).json({ message: 'Event added successfully', eventId: result.insertedId });
      } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Endpoint to handle event attendance
    app.post('/attend', async (req, res) => {
      try {
        const { name, email, eventTitle } = req.body;

        if (!name || !email || !eventTitle) {
          return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const event = await eventsCollection.findOne({ title: eventTitle });
        if (!event) {
          return res.status(404).json({ error: 'Event not found' });
        }

        const newAttendance = {
          name,
          email,
          eventTitle,
        };

        await attendanceCollection.insertOne(newAttendance);
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

    // Update attendance status endpoint
    app.post('/updateAttendance', async (req, res) => {
      const { name, status } = req.body;

      try {
        if (!name || !status) {
          return res.status(400).json({ message: 'Name and status are required.' });
        }

        const result = await attendanceCollection.findOneAndUpdate(
          { name: name },
          { $set: { status: status } },
          { returnDocument: false }
        );

        if (!result.value) {
          return res.status(404).json({ message: 'Attendance record not found.' });
        }

        res.json({ message: 'Attendance status updated successfully.', participant: result.value });
      } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).json({ message: 'Failed to update attendance status.' });
      }
    });

    // Fetch jobs endpoint
    app.get('/jobs', async (req, res) => {
      try {
        const jobs = await jobsCollection.find().toArray();
        res.status(200).json(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Create job endpoint
    app.post('/jobs', async (req, res) => {
      try {
        const { title, location, type, level, salary } = req.body;

        const result = await jobsCollection.insertOne({
          title,
          location,
          type,
          level,
          salary,
        });

        res.status(201).json({ message: 'Job created successfully', jobId: result.insertedId });
      } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Create job applicant endpoint
    app.post('/api/jobapplicants', async (req, res) => {
      try {
        const { name, email, phone, address, aadhaar, jobtitle, applicationdate } = req.body;

        if (!name || !email || !phone || !address || !aadhaar || !jobtitle || !applicationdate) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        const result = await jobApplicantsCollection.insertOne({
          name,
          email,
          phone,
          address,
          aadhaar,
          jobtitle,
          applicationdate,
        });

        res.status(201).json({ message: 'Application submitted successfully', applicantId: result.insertedId });
      } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Fetch job applicants endpoint
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

    // Fetch loans endpoint
    app.get('/loans', async (req, res) => {
      try {
        const loans = await loansCollection.find({}).toArray();
        res.status(200).json(loans);
      } catch (error) {
        console.error('Error fetching loans:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Create loan applicant endpoint
    app.post('/loanapplicants', async (req, res) => {
      try {
        const { name, email, loanamount, loantype, loandate, status } = req.body;

        const result = await loansCollection.insertOne({
          name,
          email,
          loanamount,
          loantype,
          loandate,
          status,
        });

        res.status(201).json({ message: 'Loan applicant created successfully', loanId: result.insertedId });
      } catch (error) {
        console.error('Error creating loan applicant:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Forum posts endpoint
    app.get('/posts', async (req, res) => {
      try {
        const posts = await postsCollection.find({}).toArray();
        res.status(200).json(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Create forum post endpoint
    app.post('/posts', async (req, res) => {
      try {
        const { author, title, content } = req.body;

        const result = await postsCollection.insertOne({
          author,
          title,
          content,
          likes: 0,
        });

        res.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Update post likes endpoint
    app.post('/posts/:postId/like', async (req, res) => {
      try {
        const { postId } = req.params;

        const result = await postsCollection.findOneAndUpdate(
          { _id: new ObjectId(postId) },
          { $inc: { likes: 1 } },
          { returnOriginal: false }
        );

        if (!result.value) {
          return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({ message: 'Post liked successfully', post: result.value });
      } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
})();
