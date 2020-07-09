require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();

const utils = require('./utils');

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/mail', async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      newRevenue: Math.floor(
        (req.body.revenue * 1000 +
          365 * req.body.mealKitsPerDay * req.body.recommendedPrice) /
          1000
      ),
    };
    await utils.createReport(data, req.body.name);
    await utils.sendMail(req.body.email, req.body.name);
    return res.json({ success: true, message: 'Mail sent!' });
  } catch (error) {
    return next(error);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((error, req, res, next) => {
  res.status(500);
  res.json({
    success: false,
    message: error.message,
    data: null,
  });
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`🚀Server running on ${port}...`);
});
