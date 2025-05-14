// services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // ou smtp.gmail.com
    port: 587,
    secure: false,
    auth: {
        user: 'testesistemaeatech@gmail.com',
        pass: 'rmwr wlvm fzma jwai'
    }
});

async function sendUserCreatedEmail(user) {
    const mailOptions = {
        from: '"Teste Sistema" <testesistemaeatech@gmail.com>',
        to: user.email,
        subject: 'Bem-vindo à plataforma',
        html: `
            <h2>Conta criada com sucesso</h2>
            <p>Olá <strong>${user.name}</strong>, sua conta foi criada com sucesso.</p>
            <p><strong>Organização:</strong> ${user.organizationName}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Senha:</strong> ${user.password}</p>
        `
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendUserCreatedEmail };
