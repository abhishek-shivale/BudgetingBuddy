'use sever';
import sgMail from '@sendgrid/mail';

export async function sendMail(email: string, subject: string, token: string) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  const msg = {
    to: email,
    from: 'test@em1299.ezycart.shop',
    subject: subject as string,
    text: token,
    //   html: "",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
}
