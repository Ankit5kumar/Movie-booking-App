const express = require('express')
const app = express()
const path = require("path")
const User = require("./models/user.model") 
const bodyParser = require('body-parser')
const MovieRoute = require('./Routes/movie.route')
const TheatreRoute = require('./Routes/theatre.routes')
const authRoutes = require('./Routes/auth.routes')
const userRoute = require('./Routes/user.routes')
const bookingRoute = require('./Routes/bookings.route')
const paymentRoute = require('./Routes/payment.routes')
const notificationClient = require("./utils/notification")
const config = require('./configs/config');

notificationClient.sendEmail(['ankitkumar9805691186@gmail.com'],"Test",'<h1>hello from Ankit</h> <img src="https://static.businessworld.in/article/article_extra_large_image/1609147522_O1aw88_BMS.jpg"/>', null)
require('./configs/db')
app.get('/', (req, res) => {
    res.send({msg:"helow "})
})
// var cors = require('cors')
app.use(bodyParser.json());
// app.use(cors)

app.use(MovieRoute)
app.use(TheatreRoute)
app.use(authRoutes)
app.use(userRoute)
app.use(bookingRoute)
app.use(paymentRoute)





app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

async function init(){
  try{
    const user = await User.create({
      name:"admin",
      userId:"admin",
      email:"admin@example.com",
      password:bcrypt.hashSync("admin",10),
      userStatus:constants.userStatus.approved,
      userTypes:constants.userTypes.admin
      
    })
    console.log("admin user created successfully");
  }catch(e){
  console.log(e.message);
  }
}
