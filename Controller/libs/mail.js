const nodemailer = require('nodemailer')

module.exports = async function sendMail(token, email, username){

    const html = `
    <html>
        <body style="text-align: center; max-width:100%; font-family: Arial, sans-serif;">
    
            <h1 style="color: #333;">Hello, ${username}</h1>
    
            <p>Your one-time Email verification code is:</p>
    
            <h2 style="color: #333; font-size: 24px;">${token}</h2>
    
            <p>Copy the link and Paste it to verify the Email</p>
    
            <div style="margin-top: 20px;">
                <p style="font-size: 14px; color: #666;">Developed by Dev Cisco</p>
            </div>
        </body>
    </html>    
    `

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_NAME,
            pass: process.env.GMAIL_PASS,
        },
        secure: true,
        tls:{
            rejectUnauthorized: false,
        }
    });
    
    let mailOption = {
        from: 'TestLogin@gmail.com',
        to: email,
        subject: 'Password reset',
        html: html
    }

    await transporter.sendMail(mailOption, (err, info)=>{
        if(err){
            console.log(err)
            return
        }
        console.log('Email sent successfully: ', info.response)
    })
}