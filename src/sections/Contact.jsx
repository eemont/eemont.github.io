import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaDiscord, FaEnvelope } from "react-icons/fa";
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { socials } from "../data/socials";
import FadeIn from "../components/FadeIn";

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const COOLDOWN_SECONDS = 30;
const LS_KEY = "contact_last_submit";

function secondsRemaining() {
  const last = parseInt(localStorage.getItem(LS_KEY) || "0", 10);
  return Math.max(0, COOLDOWN_SECONDS - Math.floor((Date.now() - last) / 1000));
}

export default function Contact() {
  const [formOpen, setFormOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [cooldown, setCooldown] = useState(0);
  const formRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (formOpen) setCooldown(secondsRemaining());
  }, [formOpen]);

  useEffect(() => {
    if (cooldown <= 0) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setCooldown((s) => {
        if (s <= 1) { clearInterval(timerRef.current); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [cooldown]);

  function closeModal() {
    setFormOpen(false);
    setStatus("idle");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (cooldown > 0) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      localStorage.setItem(LS_KEY, Date.now().toString());
      setCooldown(COOLDOWN_SECONDS);
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  }

  const isBlocked = cooldown > 0 || status === "sending";

  return (
    <section id="contact" className="mx-auto max-w-5xl px-4 py-16">
      <FadeIn>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20">
          <h2 className="section-title">Contact</h2>
          <p className="mt-4 text-zinc-300">
            Reach out — I'd love to connect and collaborate on interesting projects!
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setFormOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/30"
            >
              <FaEnvelope className="text-base" />
              Email me
            </button>

            <a
              className="flex items-center gap-2 rounded-xl border border-[#0A66C2]/60 bg-[#0A66C2]/10 px-4 py-2 text-sm font-semibold text-[#5eaeff] transition-all duration-200 hover:border-[#0A66C2] hover:bg-[#0A66C2]/20 hover:-translate-y-0.5"
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="text-[#0A66C2] text-base" />
              LinkedIn
            </a>

            <a
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5"
              href={socials.github}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="text-white text-base" />
              GitHub
            </a>

            {/* <a
              className="flex items-center gap-2 rounded-xl border border-[#5865F2]/60 bg-[#5865F2]/10 px-4 py-2 text-sm font-semibold text-[#a5b4fc] transition-all duration-200 hover:border-[#5865F2] hover:bg-[#5865F2]/20 hover:-translate-y-0.5"
              href={socials.discord}
              target="_blank"
              rel="noreferrer"
            >
              <FaDiscord className="text-[#5865F2] text-base" />
              Discord
            </a> */}
          </div>
        </div>
      </FadeIn>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={closeModal}
          />
          <div className="relative z-10 w-full max-w-lg">
            <button
              onClick={closeModal}
              className="absolute -top-3 -right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative overflow-hidden rounded-2xl bg-ink-950 border border-white/10 p-8">
              <h3 className="text-brand-400 font-semibold text-sm uppercase tracking-widest">Contact</h3>
              <p className="font-display text-white text-3xl font-bold uppercase mt-1">Get in touch</p>
              <p className="text-gray-400 text-sm mt-1 mb-6">
                Fill out the form and I'll get back to you soon.
              </p>

              {status === "success" ? (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                  <p className="text-white font-semibold">Message sent!</p>
                  <p className="text-zinc-400 text-sm">I'll get back to you as soon as possible.</p>
                  <button
                    onClick={closeModal}
                    className="mt-2 px-5 py-2 text-sm font-semibold text-white bg-brand-500 hover:bg-brand-400 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="title" value="Portfolio Contact Form" />
                  <div>
                    <label className="text-sm font-medium text-zinc-300">Full name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full mt-1.5 px-3 py-2 text-zinc-200 bg-white/5 border border-white/10 outline-none focus:border-brand-500 rounded-lg text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-zinc-300">Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full mt-1.5 px-3 py-2 text-zinc-200 bg-white/5 border border-white/10 outline-none focus:border-brand-500 rounded-lg text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-zinc-300">
                      Phone <span className="text-zinc-500 font-normal">(optional)</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      className="w-full mt-1.5 px-3 py-2 text-zinc-200 bg-white/5 border border-white/10 outline-none focus:border-brand-500 rounded-lg text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-zinc-300">
                      Service <span className="text-zinc-500 font-normal">(optional)</span>
                    </label>
                    <select
                      name="service"
                      defaultValue=""
                      className="w-full mt-1.5 px-3 py-2 text-zinc-200 bg-zinc-800 border border-white/10 outline-none focus:border-brand-500 rounded-lg text-sm transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-zinc-500">Select a service…</option>
                      <optgroup label="One-time projects">
                        <option value="VoIP / PBX System Setup">VoIP / PBX System Setup</option>
                        <option value="Network & Office IT Setup">Network &amp; Office IT Setup</option>
                        <option value="Website / Landing Page">Website / Landing Page</option>
                        <option value="Logo Design">Logo Design</option>
                        <option value="Internal Tool Development">Internal Tool Development</option>
                      </optgroup>
                      <optgroup label="Monthly retainers">
                        <option value="Managed IT Support">Managed IT Support</option>
                        <option value="VoIP System Maintenance">VoIP System Maintenance</option>
                        <option value="Website Care Plan">Website Care Plan</option>
                        <option value="Remote IT Helpdesk">Remote IT Helpdesk</option>
                      </optgroup>
                      <option value="General inquiry / not sure yet">General inquiry / not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-zinc-300">Message</label>
                    <textarea
                      name="message"
                      required
                      className="w-full mt-1.5 h-28 px-3 py-2 resize-none text-zinc-200 bg-white/5 border border-white/10 outline-none focus:border-brand-500 rounded-lg text-sm transition-colors"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    disabled={isBlocked}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-brand-500 hover:bg-brand-400 active:bg-brand-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
                    {status === "sending"
                      ? "Sending…"
                      : cooldown > 0
                      ? `Wait ${cooldown}s before resending`
                      : "Send message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
