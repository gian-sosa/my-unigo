/**
 * Utilidades de validación y sanitización de entrada
 * MEDIO: Protección contra XSS y validación de datos
 */

// Sanitizar texto para prevenir XSS
export const sanitizeText = (text) => {
  if (typeof text !== "string") return "";

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

// Validar email con dominio institucional
export const validateInstitutionalEmail = (email) => {
  if (!email || typeof email !== "string") return false;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@unsch\.edu\.pe$/;
  return emailRegex.test(email);
};

// Validar URL para prevenir ataques de redirección
export const validateURL = (url) => {
  if (!url || typeof url !== "string") return false;

  try {
    const urlObj = new URL(url);
    // Solo permitir URLs HTTPS de dominios confiables
    const allowedDomains = [
      "unsch.edu.pe",
      "supabase.co",
      "accounts.google.com",
      "googleapis.com",
      "gstatic.com",
    ];

    return (
      urlObj.protocol === "https:" &&
      allowedDomains.some(
        (domain) =>
          urlObj.hostname === domain || urlObj.hostname.endsWith("." + domain)
      )
    );
  } catch {
    return false;
  }
};

// Validar nombre de archivo para uploads
export const validateFileName = (fileName) => {
  if (!fileName || typeof fileName !== "string") return false;

  // Caracteres permitidos: letras, números, guiones, puntos, espacios
  const fileNameRegex = /^[a-zA-Z0-9\s\-_.]+$/;
  const maxLength = 255;

  // Extensiones permitidas para imágenes de perfil
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

  if (fileName.length > maxLength) return false;
  if (!fileNameRegex.test(fileName)) return false;

  const hasValidExtension = allowedExtensions.some((ext) =>
    fileName.toLowerCase().endsWith(ext)
  );

  return hasValidExtension;
};

// Sanitizar parámetros de ruta
export const sanitizeRouteParam = (param) => {
  if (!param || typeof param !== "string") return "";

  // Solo permitir caracteres alfanuméricos y guiones
  return param.replace(/[^a-zA-Z0-9-]/g, "");
};

// Validar datos de sesión
export const validateSessionData = (sessionData) => {
  if (!sessionData || typeof sessionData !== "object") {
    return { valid: false, error: "Datos de sesión inválidos" };
  }

  const { user, expires_at } = sessionData;

  if (!user || !user.email) {
    return { valid: false, error: "Usuario no válido" };
  }

  if (!validateInstitutionalEmail(user.email)) {
    return {
      valid: false,
      error: "Email no pertenece al dominio institucional",
    };
  }

  if (expires_at && Date.now() >= expires_at * 1000) {
    return { valid: false, error: "Sesión expirada" };
  }

  return { valid: true };
};

// Limpiar objeto de datos sensibles antes de logging
export const sanitizeForLogging = (obj) => {
  const sensitiveKeys = [
    "password",
    "token",
    "key",
    "secret",
    "credential",
    "access_token",
    "refresh_token",
    "session_token",
    "email",
    "phone",
    "ssn",
    "card",
  ];

  const sanitized = {};

  for (const [key, value] of Object.entries(obj)) {
    const keyLower = key.toLowerCase();
    const isSensitive = sensitiveKeys.some((sensitive) =>
      keyLower.includes(sensitive)
    );

    if (isSensitive) {
      sanitized[key] = "[REDACTED]";
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeForLogging(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
};

// Generar token CSRF simple
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
};

// Validar token CSRF
export const validateCSRFToken = (token, sessionToken) => {
  if (!token || !sessionToken) return false;
  if (typeof token !== "string" || typeof sessionToken !== "string")
    return false;

  // Comparación simple - en producción usar crypto.subtle.timingSafeEqual
  return token === sessionToken && token.length === 64;
};
