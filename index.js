var express = require('express');
var nodemailer = require('nodemailer');
var ejs = require('ejs');

var app = express();
var PORT = process.env.PORT || 80;

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

app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
  
app.get('/products', function(req, res, next) {
    let products = [
      {id:1, category:"phone", name:"samsung", model:"gt100"},
      {id:2, category:"phone", name:"iphone", model:"12"},
      {id:2, category:"tv", name:"mi", model:"4A"}
  ];
    res.status(200).json(products);
});

app.post('/text-mail', (req, res) => {
    const {to, subject, text } = req.body;
    let languages = ['java', 'javascript', '.NET', 'python', 'go'];
    let mailBody = ejs.render('<html><body><h1>Hello <%=to%> - Top languages to learn: <%= languages.join(" | "); %></h1></body></html>', {to: to, languages: languages});

    console.log('mailBody: '+mailBody);
    
    const mailData = {
        from: 'noreply@evoketechnologies.com',
        to: to,
        subject: subject,
        text: text,
        html: mailBody,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});

app.get('/template', (req, res) => {   
    let languages = ['java', 'javascript', '.NET', 'python', 'go'];
    let html = ejs.render('<html><body><h1>Top languages to learn: <%= languages.join(" | "); %></h1></body></html>', {languages: languages});

    console.log('html: '+html);
    res.status(200).send(html);
});


