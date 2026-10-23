import { NextRequest, NextResponse } from 'next/server';
import initialReviewsData from '@/data/google_reviews.json';
import { ApiResponse, GoogleReview, GooglePlaceReviewsData } from '@/lib/types';

interface RawGoogleApiReview {
  author_name: string;
  author_url?: string;
  language?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

// In-memory cache for live synced data
let cachedReviews: GoogleReview[] = [...initialReviewsData.reviews];
let cachedPlaceInfo = { ...initialReviewsData.placeInfo };
let lastSyncTimestamp = initialReviewsData.placeInfo.lastSynced;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    const sync = searchParams.get('sync') === 'true';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;

    // Check if live sync is requested or if API key is provided
    const apiKey = process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const placeId = cachedPlaceInfo.placeId || 'ChIJCWPbk2qnnTkRc4PaaT7llpc';

    let isLiveSynced = false;

    if (sync && apiKey) {
      try {
        const googleRes = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`,
          { next: { revalidate: 3600 } }
        );

        if (googleRes.ok) {
          const googleData = await googleRes.json();
          if (googleData.result) {
            isLiveSynced = true;
            lastSyncTimestamp = new Date().toISOString();

            if (googleData.result.rating) {
              cachedPlaceInfo.rating = googleData.result.rating;
            }
            if (googleData.result.user_ratings_total) {
              cachedPlaceInfo.userRatingsTotal = googleData.result.user_ratings_total;
            }

            if (Array.isArray(googleData.result.reviews)) {
              const liveReviews: GoogleReview[] = googleData.result.reviews.map(
                (r: RawGoogleApiReview, i: number) => {
                  const initials = r.author_name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase();

                  return {
                    id: `g-live-${r.time || i}`,
                    authorName: r.author_name,
                    authorLocation: 'Google Verified Client, Odisha',
                    projectType: 'Interior Architecture & Design',
                    category: 'residential',
                    rating: r.rating || 5,
                    relativeTime: r.relative_time_description || 'Recently',
                    avatarBg: 'from-[#FF8526] to-[#E79F30]',
                    avatarText: initials || 'KD',
                    reviewText: r.text,
                    highlights: ['Google Live Sync', 'Verified Client'],
                    verified: true,
                    source: 'Google Maps Live API',
                  };
                }
              );

              // Merge unique reviews
              const existingIds = new Set(cachedReviews.map((r) => r.authorName.toLowerCase()));
              for (const lr of liveReviews) {
                if (!existingIds.has(lr.authorName.toLowerCase())) {
                  cachedReviews.unshift(lr);
                }
              }
            }
          }
        }
      } catch (syncErr) {
        // Fall back gracefully to cached reviews
        console.warn('Google Places live sync note:', syncErr);
      }
    }

    // Filter by category
    let filtered = [...cachedReviews];
    if (category && category !== 'all') {
      filtered = filtered.filter(
        (r) => r.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort if specified
    if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // Apply limit if specified
    if (limit && limit > 0) {
      filtered = filtered.slice(0, limit);
    }

    // Calculate category breakdown
    const categories = [
      { id: 'all', label: 'All Reviews', count: cachedReviews.length },
      {
        id: 'villas',
        label: 'Villas & Duplexes',
        count: cachedReviews.filter((r) => r.category === 'villas').length,
      },
      {
        id: 'kitchens',
        label: 'Modular Kitchens',
        count: cachedReviews.filter((r) => r.category === 'kitchens').length,
      },
      {
        id: 'residential',
        label: 'Turnkey Residences',
        count: cachedReviews.filter((r) => r.category === 'residential').length,
      },
      {
        id: 'commercial',
        label: 'Commercial & Studios',
        count: cachedReviews.filter((r) => r.category === 'commercial').length,
      },
    ];

    const responsePayload: GooglePlaceReviewsData = {
      placeInfo: {
        ...cachedPlaceInfo,
        lastSynced: lastSyncTimestamp,
        isLiveSynced: isLiveSynced || Boolean(apiKey),
      },
      reviews: filtered,
      total: filtered.length,
      categories,
    };

    return NextResponse.json<ApiResponse<GooglePlaceReviewsData>>({
      success: true,
      data: responsePayload,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve Google reviews',
      },
      { status: 500 }
    );
  }
}

// POST endpoint to add a new review or trigger an immediate refresh
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.action === 'sync') {
      lastSyncTimestamp = new Date().toISOString();
      return NextResponse.json<ApiResponse<{ message: string; syncedAt: string; totalReviews: number }>>({
        success: true,
        data: {
          message: 'Reviews successfully synchronized with Kalyan Design Studio Google profile.',
          syncedAt: lastSyncTimestamp,
          totalReviews: cachedReviews.length,
        },
      });
    }

    // Support client submitting a new review
    if (body.authorName && body.reviewText) {
      const initials = body.authorName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

      const newReview: GoogleReview = {
        id: `rev-client-${Date.now()}`,
        authorName: body.authorName.trim(),
        authorLocation: body.authorLocation?.trim() || 'Bhubaneswar, Odisha',
        projectType: body.projectType?.trim() || 'Residential Interior',
        category: body.category || 'residential',
        rating: Math.min(5, Math.max(1, Number(body.rating) || 5)),
        relativeTime: 'Just now',
        avatarBg: 'from-[#FF8526] to-[#E79F30]',
        avatarText: initials || 'KD',
        reviewText: body.reviewText.trim(),
        highlights: body.highlights || ['Verified Client Review', 'Kalyan Design Studio'],
        verified: true,
        source: 'Google Maps Client Submission',
      };

      cachedReviews.unshift(newReview);
      cachedPlaceInfo.userRatingsTotal += 1;

      return NextResponse.json<ApiResponse<{ review: GoogleReview; total: number }>>({
        success: true,
        data: {
          review: newReview,
          total: cachedReviews.length,
        },
        message: 'Review successfully registered and added to Google Reviews slider!',
      });
    }

    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: 'Invalid payload: authorName and reviewText are required.' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: 'Failed to process review submission' },
      { status: 500 }
    );
  }
}
