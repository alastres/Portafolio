import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure the transporter
        // You generally need an App Password for Gmail: https://myaccount.google.com/apppasswords
        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        // Email metadata
        const mailOptions = {
            from: process.env.EMAIL_SERVER_USER,
            to: process.env.EMAIL_FROM,
            replyTo: email,
            subject: `Nuevo mensaje de Portafolio: ${name}`,
            text: `
Nombre: ${name}
Email: ${email}
Mensaje:
${message}
            `,
            html: `
<h3>Tienes un nuevo mensaje de tu Portafolio</h3>
<p><strong>Nombre:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Mensaje:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Error sending email' },
            { status: 500 }
        );
    }
}
