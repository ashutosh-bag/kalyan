import { NextResponse } from 'next/server';
import kalyanDatabase from '@/data/kalyan_studio_database.json';
import { ApiResponse } from '@/lib/types';

export async function GET() {
  try {
    return NextResponse.json<ApiResponse<typeof kalyanDatabase>>({
      success: true,
      data: kalyanDatabase,
      message: 'Master Kalyan Design Studio database schema and content records',
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: 'Failed to retrieve database contents' },
      { status: 500 }
    );
  }
}
