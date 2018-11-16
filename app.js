const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.listen(3000, () => {
    console.log('YelpCamp server has started...');
});