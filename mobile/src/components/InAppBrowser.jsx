import React, { useEffect, useRef } from "react";
import { AppState, Linking, Platform } from "react-native";

const EDGE_PACKAGE = "com.microsoft.emmx";
// Fallback timeout (ms) — resolves the cycle even if AppState never fires.
const FALLBACK_TIMEOUT_MS = 15000;

/**
 * Headless controller: opens a URL in Microsoft Edge (Android) or the
 * default browser (iOS) and calls onClose once the user returns to the app.
 *
 * Props:
 *  - url      {string | null}  URL to open. Changes trigger a new open.
 *  - onClose  {() => void}     Called when the user comes back to the app.
 */
export default function InAppBrowser({ url, onClose }) {
  const fallbackRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!url) return;

    let cancelled = false;

    async function open() {
      let targetUrl;
      if (Platform.OS === "android") {
        // Android: intent URL targets Edge directly (falls back if not installed).
        targetUrl = buildEdgeIntentUrl(url);
        Linking.openURL(targetUrl).catch(() => Linking.openURL(url));
      } else {
        // iOS: try Edge's registered deep-link scheme first.
        const edgeUrl = buildEdgeIosUrl(url);
        const canOpen = await Linking.canOpenURL(edgeUrl).catch(() => false);
        targetUrl = canOpen ? edgeUrl : url;
        Linking.openURL(targetUrl).catch(() => Linking.openURL(url));
      }
    }

    open();

    // AppState listener: fires when user presses Back in Edge and returns here.
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active" && !cancelled) {
        cleanup();
        onCloseRef.current();
      }
    });

    // Safety fallback in case AppState doesn't fire.
    fallbackRef.current = setTimeout(() => {
      if (!cancelled) {
        cleanup();
        onCloseRef.current();
      }
    }, FALLBACK_TIMEOUT_MS);

    function cleanup() {
      cancelled = true;
      subscription.remove();
      clearTimeout(fallbackRef.current);
      fallbackRef.current = null;
    }

    return cleanup;
  }, [url]);

  // No UI — just a headless controller.
  return null;
}

/**
 * Converts a regular https URL into an Android Intent URL targeting Edge.
 * Format: intent://<host+path+query>#Intent;scheme=https;package=<pkg>;end
 */
function buildEdgeIntentUrl(httpsUrl) {
  try {
    const parsed = new URL(httpsUrl);
    // Strip the scheme — intent URI carries host + path + query
    const rest = httpsUrl.replace(/^https?:\/\//, "");
    return `intent://${rest}#Intent;scheme=${parsed.protocol.replace(":", "")};package=${EDGE_PACKAGE};end`;
  } catch {
    return httpsUrl;
  }
}

/**
 * Converts a regular https URL into an iOS Edge deep-link URL.
 * Edge for iOS registers "microsoft-edge-https" and "microsoft-edge-http" schemes.
 * Requires LSApplicationQueriesSchemes in app.json (info.plist) to query availability.
 */
function buildEdgeIosUrl(httpsUrl) {
  return httpsUrl
    .replace(/^https:\/\//, "microsoft-edge-https://")
    .replace(/^http:\/\//, "microsoft-edge-http://");
}
