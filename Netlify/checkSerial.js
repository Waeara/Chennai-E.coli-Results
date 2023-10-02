const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const serial = event.queryStringParameters.serial;
  const GAS_URL = `https://script.google.com/macros/s/AKfycbxHPILzJO1EEpb1YO9RFsFP6O4g6seobnZqasb2UI7ibBqRqjEgeTyj74qKELwVJz_2Ww/exec?serial==${serial}`;

  try {
    const response = await fetch(GAS_URL);
    const data = await response.text();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: data })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" })
    };
  }
};
