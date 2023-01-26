const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Route = require('./Routes/movie.route')
const config = require('./configs/config');
require('./configs/db')
app.get('/', (req, res) => {
    res.status(201).send({msg: 'Move booking app'})
})
app.use(bodyParser.json());

app.use(Route)
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
