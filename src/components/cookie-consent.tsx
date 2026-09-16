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
        <DialogBackdrop className="fixed inset-0 z-50 bg-background/72 backdrop-blur-sm" />
        <DialogViewport className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-6">
          <DialogPopup
            ref={dialogRef}
            initialFocus={dialogRef}
            finalFocus={previousFocusRef}
            aria-describedby="cookie-consent-description"
            className="w-full max-w-md rounded-[var(--radius-lg)] border border-border bg-card p-5 text-card-foreground shadow-[0_1.5rem_4rem_oklch(0.2_0.02_260/32%)] outline-none sm:p-6"
          >
        <div className="space-y-0.5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2.5">
              <Cookie aria-hidden="true" className="size-4 shrink-0 text-primary" />
              <DialogTitle
                id="cookie-consent-title"
                className="text-base font-semibold tracking-tight"
              >
                {dict.cookies.title}
              </DialogTitle>
            </div>
            <button
              type="button"
              onClick={handleRejectAll}
              aria-label={dict.cookies.close}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-[min(var(--radius-md),12px)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>

          {/* Description */}
          <DialogDescription
            id="cookie-consent-description"
            className="mt-3 text-sm leading-6 text-muted-foreground"
          >
            {dict.cookies.description}
          </DialogDescription>

          {/* Expandable preferences */}
          {expanded && (
            <div className="mt-5 grid gap-3">
              {/* Necessary cookies — always on */}
              <div className="flex items-start justify-between gap-5 rounded-[var(--radius-md)] border border-border bg-muted/30 p-3.5">
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-medium leading-5">
                    {dict.cookies.necessary}
                  </p>
                  <p className="max-w-[32ch] text-sm leading-5 text-muted-foreground">
                    {dict.cookies.necessaryDesc}
                  </p>
                </div>
                <div className="mt-0.5 shrink-0">
                  <div
                    data-cookie-consent-switch
                    role="switch"
                    aria-label={dict.cookies.necessary}
                    aria-checked="true"
                    aria-readonly="true"
                    className="flex h-5 w-9 items-center justify-end rounded-full bg-primary p-0.5"
                  >
                    <div className="size-4 rounded-full bg-primary-foreground shadow-sm" />
                  </div>
                </div>
              </div>

              {/* Analytics cookies — toggleable */}
              <div className="flex items-start justify-between gap-5 rounded-[var(--radius-md)] border border-border bg-muted/30 p-3.5">
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-medium leading-5">
                    {dict.cookies.analytics}
                  </p>
                  <p className="max-w-[32ch] text-sm leading-5 text-muted-foreground">
                    {dict.cookies.analyticsDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAnalyticsChecked(!analyticsChecked)}
                  data-cookie-consent-switch
                  role="switch"
                  aria-checked={analyticsChecked}
                  aria-label={dict.cookies.toggleAnalytics}
                  className="mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full bg-muted-foreground/35 p-0.5 transition-colors aria-checked:justify-end aria-checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  <div className="size-4 rounded-full bg-background shadow-sm" />
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
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
                className="ml-auto"
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
