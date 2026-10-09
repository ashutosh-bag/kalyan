import { NextRequest, NextResponse } from 'next/server';
import { SERVICES } from '@/lib/data';
import { ApiResponse, ServiceItem } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const service = SERVICES.find((s) => s.slug === slug || s.id === slug);
      if (!service) {
        return NextResponse.json<ApiResponse<null>>(
          { success: false, error: 'Service not found' },
          { status: 404 }
        );
      }
      return NextResponse.json<ApiResponse<ServiceItem>>({
        success: true,
        data: service,
      });
    }

    return NextResponse.json<ApiResponse<{ services: ServiceItem[]; total: number }>>({
      success: true,
      data: {
        services: SERVICES,
        total: SERVICES.length,
      },
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: 'Failed to retrieve services' },
      { status: 500 }
    );
  }
}
