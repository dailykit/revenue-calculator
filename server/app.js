const express = require('express');
const logger = require('morgan');
const nodemailer = require('nodemailer');
const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/mail', async (req, res) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type : 'Oauth2',
                user: process.env.GAMIL_ID,
                clientId : '1029762689434-sjbq1hi9nbk5960q488fif8310l4hfrs.apps.googleusercontent.com',
                clientSecret : process.env.CLIENT_SECRET,
                refreshToken : '1//04WDHT8C82soNCgYIARAAGAQSNwF-L9IriQ2Ag2fTngrHcZLUstlAcoj0dYyMFMpWXs29NRX-lzFd9yEoIa8Lt-JZdiUk9uwmfB4',
                accessToken : 'ya29.Il-5BzEvvba0e6A_H-h3AEtbpnvtjmoZ1Z4f0MOTeeLrz7nUmf40dYPGrzdVVTtP0bzGjXmhb6FOpQH-t42rPPRGkZLYsNVawJ4UzaQaY9hLGWXo0CxtiuRVu_EwNcAkTw'
            }
        });

        let info = await transporter.sendMail({
            from: process.env.GAMIL_ID,
            to: req.body.email,
            subject: `Hey ${ req.body.name }`,
            text: "Hello world",
            html: "<b>Hello world?</b>"
        });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.json({ success : true, message : 'Mail sent!', data : null });
    } catch(e) {
        console.log(e);
        res.json({ success : false, message : e.message, data : null });
    }
})

app.listen(5000, () => {
    console.log("Server running on 5000...");
})