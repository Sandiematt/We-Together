const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5000;
const MONGODB_URI = 'mongodb+srv://sandeepmathew:sandie123@wetogether.ejhyhqg.mongodb.net/';

MongoClient.connect(MONGODB_URI)
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db('wetogether');
    const usersCollection = db.collection('user');
    const eventsCollection = db.collection('event');
    const jobsCollection = db.collection('job'); // Job collection

    app.use(express.json());

    // Health check endpoint
    app.get('/', (req, res) => {
      return res.status(200).send("Server Running");
    });

    // Login endpoint
    app.post('/login', async (req, res) => {
      try {
        const { username, password } = req.body;
        console.log({ username, password });
        const user = await usersCollection.findOne({ username: username });
        if (user === null) {
          return res.status(404).json({ error: 'User not found' });
        }
        if (user.password.toString() !== password) {
          return res.status(404).json({ error: 'Incorrect Password' });
        } else {
          res.status(200).json({ message: 'Login successful', isAdmin: user.isadmin });
        }
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Register endpoint
    app.post('/register', async (req, res) => {
      try {
        const { username, name, email, contact, gender, password } = req.body;
        console.log({ username, name, email, contact, gender, password });

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ username: username });
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
          isadmin: false // Default value for isadmin
        });

        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Fetch events endpoint
    app.get('/events', async (req, res) => {
      console.log('Fetching events...');
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

        // Ensure required fields are present
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
        console.log({ title, location, type, level, salary });

        // Insert new job into the database
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

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
