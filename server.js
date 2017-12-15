var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', (req,res) => {
    res.send("Hello World");
});

const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log('Running Server on port' + port);
});


