import emailjs from '@emailjs/browser';

// Replace these with your actual EmailJS credentials
// You can find these in your EmailJS dashboard: https://dashboard.emailjs.com/admin
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

interface OrderDetails {
    to_name: string;
    to_email: string;
    order_id: string;
    order_items: string;
    total_amount: string;
    delivery_address: string;
    phone: string;
}

export const sendOrderEmail = async (details: OrderDetails) => {
    if (SERVICE_ID === 'YOUR_SERVICE_ID') {
        console.warn('EmailJS credentials not set. Email not sent.');
        return;
    }

    try {
        const response = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            details as unknown as Record<string, unknown>,
            PUBLIC_KEY
        );
        console.log('Email sent successfully!', response.status, response.text);
        return response;
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
};
