"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Icon } from "@iconify/react";
import { ServiceQuestion } from "../_data/types";

interface ServiceQuestionnaireModalProps {
  serviceTitle: string;
  serviceSlug: string;
  category?: string;
  questions?: ServiceQuestion[];
  themeColor?: string;
  /** Seconds before popping up automatically. Defaults to 10 seconds. */
  autoOpenDelaySeconds?: number;
}

const hexToRgba = (hex: string, alpha: number) => {
  try {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16) || 59;
    const g = parseInt(clean.substring(2, 4), 16) || 130;
    const b = parseInt(clean.substring(4, 6), 16) || 246;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    return `rgba(59, 130, 246, ${alpha})`;
  }
};

const inputBaseClass =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl text-sm sm:text-base font-inter-tight text-white placeholder:text-zinc-500 outline-none px-4 py-3 focus:border-white/40 focus:bg-white/[0.08] transition-all";
const labelClass = "text-xs sm:text-sm font-inter-tight text-zinc-300 font-medium";

export default function ServiceQuestionnaireModal({
  serviceTitle,
  serviceSlug,
  category = "Services",
  questions = [],
  themeColor = "#3B82F6",
  autoOpenDelaySeconds = 10,
}: ServiceQuestionnaireModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isFloatingDismissed, setIsFloatingDismissed] = useState(false);

  // CMS Questions state
  const [loadedQuestions, setLoadedQuestions] = useState<ServiceQuestion[]>(questions);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  // Questionnaire navigation state
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(3);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const activeQuestions = loadedQuestions.length > 0 ? loadedQuestions : [];
  const hasQuestions = activeQuestions.length > 0;
  // If questions exist: step 0 to activeQuestions.length - 1 are questions, activeQuestions.length is contact info
  // If no questions: single step (0) with standard contact fields
  const totalSteps = hasQuestions ? activeQuestions.length + 1 : 1;
  const progressPercent = useMemo(
    () => Math.min(100, Math.round(((currentStep + 1) / totalSteps) * 100)),
    [currentStep, totalSteps]
  );

  const storageKey = `service_modal_seen_${serviceSlug}`;

  // Fetch CMS Questions from Payload API if not provided via props or if prop was empty
  useEffect(() => {
    let isMounted = true;
    async function fetchQuestionsFromCMS() {
      if (questions && questions.length > 0) {
        setLoadedQuestions(questions);
        return;
      }

      setIsLoadingQuestions(true);
      const hosts = [
        process.env.NEXT_PUBLIC_PAYLOAD_URL,
        "http://localhost:3001",
        "https://cms.thirdvizion.com",
      ].filter(Boolean) as string[];

      for (const host of hosts) {
        try {
          let res = await fetch(
            `${host}/api/service-questions?limit=100&depth=2`
          ).catch(() => null);

          if (!res || !res.ok) {
            res = await fetch(
              `${host}/api/service-questionnaires?limit=100&depth=2`
            ).catch(() => null);
          }

          if (res && res.ok && isMounted) {
            const data = await res.json();
            if (data.docs && Array.isArray(data.docs)) {
              const currentSlug = serviceSlug.toLowerCase().trim();
              const currentTitle = serviceTitle.toLowerCase().trim();

              const match = data.docs.find((d: any) => {
                const candidates = [
                  d.service,
                  d.service_immersive,
                  d.service_data_cloud,
                  d.service_dev_software,
                  d.service?.slug,
                  d.serviceSlug,
                  d.title,
                ]
                  .filter(Boolean)
                  .map((s) => String(s).toLowerCase().trim());

                return (
                  candidates.includes(currentSlug) ||
                  candidates.includes(currentTitle) ||
                  candidates.some(
                    (c) =>
                      c.replace(/-/g, " ") === currentSlug.replace(/-/g, " ") ||
                      c.includes(currentSlug) ||
                      currentSlug.includes(c)
                  )
                );
              });

              if (
                match &&
                match.questions &&
                Array.isArray(match.questions) &&
                match.questions.length > 0
              ) {
                const mapped: ServiceQuestion[] = match.questions.map((q: any, idx: number) => ({
                  id: q.id ? String(q.id) : `q-${idx}`,
                  question: q.question || q.title || "",
                  subtitle: q.subtitle || q.description || "",
                  type: q.type || "radio",
                  options: (q.options || []).map((opt: any) => {
                    if (typeof opt === "string") return { label: opt, value: opt };
                    return {
                      label: opt.label || opt.title || opt.text || opt.value || "",
                      value: opt.value || opt.label || opt.title || opt.text || "",
                    };
                  }),
                  placeholder: q.placeholder || "",
                  required: Boolean(q.required),
                }));

                setLoadedQuestions(mapped);
                break;
              }
            }
          }
        } catch (err) {
          console.warn(`Could not fetch service questions from Payload CMS on ${host}:`, err);
        }
      }

      if (isMounted) {
        setIsLoadingQuestions(false);
      }
    }

    fetchQuestionsFromCMS();
    return () => {
      isMounted = false;
    };
  }, [serviceSlug, serviceTitle, questions]);

  const openModal = useCallback(() => {
    setIsRendered(true);
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(storageKey, "true");
    } catch {
      // Ignore sessionStorage exceptions
    }
  }, [storageKey]);

  // Auto-open modal after 10 seconds if not previously seen in sessionStorage
  useEffect(() => {
    if (!autoOpenDelaySeconds || autoOpenDelaySeconds <= 0) return;

    try {
      const seen = sessionStorage.getItem(storageKey);
      if (seen === "true") {
        return;
      }
    } catch {
      // Ignore
    }

    const timer = setTimeout(() => {
      openModal();
    }, autoOpenDelaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [autoOpenDelaySeconds, storageKey, openModal]);

  // Listen to manual triggers (e.g. from "Get a Quote" or "Inquire for this Service" buttons)
  useEffect(() => {
    const handleOpenEvent = () => {
      openModal();
    };
    window.addEventListener("open-service-modal", handleOpenEvent);
    window.addEventListener("open-service-questionnaire", handleOpenEvent);

    return () => {
      window.removeEventListener("open-service-modal", handleOpenEvent);
      window.removeEventListener("open-service-questionnaire", handleOpenEvent);
    };
  }, [openModal]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeModal]);

  // Clean up render when closed
  useEffect(() => {
    if (!isOpen && isRendered) {
      const t = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen, isRendered]);

  // Auto-focus active input on step transition
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [currentStep, isOpen]);

  // Auto-close countdown when submission is successful
  useEffect(() => {
    if (status === "success") {
      setCountdown(3);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            closeModal();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status, closeModal]);

  const handleSelectOption = (questionKey: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionKey]: value,
    }));
  };

  const handleNext = () => {
    if (hasQuestions && currentStep < activeQuestions.length) {
      const q = activeQuestions[currentStep];
      const qKey = q.id || `q_${currentStep}`;
      if (q.required && !answers[qKey]?.trim()) {
        setErrorMessage("Please answer this question to proceed.");
        return;
      }
    }
    setErrorMessage("");
    setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1));
  };

  const handleBack = () => {
    setErrorMessage("");
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.name.trim() || !contactInfo.email.trim()) {
      setErrorMessage("Please provide your name and a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    // Format questionnaire answers
    const formattedAnswers = hasQuestions
      ? activeQuestions
          .map((q, idx) => {
            const qKey = q.id || `q_${idx}`;
            const answer = answers[qKey] || "";
            return {
              question: q.question || `Question ${idx + 1}`,
              answer: answer || "Not specified",
            };
          })
          .filter((item) => item.answer && item.answer !== "Not specified")
      : [];

    try {
      const res = await fetch("/api/service-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: contactInfo.name.trim(),
          email: contactInfo.email.trim(),
          phone: contactInfo.phone.trim() || undefined,
          company: contactInfo.company.trim() || undefined,
          service: serviceSlug,
          serviceTitle: serviceTitle,
          category: category,
          answers: formattedAnswers,
          additionalNotes: contactInfo.message.trim() || undefined,
        }),
      });

      if (res.ok) {
        setStatus("success");
        try {
          sessionStorage.setItem(storageKey, "true");
        } catch {}
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Failed to submit. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("A network error occurred. Please try again.");
      setStatus("error");
    }
  };

  const currentQuestion = hasQuestions ? activeQuestions[currentStep] : null;
  const isLastStep = hasQuestions ? currentStep === activeQuestions.length : true;

  return (
    <>
      {/* ── Floating Quick Trigger (Bottom Right) ── */}
      {!isOpen && !isFloatingDismissed && (
        <aside
          aria-label="Service consultation trigger"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5 duration-500"
        >
          <button
            type="button"
            onClick={openModal}
            className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#0c0c0e]/90 text-white font-inter-tight text-sm sm:text-base font-medium shadow-[0_10px_30px_rgba(0,0,0,0.8)] border backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              borderColor: hexToRgba(themeColor, 0.4),
              boxShadow: `0 10px 30px ${hexToRgba(themeColor, 0.25)}`,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: themeColor }}
            />
            <span>
              Get Quote for <strong>{serviceTitle}</strong>
            </span>
            <Icon
              icon="lucide:sparkles"
              className="text-lg transition-transform group-hover:rotate-12"
              style={{ color: themeColor }}
            />
          </button>

          <button
            type="button"
            onClick={() => setIsFloatingDismissed(true)}
            aria-label="Dismiss quick trigger"
            className="p-2 rounded-full bg-[#121214]/80 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
          >
            <Icon icon="lucide:x" className="text-sm" />
          </button>
        </aside>
      )}

      {/* ── Modal Backdrop & Dialog ── */}
      {isRendered && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8 transition-all duration-300 ${
            isOpen
              ? "bg-black/80 backdrop-blur-md opacity-100"
              : "bg-black/0 backdrop-blur-none opacity-0 pointer-events-none"
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className={`relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#121214]/95 border border-white/15 rounded-2xl sm:rounded-[28px] shadow-2xl backdrop-blur-2xl overflow-hidden transition-all duration-300 transform ${
              isOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4 pointer-events-none"
            }`}
          >
            {/* Ambient Top Glow */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-4/5 h-36 blur-3xl pointer-events-none opacity-40 transition-all duration-500"
              style={{
                background: `radial-gradient(circle, ${themeColor} 0%, transparent 70%)`,
              }}
            />

            {/* Modal Header */}
            <div className="relative z-10 flex items-start justify-between px-6 pt-6 pb-4 sm:px-8 sm:pt-7 border-b border-white/[0.08]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs sm:text-sm font-outfit uppercase tracking-widest text-zinc-300 mb-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: themeColor }}
                  />
                  <span>
                    {hasQuestions ? "Service Questionnaire" : "Quick Service Inquiry"}
                  </span>
                </div>
                <h2
                  id="service-modal-title"
                  className="text-xl sm:text-2xl md:text-3xl font-anta text-white font-medium tracking-tight"
                >
                  Let&apos;s Build Your {serviceTitle}
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm font-inter-tight mt-1">
                  {hasQuestions
                    ? "Answer a few tailored questions to help us create the perfect proposal."
                    : "Tell us about your project requirements and our team will get in touch."}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close dialog"
                className="p-2 rounded-full text-zinc-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.15] border border-white/10 transition-all cursor-pointer shrink-0 ml-4 active:scale-95"
              >
                <Icon icon="lucide:x" className="text-xl" />
              </button>
            </div>

            {/* Progress Bar (if multi-step questions exist) */}
            {hasQuestions && status !== "success" && (
              <div className="relative z-10 w-full bg-white/[0.05] h-1.5 overflow-hidden">
                <div
                  className="h-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progressPercent}%`,
                    backgroundColor: themeColor,
                    boxShadow: `0 0 12px ${themeColor}`,
                  }}
                />
              </div>
            )}

            {/* Modal Body - Scrollable */}
            <div className="relative z-10 p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              {isLoadingQuestions ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-zinc-400">
                  <Icon icon="lucide:loader-2" className="text-3xl animate-spin text-white" />
                  <span className="text-sm font-inter-tight">Loading consultation options...</span>
                </div>
              ) : status === "success" ? (
                /* Success View with Auto-Close Countdown */
                <div className="py-8 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in-95">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: hexToRgba(themeColor, 0.2),
                      border: `1px solid ${themeColor}`,
                    }}
                  >
                    <Icon icon="lucide:check" className="text-3xl" style={{ color: themeColor }} />
                  </div>
                  <h3 className="text-2xl font-anta text-white">Inquiry Received!</h3>
                  <p className="text-zinc-300 font-inter-tight max-w-md text-sm sm:text-base leading-relaxed">
                    Thank you! Our {serviceTitle} specialists have received your requirements and will connect with you within 24 hours.
                  </p>
                  <p className="text-xs text-zinc-500 font-mono">
                    Closing automatically in {countdown}s...
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-2 px-6 py-2.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    Close Now
                  </button>
                </div>
              ) : hasQuestions && !isLastStep && currentQuestion ? (
                /* Dynamic Question Step */
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Step counter */}
                  <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-400 font-inter-tight">
                    <span>
                      Question {currentStep + 1} of {activeQuestions.length}
                    </span>
                    <span className="text-zinc-500 font-medium">{progressPercent}% Completed</span>
                  </div>

                  {/* Question Title & Subtitle */}
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-anta text-white font-medium leading-snug">
                      {currentQuestion.question}
                      {currentQuestion.required && (
                        <span className="text-red-400 ml-1 text-base">*</span>
                      )}
                    </h3>
                    {currentQuestion.subtitle && (
                      <p className="text-zinc-400 text-xs sm:text-sm font-inter-tight mt-1.5">
                        {currentQuestion.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Question Options or Input */}
                  {currentQuestion.type === "textarea" ? (
                    <textarea
                      ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                      rows={4}
                      value={answers[currentQuestion.id || `q_${currentStep}`] || ""}
                      onChange={(e) =>
                        handleSelectOption(currentQuestion.id || `q_${currentStep}`, e.target.value)
                      }
                      placeholder={currentQuestion.placeholder || "Enter your requirements..."}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-white text-base font-inter-tight placeholder:text-zinc-500 outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all resize-none"
                    />
                  ) : currentQuestion.type === "text" || !currentQuestion.options || currentQuestion.options.length === 0 ? (
                    <input
                      ref={inputRef as React.RefObject<HTMLInputElement>}
                      type="text"
                      value={answers[currentQuestion.id || `q_${currentStep}`] || ""}
                      onChange={(e) =>
                        handleSelectOption(currentQuestion.id || `q_${currentStep}`, e.target.value)
                      }
                      placeholder={currentQuestion.placeholder || "Type your response..."}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white text-base font-inter-tight placeholder:text-zinc-500 outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all"
                    />
                  ) : (
                    /* Radio / Card Options */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(currentQuestion.options || []).map((opt, optIdx) => {
                        const optLabel = typeof opt === "string" ? opt : opt.label;
                        const optValue =
                          typeof opt === "string" ? opt : opt.value || opt.label;
                        const isSelected =
                          answers[currentQuestion.id || `q_${currentStep}`] === optValue;

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() =>
                              handleSelectOption(
                                currentQuestion.id || `q_${currentStep}`,
                                optValue
                              )
                            }
                            className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-start justify-between gap-3 cursor-pointer group ${
                              isSelected
                                ? "bg-white/[0.12] border-white/40 shadow-md"
                                : "bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20"
                            }`}
                            style={
                              isSelected
                                ? {
                                    borderColor: hexToRgba(themeColor, 0.8),
                                    backgroundColor: hexToRgba(themeColor, 0.15),
                                  }
                                : {}
                            }
                          >
                            <span
                              className={`text-sm sm:text-base font-inter-tight font-medium ${
                                isSelected ? "text-white" : "text-zinc-300 group-hover:text-white"
                              }`}
                            >
                              {optLabel}
                            </span>
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                                isSelected
                                  ? "border-transparent text-white"
                                  : "border-zinc-600 group-hover:border-zinc-400"
                              }`}
                              style={isSelected ? { backgroundColor: themeColor } : {}}
                            >
                              {isSelected && <Icon icon="lucide:check" className="text-xs" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/50 text-red-200 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
                      <Icon icon="lucide:alert-circle" className="text-lg shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Step Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    {currentStep > 0 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-5 py-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors text-sm font-inter-tight flex items-center gap-1.5 cursor-pointer"
                      >
                        <Icon icon="lucide:arrow-left" className="text-base" />
                        <span>Back</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 rounded-full text-sm font-semibold font-inter-tight text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer ml-auto"
                      style={{
                        background: `linear-gradient(135deg, ${themeColor} 0%, ${hexToRgba(
                          themeColor,
                          0.7
                        )} 100%)`,
                      }}
                    >
                      <span>Continue</span>
                      <Icon icon="lucide:arrow-right" className="text-base" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact Info Form Step (Final Step or Standalone Inquiry) */
                <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-300">
                  {hasQuestions && (
                    <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-400 font-inter-tight">
                      <span>Final Step: Your Details</span>
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <Icon icon="lucide:check-circle" className="text-sm" />
                        Questions Complete
                      </span>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg sm:text-xl font-anta text-white font-medium">
                      Where should we send your customized proposal?
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm font-inter-tight mt-1">
                      Our engineering and solution architects will reach out with tailored recommendations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type="text"
                        required
                        value={contactInfo.name}
                        onChange={(e) =>
                          setContactInfo((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="e.g. Alex Smith"
                        className={inputBaseClass}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={contactInfo.email}
                        onChange={(e) =>
                          setContactInfo((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="alex@company.com"
                        className={inputBaseClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>Company Name</label>
                      <input
                        type="text"
                        value={contactInfo.company}
                        onChange={(e) =>
                          setContactInfo((prev) => ({ ...prev, company: e.target.value }))
                        }
                        placeholder="Company / Organization"
                        className={inputBaseClass}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) =>
                          setContactInfo((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        placeholder="+91 98765 43210"
                        className={inputBaseClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>
                      {hasQuestions ? "Additional Notes (Optional)" : "Project Details / Requirements"}
                    </label>
                    <textarea
                      rows={hasQuestions ? 2 : 3}
                      value={contactInfo.message}
                      onChange={(e) =>
                        setContactInfo((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder={
                        hasQuestions
                          ? "Any other specific requirements or timelines..."
                          : "Briefly describe what you'd like to build..."
                      }
                      className={`w-full resize-none ${inputBaseClass}`}
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/50 text-red-200 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
                      <Icon icon="lucide:alert-circle" className="text-lg shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    {hasQuestions && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-5 py-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors text-sm font-inter-tight flex items-center gap-1.5 cursor-pointer"
                      >
                        <Icon icon="lucide:arrow-left" className="text-base" />
                        <span>Review Questions</span>
                      </button>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="px-7 py-3.5 rounded-full text-sm font-semibold font-inter-tight text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg disabled:opacity-60 cursor-pointer ml-auto"
                      style={{
                        background: `linear-gradient(135deg, ${themeColor} 0%, ${hexToRgba(
                          themeColor,
                          0.8
                        )} 100%)`,
                      }}
                    >
                      {status === "submitting" ? (
                        <>
                          <Icon icon="lucide:loader-2" className="animate-spin text-base" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Icon icon="lucide:send" className="text-base" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
