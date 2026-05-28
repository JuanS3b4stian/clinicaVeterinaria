import nodemailer from 'nodemailer';

const sendEmail = async ({ email, name, token, purpose }) => {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const subject = purpose === 'reset'
        ? 'Reestablece tu contraseña'
        : 'Confirma tu cuenta';

    const message = purpose === 'reset'
        ? `Hola ${name}, usa este enlace para restablecer tu contraseña: ${baseUrl}/forget-password/${token}`
        : `Hola ${name}, confirma tu cuenta desde este enlace: ${baseUrl}/confirm/${token}`;

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log(`Correo simulado a ${email}`);
        console.log(`Asunto: ${subject}`);
        console.log(message);

        return { message: 'Correo enviado en entorno local', email, subject };
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    return transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject,
        text: message
    });
};

export default sendEmail;