/**
 * Vercel Speed Insights Integration
 * 
 * This module initializes Vercel Speed Insights for performance monitoring.
 * Speed Insights helps track Core Web Vitals and other performance metrics.
 * 
 * Usage:
 *   import { initSpeedInsights } from './utils/speed-insights.js';
 *   initSpeedInsights();
 */

let speedInsightsInitialized = false;

/**
 * Initialize Vercel Speed Insights
 * This function safely initializes Speed Insights and handles cases where
 * it might not be available (e.g., in non-Vercel environments).
 */
export async function initSpeedInsights() {
  // Prevent multiple initializations
  if (speedInsightsInitialized) {
    return;
  }

  try {
    // Only initialize if running on Vercel or if the Speed Insights API is available
    if (typeof window !== 'undefined') {
      // Client-side environment (browser)
      // This should not be executed in server-side code
      console.log('[Speed Insights] Skipping initialization - running in browser environment');
      return;
    }

    // Server-side: Try to import and inject Speed Insights
    try {
      const { injectSpeedInsights } = await import('@vercel/speed-insights');
      injectSpeedInsights();
      speedInsightsInitialized = true;
      console.log('[Speed Insights] Successfully initialized Vercel Speed Insights');
    } catch (error) {
      // Speed Insights package might not be available in non-Vercel environments
      // or during local development. This is not a critical error.
      console.log('[Speed Insights] Info: Speed Insights not available:', error.message);
    }
  } catch (error) {
    console.warn('[Speed Insights] Warning during initialization:', error.message);
  }
}

/**
 * Check if Speed Insights is initialized
 * @returns {boolean} True if Speed Insights has been initialized
 */
export function isSpeedInsightsInitialized() {
  return speedInsightsInitialized;
}
