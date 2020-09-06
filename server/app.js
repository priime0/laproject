const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/style.css'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/script.js'));
});

app.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
});
