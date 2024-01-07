import nodemailer from 'nodemailer';

type profile = {name: string; email: string};

interface EmailOptions{
    profile: profile;
    subject: 'verification'|'forget-password'|'password-changed';
    linkUrl?: string;
}

const generateMailTransporter = () => {
    const transport = nodemailer.createTransport({
        // host: "sandbox.smtp.mailtrap.io",
        // port: 2525,
        // auth:{
            //   user: "9d6c04bf967312",
            //   pass: "5772c33dcfa9fb"
        // }
        service: "gmail",
        auth: {
            user: "pj3.ecommerce@gmail.com",
            pass: "fnugqkzgireaxzgc"
        }
    });
    return transport;
};

const sendEmailVerificationLink = async (profile: profile, linkUrl: string) => {
    const transport = generateMailTransporter();
    
    await transport.sendMail({
        from: "Project3-Nguyen Xuan Phuoc",
        sender:"Project3-Nguyen Xuan Phuoc",
        to: profile.email,
        subject: "Verify email",
        html: `<h4>Xác nhận email của bạn, <a href="${linkUrl}">nhấn vào đây</a></h4>`,
    })
};

const sendEmailForgetPasswordLink = async (profile: profile, linkUrl: string) => {
    const transport = generateMailTransporter();
    
    await transport.sendMail({
        from: "Project3-Nguyen Xuan Phuoc",
        sender:"Project3-Nguyen Xuan Phuoc",
        to: profile.email,
        subject: "Reset password",
        html: `<h1><a href="${linkUrl}">Nhấn vào đây</a> để đặt lại mật khẩu của bạn.</h1>`,
    })
};

const sendUpdatePasswordComfirmation = async (profile: profile) => {
    const transport = generateMailTransporter();
    
    await transport.sendMail({
        from: "Project3-Nguyen Xuan Phuoc",
        sender:"Project3-Nguyen Xuan Phuoc",
        to: profile.email,
        subject: "Password changed",
        html: `<h1>Chúng tôi đã cập nhật mật khẩu của bạn. <a href="${process.env.SIGN_IN_URL}">Nhấn vào đây</a> để đăng nhập</h1>`,
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
