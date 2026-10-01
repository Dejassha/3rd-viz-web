"use client";

import React, { useState } from "react";
import { servicesData } from "@/src/data/layoutData";
import { Icon } from "@iconify/react";

const inputBaseClass =
  "bg-transparent border-b border-tertiary text-lg sm:text-xl font-inter-tight text-white placeholder:text-zinc-600 outline-none py-2 focus:border-white transition-colors";
const labelClass = "text-base sm:text-lg font-inter-tight text-tertiary";

export default function ContactForm() {
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
    if (!formData.firstName || !formData.email) {
      setErrorMessage("Please fill in your name and email address.");
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
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Failed to submit. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#050505]/75 backdrop-blur-xl border border-white/10 rounded-[20px] p-6 sm:p-10 w-full max-w-2xl shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Row */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
            <label htmlFor="firstName" className={labelClass}>
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className={inputBaseClass}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, "");
              }}
            />
          </div>

          <div className="w-full sm:w-1/2 flex flex-col gap-1.5">
            <label htmlFor="lastName" className={labelClass}>
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className={inputBaseClass}
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, "");
              }}
            />
          </div>
        </div>

        {/* Service Dropdown */}
        <div className="flex flex-col gap-1.5 relative">
          <label htmlFor="service" className={labelClass}>
            Service
          </label>
          <div className="relative w-full">
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full appearance-none cursor-pointer pr-10 ${inputBaseClass} ${
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

            {/* Custom dropdown chevron */}
            <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
              <Icon icon="lucide:chevron-down" className="text-xl" />
            </div>
          </div>
        </div>

        {/* Company Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="companyName" className={labelClass}>
            Company Name
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Your Company or Organization"
            className={inputBaseClass}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClass}>
            E-Mail <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className={inputBaseClass}
          />
        </div>

        {/* Description / Message */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className={labelClass}>
            Description / Requirements
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about your project or goals..."
            className={`w-full resize-none ${inputBaseClass}`}
          />
        </div>

        {/* Error Notification */}
        {status === "error" && (
          <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/50 text-red-200 text-sm flex items-center gap-2">
            <Icon icon="lucide:alert-circle" className="text-lg shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Notification */}
        {status === "success" && (
          <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/50 text-emerald-200 text-sm flex items-center gap-2">
            <Icon icon="lucide:check-circle-2" className="text-lg shrink-0" />
            <span>Thank you! Your message has been sent successfully. We&apos;ll be in touch soon.</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full max-w-md bg-white text-black py-3.5 px-6 text-lg sm:text-xl font-medium rounded-full font-inter-tight hover:bg-white/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 cursor-pointer"
          >
            {status === "submitting" ? (
              <>
                <Icon icon="lucide:loader-2" className="animate-spin text-xl" />
                <span>Sending Message...</span>
              </>
            ) : status === "success" ? (
              <>
                <Icon icon="lucide:check" className="text-xl text-emerald-600" />
                <span>Message Sent!</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Icon icon="lucide:arrow-right" className="text-xl" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
