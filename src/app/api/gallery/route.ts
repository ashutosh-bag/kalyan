import { NextRequest, NextResponse } from 'next/server';
import { GALLERY_PHOTOS } from '@/lib/data';
import { ApiResponse, GalleryPhoto } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    let photos: GalleryPhoto[] = [...GALLERY_PHOTOS];
    if (category && category !== 'all') {
      photos = photos.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json<ApiResponse<{ photos: GalleryPhoto[]; total: number }>>({
      success: true,
      data: {
        photos,
        total: photos.length,
      },
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: 'Failed to retrieve gallery photos' },
      { status: 500 }
    );
  }
}
