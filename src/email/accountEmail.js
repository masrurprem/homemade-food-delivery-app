const { Resend } = require("resend");
const mailApiKey = "re_PgGVsySf_M6oV4y6tkfBVSvzwRtv8wZLW";
const resend = new Resend(mailApiKey);

// sending an welcome email once user signs up
const sendWelcomEmail = async (name, email) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to GhoroaKhabar",
      text: `Thank you ${name} for signing up at GhoroaKhabar. Enjoy your meal`,
    });
    //console.log(data);
    //return data;
  } catch (e) {
    throw new Error();
  }
};

// cancellation email once user deletes account
const sendCancelationEmail = (name, email) => {
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Bye Bye",
    text: `Sorry to see you go, ${name}. Let us know when you are coming back`,
  });
};

module.exports = { sendWelcomEmail, sendCancelationEmail };
