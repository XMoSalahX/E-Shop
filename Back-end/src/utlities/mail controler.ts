import nodemailer from "nodemailer";
import setMsg from "../template/verify email";

const { EMAIL, EMAIL_PASS } = process.env;

// Email verification
const mailVer = async (email: string, id: string, target: string) => {
  try {
    let temp;
    if (target == "verify") {
      temp = setMsg(id);
    } else if (target == "forget") {
      temp = setMsg(id);
    }
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
      html: temp, // html body
    });
  } catch {
    console.log("Mailer bad object.");
  }
};

export default mailVer;
