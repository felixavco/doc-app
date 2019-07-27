import nodeMailer from 'nodemailer';
const { SMTP_USER, SMTP_SERVER, SMTP_PWD, SMTP_PORT } = process.env;

class Mailer {

    smtpConn() {
        const transporter = nodeMailer.createTransport({
            host: SMTP_SERVER,
            port: SMTP_PORT,
            secure: SMTP_PORT === 465 ? true : false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PWD
            }
        });

        return transporter;
    }

    /**
     * @param messageData {from, to, bcc, replyTo, subject, text }
     */
    send(messageData, template) {

        const message = {
            from: messageData.from,
            to: messageData.to,
            bcc: messageData.bcc || "",
            replyTo: messageData.replyTo || "",
            subject: messageData.subject,
            text: messageData.text || "",
            html: template
        }

        this.smtpConn()
            .sendMail(message)
            .then(value => {
                console.log(value);
            })
            .catch(err => console.log("ERROR CATCH " + err));
    }
}

export default Mailer;