import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

export const useAnalytics = () => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname,
        page_title: document.title,
      });
    }
  }, [location]);

  // Function to track custom events
  const trackEvent = useCallback((eventName, eventParams = {}) => {
    if (window.gtag) {
      window.gtag("event", eventName, eventParams);
    }
  }, []);

  return { trackEvent };
};
