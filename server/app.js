require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();

const utils = require('./utils');

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', '/client/build')))

app.use('/mail', async (req, res) => {
    try {
        const data = { 
            ...req.body, 
            newRevenue : Math.floor((req.body.revenue * 1000 + ( 365 * req.body.mealKitsPerDay * req.body.recommendedPrice )) / 1000)
        };
        await utils.createReport(data, req.body.name);
        const success = await utils.sendMail(req.body.email, req.body.name);
        if (success) 
            res.json({ success : true, message : 'Mail sent!' });
        else 
            throw Error('Some error occured!');  
    } catch(e) {
        console.log(e);
        res.json({ success : false, message : e.message, data : null });
    }
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', '/client/build/index.html'))
})

app.listen(5000, () => {
    console.log("Server running on 5000...");
})