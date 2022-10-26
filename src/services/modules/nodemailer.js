const nodemailer = require('nodemailer');

const report = (title, content) => {
    const report = `${title}: `.yellow + '<<<--- '.green.bold + `${content}`.magenta + ' --->>>'.green.bold
    const isProd = process.env.NODE_ENV == 'production'
    console.log(!isProd ? report : null)
};

const transporter = nodemailer.createTransport(
    {
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        }
    },
    {
        from: `MediaBox <${process.env.EMAIL}>`
    }
);

transporter.verify((error, success) => {
    if (error) return console.log(`${error}`.red.bold)
    console.log(success ? 'Mailer listening...'.cyan : null)
    transporter.on('token', token => {
        report('New token was generated', token.accessToken)
    })
});

const send = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log(`${err}`.red.bold);
        report('New email sent to', info.accepted[0])
    })
}

module.exports.mailer = {
    send
}