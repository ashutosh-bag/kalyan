import { NextRequest, NextResponse } from 'next/server';
import { PROJECTS } from '@/lib/data';
import { Project, ApiResponse } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase();
    const featured = searchParams.get('featured');

    let results: Project[] = [...PROJECTS];

    if (category && category !== 'all') {
      results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (featured === 'true') {
      results = results.filter((p) => p.featured === true);
    }

    if (search) {
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.location.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.materials.some((m) => m.toLowerCase().includes(search))
      );
    }

    return NextResponse.json<ApiResponse<{ projects: Project[]; total: number }>>({
      success: true,
      data: {
        projects: results,
        total: results.length,
      },
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
