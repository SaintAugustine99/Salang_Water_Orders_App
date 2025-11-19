// netlify/functions/mpesa-push.js
const axios = require('axios'); // You may need to run: npm install axios

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { phone, amount } = JSON.parse(event.body);
  
  // 1. Generate Token
  const consumer_key = process.env.MPESA_CONSUMER_KEY;
  const consumer_secret = process.env.MPESA_CONSUMER_SECRET;
  const auth = Buffer.from(`${consumer_key}:${consumer_secret}`).toString('base64');

  try {
    const tokenResp = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const token = tokenResp.data.access_token;

    // 2. Initiate STK Push
    const date = new Date();
    const timestamp = date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
    
    const shortCode = "174379"; // Sandbox Shortcode
    const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"; // Sandbox Passkey
    const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');

    const stkResp = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        "BusinessShortCode": shortCode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": 1, // For testing, use 1. In prod, use 'amount'
        "PartyA": phone,
        "PartyB": shortCode,
        "PhoneNumber": phone,
        "CallBackURL": "https://your-app-name.netlify.app/.netlify/functions/mpesa-callback",
        "AccountReference": "SalangWater",
        "TransactionDesc": "Water Payment"
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(stkResp.data)
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to initiate payment" })
    };
  }
};