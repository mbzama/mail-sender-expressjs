# Demo app to sending emails using nodemailer

## Install deps
        npm install

## Start server by passing the SMTP Details
        SMTP_HOST=xxxxxx SMTP_SECURE=false SMTP_PORT=2525 SMTP_USER=xxxx SMTP_PASS=xxxxxxxx npm start


## Testing from terminal 
        curl --header "Content-Type: application/json" --request POST --data '{"to":"zamamb@gmail.com","subject":"Test mail","text":"This is test mail using mail-sender-express project"}' http://localhost:3000/text-mail


Note: Replace xxxx with your SMTP connection details
