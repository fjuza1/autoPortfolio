import {ANIMATIONTIME, SENDTO, UNGENERATED_FILE_MESSAGE} from './config.js';
import {xml2js, Papa, Recipient, EmailParams, MailerSend} from './lib.js';
export const timeout = (callback) => setTimeout(callback, ANIMATIONTIME * 1000);
export const filterByKeys = (array,keys,values) => array.filter(item => keys.every((key, index) => String(item[key]).toLowerCase().includes(String(values[index]).toLowerCase())))
export const toXml = (array) => {
    const obj = {
        root: {
            skills:{
                skill: array
            }
        }
    };
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(obj);
    return xml
}
export const toCsv = (array, config) =>  Papa.unparse(array, config);
export const toJSON = (array) => JSON.stringify(array, null, '\t')
export const sendMail = (options) => {
    const {name, email, subject, message} = options;
    const mailersend = new MailerSend({
        apiKey: `${process.env.MAILSENDER_API_KEY_PRODUCTION}`,
    });
    const recipients = [new Recipient(SENDTO, "Recipient")];
    
    const emailParams = new EmailParams()
        .setFrom(email)
        .setFromName(name)
        .setRecipients(recipients)
        .setSubject(subject)
        .setText(message);
    
    mailersend.send(emailParams);
}
export const watchGeneration = async (blob) => {
    try {
        return new TextDecoder().decode(await blob.arrayBuffer())
    } catch (err) {
        return `${UNGENERATED_FILE_MESSAGE}\n Error details: \n${err}`;
    }
}