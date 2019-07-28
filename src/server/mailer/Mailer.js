import nodeMailer from 'nodemailer';
import MailGun from 'mailgun-js';
const { SMTP_USER, SMTP_SERVER, SMTP_PWD, SMTP_PORT, MG_API_KEY, DOMAIN } = process.env;

class Mailer {
    /**
     * @param data {from, to, bcc, replyTo, subject, text }
     */
    static send = async (data, template) => {
        try {
            const transporter = nodeMailer.createTransport({
                host: SMTP_SERVER,
                port: SMTP_PORT,
                secure: SMTP_PORT === 465 ? true : false,
                auth: { user: SMTP_USER, pass: SMTP_PWD }
            });

            const message = {
                from: data.from,
                to: data.to,
                bcc: data.bcc || "",
                replyTo: data.replyTo || "",
                subject: data.subject,
                text: data.text || "",
                html: template
            }
            await transporter.sendMail(message);
        } catch (error) {
            throw error
        }
    }

    static mailGun = ({ from, to, subject }, template) => {
        const mailgun = MailGun({ apiKey: MG_API_KEY, domain: DOMAIN });
        const message = { from, to, subject, html: template }
        mailgun.messages().send(message);
    }
}

export default Mailer;