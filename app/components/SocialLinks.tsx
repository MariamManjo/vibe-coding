export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
      {/* Email */}
      <a
        href="mailto:mariammanjavidze01@gmail.com"
        className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-[#3B82F6] border border-white/15 hover:border-[#3B82F6] text-white/80 hover:text-white text-sm font-body font-medium px-5 py-2.5 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_16px_rgba(59,130,246,0.4)]"
      >
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Email
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/mariammanjavidze/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-[#0A66C2] border border-white/15 hover:border-[#0A66C2] text-white/80 hover:text-white text-sm font-body font-medium px-5 py-2.5 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_16px_rgba(10,102,194,0.4)]"
      >
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/ManjoM0"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-[#1877F2] border border-white/15 hover:border-[#1877F2] text-white/80 hover:text-white text-sm font-body font-medium px-5 py-2.5 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_16px_rgba(24,119,242,0.4)]"
      >
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        Facebook
      </a>
    </div>
  );
}
