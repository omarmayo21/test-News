import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { writeClient } from "@/lib/sanity/client";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address."),
  honeypot: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json({ success: true, message: "Subscription recorded" });
    }

    const validated = newsletterSchema.parse(body);

    const doc = {
      _type: "formSubmission",
      formType: "newsletter",
      fullName: "Newsletter Subscriber",
      email: validated.email,
      submittedAt: new Date().toISOString(),
      status: "new",
      message: "Subscribed to Nexus News and Insights",
    };

    if (writeClient) {
      await writeClient.create(doc);
    } else {
      console.log("Newsletter subscription logged:", doc);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to Nexus Insights.",
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
