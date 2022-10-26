const { mailer } = require('../services/modules/nodemailer');

module.exports.mailSender = {
    sendMail,
    accountVerifycation
}

const send = (message) => {

}

const sendMail = async (req, res, next) => {

}

const accountVerifycation = async (req, res, next) => {

}

/* message pattern
const message = (receiver, subject) => {
    return {
        to: receiver,
        subject,
        html: `
        <h2>Test message is ready!</h2>`
    }
};
*/