// We can't use Resend directly from the browser due to CORS restrictions
// Instead, we'll use a simple fetch to a serverless function or mock the email sending for development

/**
 * Send an email using a serverless function or mock for development
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email HTML content
 * @param {string} [options.from] - Sender email
 * @returns {Promise} - Promise resolving to the email send result
 */
export const sendEmail = async ({
  to,
  subject,
  html,
  from = "onboarding@resend.dev",
}) => {
  try {
    // For development, log the email and return success
    if (process.env.NODE_ENV === "development") {
      console.log("Email would be sent in production:");
      console.log({ from, to, subject, html });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        data: { id: "mock-email-id-" + Date.now() },
        mock: true,
      };
    }

    // For production, you would use a serverless function or backend API
    // Example with a serverless function (you would need to create this)
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to send email");
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("Exception when sending email:", error);
    return { success: false, error: error.message };
  }
};
