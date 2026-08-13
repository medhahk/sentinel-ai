// Base64 JWT Encoder & Decoder for Client Authentication
export const generateSignedJwt = (user) => {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: user.email,
    name: user.name || "Alex Mercer",
    email: user.email,
    role: user.role || "Security Analyst",
    plan: user.plan || "PRO",
    iat: now,
    exp: now + (7 * 24 * 60 * 60) // 7 days expiry
  };

  const encodeBase64 = (obj) => {
    return btoa(JSON.stringify(obj))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const encodedHeader = encodeBase64(header);
  const encodedPayload = encodeBase64(payload);
  const mockSignature = btoa(`${encodedHeader}.${encodedPayload}.sentinel_secret_2026`).slice(0, 32);

  return `${encodedHeader}.${encodedPayload}.${mockSignature}`;
};

export const decodeJwtToken = (tokenStr) => {
  try {
    const parts = tokenStr.split('.');
    if (parts.length !== 3) return null;
    const payloadJson = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(payloadJson);
  } catch (e) {
    return null;
  }
};
