exports.handler = async function(event, context) {
  // 1. Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);
    
    console.log("M-Pesa Callback Received:", JSON.stringify(body, null, 2));

    // Here you would typically update your database (e.g., Firebase Firestore)
    // with the payment status using the CheckoutRequestID or MerchantRequestID.
    
    // Example structure of success callback:
    // body.Body.stkCallback.ResultCode === 0 (Success)
    // body.Body.stkCallback.CallbackMetadata.Item (Contains Receipt, Amount, Phone, Date)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Callback received successfully" })
    };

  } catch (error) {
    console.error("Callback Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to process callback" })
    };
  }
};
