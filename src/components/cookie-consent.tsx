"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Cookie, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";
import {
  setStoredConsent,
  hasConsentBeenGiven,
  type CookieConsent as CookieConsentType,
} from "@/lib/cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const dict = useDictionary();

  useEffect(() => {
    // Show banner only if no consent decision has been made
    if (!hasConsentBeenGiven()) {
      // Small delay to avoid showing immediately on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = useCallback(
    (consent: CookieConsentType) => {
      setStoredConsent(consent);
      setVisible(false);

      // Dispatch custom event so GA component can react
      window.dispatchEvent(
        new CustomEvent("cookie-consent-update", { detail: consent })
      );
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

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6">
      <div className="mx-auto max-w-lg rounded-xl border border-border bg-card shadow-2xl">
        <div className="p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary shrink-0" />
              <h3 className="font-semibold text-sm">
                {dict.cookies.title}
              </h3>
            </div>
            <button
              onClick={handleRejectAll}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0 cursor-pointer"
              aria-label={dict.cookies.close}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Description */}
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            {dict.cookies.description}
          </p>

          {/* Expandable preferences */}
          {expanded && (
            <div className="mt-3 space-y-3 border-t border-border pt-3">
              {/* Necessary cookies — always on */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium">
                    {dict.cookies.necessary}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {dict.cookies.necessaryDesc}
                  </p>
                </div>
                <div className="shrink-0 pt-0.5">
                  <div className="h-5 w-9 rounded-full bg-primary flex items-center justify-end px-0.5">
                    <div className="h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>
              </div>

              {/* Analytics cookies — toggleable */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium">
                    {dict.cookies.analytics}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {dict.cookies.analyticsDesc}
                  </p>
                </div>
                <button
                  onClick={() => setAnalyticsChecked(!analyticsChecked)}
                  className="shrink-0 pt-0.5 cursor-pointer"
                  aria-label={`Toggle ${dict.cookies.analytics}`}
                >
                  <div
                    className={`h-5 w-9 rounded-full flex items-center px-0.5 transition-colors ${
                      analyticsChecked
                        ? "bg-primary justify-end"
                        : "bg-muted justify-start"
                    }`}
                  >
                    <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={handleAcceptAll} className="text-xs">
              {dict.cookies.accept}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRejectAll}
              className="text-xs"
            >
              {dict.cookies.reject}
            </Button>
            {expanded ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSavePreferences}
                className="text-xs"
              >
                {dict.cookies.save}
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setExpanded(true)}
                className="text-xs ml-auto"
              >
                {dict.cookies.manage}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            )}
            {expanded && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setExpanded(false)}
                className="text-xs ml-auto"
              >
                <ChevronUp className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
