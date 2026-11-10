"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

const CONSENT_KEY = "pinarkive_cookie_consent";

function consentAccepted(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}

function detectLanguage(block: Element): string {
  const cls = block.className || "";
  const langMatch = cls.match(/language-(\w+)/);
  if (langMatch) return langMatch[1];
  const pre = block.querySelector("pre[class*='language-']");
  if (pre) {
    const m = pre.className.match(/language-(\w+)/);
    if (m) return m[1];
  }
  return "unknown";
}

/**
 * Delegated listeners for docs_copy_code on Nextra copy-code controls (after GA consent).
 */
export default function DocsAnalyticsEvents() {
  const router = useRouter();

  useEffect(() => {
  const onClick = (ev: MouseEvent) => {
      if (!consentAccepted() || typeof window.gtag !== "function") return;
      const target = ev.target as HTMLElement | null;
      if (!target) return;
      const btn = target.closest("button");
      if (!btn) return;
      const title = btn.getAttribute("title") || btn.getAttribute("aria-label") || "";
      if (!/copy/i.test(title) && !btn.closest(".nextra-code")) return;
      const block = btn.closest("div.nextra-code, pre, .nextra-code-block") ?? btn.parentElement;
      const language = block ? detectLanguage(block) : "unknown";
      window.gtag("event", "docs_copy_code", {
        language,
        page: router.asPath,
        content_group: "docs",
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router.asPath]);

  return null;
}
