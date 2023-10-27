require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Configura Nodemailer con tus credenciales de correo
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASS,
  },
});

app.use(express.json());

// Ruta para enviar un correo electrónico
app.get('/send-email', (req, res) => {
  res.json({ success: true, message: 'Estamos en sendmail' });
});

app.post('/send-email', (req, res) => {
  const { to, subject, html } = req.body;

  const mailOptions = {
    from: 'contact.tukineta@gmail.com',
    to,
    subject,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
      res.status(500).json({ success: false, error: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado con éxito:', info.response);
      res.json({ success: true, message: 'Correo enviado con éxito' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
