import { NextResponse } from "next/server";
import { createEnquiry, getArtworkById } from "@/services/dbService";
import { rateLimit } from "@/lib/rateLimit";
import { sanitizeInput, isValidEmail, isValidPhone, verifyCsrf } from "@/lib/security";

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const limiter = rateLimit(ip, 5, 60000); // 5 enquiries per minute limit

    if (!limiter.success) {
      return NextResponse.json(
        { error: "Too many enquiries. Please try again in a minute." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": limiter.remaining.toString(),
            "X-RateLimit-Reset": limiter.reset.toString(),
          },
        }
      );
    }

    // 2. CSRF Verification
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (!verifyCsrf(origin, host)) {
      return NextResponse.json({ error: "Invalid request origin (CSRF block)." }, { status: 403 });
    }

    // 3. Parse and Validate Body
    const body = await request.json();
    const { artworkId, name, email, phone, message } = body;

    if (!artworkId || !name || !email || !phone || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Sanitize input texts
    const cleanName = sanitizeInput(name).trim();
    const cleanMessage = sanitizeInput(message).trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();

    // Validate formats
    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!isValidPhone(cleanPhone)) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
    }

    // Check if the artwork actually exists
    const artwork = await getArtworkById(artworkId);
    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found." }, { status: 404 });
    }

    // 4. Save Enquiry
    const result = await createEnquiry({
      artworkId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      message: cleanMessage,
    });

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: `Your inquiry for "${artwork.title}" has been successfully sent. A gallery representative will contact you soon.`,
          enquiryId: result.id,
        },
        {
          status: 201,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": limiter.remaining.toString(),
            "X-RateLimit-Reset": limiter.reset.toString(),
          },
        }
      );
    }

    return NextResponse.json({ error: "Failed to store inquiry." }, { status: 500 });
  } catch (error) {
    console.error("Enquiry API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
