
const nodemailer = require('nodemailer');
const sendEmail = (emailIds,subject,html,text) =>{
    const reqEmailString = emailIds.reduce((acc,email)=> acc + (acc?", ":"")+ (email),"")
   let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'ak8068716@gmail.com',
		pass: 'gspmoaspshpiwpce'
	}
});

let mailDetails = {
	from: 'ak8068716@gmail.com',
	to: reqEmailString,
	subject: subject,  
	text: 'Node.js testing mail for GeeksforGeeks'
};

if(html){
    mailDetails.html=html;
}

if(text){
    mailDetails.text=text;
}


mailTransporter.sendMail(mailDetails, function(err, data) {
	if(err) {
		console.log('Error Occurs');
	} else {
		console.log('Email sent successfully');
	}
});
}

module.exports = {
    sendEmail
}