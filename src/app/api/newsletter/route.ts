import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    console.log('[KYN Backend API] Newsletter Subscriber:', email);

    return NextResponse.json<ApiResponse<{ email: string }>>({
      success: true,
      message: 'You have been subscribed to KYN Architectural Monograph and Private Invitations.',
      data: { email },
    });
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: 'Newsletter subscription failed. Please try again.' },
      { status: 500 }
    );
  }
}
