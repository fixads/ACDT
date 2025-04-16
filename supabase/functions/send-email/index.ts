import { createClient } from "npm:@supabase/supabase-js@2.39.7";
import { SmtpClient } from "npm:@emailjs/smtp-client@1.1.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, program, message } = await req.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !program) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Create email content
    const emailContent = `
New Training Inquiry:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Program: ${program}
Message: ${message || "No additional message provided"}
    `;

    // Initialize SMTP client
    const client = new SmtpClient({
      host: Deno.env.get("SMTP_HOST") || "",
      port: parseInt(Deno.env.get("SMTP_PORT") || "587"),
      user: Deno.env.get("SMTP_USER") || "",
      password: Deno.env.get("SMTP_PASSWORD") || "",
      tls: true,
    });

    // Send email
    await client.send({
      from: Deno.env.get("SMTP_FROM") || "",
      to: "chefinstructor@acdtraining.com",
      subject: "New Training Inquiry from ACDT Website",
      text: emailContent,
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});