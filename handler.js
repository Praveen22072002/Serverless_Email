const AWS = require('aws-sdk');

const ses = new AWS.SES({ region: process.env.SES_REGION });

module.exports.sendEmail = async (event) => {
  try {
    const { receiver_email, subject, body_text } = JSON.parse(event.body);

    if (!receiver_email || !subject || !body_text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'receiver_email, subject, and body_text are required' }),
      };
    }

    const params = {
      Source: 'praveenraj22072002@gmail.com', // Replace with a verified SES email
      Destination: {
        ToAddresses: [receiver_email], // Replace with receiver_email
      },
      Message: {
        Subject: {
          Data: subject, // Replace with the actual subject
        },
        Body: {
          Text: {
            Data: body_text, // Replace with the actual body text
          },
        },
      },
    };

    await ses.sendEmail(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error', error: error.message }),
    };
  }
};
