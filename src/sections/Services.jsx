import { useState, Fragment } from "react";
import {
  FaChevronRight,
  FaPhone,
  FaSitemap,
  FaGlobe,
  FaPaintBrush,
  FaCode,
  FaShieldAlt,
  FaWrench,
  FaSync,
  FaHeadset,
} from "react-icons/fa";
import FadeIn from "../components/FadeIn";
import ServiceModal from "../components/ServiceModal";

const ONE_TIME_BADGE = "border-sky-500/20 bg-sky-500/10 text-sky-300";
const MONTHLY_BADGE  = "border-violet-500/20 bg-violet-500/10 text-violet-300";

const oneTime = [
  {
    icon: FaPhone,
    title: "VoIP / PBX System Setup",
    desc: "Full FreePBX/Asterisk deployment for your office — no monthly per-seat fees.",
    rate: "$500 – $1,500 / project",
    badge: "One-time",
    badgeClass: ONE_TIME_BADGE,
    details:
      "Full deployment of a FreePBX/Asterisk phone system for your office. I handle everything from server setup to phone provisioning, so you end up with a professional phone system that just works — without the monthly per-seat fees of hosted VoIP.",
    includes: [
      "Server provisioning and FreePBX installation",
      "Extension setup for all staff",
      "IVR / auto-attendant menus",
      "Business hours and holiday call routing",
      "Voicemail to email",
      "SIP trunk configuration",
      "Basic staff training and documentation",
    ],
    timeline: "1–2 weeks",
    goodFor:
      "Businesses moving away from traditional phone lines or a hosted VoIP service they're overpaying for.",
  },
  {
    icon: FaSitemap,
    title: "Network & Office IT Setup",
    desc: "Routers, switches, Wi-Fi, and workstation setup — done right from day one.",
    rate: "$300 – $800 / project",
    badge: "One-time",
    badgeClass: ONE_TIME_BADGE,
    details:
      "Full network buildout for a new office or a refresh of aging equipment. Includes hardware selection advice, structured cabling guidance, and configuration of every device on the network.",
    includes: [
      "Router and firewall configuration",
      "Managed switch setup and VLAN segmentation",
      "Wi-Fi access point deployment and coverage planning",
      "Workstation imaging and software setup",
      "Network-attached storage (NAS) configuration",
      "Basic security hardening",
    ],
    timeline: "1–5 days on-site depending on scope",
    goodFor:
      "Businesses opening a new location, moving offices, or dealing with a slow or unreliable network.",
  },
  {
    icon: FaGlobe,
    title: "Website / Landing Page",
    desc: "Clean, fast business sites in React or WordPress — hosting and domain included.",
    rate: "$500 – $2,000 / project",
    badge: "One-time",
    badgeClass: ONE_TIME_BADGE,
    details:
      "A clean, fast business website designed to represent your brand and convert visitors. Built in React for performance or WordPress if you need to manage content yourself — whichever fits how you actually work.",
    includes: [
      "Custom design matched to your brand",
      "Mobile-responsive layout",
      "Contact form with email delivery",
      "Domain and hosting setup",
      "Basic SEO configuration",
      "Google Analytics integration",
      "30 days of post-launch support",
    ],
    timeline: "1–3 weeks",
    goodFor:
      "Businesses with no online presence, or an outdated site that no longer reflects what they do.",
  },
  {
    icon: FaPaintBrush,
    title: "Logo Design",
    desc: "Custom logo and brand mark delivered in every format you'll need — print, web, and social.",
    rate: "$150 – $500 / project",
    badge: "One-time",
    badgeClass: ONE_TIME_BADGE,
    details:
      "A custom logo designed around your business name, industry, and personality. You'll get a mark that looks sharp at any size — from a business card to a billboard — delivered in formats ready for print, web, and social media.",
    includes: [
      "Discovery questionnaire to capture your brand direction",
      "2–3 initial logo concepts",
      "Up to 2 rounds of revisions",
      "Full color, reversed, and monochrome variants",
      "Final delivery in SVG, PNG, and PDF",
      "Font and color palette documentation",
    ],
    timeline: "1–2 weeks",
    goodFor:
      "New businesses that need a professional identity, or established ones with a logo that no longer fits where they're headed.",
  },
  {
    icon: FaCode,
    title: "Internal Tool Development",
    desc: "Custom dashboards, automations, and apps built around how your business actually works.",
    rate: "$1,500 – $5,000 / project",
    badge: "One-time",
    badgeClass: ONE_TIME_BADGE,
    details:
      "A custom web app, dashboard, or automation built specifically around how your business operates — not a generic SaaS tool you have to work around. Scoped clearly upfront so there are no surprise costs.",
    includes: [
      "Requirements gathering and scoping session",
      "Full-stack web app development",
      "User authentication and role management",
      "Database design and setup",
      "Admin panel or reporting views",
      "Deployment and full documentation",
      "60 days of bug-fix support",
    ],
    timeline: "2–8 weeks depending on scope",
    goodFor:
      "Teams managing data in spreadsheets, using clunky off-the-shelf tools, or with a workflow that could be automated.",
  },
];

