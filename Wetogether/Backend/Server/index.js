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

    app.use(express.json());

    app.get('/', (req, res)=>{
      return res.status(200).send("Server Running")
    })

    app.post('/login', async (req, res) => {
      try { 
        const { username, password } = req.body;
        console.log({ username, password });
        const user = await usersCollection.findOne( { username: username });
        if (user === null) {
          return res.status(404).json({ error: 'User not found' });
        }
        if (user.password.toString() != password) {
          return res.status(404).json({ error: 'Incorrect Password' });
        } else {
          res.status(200).json({ message: 'Login successful', isAdmin : user.isadmin });
        }

      } catch (error) {
        console.error('Error during login:', error);
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
