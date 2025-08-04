const { Resend } = require("resend");
const mailApiKey = "re_RNAYpqNX_rEzRNQH5f2JUooLeyEe65hwu";
const resend = new Resend(mailApiKey);

// sending an welcome email once user signs up
const vendorWelcomEmail = (vendor, email) => {
  resend.emails.send({
    from: "masrur.kuet@gmail.com",
    to: email,
    subject: "Welcome to GhoroaKhabar",
    text: `Thank you ${vendor} for being our partner`,
  });
};

// cancellation email once user deletes account
const vendorCancelationEmail = (vendor, email) => {
  resend.emails.send({
    from: "masrur.kuet@gmail.com",
    to: email,
    subject: "Bye Bye",
    text: `Sorry to see you go, ${vendor}. Hope to deal again soon`,
  });
};

module.exports = { vendorWelcomEmail, vendorCancelationEmail };
