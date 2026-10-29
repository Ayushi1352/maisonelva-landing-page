"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

export type SubmitStatus = "idle" | "sending" | "success" | "leaving";

type Options = {
  /** simulated network delay before the form counts as sent */
  sendDelay?: number;
  /** how long the thank-you message stays visible before it hides itself */
  visibleFor?: number;
  /** length of the fade-out animation (keep in sync with the fade-out in FormSuccess) */
  fadeFor?: number;
};

/**
 * Dummy form submission: shows a sending state, resets the form, then shows a
 * thank-you message that always hides itself after `visibleFor` ms.
 */
export function useDummySubmit({ sendDelay = 1200, visibleFor = 5000, fadeFor = 400 }: Options = {}) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [name, setName] = useState("");
  // incremented on every successful send so callers can remount (fully reset) the form
  const [round, setRound] = useState(0);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  const hide = useCallback(() => {
    clearTimers();
    setStatus("leaving");
    later(() => setStatus("idle"), fadeFor);
  }, [clearTimers, later, fadeFor]);

  // stop pending timers if the visitor leaves the page
  useEffect(() => clearTimers, [clearTimers]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    const firstName = String(data.get("name") ?? "").trim().split(/\s+/)[0] ?? "";
    clearTimers();
    setStatus("sending");
    later(() => {
      setName(firstName);
      setRound((count) => count + 1);
      setStatus("success");
      later(hide, visibleFor);
    }, sendDelay);
  };

  /** hide the message as soon as the visitor starts filling the form again */
  const onInput = () => {
    if (status === "success") hide();
  };

  /** close button */
  const dismiss = () => {
    if (status === "success") hide();
  };

  return {
    status,
    name,
    round,
    sending: status === "sending",
    showMessage: status === "success" || status === "leaving",
    visibleFor,
    onSubmit,
    onInput,
    dismiss,
  };
}
