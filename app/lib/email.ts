import nodemailer from 'nodemailer';

type profile = {name: string; email: string};

interface EmailOptions{
    profile: profile;
    subject: 'verification'|'forget-password'|'password-changed';
    linkUrl?: string;
}

const generateMailTransporter = () => {
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9d6c04bf967312",
          pass: "5772c33dcfa9fb"
        }
    });
    return transport;
};

const sendEmailVerificationLink = async (profile: profile, linkUrl: string) => {
    const transport = generateMailTransporter();
    
    await transport.sendMail({
        from: "verification@psms.com",
        to: profile.email,
        html: `<h1>Verify your email, click <a href="${linkUrl}">this link</a></h1>`,
    })
};

const sendEmailForgetPasswordLink = async (profile: profile, linkUrl: string) => {
    const transport = generateMailTransporter();
    
    await transport.sendMail({
        from: "verification@psms.com",
        to: profile.email,
        html: `<h1>Click on <a href="${linkUrl}">this link</a> to reset your password.</h1>`,
    })
};

const sendUpdatePasswordComfirmation = async (profile: profile) => {
    const transport = generateMailTransporter();
    
    await transport.sendMail({
        from: "verification@psms.com",
        to: profile.email,
        html: `<h1>We changed your password <a href="${process.env.SIGN_IN_URL}">click here</a> to sign in</h1>`,
    })
};

export const sendEmail = (options: EmailOptions) => {
    const {profile, subject, linkUrl} = options;

    switch(subject){
        case 'verification':
            return sendEmailVerificationLink(profile, linkUrl!);
        case 'forget-password':
            return sendEmailForgetPasswordLink(profile, linkUrl!);
        case 'password-changed':
            return sendUpdatePasswordComfirmation(profile);
    }
}
