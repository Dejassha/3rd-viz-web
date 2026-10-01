"use client";

import React, { useState, useEffect, useCallback } from "react";
import { servicesData } from "@/src/data/layoutData";
import { Icon } from "@iconify/react";

interface TimedContactModalProps {
  /** Time delay in seconds before the modal pops up automatically. Default is 10 seconds. */
  delaySeconds?: number;
}

const inputBaseClass =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl text-sm sm:text-base font-inter-tight text-white placeholder:text-zinc-500 outline-none px-4 py-2.5 sm:py-3 focus:border-white/40 focus:bg-white/[0.08] transition-all";
const labelClass = "text-xs sm:text-sm font-inter-tight text-zinc-300 font-medium";

export default function TimedContactModal({ delaySeconds = 10 }: TimedContactModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    service: "",
    companyName: "",
    email: "",
    description: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [isFloatingDismissed, setIsFloatingDismissed] = useState(false);

  const openModal = useCallback(() => {
    setIsRendered(true);
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Timer trigger logic
  useEffect(() => {
    const timer = setTimeout(() => {
      openModal();
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds, openModal]);

  // Handle ESC key to dismiss
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

  // Clean up DOM after exit animation
  useEffect(() => {
    if (!isOpen && isRendered) {
      const timeout = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, isRendered]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.email.trim()) {
      setErrorMessage("Please provide your name and a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          service: "",
          companyName: "",
          email: "",
          description: "",
        });
        // Auto-close after successful submit
        setTimeout(() => {
          closeModal();
        }, 3500);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Failed to submit. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("An unexpected network error occurred. Please try again.");
      setStatus("error");
    }
  };

  return (
    <>
      {/* Floating quick trigger button on homepage */}
      {!isOpen && !isFloatingDismissed && (
        <aside
          aria-label="Contact quick trigger"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5 duration-500"
        >
          <button
            type="button"
            onClick={openModal}
            className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#0c0c0e]/90 text-white font-inter-tight text-sm sm:text-base font-medium shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.08)] border border-white/20 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Let&apos;s Build Your Project</span>
            <Icon
              icon="lucide:message-square-plus"
              className="text-lg text-emerald-400 transition-transform group-hover:rotate-12"
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

      {/* Modal Overlay & Container */}
      {isRendered && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="timed-modal-title"
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 transition-all duration-300 ${
            isOpen
              ? "bg-black/80 backdrop-blur-md opacity-100"
              : "bg-black/0 backdrop-blur-none opacity-0 pointer-events-none"
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          {/* Modal Container */}
          <div
            className={`relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0b0b0d]/95 border border-white/15 rounded-2xl sm:rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.05)] backdrop-blur-2xl overflow-hidden transition-all duration-300 transform ${
              isOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4 pointer-events-none"
            }`}
          >
            {/* Decorative Top Ambient Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-gradient-to-r from-blue-600/30 via-violet-600/30 to-purple-600/20 blur-3xl pointer-events-none" />

            {/* Close Button (Top-Right of Modal) */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close dialog"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 p-2 sm:p-2.5 rounded-full text-zinc-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.15] border border-white/10 transition-all cursor-pointer active:scale-95 shadow-lg backdrop-blur-sm"
            >
              <Icon icon="lucide:x" className="text-lg sm:text-xl" />
            </button>

            {/* Modal Body - 2 Columns in the Same Container */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto max-h-[92vh]">
              
              {/* ── LEFT COLUMN ── */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 text-xs sm:text-sm font-outfit uppercase tracking-widest text-zinc-300 mb-4 sm:mb-6">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Get in touch</span>
                  </div>

                  <h2
                    id="timed-modal-title"
                    className="text-2xl sm:text-3xl lg:text-[38px] font-anta text-white font-medium leading-[1.18] tracking-tight"
                  >
                    How can we help?
                    <br />
                    <span className="text-white">Let&apos;s work together.</span>
                  </h2>

                  <p className="text-zinc-400 text-sm sm:text-base font-inter-tight leading-relaxed mt-4 sm:mt-5">
                    Working together takes some practice to get in sync, but once we find our rhythm, the result can be magical!
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-400 font-inter-tight">
                    <Icon icon="lucide:mail" className="text-base text-[#3EA9C1]" />
                    <a
                      href="mailto:business@thirdvizion.com"
                      className="text-zinc-300 hover:text-white transition-colors"
                    >
                      business@thirdvizion.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-400 font-inter-tight">
                    <Icon icon="lucide:clock" className="text-base text-emerald-400" />
                    <span>Fast Response within 24 Hours</span>
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN: CONTACT FORM ── */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-firstName" className={labelClass}>
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="modal-firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="e.g. Alex"
                        className={inputBaseClass}
                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                          e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, "");
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-lastName" className={labelClass}>
                        Last Name
                      </label>
                      <input
                        id="modal-lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="e.g. Smith"
                        className={inputBaseClass}
                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                          e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, "");
                        }}
                      />
                    </div>
                  </div>

                  {/* Email and Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-email" className={labelClass}>
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="modal-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        className={inputBaseClass}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-companyName" className={labelClass}>
                        Company Name
                      </label>
                      <input
                        id="modal-companyName"
                        name="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Company / Organization"
                        className={inputBaseClass}
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="modal-service" className={labelClass}>
                      Interested Service
                    </label>
                    <div className="relative w-full">
                      <select
                        id="modal-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`appearance-none cursor-pointer pr-10 ${inputBaseClass} ${
                          !formData.service ? "!text-zinc-500" : "!text-white"
                        }`}
                      >
                        <option value="" disabled className="bg-[#141414] text-zinc-500">
                          Select a Service
                        </option>
                        {servicesData.map((category) => (
                          <optgroup
                            key={category.category}
                            label={category.category}
                            className="bg-[#1a1a1a] text-zinc-400 font-semibold py-1"
                          >
                            {category.items.map((item) => (
                              <option
                                key={item.title}
                                value={item.title}
                                className="bg-[#141414] text-white py-1 font-normal"
                              >
                                {item.title}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                        <option value="Other / General Inquiry" className="bg-[#141414] text-white">
                          Other / General Inquiry
                        </option>
                      </select>

                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                        <Icon icon="lucide:chevron-down" className="text-xl" />
                      </div>
                    </div>
                  </div>

                  {/* Message / Requirements */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="modal-description" className={labelClass}>
                      Project Details / Message
                    </label>
                    <textarea
                      id="modal-description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Briefly describe what you'd like to build or achieve..."
                      className={`w-full resize-none ${inputBaseClass}`}
                    />
                  </div>

                  {/* Error Notification */}
                  {status === "error" && (
                    <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/50 text-red-200 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in">
                      <Icon icon="lucide:alert-circle" className="text-xl shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Success Notification */}
                  {status === "success" && (
                    <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-200 text-sm flex items-center gap-3 animate-in fade-in">
                      <Icon icon="lucide:check-circle-2" className="text-2xl shrink-0 text-emerald-400" />
                      <div>
                        <p className="font-semibold text-emerald-300">Message sent successfully!</p>
                        <p className="text-xs text-emerald-200/80 mt-0.5">
                          Thank you for reaching out. We will connect with you shortly.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors text-sm font-medium font-inter-tight cursor-pointer"
                    >
                      Maybe later
                    </button>

                    <button
                      type="submit"
                      disabled={status === "submitting" || status === "success"}
                      className="w-full sm:w-auto min-w-[170px] bg-white text-black py-3 px-6 text-sm sm:text-base font-semibold rounded-full font-inter-tight hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 cursor-pointer"
                    >
                      {status === "submitting" ? (
                        <>
                          <Icon icon="lucide:loader-2" className="animate-spin text-lg" />
                          <span>Sending...</span>
                        </>
                      ) : status === "success" ? (
                        <>
                          <Icon icon="lucide:check" className="text-lg text-emerald-600" />
                          <span>Sent!</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Icon icon="lucide:arrow-right" className="text-lg" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
