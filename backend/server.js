const express = require('express');
const path = require('path');
const tailwindJSON = require('../frontend/public/assets/tailwind.json');

const app = express();

// Serve static files (your frontend)
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Serve pre-processed JSON
app.get('/tailwind', (req, res) => {
    res.json(tailwindJSON);
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
