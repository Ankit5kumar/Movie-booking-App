const userRegistration = (user)=>{
    return {
        subject:"Welcome to book my Show",
        html:
        `
        <div>
            <h5>hello ${user.name},</h5>
            <br/>
            you have registered successfully with email ${user.email}
            <br/>
            your userrId require at the time of login will be ${user.userId}
            <br/>
            <hr/>
            Thanks & regards
            <h3> Book my show</h3> <br/>
            <img src="https://static.businessworld.in/article/article_extra_large_image/1609147522_O1aw88_BMS.jpg" />

        </div>` 
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
    userRegistration
    
}