import React from 'react';

interface ProjectVisualProps {
  type?: 'fintech' | 'staking' | 'nlp' | 'rag' | 'hrms' | 'scheduler' | 'ecommerce';
  image?: string;
  title: string;
  category: string;
  number: string;
  aspectRatio?: string;
  className?: string;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  type = 'fintech',
  image,
  title,
  category,
  number,
  aspectRatio = 'aspect-[4/3]',
  className = '',
}) => {
  const [imageError, setImageError] = React.useState(false);
  const showImage = Boolean(image && !imageError);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#1a1a1a] border border-white/10 group-hover:border-white/30 transition-all duration-300 select-none shadow-2xl ${aspectRatio} ${className}`}
    >
      {/* If external authentic image provided, render pristine high-quality photograph without any text or overlay */}
      {showImage ? (
        <div className="w-full h-full overflow-hidden">
          <img
            src={image}
            alt={`${title} project application in natural workspace environment`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center grayscale contrast-[1.05] brightness-[0.92] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        /* Bespoke Domain-Specific Architectural Technical Visuals fallback (only when no image or error) */
        <div className="relative w-full h-full flex items-center justify-center p-6 overflow-hidden">
          {/* Fallback Telemetry Stamp inside schematic only */}
          <div className="absolute top-3.5 left-4 z-20 flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-[#7B7B7B] uppercase pointer-events-none bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 shadow-sm">
            <span className="text-white font-semibold">{number}</span>
            <span>·</span>
            <span className="text-white/90">{category}</span>
          </div>

          <div className="absolute top-3.5 right-4 z-20 flex items-center gap-1.5 font-mono text-[8.5px] tracking-widest text-[#7B7B7B] uppercase pointer-events-none bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
            <span className="text-white font-medium">SCHEMATIC</span>
          </div>
          {/* 01: FINTECH / OMEGAPAY SCHEMATIC */}
          {type === 'fintech' && (
            <svg
              viewBox="0 0 600 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-h-[340px]"
            >
              {/* Subtle Grid Background */}
              <line x1="60" y1="180" x2="540" y2="180" stroke="#7B7B7B" strokeOpacity="0.2" strokeDasharray="3 3" />
              <line x1="300" y1="50" x2="300" y2="310" stroke="#7B7B7B" strokeOpacity="0.2" strokeDasharray="3 3" />

              {/* Payment Card Silhouette */}
              <rect
                x="200"
                y="95"
                width="200"
                height="125"
                rx="10"
                fill="#222222"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              {/* Card Chip */}
              <rect x="225" y="125" width="28" height="22" rx="3" fill="#333333" stroke="#7B7B7B" strokeWidth="1" />
              <line x1="225" y1="136" x2="253" y2="136" stroke="#7B7B7B" strokeWidth="0.75" />
              <line x1="239" y1="125" x2="239" y2="147" stroke="#7B7B7B" strokeWidth="0.75" />
              {/* Card Contactless Wave */}
              <path d="M 265 130 A 8 8 0 0 1 265 142" stroke="#7B7B7B" strokeWidth="1.2" fill="none" />
              <path d="M 270 126 A 14 14 0 0 1 270 146" stroke="#7B7B7B" strokeWidth="1.2" fill="none" />
              {/* Card Number Mask */}
              <text x="225" y="180" fill="#FFFFFF" fontSize="10" fontFamily="monospace" letterSpacing="0.18em">
                •••• •••• •••• 4289
              </text>
              <text x="225" y="202" fill="#7B7B7B" fontSize="8" fontFamily="monospace" letterSpacing="0.1em">
                STRIGA KYC TIER 02
              </text>
              {/* Card Status Red Dot */}
              <circle cx="375" cy="115" r="4" fill="#EF4444" />

              {/* Integrated Nodes Around Card */}
              {/* Node 1: Striga KYC */}
              <rect x="70" y="80" width="105" height="50" rx="4" fill="#222222" stroke="#7B7B7B" strokeOpacity="0.5" />
              <text x="82" y="102" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="600">STRIGA KYC</text>
              <text x="82" y="118" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">TIER VERIFICATION</text>
              <line x1="175" y1="105" x2="200" y2="120" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 2" />

              {/* Node 2: Supabase Wallet */}
              <rect x="70" y="220" width="105" height="50" rx="4" fill="#222222" stroke="#7B7B7B" strokeOpacity="0.5" />
              <text x="82" y="242" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="600">SUPABASE DB</text>
              <text x="82" y="258" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">WALLET &amp; USERS</text>
              <line x1="175" y1="245" x2="200" y2="205" stroke="#7B7B7B" strokeWidth="1" strokeDasharray="3 2" />

              {/* Node 3: Stripe Subscriptions */}
              <rect x="425" y="80" width="105" height="50" rx="4" fill="#222222" stroke="#7B7B7B" strokeOpacity="0.5" />
              <text x="437" y="102" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="600">STRIPE BILLING</text>
              <text x="437" y="118" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">RECURRING TIERS</text>
              <line x1="425" y1="105" x2="400" y2="120" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 2" />

              {/* Node 4: FCM Notifications */}
              <rect x="425" y="220" width="105" height="50" rx="4" fill="#222222" stroke="#7B7B7B" strokeOpacity="0.5" />
              <text x="437" y="242" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="600">FCM PUSH</text>
              <text x="437" y="258" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">IN-APP INBOX</text>
              <line x1="425" y1="245" x2="400" y2="205" stroke="#7B7B7B" strokeWidth="1" strokeDasharray="3 2" />

              {/* Bottom Pipeline Track */}
              <text x="300" y="300" textAnchor="middle" fill="#7B7B7B" fontSize="9" fontFamily="monospace" letterSpacing="0.2em">
                CRYPTO BALANCE ➔ STRIGA KYC ➔ CARD ISSUANCE ➔ TRANSACTIONAL WEBHOOKS
              </text>
            </svg>
          )}

          {/* 02: STAKING / BCT VAULT SCHEMATIC */}
          {type === 'staking' && (
            <svg
              viewBox="0 0 600 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-h-[340px]"
            >
              {/* Concentric Cryptographic Rings in Monochrome */}
              <circle cx="300" cy="180" r="115" stroke="#7B7B7B" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="300" cy="180" r="85" stroke="#7B7B7B" strokeOpacity="0.35" strokeWidth="1" />
              <circle cx="300" cy="180" r="55" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="6 3" />

              {/* Geometric Vault Hexagon */}
              <polygon
                points="300,105 365,142 365,218 300,255 235,218 235,142"
                fill="#222222"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />

              {/* Internal Guard Bars */}
              <line x1="260" y1="180" x2="340" y2="180" stroke="#7B7B7B" strokeWidth="1.5" />
              <line x1="300" y1="140" x2="300" y2="220" stroke="#7B7B7B" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="3 3" />

              {/* Invariant Node Pins */}
              <g>
                <circle cx="160" cy="120" r="4" fill="#EF4444" />
                <line x1="160" y1="120" x2="235" y2="142" stroke="#7B7B7B" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 2" />
                <text x="110" y="105" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" letterSpacing="0.1em">
                  TIME_WEIGHTED_YIELD
                </text>
              </g>

              <g>
                <circle cx="440" cy="240" r="4" fill="#FFFFFF" />
                <line x1="440" y1="240" x2="365" y2="218" stroke="#7B7B7B" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 2" />
                <text x="395" y="260" fill="#7B7B7B" fontSize="8.5" fontFamily="monospace" letterSpacing="0.1em">
                  PACKED_STORAGE_SLOT
                </text>
              </g>

              <g>
                <circle cx="440" cy="120" r="4" fill="#FFFFFF" />
                <line x1="440" y1="120" x2="365" y2="142" stroke="#7B7B7B" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 2" />
                <text x="420" y="105" fill="#7B7B7B" fontSize="8.5" fontFamily="monospace" letterSpacing="0.1em">
                  BASE &amp; EVM MAIN
                </text>
              </g>

              <text x="300" y="185" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="700">
                BCT VAULT
              </text>
              <text x="300" y="295" textAnchor="middle" fill="#7B7B7B" fontSize="9" fontFamily="monospace" letterSpacing="0.2em">
                O(1) CONSTANT-TIME ACCUMULATOR · REENTRANCY GUARDED
              </text>
            </svg>
          )}

          {/* 03: NLP / SEMANTISCOPE SCHEMATIC */}
          {type === 'nlp' && (
            <svg
              viewBox="0 0 600 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-h-[340px]"
            >
              {/* Step 1: Daraz Web Scraping */}
              <rect x="50" y="130" width="100" height="85" rx="4" fill="#222222" stroke="#7B7B7B" strokeWidth="1" />
              <text x="100" y="160" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="600">DARAZ URL</text>
              <text x="100" y="178" textAnchor="middle" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">FASTAPI CRAWLER</text>
              <circle cx="100" cy="195" r="3" fill="#EF4444" />

              {/* Arrow 1 */}
              <line x1="150" y1="172" x2="185" y2="172" stroke="#FFFFFF" strokeWidth="1.2" />
              <polygon points="185,169 193,172 185,175" fill="#FFFFFF" />

              {/* Step 2: DistilBERT Classification */}
              <rect x="195" y="115" width="115" height="115" rx="6" fill="#222222" stroke="#FFFFFF" strokeWidth="1.2" />
              <text x="252" y="148" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="monospace" fontWeight="600">DistilBERT</text>
              <text x="252" y="165" textAnchor="middle" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">HUGGING FACE</text>
              {/* Sentiment breakdown visual */}
              <rect x="215" y="180" width="75" height="4" fill="#333333" rx="2" />
              <rect x="215" y="180" width="50" height="4" fill="#FFFFFF" rx="2" />
              <text x="252" y="202" textAnchor="middle" fill="#7B7B7B" fontSize="7" fontFamily="monospace">SENTIMENT POLARITY</text>

              {/* Arrow 2 */}
              <line x1="310" y1="172" x2="345" y2="172" stroke="#FFFFFF" strokeWidth="1.2" />
              <polygon points="345,169 353,172 345,175" fill="#FFFFFF" />

              {/* Step 3: Google Gemini Summarization */}
              <rect x="355" y="115" width="115" height="115" rx="6" fill="#222222" stroke="#FFFFFF" strokeWidth="1.2" />
              <text x="412" y="148" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="monospace" fontWeight="600">GEMINI API</text>
              <text x="412" y="165" textAnchor="middle" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">EXECUTIVE SUMMARY</text>
              <text x="412" y="188" textAnchor="middle" fill="#EF4444" fontSize="8" fontFamily="monospace">PROS &amp; CONS</text>
              <circle cx="412" cy="204" r="3" fill="#FFFFFF" />

              {/* Arrow 3 */}
              <line x1="470" y1="172" x2="500" y2="172" stroke="#FFFFFF" strokeWidth="1.2" />
              <polygon points="500,169 508,172 500,175" fill="#FFFFFF" />

              {/* Step 4: Expo Client */}
              <rect x="510" y="130" width="60" height="85" rx="4" fill="#222222" stroke="#7B7B7B" strokeWidth="1" />
              <text x="540" y="165" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="600">EXPO</text>
              <text x="540" y="182" textAnchor="middle" fill="#7B7B7B" fontSize="7" fontFamily="monospace">MOBILE</text>

              {/* Bottom Technical Note */}
              <text x="300" y="295" textAnchor="middle" fill="#7B7B7B" fontSize="9" fontFamily="monospace" letterSpacing="0.2em">
                SCRAPING ➔ TRANSFORMER CLASSIFICATION ➔ GENERATIVE SYNTHESIS
              </text>
            </svg>
          )}

          {/* 04: RAG / RESUME RAG SCHEMATIC */}
          {type === 'rag' && (
            <svg
              viewBox="0 0 600 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-h-[340px]"
            >
              {/* 4 Evolutionary Nodes */}
              {/* V1 Node */}
              <rect x="50" y="90" width="105" height="75" rx="4" fill="#222222" stroke="#7B7B7B" strokeWidth="1" />
              <text x="102" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="700">V1 · KEYWORD</text>
              <text x="102" y="132" textAnchor="middle" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">Line-Level Search</text>
              <text x="102" y="148" textAnchor="middle" fill="#7B7B7B" fontSize="7" fontFamily="monospace">Raw Token Match</text>

              {/* V2 Node */}
              <rect x="180" y="90" width="105" height="75" rx="4" fill="#222222" stroke="#7B7B7B" strokeWidth="1" />
              <text x="232" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="700">V2 · CHUNKING</text>
              <text x="232" y="132" textAnchor="middle" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">Heading Hierarchy</text>
              <text x="232" y="148" textAnchor="middle" fill="#7B7B7B" fontSize="7" fontFamily="monospace">Paragraph Context</text>

              {/* V3 Node */}
              <rect x="310" y="90" width="105" height="75" rx="4" fill="#222222" stroke="#FFFFFF" strokeWidth="1.2" />
              <text x="362" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="700">V3 · SEMANTIC</text>
              <text x="362" y="132" textAnchor="middle" fill="#EF4444" fontSize="7.5" fontFamily="monospace">Dense Vectors</text>
              <text x="362" y="148" textAnchor="middle" fill="#7B7B7B" fontSize="7" fontFamily="monospace">Cosine Similarity</text>

              {/* V4 Node */}
              <rect x="440" y="90" width="110" height="75" rx="4" fill="#222222" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="495" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="700">V4 · SLIDING PDF</text>
              <text x="495" y="132" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontFamily="monospace">pypdf Overlapping</text>
              <text x="495" y="148" textAnchor="middle" fill="#EF4444" fontSize="7" fontFamily="monospace">Boundary Guard</text>

              {/* Progression Arrow connecting top */}
              <line x1="155" y1="127" x2="180" y2="127" stroke="#7B7B7B" strokeWidth="1" />
              <line x1="285" y1="127" x2="310" y2="127" stroke="#7B7B7B" strokeWidth="1" />
              <line x1="415" y1="127" x2="440" y2="127" stroke="#FFFFFF" strokeWidth="1.2" />

              {/* Downward flow to LLM Prompt */}
              <path d="M 495 165 L 495 210 L 300 210 L 300 230" stroke="#FFFFFF" strokeWidth="1.2" fill="none" strokeDasharray="3 2" />
              <circle cx="300" cy="235" r="4" fill="#EF4444" />

              {/* Prompt Box */}
              <rect x="180" y="245" width="240" height="45" rx="4" fill="#222222" stroke="#7B7B7B" strokeWidth="1" />
              <text x="300" y="265" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="600">GROUNDED LLM INFERENCE</text>
              <text x="300" y="280" textAnchor="middle" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">Framework-Free · Pure Python</text>

              {/* Roadmap indicator */}
              <text x="300" y="320" textAnchor="middle" fill="#7B7B7B" fontSize="8.5" fontFamily="monospace" letterSpacing="0.15em">
                FUTURE: VECTOR DBs · HYBRID SEARCH · CROSS-ENCODER RERANKING
              </text>
            </svg>
          )}

          {/* 05: HRMS / PAYSLIP SCHEMATIC */}
          {type === 'hrms' && (
            <svg
              viewBox="0 0 600 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-h-[340px]"
            >
              {/* Central Ledger/Payslip Sheet */}
              <rect x="220" y="80" width="160" height="180" rx="4" fill="#222222" stroke="#FFFFFF" strokeWidth="1.2" />
              <line x1="240" y1="105" x2="360" y2="105" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="240" y="125" fill="#7B7B7B" fontSize="8" fontFamily="monospace">BASE SALARY</text>
              <text x="360" y="125" textAnchor="end" fill="#FFFFFF" fontSize="8" fontFamily="monospace">$4,500.00</text>
              <text x="240" y="145" fill="#7B7B7B" fontSize="8" fontFamily="monospace">ALLOWANCES</text>
              <text x="360" y="145" textAnchor="end" fill="#FFFFFF" fontSize="8" fontFamily="monospace">+$650.00</text>
              <text x="240" y="165" fill="#7B7B7B" fontSize="8" fontFamily="monospace">DEDUCTIONS</text>
              <text x="360" y="165" textAnchor="end" fill="#EF4444" fontSize="8" fontFamily="monospace">-$320.00</text>
              <line x1="240" y1="180" x2="360" y2="180" stroke="#7B7B7B" strokeWidth="0.75" strokeDasharray="3 2" />
              <text x="240" y="200" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="700">NET PAYABLE</text>
              <text x="360" y="200" textAnchor="end" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="700">$4,830.00</text>
              <text x="300" y="240" textAnchor="middle" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">MONGODB HISTORICAL RECORD</text>

              {/* Flanking Nodes */}
              <rect x="60" y="130" width="120" height="60" rx="4" fill="#222222" stroke="#7B7B7B" strokeWidth="1" />
              <text x="120" y="155" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="600">EMPLOYEE DIRECTORY</text>
              <text x="120" y="172" textAnchor="middle" fill="#7B7B7B" fontSize="7" fontFamily="monospace">DEPT &amp; ROLE CRUD</text>
              <line x1="180" y1="160" x2="220" y2="160" stroke="#7B7B7B" strokeWidth="1" strokeDasharray="3 2" />

              <rect x="420" y="130" width="120" height="60" rx="4" fill="#222222" stroke="#7B7B7B" strokeWidth="1" />
              <text x="480" y="155" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontFamily="monospace" fontWeight="600">EMAIL DISPATCHER</text>
              <text x="480" y="172" textAnchor="middle" fill="#EF4444" fontSize="7" fontFamily="monospace">AUTOMATED PAYSLIP</text>
              <line x1="380" y1="160" x2="420" y2="160" stroke="#7B7B7B" strokeWidth="1" strokeDasharray="3 2" />

              <text x="300" y="295" textAnchor="middle" fill="#7B7B7B" fontSize="9" fontFamily="monospace" letterSpacing="0.2em">
                NODE.JS · EXPRESS.JS · MONGODB · AUTOMATED PAYROLL ENGINE
              </text>
            </svg>
          )}

          {/* 06: SCHEDULER SCHEMATIC */}
          {type === 'scheduler' && (
            <svg
              viewBox="0 0 600 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-h-[340px]"
            >
              {/* Calendar Grid Representation */}
              <rect x="180" y="80" width="240" height="180" rx="4" fill="#222222" stroke="#FFFFFF" strokeWidth="1.2" />
              <rect x="180" y="80" width="240" height="30" fill="#333333" />
              <text x="300" y="100" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="monospace" fontWeight="700">APPOINTMENT CALENDAR</text>

              {/* Time Slots */}
              <rect x="200" y="125" width="95" height="30" rx="3" fill="#1a1a1a" stroke="#7B7B7B" strokeWidth="0.75" />
              <text x="247" y="144" textAnchor="middle" fill="#7B7B7B" fontSize="8" fontFamily="monospace">09:00 - 10:00</text>

              <rect x="305" y="125" width="95" height="30" rx="3" fill="#1a1a1a" stroke="#EF4444" strokeWidth="1" />
              <text x="352" y="144" textAnchor="middle" fill="#EF4444" fontSize="8" fontFamily="monospace">10:30 [BOOKED]</text>

              <rect x="200" y="165" width="95" height="30" rx="3" fill="#1a1a1a" stroke="#FFFFFF" strokeWidth="1" />
              <text x="247" y="184" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">13:00 [SELECTED]</text>

              <rect x="305" y="165" width="95" height="30" rx="3" fill="#1a1a1a" stroke="#7B7B7B" strokeWidth="0.75" />
              <text x="352" y="184" textAnchor="middle" fill="#7B7B7B" fontSize="8" fontFamily="monospace">14:30 - 15:30</text>

              <rect x="200" y="205" width="200" height="35" rx="3" fill="#222222" stroke="#7B7B7B" strokeDasharray="3 2" />
              <text x="300" y="227" textAnchor="middle" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">MYSQL TRANSACTIONAL AVAILABILITY CHECK</text>

              <text x="300" y="295" textAnchor="middle" fill="#7B7B7B" fontSize="9" fontFamily="monospace" letterSpacing="0.2em">
                PHP · MYSQL PDO · JAVASCRIPT · CONFLICT-FREE SCHEDULING
              </text>
            </svg>
          )}

          {/* 07: ECOMMERCE SCHEMATIC */}
          {type === 'ecommerce' && (
            <svg
              viewBox="0 0 600 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-h-[340px]"
            >
              {/* MVC Architecture Triangle */}
              {/* Model */}
              <rect x="120" y="180" width="100" height="70" rx="4" fill="#222222" stroke="#FFFFFF" strokeWidth="1" />
              <text x="170" y="205" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="700">MODEL</text>
              <text x="170" y="222" textAnchor="middle" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">Eloquent ORM</text>
              <text x="170" y="236" textAnchor="middle" fill="#EF4444" fontSize="7" fontFamily="monospace">MySQL Schema</text>

              {/* View */}
              <rect x="380" y="180" width="100" height="70" rx="4" fill="#222222" stroke="#FFFFFF" strokeWidth="1" />
              <text x="430" y="205" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="700">VIEW</text>
              <text x="430" y="222" textAnchor="middle" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">Blade Templates</text>
              <text x="430" y="236" textAnchor="middle" fill="#7B7B7B" fontSize="7" fontFamily="monospace">Responsive Store</text>

              {/* Controller */}
              <rect x="250" y="70" width="100" height="70" rx="4" fill="#222222" stroke="#FFFFFF" strokeWidth="1.2" />
              <text x="300" y="95" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="700">CONTROLLER</text>
              <text x="300" y="112" textAnchor="middle" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">Laravel 11</text>
              <text x="300" y="126" textAnchor="middle" fill="#7B7B7B" fontSize="7" fontFamily="monospace">Checkout &amp; Cart</text>

              {/* Connective vectors */}
              <line x1="280" y1="140" x2="190" y2="180" stroke="#7B7B7B" strokeWidth="1.2" strokeDasharray="3 2" />
              <line x1="320" y1="140" x2="410" y2="180" stroke="#7B7B7B" strokeWidth="1.2" strokeDasharray="3 2" />
              <line x1="220" y1="215" x2="380" y2="215" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 2" />
              <text x="300" y="210" textAnchor="middle" fill="#7B7B7B" fontSize="7.5" fontFamily="monospace">ATOMIC INVENTORY</text>

              <text x="300" y="295" textAnchor="middle" fill="#7B7B7B" fontSize="9" fontFamily="monospace" letterSpacing="0.2em">
                LARAVEL 11 · BLADE · ELOQUENT ORM · ATOMIC CART TRANSACTIONS
              </text>
            </svg>
          )}
        </div>
      )}
    </div>
  );
};
