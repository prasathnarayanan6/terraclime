const axios = require('axios');
const sendMessage = async (Auth) => {
  try {
    const response = await axios. (
      'https://graph.facebook.com/v20.0/511590165360928/messages',
      {
        messaging_product: "whatsapp",
        to: "+919962383309",
        type: "text",
        text: { 
           preview_url: false,
           body: "bhai"
        }
      },
      {
        headers: {
          Authorization: `Bearer EAARmMSsvKVIBOZCOYc9wQOtXjZAM51ICUV0qR1piH5pAvySvomEGXhJvQFsBVDy96dZBqvC9t9KWRsaHDstU6Vd0Q1jpwjPo92TgW8YbkFJamwqPhZAJZB9xsI5CIAE7UsWJbFevNN5zMcMG6I5Azu98KPDUiOC9DS66zxCaxuoS3LMQqYHM1ttOW07LiIp9jgtlCZBeoArPSWr5UsSMTeNFpjCa8G`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Message sent:", response.data);
  } catch (error) {
    console.error("Error sending message:", error.response ? error.response.data : error.message);
  }
};
sendMessage();
