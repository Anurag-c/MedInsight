const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");

module.exports = class Email {
  constructor(user, qrCode, passReset, plan, provider) {
    this.to = user.email;
    this.firstName = user.email.split(".")[0];
    this.qrCode = qrCode;
    this.passReset = passReset;
    this.from = `MedInsights <${process.env.EMAIL_FROM}>`;
    this.plan = plan;
    this.provider = provider;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // send the actual email
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        qrCode: this.qrCode,
        url: this.passReset,
        subject,
        plan: this.plan,
        provider: this.provider,
      }
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    const transporter = this.newTransport();
    await transporter.sendMail(mailOptions);
  }

  async sendNotification() {
    await this.send("notify", "New Insurance Plan Added");
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the MedInsight Family");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid only for 10 minutes)"
    );
  }
};
