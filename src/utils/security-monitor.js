/**
 * Sistema de monitoreo de seguridad y auditoría
 * MEDIO: Tracking de eventos de seguridad y alertas
 */

import { logger, prodLogger } from "./logger";
import { sanitizeForLogging } from "./validation";

class SecurityMonitor {
  constructor() {
    this.events = [];
    this.alertThresholds = {
      failedLogins: 3,
      suspiciousActivity: 5,
      timeWindow: 300000, // 5 minutos
    };
    this.isEnabled =
      import.meta.env.PROD ||
      import.meta.env.VITE_ENABLE_SECURITY_MONITOR === "true";
  }

  // Registrar evento de seguridad
  logSecurityEvent(eventType, details = {}) {
    if (!this.isEnabled) return;

    const event = {
      id: crypto.randomUUID(),
      type: eventType,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      ip: "client-side", // En producción obtener del servidor
      details: sanitizeForLogging(details),
    };

    this.events.push(event);

    // Mantener solo eventos de las últimas 24 horas
    const cutoff = Date.now() - 86400000; // 24 horas
    this.events = this.events.filter(
      (e) => new Date(e.timestamp).getTime() > cutoff
    );

    // Log según el tipo de evento
    switch (eventType) {
      case "LOGIN_SUCCESS":
        logger.info("Usuario inició sesión exitosamente");
        break;
      case "LOGIN_FAILED":
        logger.warn("Intento de login fallido");
        this.checkFailedLoginThreshold();
        break;
      case "LOGOUT":
        logger.info("Usuario cerró sesión");
        break;
      case "SESSION_EXPIRED":
        logger.warn("Sesión expiró");
        break;
      case "UNAUTHORIZED_ACCESS":
        logger.error("Intento de acceso no autorizado");
        prodLogger.error("Unauthorized access attempt", event);
        break;
      case "SUSPICIOUS_ACTIVITY":
        logger.error("Actividad sospechosa detectada");
        prodLogger.error("Suspicious activity", event);
        break;
      case "XSS_ATTEMPT":
        logger.error("Posible intento de XSS detectado");
        prodLogger.error("XSS attempt detected", event);
        break;
      case "CSRF_ATTEMPT":
        logger.error("Posible intento de CSRF detectado");
        prodLogger.error("CSRF attempt detected", event);
        break;
      default:
        logger.info(`Evento de seguridad: ${eventType}`);
    }

    // En producción, enviar a servicio de monitoreo externo
    if (import.meta.env.PROD) {
      this.sendToExternalService(event);
    }
  }

  // Verificar umbral de logins fallidos
  checkFailedLoginThreshold() {
    const recentFailures = this.events.filter(
      (e) =>
        e.type === "LOGIN_FAILED" &&
        Date.now() - new Date(e.timestamp).getTime() <
          this.alertThresholds.timeWindow
    );

    if (recentFailures.length >= this.alertThresholds.failedLogins) {
      this.logSecurityEvent("MULTIPLE_FAILED_LOGINS", {
        count: recentFailures.length,
        timeWindow: this.alertThresholds.timeWindow,
      });

      // Bloquear temporalmente (implementar rate limiting)
      this.triggerRateLimit();
    }
  }

  // Rate limiting básico (del lado del cliente)
  triggerRateLimit() {
    const rateLimitKey = "security_rate_limit";
    const rateLimitTime = Date.now() + 900000; // 15 minutos

    try {
      localStorage.setItem(rateLimitKey, rateLimitTime.toString());
      logger.warn("Rate limiting activado por 15 minutos");
    } catch (error) {
      logger.error("Error al activar rate limiting:", error);
    }
  }

  // Verificar si está bajo rate limiting
  isRateLimited() {
    try {
      const rateLimitTime = localStorage.getItem("security_rate_limit");
      if (rateLimitTime && Date.now() < parseInt(rateLimitTime)) {
        return true;
      }
      // Limpiar rate limit expirado
      if (rateLimitTime) {
        localStorage.removeItem("security_rate_limit");
      }
      return false;
    } catch {
      return false;
    }
  }

  // Obtener eventos de seguridad recientes
  getRecentEvents(hours = 1) {
    const cutoff = Date.now() - hours * 3600000;
    return this.events.filter((e) => new Date(e.timestamp).getTime() > cutoff);
  }

  // Obtener estadísticas de seguridad
  getSecurityStats() {
    const last24h = this.getRecentEvents(24);
    const stats = {
      total: last24h.length,
      loginSuccess: last24h.filter((e) => e.type === "LOGIN_SUCCESS").length,
      loginFailed: last24h.filter((e) => e.type === "LOGIN_FAILED").length,
      suspicious: last24h.filter(
        (e) =>
          e.type.includes("SUSPICIOUS") ||
          e.type.includes("XSS") ||
          e.type.includes("CSRF")
      ).length,
      lastActivity:
        last24h.length > 0 ? last24h[last24h.length - 1].timestamp : null,
    };

    return stats;
  }

  // Simular envío a servicio externo (Sentry, LogRocket, etc.)
  sendToExternalService(event) {
    // En producción real, aquí enviarías a tu servicio de monitoreo
    logger.debug("Enviando evento a servicio externo:", event.id);

    // Ejemplo para Sentry:
    // Sentry.addBreadcrumb({
    //   message: `Security event: ${event.type}`,
    //   level: 'warning',
    //   data: event.details
    // });
  }

  // Detectar actividad sospechosa basada en patrones
  detectSuspiciousActivity(userAgent, url) {
    const suspiciousPatterns = [
      /bot|crawler|spider/i,
      /script|javascript|eval/i,
      /<script/i,
      /union.*select/i,
      /drop.*table/i,
    ];

    const suspicious = suspiciousPatterns.some(
      (pattern) => pattern.test(userAgent) || pattern.test(url)
    );

    if (suspicious) {
      this.logSecurityEvent("SUSPICIOUS_ACTIVITY", {
        userAgent,
        url,
        reason: "Suspicious pattern detected",
      });
    }

    return suspicious;
  }

  // Limpiar datos (GDPR compliance)
  clearUserData() {
    this.events = this.events.filter(
      (e) => e.type === "SECURITY_ALERT" || e.type === "SYSTEM_EVENT"
    );

    try {
      localStorage.removeItem("security_rate_limit");
    } catch (error) {
      logger.error("Error al limpiar datos de seguridad:", error);
    }
  }
}

// Instancia singleton
export const securityMonitor = new SecurityMonitor();

// Hook para React
export const useSecurityMonitor = () => {
  return {
    logEvent: (type, details) =>
      securityMonitor.logSecurityEvent(type, details),
    isRateLimited: () => securityMonitor.isRateLimited(),
    getStats: () => securityMonitor.getSecurityStats(),
    detectSuspicious: (userAgent, url) =>
      securityMonitor.detectSuspiciousActivity(userAgent, url),
  };
};
