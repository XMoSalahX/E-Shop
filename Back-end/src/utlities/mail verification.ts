import nodemailer from "nodemailer";
import setMsg from "../template/verify email";

const { EMAIL, EMAIL_PASS } = process.env;

// Email verification
const mailVer = async (email: string, id: number) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PASS,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: EMAIL, // sender address
    to: email, // list of receivers
    subject: "E-Commerce Verification Message", // Subject line
    html: setMsg(id), // html body
  });
};

export default mailVer;
