const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * SentinelAI API Client Service
 * Connects React Frontend to FastAPI Python Backend
 */
export const apiClient = {
  // 1. Auth Service
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await res.json();
    } catch (e) {
      console.warn('Backend offline, using fallback JWT auth:', e);
      return null;
    }
  },

  register: async (name, email, password, company, role) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, company, role })
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // 2. Scans Service
  getScans: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/scans`);
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  uploadScan: async (formData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData // multipart/form-data
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // 3. Assets Service
  getAssets: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/assets`);
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // 4. Vulnerabilities Service
  getVulnerabilities: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/vulnerabilities`);
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  updateVulnStatus: async (vulnId, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/vulnerabilities/${vulnId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // 5. AI Copilot Service (RAG)
  sendChatMessage: async (message, context = 'ALL_SCANS') => {
    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context })
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // 6. Analytics Service
  getAnalytics: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/analytics`);
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // 7. Threat Intelligence Service
  getThreatIntel: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/threat-intel`);
      return await res.json();
    } catch (e) {
      return null;
    }
  }
};
