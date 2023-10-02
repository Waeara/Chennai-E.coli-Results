const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const serial = event.queryStringParameters.serial;

  // Construct the GAS URL
  const GAS_URL = `https://script.google.com/macros/s/AKfycbxHPILzJO1EEpb1YO9RFsFP6O4g6seobnZqasb2UI7ibBqRqjEgeTyj74qKELwVJz_2Ww/exec?serial=${serial}`;

  // Log the URL for debugging purposes
  console.log("Fetching URL:", GAS_URL);

  try {
    const response = await fetch(GAS_URL);
    
    // Log any potential fetch issues
    if (!response.ok) {
       console.error("Error fetching GAS:", response.statusText);
       throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: data })
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" })
    };
  }
};
