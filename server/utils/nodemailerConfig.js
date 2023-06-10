module.exports = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ETHEREAL_USERNAME,
    pass: process.env.ETHEREAL_PASSWORD,
  },
};
