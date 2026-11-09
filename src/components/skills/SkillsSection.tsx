import React from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Cpu,
  Server,
  Layers,
  Database,
  CreditCard,
  Sparkles,
  Wrench,
  GitBranch,
} from 'lucide-react';

interface ArsenalCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
}

const ARSENAL_CATEGORIES: ArsenalCategory[] = [
  {
    id: 'core-web',
    title: 'Core Web & Languages',
    description:
      'Strong foundation in core programming languages, modern asynchronous patterns, and typed systems architecture.',
    icon: Code2,
    skills: ['Solidity', 'TypeScript', 'JavaScript', 'Python', 'PHP', 'SQL'],
  },
  {
    id: 'blockchain-evm',
    title: 'Blockchain & EVM',
    description:
      'Non-custodial smart contracts, time-weighted staking protocols, Foundry testing, and EVM settlement layers.',
    icon: Cpu,
    skills: ['Solidity', 'Foundry', 'EVM', 'Ethereum', 'Ethers.js', 'Web3.js'],
  },
  {
    id: 'backend-architecture',
    title: 'Backend Architecture',
    description:
      'High-throughput microservices, event-driven async workers, idempotent REST APIs, and enterprise server systems.',
    icon: Server,
    skills: ['Node.js', 'Express.js', 'FastAPI', 'Django', 'Laravel 11', 'REST APIs'],
  },
  {
    id: 'frontend-frameworks',
    title: 'Frontend & Frameworks',
    description:
      'Modern component-driven development with React ecosystem, strictly typed state machines, and micro-interactions.',
    icon: Layers,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Motion'],
  },
  {
    id: 'databases-storage',
    title: 'Databases & Storage',
    description:
      'ACID relational schema design, connection pooling, real-time CDC streams, and dense vector indexing.',
    icon: Database,
    skills: ['PostgreSQL', 'Supabase', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    id: 'fintech-payments',
    title: 'Fintech & Payment Gateways',
    description:
      'Enterprise payment gateways, fiat-to-crypto banking on-ramps, KYC verification, and virtual card issuance.',
    icon: CreditCard,
    skills: ['Striga', 'Stripe', 'Banxa', 'Paymova', 'Webhooks'],
  },
  {
    id: 'ai-intelligent-systems',
    title: 'AI & Intelligent Systems',
    description:
      'Retrieval-augmented generation (RAG), dense vector distance spaces, transformer embeddings, and LLM reasoning.',
    icon: Sparkles,
    skills: ['RAG', 'Vector Search', 'Embeddings', 'Gemini AI', 'DistilBERT'],
  },
  {
    id: 'build-tooling',
    title: 'Build & Tooling',
    description:
      'Bundlers, containerized services, contract fuzzing, API validation, and automated code quality tools.',
    icon: Wrench,
    skills: ['Vite', 'Docker', 'Postman', 'ESLint', 'Bun', 'NPM'],
  },
  {
    id: 'version-control-workflow',
    title: 'Version Control & Workflow',
    description:
      'Distributed git branching workflows, CI/CD pipeline automation, code review standards, and agile delivery.',
    icon: GitBranch,
    skills: ['Git', 'GitHub', 'CI/CD Actions', 'System Design', 'Agile'],
  },
];

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative z-10 w-full py-28 sm:py-36 lg:py-44 px-4 sm:px-8 lg:px-12 bg-[#F5F5F5] text-[#222222] select-none border-t border-[#858585]/20 overflow-hidden"
      aria-label="What I've Built & Technical Expertise"
    >
      <div id="stack" className="absolute -top-24" />

      <div className="max-w-7xl mx-auto">
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#858585]/20 mb-12 sm:mb-16">
          <div>
            <div className="font-mono text-xs tracking-[0.25em] text-[#858585] uppercase mb-3 flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#222222] font-bold tracking-widest">
                04
              </span>
              {/* Decorative warm yellow accent #D6B36A */}
              <span className="h-px w-6 bg-[#D6B36A]" />
              <span>TECHNICAL EXPERTISE</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-[#222222] tracking-tight">
              Technical Arsenal
            </h2>
          </div>

          <div className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#858585] uppercase select-none">
            / STACK /
          </div>
        </div>

        {/* ================= 3-COLUMN CARDS GRID (Light Background) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {ARSENAL_CATEGORIES.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl bg-[#FFFFFF] p-6 sm:p-7 border border-[#858585]/20 hover:border-[#222222]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Category Icon Container on Soft Light Surface */}
                  <div className="w-11 h-11 rounded-xl bg-[#F5F5F5] border border-[#858585]/20 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-[#222222]/30 transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-[#222222]" />
                  </div>

                  {/* Category Title: Charcoal primary heading #222222 */}
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-[#222222] mb-2.5 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Category Description: Dark grey body text #858585 */}
                  <p className="font-sans text-xs sm:text-[13px] text-[#858585] leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Skill Pills at Bottom */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-[#858585]/15">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-[10.5px] font-mono tracking-wider uppercase text-[#858585] bg-[#F5F5F5] border border-[#858585]/20 group-hover:text-[#222222] group-hover:border-[#858585]/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
