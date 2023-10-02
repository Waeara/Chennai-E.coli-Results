const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const serial = event.queryStringParameters.serial;

  if (!serial) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Serial parameter is missing" })
    };
  }

  const GAS_URL = `https://script.google.com/macros/s/AKfycbzl6CeBZ6NX8sX5uNB2dA6b4twwdcOpVmqSnOPEgDoontRq7neuIQwhogJdyCvfaxRt8Q/exec?serial=${serial}`;

  try {
    const response = await fetch(GAS_URL);
    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: data.error })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: data.message })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" })
    };
  }
};

