const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/mowen_db';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ msg: 'Please enter all fields.' });
        }
        
        const newVisitor = new Visitor({
            name,
            email,
            message
        });

        const savedVisitor = await newVisitor.save();
        res.status(201).json(savedVisitor);
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});