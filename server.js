const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect the database
connectDB();

// Init middleware
app.use(express.json({ extended: false })); // this allows us to access the body in request

//app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/module', require('./routes/api/module'));

// server static assets in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));