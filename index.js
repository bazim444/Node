const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose=require('mongoose');
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Define a route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, API!' });
});
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];
const User = require('./models/users'); // Import the User model

app.get('/api/users/:id', async (req, res) => {
    try {
      console.log('Handling request for user ID:', req.params.id);
      const userId = req.params.id;
       // Handle ObjectId conversion using Mongoose's isValid ObjectId
       if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      
      const user = await User.findById(userId);
  
      if (!user) {
        console.log('User not found:', userId);
        return res.status(404).json({ error: 'User not found' });
      }
  
      console.log('User found:', user);
      res.json(user);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
