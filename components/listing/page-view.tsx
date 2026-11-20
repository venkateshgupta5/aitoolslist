"use client";

import { useEffect } from "react";
import { track, LISTING_EVENTS } from "@/lib/analytics";

/** Fires the listing_page_view funnel event once on mount. */
export function ListingPageView() {
  useEffect(() => {
    track(LISTING_EVENTS.pageView);
  }, []);
  return null;
}
