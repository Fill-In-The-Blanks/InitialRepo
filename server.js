const express = require('express');
const path = require('path');

const app = express();

//app.get('/', (req, res) => res.send('API Running'));

// server static assets in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));