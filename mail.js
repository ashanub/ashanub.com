const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')

const authenticate = {
  auth: {
    api_key: '0c939ed77da56ece29efc668da528cd4-2ae2c6f3-93520c0a',
    domain: 'sandbox67c51613053c41c8b19368b85a530a70.mailgun.org',
  },
}

const transporter = nodemailer.createTransport(mailGun(authenticate))

const sendMail = (email, name, message, callback) => {
  const mailOptions = {
    from: email,
    to: 'ashanudayanga@gmail.com',
    subject: 'New form submission from ' + name,
    text: message,
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
}

module.exports = sendMail