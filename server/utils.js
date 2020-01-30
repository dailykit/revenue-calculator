const fs = require("fs");
const PDFDocument = require("pdfkit");
const nodemailer = require('nodemailer');

const formatPrice = (price) => {
    return price >= 1000 ? (price / 1000).toFixed(1) + 'M' : price + 'k';
}

const generateHr = (doc, y) => {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
}

const generateHeader = (doc) => {
    doc
      .image("logo.png", 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      .text("DailyKIT Inc.", 110, 57)
      .fontSize(10)
      .text("www.dailykit.org", 200, 65, { align: "right" })
      .text("made a report for your own meal kit brand", 110, 80)
      .text("+131-252-10704", 200, 80, { align: "right" })
      .moveDown();
}

const generateFooter = (doc) => {
    doc
      .fontSize(10)
      .text(
        "Contact us at hello@dailykit.org",
        50,
        680,
        { align: "center", width: 500 }
      );
}

const generateCustomerInformation = (doc, data) => {
  
    doc
    .fillColor("#444444")
    .fontSize(20)
    .text(data.name, 50, 160);

    generateHr(doc, 185);

    let customerInformationTop = 200;

    doc
        .fontSize(10)
        .font("Helvetica")
        .text("How many customers can you serve per day:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(data.capacity, 350, customerInformationTop)
        .font("Helvetica")
        .text("How many customers are you serving today:", 50, customerInformationTop + 15)
        .font("Helvetica-Bold")
        .text(data.utilization, 350, customerInformationTop + 15)
        .font("Helvetica")
        .text("Revenue:", 50, customerInformationTop + 30)
        .font("Helvetica-Bold")
        .text('$' + formatPrice(data.revenue), 350, customerInformationTop + 30)
        .font("Helvetica")
        .text("Profit:", 50, customerInformationTop + 45)
        .font("Helvetica-Bold")
        .text(data.profit + '%', 350, customerInformationTop + 45)
        .moveDown();

    generateHr(doc, 260);

    customerInformationTop = 275;

    doc
        .fontSize(10)
        .font("Helvetica")
        .text("Your estimated price of ready to eat per serving:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text('$' + data.price, 350, customerInformationTop)
        .font("Helvetica")
        .text("Number of meal kits per day:", 50, customerInformationTop + 15)
        .font("Helvetica-Bold")
        .text(data.mealKitsPerDay, 350, customerInformationTop + 15)
        .font("Helvetica")
        .text("Recommended price of meal kit per serving:", 50, customerInformationTop + 30)
        .font("Helvetica-Bold")
        .text('$' + data.recommendedPrice, 350, customerInformationTop + 30)
        .font("Helvetica")
        .text("Increased Revenue:", 50, customerInformationTop + 45)
        .font("Helvetica-Bold")
        .text('$' + formatPrice(data.newRevenue), 350, customerInformationTop + 45)
        .moveDown();

    generateHr(doc, 335);
}

const generateInvoiceTable = (doc, invoice) => {
    let i;
    const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

const createReport = async (data, name) => {
    const path = `./tmp/${ name }_MealKitReport.pdf`;
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    generateHeader(doc);
    generateCustomerInformation(doc, data);
    // generateInvoiceTable(doc, data);
    generateFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

const sendMail = async (email, name) => {
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
            to: email,
            subject: `Hey ${ name }`,
            text: "Hello world",
            html: "<b>Hello world?</b>",
            attachments: [
                {
                    path: `./tmp/${ name }_MealKitReport.pdf`
                }
            ]
        });
    
        console.log("Message sent: %s", info.messageId);
    
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return true;
    } catch(e) {
        return false;
    }
}


module.exports = {
    createReport,
    sendMail
}