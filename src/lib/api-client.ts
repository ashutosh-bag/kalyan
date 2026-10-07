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
