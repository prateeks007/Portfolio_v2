const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1446484277045887118/bqnVEJqms_pD-LERkxT9yvD0YHM2FZ50fsjNCsvXMEIsAvnDviGHpnkk3ZsIc12jMYxH";

/**
 * Send contact form data to Discord webhook
 * @param {Object} options - Contact form data
 * @param {string} options.name - Sender name
 * @param {string} options.email - Sender email
 * @param {string} options.message - Message content
 * @returns {Promise} - Promise resolving to the send result
 */
export const sendEmail = async ({ name, email, message }) => {
  try {
    const discordMessage = {
      embeds: [
        {
          title: "🔔 New Portfolio Contact",
          color: 0x00bcd4,
          fields: [
            {
              name: "👤 Name",
              value: name,
              inline: true,
            },
            {
              name: "📧 Email",
              value: email,
              inline: true,
            },
            {
              name: "💬 Message",
              value: message,
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Portfolio Contact Form",
          },
        },
      ],
    };

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending to Discord:", error);
    return { success: false, error: error.message };
  }
};
