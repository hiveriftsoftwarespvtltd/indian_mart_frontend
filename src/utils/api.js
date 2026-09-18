import { BACKEND_URL, BASE_URL } from '../config/config';

function resolveImageUrls(data) {
  if (!data) return data;

  const backendHost = BACKEND_URL;

  const formatUrl = (url) => {
    if (typeof url !== 'string') return url;

    // Resolve the domain subdirectory proxy issue where backend generates dhammaart.com/uploads/
    if (url.startsWith('https://dhammaart.com/uploads/') || url.startsWith('http://dhammaart.com/uploads/')) {
      return url.replace('dhammaart.com/uploads/', 'dhammaart.com/indian_mart_api/uploads/');
    }

    // Replace any localhost or 127.0.0.1 address (with or without port) with the live API URL
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      const uploadsIndex = url.indexOf('/uploads/');
      if (uploadsIndex !== -1) {
        const path = url.substring(uploadsIndex); // e.g. /uploads/...
        return backendHost ? `${backendHost}${path}` : path;
      }
    }

    // Handle relative upload paths
    if (url.startsWith('/uploads/') || url.startsWith('uploads/')) {
      const formatted = url.startsWith('/') ? url : '/' + url;
      return backendHost ? `${backendHost}${formatted}` : formatted;
    }

    // Auto-upgrade http to https for non-localhost URLs if the application is running on https
    if (url.startsWith('http://') && !url.includes('localhost') && typeof window !== 'undefined' && window.location.protocol === 'https:') {
      return url.replace('http://', 'https://');
    }

    return url;
  };

  if (Array.isArray(data)) {
    return data.map(item => resolveImageUrls(item));
  }

  if (typeof data === 'object') {
    const resolved = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const val = data[key];
        if (typeof val === 'string' && (val.includes('/uploads/') || val.includes('uploads/'))) {
          resolved[key] = formatUrl(val);
        } else if (Array.isArray(val)) {
          resolved[key] = val.map(item => {
            if (typeof item === 'string' && (item.includes('/uploads/') || item.includes('uploads/'))) {
              return formatUrl(item);
            }
            return resolveImageUrls(item);
          });
        } else if (val && typeof val === 'object') {
          resolved[key] = resolveImageUrls(val);
        } else {
          resolved[key] = val;
        }
      }
    }
    return resolved;
  }

  return data;
}

async function request(endpoint, options = {}) {
  const token = sessionStorage.getItem('adminToken');

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // If the body is FormData, do NOT set Content-Type header. The browser will set it automatically with boundaries.
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = 'API request failed';
    try {
      const errData = await response.json();
      errorMsg = errData.message || errorMsg;
    } catch (e) { }
    throw new Error(errorMsg);
  }

  const data = await response.json();
  return resolveImageUrls(data);
}

export const api = {
  auth: {
    login: (email, password) => request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  },
  categories: {
    getAll: () => request('/categories'),
    create: (formData) => request('/categories', {
      method: 'POST',
      body: formData,
    }),
    update: (id, formData) => request(`/categories/${id}`, {
      method: 'PUT',
      body: formData,
    }),
    delete: (id) => request(`/categories/${id}`, {
      method: 'DELETE',
    }),
  },
  products: {
    getAll: (category) => request(`/products${category ? `?category=${encodeURIComponent(category)}` : ''}`),
    getOne: (id) => request(`/products/${id}`),
    create: (formData) => request('/products', {
      method: 'POST',
      body: formData,
    }),
    update: (id, formData) => request(`/products/${id}`, {
      method: 'PUT',
      body: formData,
    }),
    delete: (id) => request(`/products/${id}`, {
      method: 'DELETE',
    }),
  },
  enquiries: {
    getAll: () => request('/enquiries'),
    create: (formData) => request('/enquiries', {
      method: 'POST',
      body: formData,
    }),
    updateStatus: (id, status) => request(`/enquiries/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
    delete: (id) => request(`/enquiries/${id}`, {
      method: 'DELETE',
    }),
  },
  banners: {
    getActive: () => request('/banners'),
    getAllAdmin: () => request('/banners/admin'),
    create: (formData) => request('/banners', {
      method: 'POST',
      body: formData,
    }),
    update: (id, formData) => request(`/banners/${id}`, {
      method: 'PUT',
      body: formData,
    }),
    toggle: (id) => request(`/banners/${id}/toggle`, {
      method: 'PATCH',
    }),
    delete: (id) => request(`/banners/${id}`, {
      method: 'DELETE',
    }),
  },
  content: {
    get: () => request('/content'),
    update: (contentData) => request('/content', {
      method: 'PUT',
      body: JSON.stringify(contentData),
    }),
  },
  gallery: {
    getAll: () => request('/gallery'),
    create: (formData) => request('/gallery', {
      method: 'POST',
      body: formData,
    }),
    delete: (id) => request(`/gallery/${id}`, {
      method: 'DELETE',
    }),
  },
  clients: {
    getAll: () => request('/clients'),
    create: (formData) => request('/clients', {
      method: 'POST',
      body: formData,
    }),
    delete: (id) => request(`/clients/${id}`, {
      method: 'DELETE',
    }),
  },
  blogs: {
    getAll: () => request('/blogs'),
    getAllAdmin: () => request('/blogs/admin'),
    getOne: (id) => request(`/blogs/${id}`),
    create: (formData) => request('/blogs', {
      method: 'POST',
      body: formData,
    }),
    update: (id, formData) => request(`/blogs/${id}`, {
      method: 'PUT',
      body: formData,
    }),
    delete: (id) => request(`/blogs/${id}`, {
      method: 'DELETE',
    }),
  },
};
