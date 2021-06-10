var express = require('express');
var nodemailer = require('nodemailer');

var app = express();
var PORT = 3000;

app.use(express.json());
	
console.log('SMTP Config:'+
'\nSMTP_HOST: '+JSON.stringify(process.env.SMTP_HOST)+
'\nSMTP_USER: '+JSON.stringify(process.env.SMTP_USER)+
'\nSMTP_PASS: '+JSON.stringify(process.env.SMTP_PASS)+
'\nSMTP_SECURE: '+JSON.stringify(process.env.SMTP_SECURE)
);

app.listen(PORT, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});

const transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    secure: false,
});

app.post('/text-mail', (req, res) => {
    const {to, subject, text } = req.body;
    const mailData = {
        from: 'noreply@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: '<b>'+text+'<br/>',
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});


