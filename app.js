const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MovieRoute = require('./Routes/movie.route')
const TheatreRoute = require('./Routes/theatre.routes')
const authRoutes = require('./Routes/auth.routes')
const userRoute = require('./Routes/user.routes')
const bookingRoute = require('./Routes/bookings.route')
const config = require('./configs/config');
require('./configs/db')
app.get('/', (req, res) => {
    res.status(201).send({msg: 'Move booking app'})
})
app.use(bodyParser.json());

app.use(MovieRoute)
app.use(TheatreRoute)
app.use(authRoutes)
app.use(userRoute)
app.use(bookingRoute)
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
