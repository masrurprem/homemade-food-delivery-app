const { Resend } = require("resend");
const mailApiKey = "re_RNAYpqNX_rEzRNQH5f2JUooLeyEe65hwu";
const resend = new Resend(mailApiKey);

// sending an welcome email once user signs up
const sendWelcomEmail = (name, email) => {
  resend.emails.send({
    from: "masrur.kuet@gmail.com",
    to: email,
    subject: "Welcome to GhoroaKhabar",
    text: `Thank you ${name} for signing up at GhoroaKhabar. Enjoy your meal`,
  });
};

// cancellation email once user deletes account
const sendCancelationEmail = (name, email) => {
  resend.emails.send({
    from: "masrur.kuet@gmail.com",
    to: email,
    subject: "Bye Bye",
    text: `Sorry to see you go, ${name}. Let us know when you are coming back`,
  });
};

module.exports = { sendWelcomEmail, sendCancelationEmail };
