"use client";

import { track as vercelTrack } from "@vercel/analytics";

/**
 * Conversion-funnel events for the $199 listing (per spec §Analytics).
 * Client-side events fire through Vercel Analytics when available (no-op
 * otherwise). Approval/rejection/checkout/payment are operational steps handled
 * off-platform, their names are listed here for a consistent taxonomy but they
 * are emitted by the review/billing process, not the browser.
 */
export const LISTING_EVENTS = {
  pageView: "listing_page_view",
  ctaClick: "listing_cta_click",
  formStart: "listing_form_start",
  formSubmit: "listing_form_submit",
  formError: "listing_form_error",
  // operational (not client-fired):
  approved: "listing_application_approved",
  rejected: "listing_application_rejected",
  checkoutStarted: "listing_checkout_started",
  paymentCompleted: "listing_payment_completed",
} as const;

export function track(
  event: string,
  props?: Record<string, string | number | boolean | null>,
): void {
  try {
    vercelTrack(event, props);
  } catch {
    /* analytics is best-effort; never block the UX */
  }
}
