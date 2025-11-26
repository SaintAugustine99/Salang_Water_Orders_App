const axios = require('axios');

exports.handler = async function (event, context) {
  // 1. Enable CORS for local development and production
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: "Method Not Allowed" };
  }

  try {
    const { phone, amount } = JSON.parse(event.body);

    // Validate inputs
    if (!phone || !amount) {
      throw new Error("Missing phone or amount");
    }

    // Format phone number (Ensure it starts with 254)
    const formattedPhone = phone.startsWith("0") ? "254" + phone.slice(1) : phone;

    // 2. Get Environment Variables
    const consumer_key = process.env.MPESA_CONSUMER_KEY;
    const consumer_secret = process.env.MPESA_CONSUMER_SECRET;

    // Use Sandbox URL by default, change to live URL for production
    const url = "https://sandbox.safaricom.co.ke";

    if (!consumer_key || !consumer_secret) {
      console.error("Missing M-Pesa credentials in Environment Variables");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Server configuration error" })
      };
    }

    // 3. Generate OAuth Token
    const auth = Buffer.from(`${consumer_key}:${consumer_secret}`).toString('base64');
    const tokenResp = await axios.get(
      `${url}/oauth/v1/generate?grant_type=client_credentials`,
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const token = tokenResp.data.access_token;

    // 4. Generate Timestamp (YYYYMMDDHHmmss)
    const date = new Date();
    const timestamp = date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);

    // 5. Stk Push Constants (Sandbox)
    const shortCode = "174379";
    const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');

    // 6. Send Request
    const stkResp = await axios.post(
      `${url}/mpesa/stkpush/v1/processrequest`,
      {
        "BusinessShortCode": shortCode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": Math.ceil(Number(amount)), // Ensure whole number
        "PartyA": formattedPhone,
        "PartyB": shortCode,
        "PhoneNumber": formattedPhone,
        // IMPORTANT: This URL must be publicly accessible to receive the result
        "CallBackURL": "https://salang-water.netlify.app/.netlify/functions/mpesa-callback",
        "AccountReference": "SalangWater",
        "TransactionDesc": "Water Order"
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "STK Push Sent",
        data: stkResp.data
      })
    };

  } catch (error) {
    console.error("M-Pesa Error:", error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Payment initiation failed",
        details: error.response ? error.response.data : error.message
      })
    };
  }
};