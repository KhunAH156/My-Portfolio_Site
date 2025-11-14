import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bde9c053`;

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

// Contact form API
export const contactAPI = {
  submit: async (data: { name: string; email: string; subject: string; message: string }) => {
    return fetchAPI('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getAll: async () => {
    return fetchAPI('/contacts');
  },
};

// Projects API
export const projectsAPI = {
  getAll: async () => {
    return fetchAPI('/projects');
  },
  add: async (data: { title: string; description: string; tech: string[]; image?: string; github?: string; demo?: string }) => {
    return fetchAPI('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: Partial<{ title: string; description: string; tech: string[]; image: string; github: string; demo: string }>) => {
    return fetchAPI(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string) => {
    return fetchAPI(`/projects/${id}`, {
      method: 'DELETE',
    });
  },
};

// Analytics API
export const analyticsAPI = {
  get: async () => {
    return fetchAPI('/analytics');
  },
};

// Initialize defaults
export const initDefaults = async () => {
  return fetchAPI('/init-defaults', {
    method: 'POST',
  });
};
