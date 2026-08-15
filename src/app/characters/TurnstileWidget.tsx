"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      action: string;
      callback: (token: string) => void;
      "error-callback": () => void;
      "expired-callback": () => void;
      sitekey: string;
      theme: "dark";
    },
  ) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileWidgetProps = {
  onToken: (token: string) => void;
  resetSignal: number;
  siteKey: string;
};

export default function TurnstileWidget({ onToken, resetSignal, siteKey }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!scriptReady || !siteKey || !containerRef.current || !window.turnstile) return;

    const widgetId = window.turnstile.render(containerRef.current, {
      action: "comment",
      callback: onToken,
      "error-callback": () => onToken(""),
      "expired-callback": () => onToken(""),
      sitekey: siteKey,
      theme: "dark",
    });
    widgetIdRef.current = widgetId;

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = undefined;
      onToken("");
    };
  }, [onToken, scriptReady, siteKey]);

  useEffect(() => {
    if (widgetIdRef.current && window.turnstile) {
      onToken("");
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [onToken, resetSignal]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        onReady={() => setScriptReady(true)}
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <div className="min-h-[65px]" ref={containerRef} />
    </>
  );
}
