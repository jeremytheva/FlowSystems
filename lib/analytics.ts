'use client';

export type AnalyticsEvent = {
  type: string;
  payload?: Record<string, unknown>;
};

export function track(event: AnalyticsEvent) {
  if (process.env.NODE_ENV !== 'production') {
    console.debug('[analytics]', event);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('flowsystems:analytics', { detail: event }));
  }
}