const recurring = [
  {
    icon: FaShieldAlt,
    title: "Managed IT Support",
    desc: "Dedicated IT contact who knows your setup — fast response, no starting from scratch.",
    rate: "$300 – $800 / mo",
    badge: "Monthly",
    badgeClass: MONTHLY_BADGE,
    details:
      "A dedicated IT contact who knows your setup. Instead of calling a helpdesk and explaining everything from scratch each time, you get someone who understands your systems and can respond quickly when something goes wrong.",
    includes: [
      "Unlimited remote support tickets",
      "Monthly system health checks",
      "Software and OS update management",
      "User account and device management",
      "Security monitoring",
      "Priority response time",
    ],
    billing: "Billed monthly, cancel anytime with 30 days notice.",
    goodFor:
      "Small businesses with 2–20 employees who need reliable IT support without hiring a full-time person.",
  },
  {
    icon: FaWrench,
    title: "VoIP System Maintenance",
    desc: "Ongoing PBX management — routing changes, updates, and support when you need it.",
    rate: "$100 – $300 / mo",
    badge: "Monthly",
    badgeClass: MONTHLY_BADGE,
    details:
      "Ongoing management of your FreePBX/Asterisk system so it stays up to date, secure, and tuned to how your business changes over time.",
    includes: [
      "Extension and call routing changes",
      "System updates and security patches",
      "Voicemail and IVR adjustments",
      "New user onboarding",
      "Uptime monitoring",
      "Priority support for outages",
    ],
    billing: "Billed monthly, cancel anytime.",
    goodFor:
      "Businesses running a self-hosted VoIP system that want it maintained by someone who already knows it.",
  },
  {
    icon: FaSync,
    title: "Website Care Plan",
    desc: "Hosting, backups, security updates, and content changes — your site, handled.",
    rate: "$50 – $200 / mo",
    badge: "Monthly",
    badgeClass: MONTHLY_BADGE,
    details:
      "Your website, handled. I keep it updated, monitored, and backed up so you can focus on your business and not worry about whether the site is still up.",
    includes: [
      "Managed hosting",
      "Daily backups",
      "Security updates and plugin management",
      "Up to 2 hours of content changes per month",
      "Uptime monitoring with alerts",
      "Monthly performance report",
    ],
    billing: "Billed monthly, cancel anytime.",
    goodFor:
      "Businesses that had a website built but don't want to deal with the ongoing maintenance themselves.",
  },
  {
    icon: FaHeadset,
    title: "Remote IT Helpdesk",
    desc: "Remote tech support for your team — someone who can actually remote in and fix it.",
    rate: "$200 – $500 / mo",
    badge: "Monthly",
    badgeClass: MONTHLY_BADGE,
    details:
      "Remote technical support for your team's day-to-day tech issues. A step up from 'turn it off and on again' — someone who can actually remote in and fix the problem.",
    includes: [
      "Software installation and troubleshooting",
      "Email and account setup",
      "VPN and remote access issues",
      "Printer and peripheral issues",
      "Microsoft 365 / Google Workspace configuration",
      "Response within 4 business hours",
    ],
    billing: "Billed monthly, cancel anytime.",
    goodFor:
      "Small teams who run into tech issues regularly and need someone to call who can actually fix it remotely.",
  },
];

const steps = [
  {
    num: "01",
    title: "Free Consultation",
    desc: "We talk through what you need, what's not working, and what the right solution looks like.",
  },
  {
    num: "02",
    title: "Clear Proposal",
    desc: "You get a written scope, timeline, and flat price — no surprise invoices.",
  },
  {
    num: "03",
    title: "Done & Documented",
    desc: "Work is delivered with documentation so you're never left in the dark after the job is done.",
  },
];

function ServiceCard({ service, onClick }) {
  const Icon = service.icon;
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-start overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:-translate-y-0.5 w-full"
    >
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-500/80 to-violet-500/80" />
      <div className="flex w-full items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
          <Icon className="text-sky-400 text-base" />
        </div>
        <FaChevronRight className="text-xs text-zinc-600" />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-zinc-100">{service.title}</h3>
      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-zinc-400">{service.desc}</p>
      <p className="mt-4 font-mono text-sm font-semibold text-zinc-200">{service.rate}</p>
    </button>
  );
}

export default function Services() {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("oneTime");

  function scrollToContact() {
    setSelected(null);
    setTimeout(() => {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }

  return (
    <section id="services" className="mx-auto max-w-5xl px-4 py-16">
      <FadeIn>
        <p className="text-sm text-zinc-400">What I offer</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-200 via-white to-violet-200 bg-clip-text text-transparent">
          Services
        </h2>
        <p className="mt-3 max-w-xl text-zinc-300">
          Hands-on IT support and software development — straightforward pricing, real documentation, no middlemen.
        </p>
      </FadeIn>

      <FadeIn className="mt-8">
        <div className="flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1 w-fit">
          <button
            onClick={() => setTab("oneTime")}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
              tab === "oneTime"
                ? "bg-white text-zinc-950 shadow"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            One-time
          </button>
          <button
            onClick={() => setTab("monthly")}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
              tab === "monthly"
                ? "bg-white text-zinc-950 shadow"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Monthly
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(tab === "oneTime" ? oneTime : recurring).map((s) => (
            <ServiceCard key={s.title} service={s} onClick={() => setSelected(s)} />
          ))}
        </div>
      </FadeIn>

      <FadeIn className="mt-12">
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          How it works
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          {steps.map((step, i) => (
            <Fragment key={step.num}>
              <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-500/80 to-violet-500/80" />
                <p className="font-mono text-5xl font-black leading-none bg-gradient-to-br from-sky-400 to-violet-400 bg-clip-text text-transparent">
                  {step.num}
                </p>
                <h4 className="mt-4 text-sm font-semibold text-zinc-100">{step.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden sm:flex items-center justify-center w-6 shrink-0 text-zinc-600">
                  <FaChevronRight className="text-xs" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="mt-10">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-zinc-100">Ready to get started?</p>
            <p className="mt-0.5 text-sm text-zinc-400">
              Reach out and let's talk through what you need.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="shrink-0 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
          >
            Get in touch
          </button>
        </div>
      </FadeIn>

      {selected && (
        <ServiceModal
          service={selected}
          onClose={() => setSelected(null)}
          onContact={scrollToContact}
        />
      )}
    </section>
  );
}
