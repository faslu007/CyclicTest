const express = require('express');
const app = express();
const path = require('path');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./controllers/productController');
const bodyParser = require('body-parser');
const multer  = require('multer')
const upload = multer()
const cors = require('cors')
const nodemailer = require("nodemailer");



// for parsing application/json
app.use(bodyParser.json());
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// app.use(upload.array());

app.use(express.static('public'));

// cors - cross origin sharing - (http-request)
app.use(cors())

app.use(express.static(path.join(__dirname, './client/build')));

const users = [
  {
    id: 1,
    first_name: 'Emelyne',
    last_name: 'Bannister',
    email: 'ebannister0@youtube.com',
    gender: 'Female',
  },
];


app.post('/api/sendemail', (req, res) => {
  console.log(req.body);
  sendOTP(req, res)
});


app.get('/api/products', getProducts);
app.get('/api/users', (req, res) => {
  res.json(users);
});
app.get('/api/products/:id', getProduct);
app.post('/api/products', createProduct);
app.put('/api/products/:id', updateProduct);
app.delete('/api/products/:id', deleteProduct);



app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});




// async function to send the OTP verification - this is called from the ..controller/userController.js - registerSuperAmdin()
const sendOTP = async (req, res) => {
  try {
    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Email Template
    const options = {
      from: "contact@kl14ecreations.com",
      to: req.body.email,
      subject: "Credential Pro App - Email Verification",
      text: `Your OTP for email verification is ${otp}.`,
      html: `<p>Hello,</p>
            <p>Thank you for signing up for Credential Pro App.</p>
            <p>Your OTP for email verification is <strong>${otp}</strong>.</p>`
    };

    new Promise((resolve, reject) => {
      transporter.sendMail(options, function (error, response) {
            if (error) {
              res.status(500).json({ error: error });
            } else {
              res.status(200).json({ message: "Email sent" });
            }
        });
})


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
};


// // email configuration
// let transporter = nodemailer.createTransport({
//   service: 'hotmail',
//   auth: {
//     user: "credential-pro@hotmail.com", 
//     pass: "Welcome@123", 
//   },
// });

const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  auth: {
      user: 'contact@kl14ecreations.com',
      pass: 'Google@12345'
  }
});





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
