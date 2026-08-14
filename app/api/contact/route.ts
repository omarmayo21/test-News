import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { writeClient } from "@/lib/sanity/client";

const contactSchema = z.object({
  formType: z.enum(["contact", "newsletter", "quote", "career", "custom"]).default("contact"),
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  inquiryType: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters."),
  honeypot: z.string().optional(), // Anti-spam honeypot
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check honeypot field for spam prevention
    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json({ success: true, message: "Submission accepted" });
    }

    const validated = contactSchema.parse(body);

    const doc = {
      _type: "formSubmission",
      formType: validated.formType,
      fullName: validated.fullName,
      email: validated.email,
      phone: validated.phone || "",
      company: validated.company || "",
      country: validated.country || "",
      inquiryType: validated.inquiryType || "",
      subject: validated.subject || "Direct Website Contact",
      message: validated.message,
      submittedAt: new Date().toISOString(),
      status: "new",
      rawData: JSON.stringify(body),
    };

    if (writeClient) {
      await writeClient.create(doc);
    } else {
      console.log("SANITY_API_WRITE_TOKEN not set or Sanity unconfigured. Form submission logged:", doc);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you. Your submission has been saved.",
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
