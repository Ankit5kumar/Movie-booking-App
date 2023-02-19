const userRegistration = (user)=>{
    return{
        subject:"Welcome to book my Show",
        html:
        <div>
            <h5>hello ${user.name}, </h5>
            <br />
            you have registered successfully with email <br> ${user.email} </br>
            <br/>
            your userId required at the time of login will be <b>${user.userId}</b>
            <hr />
            thanks $ regards
            <h3>Book my show</h3> <br />
            <img src="https://logodix.com/logo/2011124.jpg"></img>
        </div>
    }
}

const userLoggedIn = (user)=>{

}
const paymentSuccess = (user)=>{

}
const newMovieAdded = (user,movie,theatre)=>{

}
const theatreDeleted = (user,theatre)=>{

}
module.exports = {
    userRegistration,
    userLoggedIn,
    paymentSuccess,
    newMovieAdded,
    theatreDeleted

}