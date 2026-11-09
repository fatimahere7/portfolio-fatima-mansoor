import type { ExperienceItem } from '../types/experience';

export const EXPERIENCES: ExperienceItem[] = [
  // 01 — ASSOCIATE BLOCKCHAIN AND BACKEND DEVELOPER
  {
    id: 'tycoonz-associate-dev',
    year: '2026',
    period: 'JANUARY 2026 – PRESENT',
    role: 'Associate Blockchain and Backend Developer',
    company: 'Tycoonz Solutions',
    location: 'Lahore, Pakistan',
    workType: 'FULL-TIME',
    department: 'BLOCKCHAIN & FINTECH ENGINEERING',
    description:
      'Working as an Associate Blockchain Developer, contributing to smart contract architecture and backend engineering for fintech and Web3 applications, bridging EVM staking protocols with regulated crypto-to-fiat banking infrastructure.',
    deliverables: [
      'Designed and implemented staking smart contracts across EVM-compatible blockchain networks, including Base and Main.',
      'Developed time-weighted reward distribution mechanisms and reward calculation logic.',
      'Built backend services for a crypto-to-fiat fintech platform using Node.js, Express.js, and Supabase (PostgreSQL).',
      'Developed REST APIs for authentication, user management, and core application workflows.',
      'Integrated Striga APIs for KYC verification, wallet management, account creation, and card issuance.',
      'Implemented Stripe subscription billing and webhook processing.',
      'Developed backend functionality for virtual and physical card management.',
      'Worked on admin panel functionality and secure backend operations.',
    ],
    technologies: [
      'Solidity',
      'Node.js',
      'Express.js',
      'Supabase',
      'PostgreSQL',
      'Striga',
      'Stripe',
      'Base',
      'EVM',
      'Smart Contracts',
    ],
    previewAccent: '#F59E0B',
  },

  // 02 — BLOCKCHAIN DEVELOPER INTERN
  {
    id: 'tycoonz-blockchain-intern',
    year: '2025 – 2026',
    period: 'NOVEMBER 2025 – JANUARY 2026',
    role: 'Blockchain Developer Intern',
    company: 'Tycoonz Solutions',
    location: 'Lahore, Pakistan',
    workType: 'INTERNSHIP',
    department: 'SMART CONTRACT ARCHITECTURE & SECURITY',
    description:
      'Gained practical exposure to Solidity development, smart contract architecture, and blockchain security concepts, researching token standards, gas optimization, and access control patterns.',
    deliverables: [
      'Studied and analyzed Solidity smart contract architecture.',
      'Explored ERC-20 token standards, token minting, transfers, balances, and allowance mechanisms.',
      'Worked through contract state management and role-based access control patterns.',
      'Studied smart contract security considerations, including reentrancy protection and integer overflow/underflow safety.',
      'Explored gas-efficient storage layouts and event-based transaction logging.',
      'Studied contract upgradeability through proxy patterns.',
      'Explored multisig-based governance for managing contract ownership and critical parameters.',
    ],
    technologies: [
      'Solidity',
      'ERC-20',
      'EVM',
      'Smart Contract Architecture',
      'Blockchain Security',
    ],
    previewAccent: '#F59E0B',
  },

  // 03 — BACKEND DEVELOPER INTERN
  {
    id: 'nexquery-backend-intern',
    year: '2025',
    period: 'JULY 2025 – SEPTEMBER 2025',
    role: 'Backend Developer Intern',
    company: 'NEXQUERY',
    location: 'Lahore, Pakistan',
    workType: 'INTERNSHIP',
    department: 'API DEVELOPMENT & DATABASE SYSTEMS',
    description:
      'Worked on backend development, focusing on REST API engineering, authentication workflows, and relational database integration using Python and Django REST Framework.',
    deliverables: [
      'Built and optimized RESTful APIs using Django REST Framework.',
      'Implemented authentication and request validation.',
      'Developed error-handling mechanisms for backend APIs.',
      'Worked with PostgreSQL for database operations.',
      'Used Git for version control and Postman for API testing.',
      'Collaborated within a development team to improve API performance and development efficiency.',
    ],
    technologies: [
      'Python',
      'Django REST Framework',
      'PostgreSQL',
      'Git',
      'Postman',
    ],
    previewAccent: '#F59E0B',
  },

  // 04 — SOFTWARE ENGINEER INTERN
  {
    id: 'nexius-software-intern',
    year: '2024',
    period: 'AUGUST 2024 – OCTOBER 2024',
    role: 'Software Engineer Intern',
    company: 'NEXIUS',
    location: 'Lahore, Pakistan',
    workType: 'INTERNSHIP',
    department: 'WEB APPLICATION BACKEND',
    description:
      'Worked on backend development for web applications, including blogging and e-commerce systems, implementing MVC patterns, database interactions, and business logic with Laravel 11.',
    deliverables: [
      'Developed backend functionality using Laravel 11.',
      'Worked with MVC architecture and Eloquent ORM.',
      'Implemented CRUD operations and application business logic.',
      'Contributed to blogging and e-commerce application development.',
      'Worked with database interactions and backend application structure.',
    ],
    technologies: [
      'PHP',
      'Laravel 11',
      'MVC',
      'Eloquent ORM',
      'MySQL',
    ],
    previewAccent: '#F59E0B',
  },
];
