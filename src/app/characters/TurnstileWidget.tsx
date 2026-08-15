"use client";

import Script from "next/script";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

type TurnstileApi = {
  execute: (widgetId: string) => void;
  render: (
    container: HTMLElement,
    options: {
      action: string;
      appearance: "interaction-only";
      callback: (token: string) => void;
      execution: "execute";
      "error-callback": () => void;
      "expired-callback": () => void;
      "response-field": false;
      sitekey: string;
      "timeout-callback": () => void;
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

type PendingExecution = {
  reject: (reason: Error) => void;
  resolve: (token: string) => void;
};

export type TurnstileWidgetHandle = {
  execute: () => Promise<string>;
  reset: () => void;
};

type TurnstileWidgetProps = {
  siteKey: string;
};

const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ siteKey }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | undefined>(undefined);
    const pendingExecutionRef = useRef<PendingExecution | undefined>(undefined);
    const [scriptReady, setScriptReady] = useState(false);

    function rejectPending(message: string) {
      const pending = pendingExecutionRef.current;
      pendingExecutionRef.current = undefined;
      pending?.reject(new Error(message));
    }

    function reset() {
      rejectPending("人机验证已重置，请重新发送。");
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }

    useImperativeHandle(
      ref,
      () => ({
        execute() {
          const widgetId = widgetIdRef.current;
          const turnstile = window.turnstile;

          if (!siteKey) {
            return Promise.reject(new Error("评论验证暂时不可用，请稍后再试。"));
          }
          if (!widgetId || !turnstile) {
            return Promise.reject(new Error("评论验证正在载入，请稍后再试。"));
          }
          if (pendingExecutionRef.current) {
            return Promise.reject(new Error("评论验证正在进行，请稍候。"));
          }

          return new Promise<string>((resolve, reject) => {
            pendingExecutionRef.current = { reject, resolve };
            try {
              turnstile.execute(widgetId);
            } catch {
              pendingExecutionRef.current = undefined;
              reject(new Error("评论验证启动失败，请重试。"));
            }
          });
        },
        reset,
      }),
      [siteKey],
    );

    useEffect(() => {
      if (!scriptReady || !siteKey || !containerRef.current || !window.turnstile) return;

      const widgetId = window.turnstile.render(containerRef.current, {
        action: "comment",
        appearance: "interaction-only",
        callback: (token) => {
          const pending = pendingExecutionRef.current;
          pendingExecutionRef.current = undefined;
          if (!token) {
            pending?.reject(new Error("人机验证未完成，请重试。"));
            return;
          }
          pending?.resolve(token);
        },
        execution: "execute",
        "error-callback": () => rejectPending("人机验证失败，请重试。"),
        "expired-callback": () => rejectPending("人机验证已过期，请重试。"),
        "response-field": false,
        sitekey: siteKey,
        "timeout-callback": () => rejectPending("人机验证超时，请重试。"),
      });
      widgetIdRef.current = widgetId;

      return () => {
        rejectPending("人机验证已取消。");
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
        }
        widgetIdRef.current = undefined;
      };
    }, [scriptReady, siteKey]);

    if (!siteKey) return null;

    return (
      <>
        <Script
          onReady={() => setScriptReady(true)}
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden"
          ref={containerRef}
        />
      </>
    );
  },
);

export default TurnstileWidget;
