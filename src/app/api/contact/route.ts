import { NextRequest, NextResponse } from 'next/server';
import { ContactSubmission, ApiResponse } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, projectType, budgetRange, timeline, message } = body;

    // Server-side validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: 'Please provide a valid full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: 'Please provide project details (minimum 10 characters).' },
        { status: 400 }
      );
    }

    // Structured submission object ready for PostgreSQL / Supabase / Prisma / CRM / Email webhook
    const submission: ContactSubmission = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || 'Not provided',
      projectType: projectType || 'Residential Architecture',
      budgetRange: budgetRange || '$100k - $250k',
      timeline: timeline || 'Within 6 months',
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    // Log the received inquiry for backend visibility
    console.log('[KYN Backend API] New Consultation Request Received:', submission);

    // In production, integrate here with:
    // - await db.consultations.create({ data: submission });
    // - await resend.emails.send({ to: 'inquiries@kynstudio.com', ... });
    // - await slackWebhook.send({ text: `New lead from ${submission.fullName}` });

    return NextResponse.json<ApiResponse<{ submissionId: string; receivedAt: string }>>(
      {
        success: true,
        message: 'Thank you. Your architectural consultation request has been recorded. A senior partner will contact you within 24 hours.',
        data: {
          submissionId: submission.id!,
          receivedAt: submission.createdAt!,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[KYN Backend API Error]:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: 'An internal server error occurred while processing your request. Please try again or contact us directly at inquiries@kynstudio.com.',
      },
      { status: 500 }
    );
  }
}
