require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const nodemailer = require('nodemailer');
const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/mail', async (req, res) => {
    console.log(process.env.GAMIL_ID);
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type : 'Oauth2',
                user: process.env.GAMIL_ID,
                clientId : '1029762689434-9q4p6r5ihkuol1svg1s9tbpojj61dej3.apps.googleusercontent.com',
                clientSecret : process.env.CLIENT_SECRET,
                refreshToken : '1//046pgAMfjnMuvCgYIARAAGAQSNwF-L9IrOsnC1jUSheTvq_ILgd7p28pn_C5oZveCTfeEUnHuAruQSMDy4iD66iLVM1SQ_DwzAMg',
                accessToken : 'ya29.Il-7B6mjevaPFcCt0bRaTYr8FxM2rgbhi96vs0ct02JBlogMwCWw8h3Oj_Bj-CrlIOvPJig4kNmU0ZFFPHGMZ-KLuRdxTi6jy0jg4t0OsM4u9XujoyaMErw5UxboiNKGcA'
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