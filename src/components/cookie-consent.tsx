"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { X, Cookie, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBackdrop,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogViewport,
} from "@/components/ui/dialog";
import { useDictionary } from "@/components/dictionary-provider";
import {
  setStoredConsent,
  hasConsentBeenGiven,
  getStoredConsent,
  shouldReloadAfterAnalyticsWithdrawal,
  type CookieConsent as CookieConsentType,
} from "@/lib/cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const dict = useDictionary();

  const rememberPreviousFocus = useCallback(() => {
    const activeElement = document.activeElement;
    previousFocusRef.current =
      activeElement instanceof HTMLElement && activeElement !== document.body
        ? activeElement
        : null;
  }, []);

  useEffect(() => {
    if (!hasConsentBeenGiven()) {
      const timer = setTimeout(() => {
        rememberPreviousFocus();
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [rememberPreviousFocus]);

  useEffect(() => {
    function openPreferences() {
      const stored = getStoredConsent();
      rememberPreviousFocus();
      setAnalyticsChecked(stored?.analytics ?? false);
      setExpanded(true);
      setVisible(true);
    }
    window.addEventListener("cookie-consent-open", openPreferences);
    return () =>
      window.removeEventListener("cookie-consent-open", openPreferences);
  }, [rememberPreviousFocus]);

  const saveConsent = useCallback(
    (consent: CookieConsentType) => {
      const previousConsent = getStoredConsent();
      const analyticsWasWithdrawn = shouldReloadAfterAnalyticsWithdrawal(
        previousConsent,
        consent,
      );

      const consentPersisted = setStoredConsent(consent);
      setVisible(false);

      window.dispatchEvent(
        new CustomEvent("cookie-consent-update", { detail: consent })
      );

      // next/script keeps a previously injected third-party script in the DOM.
      // A full navigation is required to guarantee that GTM is no longer active
      // after consent is withdrawn.
      if (analyticsWasWithdrawn && consentPersisted) {
        window.location.reload();
      }
    },
    []
  );

  function handleAcceptAll() {
    saveConsent({ necessary: true, analytics: true });
  }

  function handleRejectAll() {
    saveConsent({ necessary: true, analytics: false });
  }

  function handleSavePreferences() {
    saveConsent({ necessary: true, analytics: analyticsChecked });
  }

  return (
    <Dialog
      open={visible}
      modal
      disablePointerDismissal
      onOpenChange={(open) => {
        if (!open) handleRejectAll();
      }}
    >
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup
            ref={dialogRef}
            initialFocus={dialogRef}
            finalFocus={previousFocusRef}
            aria-describedby="cookie-consent-description"
          >
        <div>
          {/* Header */}
          <div>
            <div>
              <Cookie aria-hidden="true" />
              <DialogTitle
                id="cookie-consent-title"
              >
                {dict.cookies.title}
              </DialogTitle>
            </div>
            <button
              onClick={handleRejectAll}
              aria-label={dict.cookies.close}
            >
              <X aria-hidden="true" />
            </button>
          </div>

          {/* Description */}
          <DialogDescription
            id="cookie-consent-description"
          >
            {dict.cookies.description}
          </DialogDescription>

          {/* Expandable preferences */}
          {expanded && (
            <div>
              {/* Necessary cookies — always on */}
              <div>
                <div>
                  <p>
                    {dict.cookies.necessary}
                  </p>
                  <p>
                    {dict.cookies.necessaryDesc}
                  </p>
                </div>
                <div>
                  <div
                    role="switch"
                    aria-label={dict.cookies.necessary}
                    aria-checked="true"
                    aria-readonly="true"
                  >
                    <div />
                  </div>
                </div>
              </div>

              {/* Analytics cookies — toggleable */}
              <div>
                <div>
                  <p>
                    {dict.cookies.analytics}
                  </p>
                  <p>
                    {dict.cookies.analyticsDesc}
                  </p>
                </div>
                <button
                  onClick={() => setAnalyticsChecked(!analyticsChecked)}
                  role="switch"
                  aria-checked={analyticsChecked}
                  aria-label={dict.cookies.toggleAnalytics}
                >
                  <div
                  >
                    <div />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div>
            <Button size="sm" onClick={handleAcceptAll}>
              {dict.cookies.accept}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRejectAll}
            >
              {dict.cookies.reject}
            </Button>
            {expanded ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSavePreferences}
              >
                {dict.cookies.save}
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setExpanded(true)}
              >
                {dict.cookies.manage}
                <ChevronDown aria-hidden="true" />
              </Button>
            )}
            {expanded && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setExpanded(false)}
                aria-label={dict.cookies.collapse}
              >
                <ChevronUp aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  );
}
