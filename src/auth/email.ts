import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
import { EmailTemplate } from '@/components/email-template';
import { ReactElement } from 'react';

// auth/email.ts
export const sendEmailVerificationLink = async (email: string, token: string) => {
	const url = `https://ryanschwartz.io/email-verification/${token}`;
	
	try {
    const data = await resend.emails.send({
      from: 'God <bot@ryanschwartz.io>',
      to: [email],
      subject: 'Thanks for making an account.',
      react: EmailTemplate({url: url, type: "verify"}) as ReactElement,
    });

    
  } catch (error) {
  }
};

export const sendPasswordResetLink = async (email: string, token: string) => {
	const url = `https://ryanschwartz.io/password-reset/${token}`;
	
	try {
    const data = await resend.emails.send({
      from: 'God <bot@ryanschwartz.io>',
      to: [email],
      subject: 'Reset your password.',
      react: EmailTemplate({url: url, type: "reset"}) as ReactElement,
    });

    
  } catch (error) {
  }
};
