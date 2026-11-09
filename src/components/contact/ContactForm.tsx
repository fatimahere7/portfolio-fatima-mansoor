import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Headphones, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

type FormStatus = 'default' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  industry: string;
  subject: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    industry: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>('default');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') {
      setStatus('default');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your name or organization.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please provide a valid return email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.length < 5) {
      setStatus('error');
      setErrorMessage('Please enter a message with at least 5 characters.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          industry: '',
          subject: '',
          message: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(data?.message || 'Failed to deliver message. Please try again or reach out directly.');
      }
    } catch (err: any) {
      console.error('[Contact Submit Error]:', err);
      setStatus('error');
      setErrorMessage('Network error occurred. Please check your connection or reach out directly via email.');
    }
  };

  const handleReset = () => {
    setStatus('default');
    setErrorMessage('');
  };

  return (
    <div className="rounded-[2rem] bg-[#FFFFFF] p-7 sm:p-9 shadow-xl shadow-black/[0.04] border border-[#858585]/15 w-full relative">
      {/* Card Header: Contact me */}
      <div className="flex items-center gap-3 mb-6">
        <Headphones className="w-5 h-5 text-[#222222]" />
        <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#222222] tracking-tight flex items-center gap-2">
          <span>Contact me.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D94B4B] inline-block shrink-0" aria-hidden="true" />
        </h3>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="py-12 text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#F5F5F5] border border-[#858585]/30 flex items-center justify-center mx-auto text-[#222222]">
              <CheckCircle2 className="w-6 h-6 text-[#222222]" />
            </div>

            <div className="space-y-1">
              <div className="text-sm text-[#222222] font-bold uppercase tracking-wider">
                Message Sent Successfully
              </div>
              <p className="text-xs text-[#858585] max-w-xs mx-auto leading-relaxed">
                Thank you for reaching out. I have received your message and will respond within 24 hours.
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#222222] hover:bg-[#111111] text-white transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
            noValidate
          >
            {/* NAME FIELD */}
            <div>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                disabled={status === 'loading'}
                placeholder="Jane Smith"
                className="w-full bg-transparent border-b border-[#858585]/25 focus:border-[#222222] py-2.5 text-sm text-[#222222] placeholder:text-[#858585]/60 outline-none transition-colors"
                required
              />
            </div>

            {/* EMAIL FIELD */}
            <div>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={status === 'loading'}
                placeholder="jane@framer.com"
                className="w-full bg-transparent border-b border-[#858585]/25 focus:border-[#222222] py-2.5 text-sm text-[#222222] placeholder:text-[#858585]/60 outline-none transition-colors"
                required
              />
            </div>

            {/* INDUSTRY FIELD */}
            <div>
              <input
                id="contact-industry"
                name="industry"
                type="text"
                value={formData.industry}
                onChange={handleChange}
                disabled={status === 'loading'}
                placeholder="Type Industry (e.g. Blockchain / Fintech)"
                className="w-full bg-transparent border-b border-[#858585]/25 focus:border-[#222222] py-2.5 text-sm text-[#222222] placeholder:text-[#858585]/60 outline-none transition-colors"
              />
            </div>

            {/* SUBJECT FIELD */}
            <div>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                disabled={status === 'loading'}
                placeholder="Type Subject"
                className="w-full bg-transparent border-b border-[#858585]/25 focus:border-[#222222] py-2.5 text-sm text-[#222222] placeholder:text-[#858585]/60 outline-none transition-colors"
              />
            </div>

            {/* MESSAGE FIELD */}
            <div>
              <textarea
                id="contact-message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'loading'}
                placeholder="Type Your Message..."
                className="w-full bg-transparent border-b border-[#858585]/25 focus:border-[#222222] py-2.5 text-sm text-[#222222] placeholder:text-[#858585]/60 outline-none resize-none transition-colors"
                required
              />
            </div>

            {/* Error Notification with Red Accent #E84343 */}
            {status === 'error' && (
              <div className="p-3 bg-[#F5F5F5] border border-[#E84343] rounded-lg flex items-center gap-2 text-xs text-[#E84343]">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#E84343]" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* SUBMIT CAPSULE BUTTON matching reference */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 px-6 rounded-full bg-[#222222] hover:bg-[#111111] text-[#FFFFFF] font-sans font-semibold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
