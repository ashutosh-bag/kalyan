import { ContactSubmission, Project, ApiResponse } from './types';
import { PROJECTS } from './data';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function submitContactInquiry(data: ContactSubmission): Promise<ApiResponse<{ submissionId: string }>> {
  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred. Please try again.',
    };
  }
}

export async function subscribeNewsletter(email: string): Promise<ApiResponse<{ email: string }>> {
  try {
    const res = await fetch(`${BASE_URL}/api/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Subscription request failed.',
    };
  }
}

export async function getProjects(category?: string, search?: string): Promise<Project[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    const url = `${BASE_URL}/api/projects${params.toString() ? `?${params.toString()}` : ''}`;
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) throw new Error('Failed to fetch from API');
    const json: ApiResponse<{ projects: Project[] }> = await res.json();
    return json.data?.projects || PROJECTS;
  } catch {
    // Fallback to static dataset if running offline or static export
    let list = [...PROJECTS];
    if (category && category !== 'all') {
      list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
    }
    return list;
  }
}

export async function getGoogleReviews(
  category?: string,
  sync: boolean = false
): Promise<{
  reviews: import('./types').GoogleReview[];
  placeInfo: import('./types').GooglePlaceReviewsData['placeInfo'];
  categories: import('./types').GooglePlaceReviewsData['categories'];
}> {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (sync) params.append('sync', 'true');

    const url = `${BASE_URL}/api/reviews${params.toString() ? `?${params.toString()}` : ''}`;
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) throw new Error('Reviews fetch failed');
    const json: ApiResponse<import('./types').GooglePlaceReviewsData> = await res.json();
    if (json.data) {
      return json.data;
    }
    throw new Error(json.error || 'No review data returned');
  } catch (err) {
    const fallback = await import('@/data/google_reviews.json');
    return {
      reviews: fallback.default.reviews as import('./types').GoogleReview[],
      placeInfo: fallback.default.placeInfo as import('./types').GooglePlaceReviewsData['placeInfo'],
      categories: [
        { id: 'all', label: 'All Reviews', count: fallback.default.reviews.length },
      ],
    };
  }
}

export async function triggerGoogleReviewSync(): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sync' }),
    });
    const json = await res.json();
    return {
      success: json.success,
      message: json.data?.message || 'Synchronized with Google Business Profile.',
    };
  } catch (err) {
    return {
      success: false,
      message: errorString(err),
    };
  }
}

function errorString(e: unknown): string {
  return e instanceof Error ? e.message : 'Synchronization failed.';
}

