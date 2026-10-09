import { NextResponse } from 'next/server';
import { STUDIO_INFO } from '@/lib/data';
import { ApiResponse, StudioInfo } from '@/lib/types';

export async function GET() {
  try {
    return NextResponse.json<ApiResponse<StudioInfo>>({
      success: true,
      data: STUDIO_INFO,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: 'Failed to retrieve studio info' },
      { status: 500 }
    );
  }
}
