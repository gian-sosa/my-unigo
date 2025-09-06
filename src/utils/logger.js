/**
 * Sistema de logging seguro que solo funciona en desarrollo
 * CRÍTICO: Evita exposición de información sensible en producción
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  log: (...args) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.log("[DEV]", ...args);
    }
  },

  warn: (...args) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.warn("[DEV WARN]", ...args);
    }
  },

  error: (...args) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.error("[DEV ERROR]", ...args);
    }
    // En producción, podrías enviar errores a un servicio de monitoreo
    // como Sentry, LogRocket, etc.
  },

  info: (...args) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.info("[DEV INFO]", ...args);
    }
  },

  debug: (...args) => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.debug("[DEV DEBUG]", ...args);
    }
  },
};

// Para producción, solo permitir errores críticos sin datos sensibles
export const prodLogger = {
  error: (message, _context = {}) => {
    if (!isDevelopment) {
      // Solo log sanitizado sin datos sensibles
      const sanitizedContext = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.pathname,
      };
      // eslint-disable-next-line no-console
      console.error("[PROD ERROR]", message, sanitizedContext);
    }
  },
};
