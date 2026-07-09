"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, User, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import { isValidEmail, isValidPhone } from "@/lib/security";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  artworkId: string;
  artworkTitle: string;
  artistName: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  artworkId,
  artworkTitle,
  artistName,
}: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize message with reference
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: `Dear Aryan Art Gallery,\n\nI am interested in acquiring "${artworkTitle}" by ${artistName} (Ref: ${artworkId}). Please provide details regarding price, condition report, and shipping options.\n\nBest regards,`,
      });
      setFormErrors({});
      setSubmitSuccess(false);
      setErrorMessage("");
    }
  }, [isOpen, artworkId, artworkTitle, artistName]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!isValidPhone(formData.phone.trim())) {
      errors.phone = "Please enter a valid phone number (e.g. +1 123 456 7890).";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artworkId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitSuccess(true);
      } else {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Enquiry submission failed:", err);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg overflow-hidden rounded-xl bg-card border border-border shadow-2xl z-10 text-left flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-muted/20 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold font-serif tracking-luxury text-primary">
                  Artwork Inquiry
                </h3>
                <p className="text-xs text-muted-foreground">
                  Ref: {artworkTitle} by {artistName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <CheckCircle2 className="h-16 w-16 text-primary mb-4 animate-bounce" />
                  <h4 className="text-xl font-serif text-foreground font-semibold mb-2">
                    Inquiry Submitted
                  </h4>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Thank you for your inquiry about <strong>{artworkTitle}</strong>. A gallery
                    representative will review your request and contact you within 24 hours.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/95 transition-all text-sm rounded cursor-pointer uppercase tracking-wider font-semibold"
                  >
                    Close Window
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded text-xs font-semibold">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-background border rounded px-3 py-2 pl-10 text-sm outline-none transition-all ${
                          formErrors.name ? "border-red-500 ring-1 ring-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary"
                        }`}
                      />
                    </div>
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-0.5">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="johndoe@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-background border rounded px-3 py-2 pl-10 text-sm outline-none transition-all ${
                          formErrors.email ? "border-red-500 ring-1 ring-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary"
                        }`}
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-0.5">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="+1 (123) 456-7890"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full bg-background border rounded px-3 py-2 pl-10 text-sm outline-none transition-all ${
                          formErrors.phone ? "border-red-500 ring-1 ring-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary"
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-0.5">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Message / Request Details
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60" />
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="State your enquiry details..."
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full bg-background border rounded px-3 py-2 pl-10 text-sm outline-none transition-all resize-none ${
                          formErrors.message ? "border-red-500 ring-1 ring-red-500" : "border-border focus:border-primary focus:ring-1 focus:ring-primary"
                        }`}
                      />
                    </div>
                    {formErrors.message && (
                      <p className="text-red-500 text-xs mt-0.5">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/95 transition-all text-sm rounded py-3 uppercase tracking-wider font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Submitting Inquiry...
                      </>
                    ) : (
                      "Send Inquiry"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
