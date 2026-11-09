import type { ProjectItem } from '../types/project';

export const PROJECTS: ProjectItem[] = [
  // ==========================================
  // 01 — OmegaPay | Fintech Backend
  // ==========================================
  {
    id: 'omegapay-fintech-backend',
    number: '01',
    title: 'OmegaPay',
    subtitle: 'Fintech Card Issuance, Striga KYC & Payment Processing Backend',
    category: 'BACKEND DEVELOPMENT / FINTECH',
    primaryGroup: 'BACKEND & FINTECH',
    priorityOrder: 1,
    featured: true,
    year: '2025 – 2026',
    role: 'Backend Developer (Sole Backend Ownership)',
    status: 'PRODUCTION READY',
    image: '/src/assets/images/omegapay_mobile_app_1793552533329.jpg',
    visualType: 'fintech',
    caseStudyUrl: '#project-omegapay-fintech-backend',
    introduction:
      'OmegaPay is a fintech mobile application platform that allows users to hold cryptocurrency balances and spend directly through virtual and physical payment cards. Fatima engineered the comprehensive server-side architecture using Node.js, Express.js, and Supabase PostgreSQL, integrating regulated third-party banking rails (Striga), subscription billing (Stripe), and transactional push messaging (FCM).',
    description:
      'Engineered the complete server-side infrastructure for OmegaPay, enabling secure crypto-to-fiat spending, automated Tier-based KYC onboarding via Striga, instant card lifecycle provisioning, Stripe subscription tiers, and reliable webhook ingestion.',
    problemStatement:
      'Bridging decentralized cryptocurrency holdings with regulated fiat payment infrastructure requires frictionless identity verification, multi-language authentication, reliable synchronization with external banking APIs, and strictly idempotent webhook execution under unpredictable mobile network conditions.',
    objectives: [
      'Design and deploy resilient RESTful APIs for mobile authentication with email and phone OTP verification.',
      'Integrate Striga tier-based KYC approval pipelines that trigger automatic wallet provisioning upon document verification.',
      'Implement virtual and physical card issuance lifecycles, real-time lock/unlock controls, and spending status endpoints.',
      'Manage Stripe recurring billing to unlock tiered card limits and premium application features.',
      'Establish a reliable push notification pipeline via Firebase Cloud Messaging (FCM) paired with an in-app notification inbox.',
    ],
    roleAndContributions: {
      roleTitle: 'Backend Developer (Sole Backend Ownership)',
      summary:
        'Solely responsible for the entire backend system architecture, API design, database schemas, third-party fintech integrations, and notification pipelines. The mobile application was developed by the client engineering team.',
      personalContributions: [
        'Designed and implemented complete registration, login, and token refreshment REST APIs with secure password hashing.',
        'Engineered email and phone OTP verification mechanisms with rate-limiting and expiration lifecycles.',
        'Developed multi-language verification codes and localized transactional message templates for diverse user locales.',
        'Integrated Striga tier-based KYC verification flow with automated webhook status listeners.',
        'Implemented automated non-custodial crypto wallet creation immediately upon successful Striga KYC verification.',
        'Structured normalized user entities, card metadata, and audit logs using Supabase PostgreSQL.',
        'Built endpoints for virtual and physical debit card issuance, activation, status updates, and pin management.',
        'Integrated Stripe subscription billing, handling checkout sessions, recurring payments, and tier-gating logic.',
        'Engineered fine-grained authorization middleware checking KYC tier approval and active subscription status before granting feature access.',
        'Built asynchronous webhook handlers with cryptographic signature validation ensuring exactly-once processing.',
        'Integrated Firebase Cloud Messaging (FCM) to trigger high-priority push alerts for account and card activity.',
        'Implemented mobile device token registration and active session management.',
        'Built in-app notification inbox APIs with unread counts, pagination, and mark-as-read state.',
        'Developed secured administrative APIs for internal compliance review and account state management.',
      ],
    },
    technicalImplementation: {
      overview:
        'Architected as an Express.js modular service repository with strict separation of routes, controllers, middleware, and external API gateways. Supabase PostgreSQL serves as the persistent system of record, while webhook handlers operate with cryptographic signature validation to guarantee idempotent state updates.',
      workflowSteps: [
        {
          step: '01',
          title: 'Identity & Authentication',
          description:
            'Mobile client posts credentials; backend issues dual-factor OTP (email/SMS in preferred language) and returns signed session tokens upon verification.',
        },
        {
          step: '02',
          title: 'Striga KYC & Automated Wallet Creation',
          description:
            'User documents are streamed to Striga for compliance checks. Upon KYC approval webhook confirmation, the backend automatically triggers wallet creation.',
        },
        {
          step: '03',
          title: 'Card Provisioning & Stripe Subscriptions',
          description:
            'Qualified users request virtual or physical cards; subscription tiers are validated via Stripe webhooks to unlock enhanced spending parameters.',
        },
        {
          step: '04',
          title: 'Notification & Activity Dispatch',
          description:
            'Financial events trigger asynchronous FCM push payloads to registered user devices while updating the in-app unread inbox state.',
        },
      ],
      architecturalHighlights: [
        'Idempotent webhook ingestion with cryptographic signature validation for Striga and Stripe payloads.',
        'Tier-based feature authorization middleware enforcing regulatory compliance across all card endpoints.',
        'Connection-pooled PostgreSQL querying through Supabase with optimized indexes on transaction lookups.',
        'Decoupled notification dispatcher combining FCM push alerts with persistent SQL inbox records.',
      ],
    },
    mainFeatures: [
      'Multi-factor registration & authentication with dual-channel (email/phone) localized OTP verification.',
      'Tier-based KYC compliance flow integrated with Striga banking infrastructure.',
      'Automated crypto wallet generation linked to approved user profiles.',
      'Virtual and physical debit card issuance, status management, and card security controls.',
      'Stripe subscription billing integration with automated tier entitlement updates.',
      'Asynchronous webhook processor with replay prevention and signature verification.',
      'Device token registration and targeted push notifications via Firebase Cloud Messaging.',
      'In-app notification center with real-time unread counts and mark-as-read tracking.',
      'Secure administrative back-office APIs for compliance auditing and transaction inspection.',
    ],
    technologies: [
      'Node.js',
      'Express.js',
      'Supabase',
      'PostgreSQL',
      'Striga',
      'Stripe',
      'Firebase Cloud Messaging',
      'REST APIs',
    ],
    techCategories: [
      { categoryName: 'Backend & Runtime', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT'] },
      { categoryName: 'Database & Storage', items: ['Supabase', 'PostgreSQL', 'Connection Pooling'] },
      { categoryName: 'Fintech & Banking APIs', items: ['Striga KYC & Cards', 'Stripe Subscriptions', 'Webhooks'] },
      { categoryName: 'Messaging & Cloud', items: ['Firebase Cloud Messaging (FCM)', 'Device Registry'] },
    ],
    caseStudy: {
      challenge: {
        summary:
          'Developing a crypto-linked payment card backend requires harmonizing asynchronous third-party banking checks (Striga), recurring payment gateways (Stripe), and real-time mobile notifications without leaving user state inconsistent or exposed to replay attacks.',
        bottlenecks: [
          'Webhook desynchronization when external KYC approval arrives before the client finishes initial onboarding.',
          'Complex multi-channel OTP routing across varying mobile carriers and international email filters.',
          'Ensuring strict idempotency during duplicate webhook deliveries from financial providers.',
        ],
        constraints: [
          'Zero crypto wallet issuance prior to formal KYC approval verification.',
          'Strict role and tier gating preventing unauthorized card issuance requests.',
          'Fast response times (< 150ms) on mobile transaction polling endpoints.',
        ],
      },
      objectives: [
        'Deliver production-ready REST APIs for mobile onboarding and localized OTP verification.',
        'Fully automate Striga KYC approval listening and wallet creation routines.',
        'Implement virtual/physical card issuance and Stripe subscription billing.',
        'Integrate Firebase Cloud Messaging with persistent inbox sync.',
      ],
      roleAndContributions: {
        roleTitle: 'Backend Developer (Sole Backend Ownership)',
        summary:
          'Authored the complete server-side logic, integrated banking and payment APIs, and structured the persistent database schemas. The mobile application was delivered by the client team.',
        personalContributions: [
          'Registration, login, and token refreshment APIs.',
          'Email and phone OTP verification with multi-language message formatting.',
          'Tier-based KYC integration using Striga with automated wallet generation.',
          'Virtual and physical card issuance, activation, and status management.',
          'Stripe subscription billing and feature access gating.',
          'Webhook validation and idempotent event processing.',
          'FCM device registration, push notifications, and in-app inbox management.',
          'Secure admin APIs for compliance and audit tracking.',
        ],
      },
      technicalImplementation: {
        overview:
          'Built with Node.js and Express.js, persisting state in Supabase PostgreSQL, and managing external webhooks from Striga and Stripe through idempotent handlers.',
        workflowSteps: [
          {
            step: '01',
            title: 'Authentication & OTP Verification',
            description: 'Dual-channel OTP delivery via email and SMS with multi-language translation and rate limits.',
          },
          {
            step: '02',
            title: 'Striga KYC Validation & Wallet Minting',
            description: 'Webhook triggers automated wallet generation and sets tier permissions upon approval.',
          },
          {
            step: '03',
            title: 'Card Issuance & Stripe Billing',
            description: 'Virtual/physical card creation tied to active Stripe subscription entitlements.',
          },
          {
            step: '04',
            title: 'Notification Pipeline',
            description: 'FCM push notifications dispatched in parallel with persistent SQL inbox entries.',
          },
        ],
        architecturalHighlights: [
          'HMAC signature verification on all incoming webhook payloads.',
          'Tier-based route guards verifying identity and subscription status.',
          'Normalized relational schema in PostgreSQL through Supabase.',
        ],
      },
      mainFeatures: [
        'Registration & Login with dual-channel localized OTP.',
        'Striga tier-based KYC onboarding & automatic wallet generation.',
        'Virtual & physical card issuance and lifecycle management.',
        'Stripe subscription tiers & recurring billing.',
        'Cryptographic webhook validation and idempotent state updates.',
        'Firebase Cloud Messaging push alerts & persistent in-app inbox.',
        'Secure admin APIs for compliance review.',
      ],
      techCategories: [
        { categoryName: 'Backend & Runtime', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT'] },
        { categoryName: 'Database & Storage', items: ['Supabase', 'PostgreSQL', 'Connection Pooling'] },
        { categoryName: 'Fintech & Banking APIs', items: ['Striga KYC & Cards', 'Stripe Subscriptions', 'Webhooks'] },
        { categoryName: 'Messaging & Cloud', items: ['Firebase Cloud Messaging (FCM)', 'Device Registry'] },
      ],
      architecture: {
        overview:
          'OmegaPay backend operates as an event-driven Express.js API gateway connected to Supabase PostgreSQL, orchestrating asynchronous handshakes with Striga banking APIs and Stripe billing services.',
        flowSteps: [
          {
            step: '01',
            title: 'Mobile Client Auth',
            description: 'User submits phone/email; backend dispatches localized OTP and returns JWT upon verification.',
          },
          {
            step: '02',
            title: 'Striga KYC Handshake',
            description: 'KYC documents processed; webhook triggers wallet creation and updates database flags.',
          },
          {
            step: '03',
            title: 'Card Provisioning & Stripe',
            description: 'User selects card tier; Stripe manages subscription; card credentials generated via Striga.',
          },
          {
            step: '04',
            title: 'FCM Dispatch',
            description: 'Event worker issues push notifications and writes to in-app unread inbox table.',
          },
        ],
        nodes: [
          { name: 'Auth & OTP Controller', role: 'Dual-Channel Verification', status: 'ACTIVE' },
          { name: 'Striga KYC Gateway', role: 'Identity & Wallet Provisioning', status: 'SYNCED' },
          { name: 'Stripe Billing Module', role: 'Subscription Lifecycle', status: 'ACTIVE' },
          { name: 'Supabase PostgreSQL', role: 'Relational System of Record', status: 'PERSISTENT' },
          { name: 'FCM Push Dispatcher', role: 'Mobile Device Notifications', status: 'STREAMING' },
        ],
      },
    },
  },

  // ==========================================
  // 02 — BCT | Blockchain Staking Platform
  // ==========================================
  {
    id: 'bct-staking-platform',
    number: '02',
    title: 'BCT Staking Platform',
    subtitle: 'Decentralized Token Staking & Time-Weighted Yield Contracts',
    category: 'BLOCKCHAIN / SMART CONTRACTS / WEB3',
    primaryGroup: 'BLOCKCHAIN & WEB3',
    priorityOrder: 2,
    featured: true,
    year: '2025',
    role: 'Smart Contract & Web3 Developer',
    status: 'TESTNET / MAINNET VERIFIED',
    image: '/src/assets/images/bct_staking_platform_1793552301055.jpg',
    visualType: 'staking',
    github: 'https://github.com/fatimahere7/Blackchain',
    caseStudyUrl: '#project-bct-staking-platform',
    introduction:
      'A decentralized token staking application that allows users to lock BCT tokens into non-custodial EVM smart contracts and earn algorithmic rewards over time. Fatima authored the smart contracts in Solidity using Foundry, optimized contract storage layouts for gas savings, implemented time-weighted reward distribution math, and integrated front-end wallet interactions with Ethers.js and MetaMask.',
    description:
      'Engineered production-grade Solidity staking contracts, time-weighted reward calculations without dynamic loops, OpenZeppelin role-based access control, packed storage layouts, and a responsive Web3 interface connecting to EVM networks including Base.',
    problemStatement:
      'Traditional staking contracts often incur high gas fees from unbounded loops during reward distributions, risk reentrancy during claim operations, and face precision loss when calculating discrete time-weighted yields across variable staking intervals.',
    objectives: [
      'Implement gas-efficient staking smart contracts adhering to OpenZeppelin security standards.',
      'Develop constant-time O(1) mathematical reward accumulation algorithms based on staking duration.',
      'Enforce role-based access control (RBAC) for contract administration and emergency circuit breakers.',
      'Optimize EVM storage slot packing to reduce SSTORE and SLOAD gas consumption.',
      'Build end-to-end Web3 front-end interactions for token approvals, staking, reward claiming, and unstaking.',
      'Deploy and verify smart contracts across EVM-compatible networks, including Base and Ethereum.',
    ],
    roleAndContributions: {
      roleTitle: 'Smart Contract & Web3 Developer',
      summary:
        'Individually designed, coded, tested, and integrated the entire smart contract suite and Web3 user interface.',
      personalContributions: [
        'Designed and implemented core BCT staking smart contracts in Solidity conforming to OpenZeppelin standards.',
        'Engineered time-weighted reward accumulation mathematical formulas that eliminate dynamic looping.',
        'Built reward distribution mechanisms utilizing scaled precision accumulators to prevent integer rounding loss.',
        'Implemented role-based access control (RBAC) via OpenZeppelin AccessControl for pool parameter configuration.',
        'Optimized contract storage slot layouts, packing struct fields into compact 32-byte slots for gas efficiency.',
        'Integrated browser wallet connectivity supporting MetaMask and EVM-compatible providers using Ethers.js.',
        'Implemented frontend contract interaction workflows for token approval, staking, claiming, and unstaking.',
        'Tested, compiled, and deployed contracts using Foundry across EVM-compatible networks including Base and Mainnet.',
      ],
    },
    technicalImplementation: {
      overview:
        'Developed in Solidity 0.8.x using Foundry for deterministic testing and gas inspection. Front-end written in React and Vite with Ethers.js v6 managing provider connections, contract state queries, and transaction lifecycle feedback.',
      workflowSteps: [
        {
          step: '01',
          title: 'Wallet Connection & Token Approval',
          description:
            'User connects MetaMask via Ethers.js; frontend verifies network compatibility (Base / Mainnet) and checks BCT ERC-20 token allowance.',
        },
        {
          step: '02',
          title: 'Deposit & Position Storing',
          description:
            'User submits stake transaction; contract records staked amount, timestamp, and cumulative reward debt in tightly packed storage slots.',
        },
        {
          step: '03',
          title: 'Constant-Time Reward Calculation',
          description:
            'Rewards accumulate continuously via an index-based formula, allowing constant-time reward calculation upon user query without looping over staker arrays.',
        },
        {
          step: '04',
          title: 'Claiming & Unstaking',
          description:
            'User claims earned rewards or unstakes principal; ReentrancyGuard and SafeERC20 prevent exploit vectors during external token transfers.',
        },
      ],
      architecturalHighlights: [
        'Tight storage packing: combining staked amount, reward debt, and timestamps into single 32-byte storage slots.',
        'Constant-time accumulator algorithm avoiding loop-based gas exhaustion.',
        'OpenZeppelin SafeERC20 and ReentrancyGuard enforcement on all external token transfers.',
        'Foundry automated test harness covering edge cases, boundary conditions, and fuzz testing.',
      ],
    },
    mainFeatures: [
      'Non-custodial ERC-20 token staking with instant balance locking and block-level timestamp tracking.',
      'Time-weighted reward calculation algorithm calculating accurate yields on demand in O(1) time.',
      'Gas-optimized contract storage layout utilizing struct packing to reduce SSTORE costs.',
      'Role-based access control protecting administrative pool parameter adjustments.',
      'Full wallet connectivity via Ethers.js and MetaMask with automated network verification.',
      'Interactive front-end workflows for token allowance approval, deposit, claim, and unstake.',
      'Comprehensive Foundry test coverage verifying contract invariants and security.',
    ],
    technologies: [
      'Solidity',
      'OpenZeppelin',
      'Foundry',
      'Ethereum',
      'Base',
      'EVM',
      'JavaScript',
      'React',
      'Vite',
      'Ethers.js',
      'MetaMask',
    ],
    techCategories: [
      { categoryName: 'Smart Contracts & Languages', items: ['Solidity 0.8.x', 'OpenZeppelin Contracts', 'EVM Bytecode'] },
      { categoryName: 'Development & Testing Tools', items: ['Foundry', 'Forge Test Harness', 'Fuzz Testing'] },
      { categoryName: 'Networks & Protocols', items: ['Base Network', 'Ethereum / EVM Mainnet'] },
      { categoryName: 'Web3 & Frontend', items: ['Ethers.js v6', 'MetaMask', 'React', 'Vite', 'JavaScript'] },
    ],
    caseStudy: {
      challenge: {
        summary:
          'Staking smart contracts must guarantee that rewards are calculated fairly and continuously across diverse time intervals without relying on iterative loops that exceed EVM block gas limits, while guarding against reentrancy and unauthorized pool manipulation.',
        bottlenecks: [
          'Dynamic iteration over staker arrays rapidly exhausts block gas limits as user counts scale.',
          'Rounding errors in integer arithmetic can cause pool deficits or reward starvation over long staking durations.',
          'State inconsistency if users re-enter claim or withdraw functions before balance accounting completes.',
        ],
        constraints: [
          'Constant-time O(1) reward calculation regardless of the total number of stakers in the pool.',
          'Zero-loss integer precision using scaled fixed-point mathematical accumulators (1e18 precision).',
          'Strict adherence to OpenZeppelin ReentrancyGuard and SafeERC20 transfer invariants.',
        ],
      },
      objectives: [
        'Author secure, gas-efficient staking contracts with storage packing.',
        'Implement time-weighted reward accumulation calculations without dynamic loops.',
        'Enforce role-based access control for administrative safety.',
        'Integrate Ethers.js and MetaMask for seamless decentralized wallet interactions.',
        'Deploy and verify on EVM-compatible chains including Base and Ethereum.',
      ],
      roleAndContributions: {
        roleTitle: 'Smart Contract & Web3 Developer',
        summary:
          'Directly developed and tested the smart contracts in Foundry, optimized storage layouts, and built the Web3 front-end interaction layer.',
        personalContributions: [
          'Designing and implementing staking smart contracts in Solidity.',
          'Implementing time-weighted reward calculations without dynamic loops.',
          'Developing reward distribution mechanisms with scaled precision.',
          'Implementing role-based access control with OpenZeppelin AccessControl.',
          'Optimizing contract storage layout for gas efficiency.',
          'Integrating wallet connectivity via Ethers.js and MetaMask.',
          'Implementing token approval, staking, reward claiming, and unstaking interactions.',
          'Deploying and testing across EVM-compatible blockchain networks including Base and Main.',
        ],
      },
      technicalImplementation: {
        overview:
          'Written in Solidity 0.8.x using Foundry toolchain and tested with unit and fuzz test suites. Integrated with React and Vite using Ethers.js v6.',
        workflowSteps: [
          {
            step: '01',
            title: 'Allowance & Approval',
            description: 'User authorizes contract to transfer BCT tokens via standard ERC-20 approve pattern.',
          },
          {
            step: '02',
            title: 'Staking & Checkpoint Accounting',
            description: 'Contract updates user position and global accumulator in single packed 32-byte slot.',
          },
          {
            step: '03',
            title: 'Continuous Yield Accrual',
            description: 'Time-weighted reward index advances based on block timestamps without array loops.',
          },
          {
            step: '04',
            title: 'Claim & Unstake',
            description: 'Rewards or principal transferred via SafeERC20 under non-reentrant locks.',
          },
        ],
        architecturalHighlights: [
          'Storage slot packing combining position parameters into 32-byte words.',
          'Scaled fixed-point precision accumulator (1e18 multiplier) eliminating rounding deficits.',
          'Foundry automated test coverage including invariant and fuzz tests.',
        ],
      },
      mainFeatures: [
        'Non-custodial ERC-20 staking with timestamp tracking.',
        'O(1) time-weighted reward distribution math.',
        'Storage packing reducing EVM gas costs.',
        'Role-based access control for contract admin parameters.',
        'Ethers.js and MetaMask wallet integration with network validation.',
        'Token approval, deposit, claim, and unstake workflows.',
      ],
      techCategories: [
        { categoryName: 'Smart Contracts & Languages', items: ['Solidity 0.8.x', 'OpenZeppelin Contracts', 'EVM Bytecode'] },
        { categoryName: 'Development & Testing Tools', items: ['Foundry', 'Forge Test Harness', 'Fuzz Testing'] },
        { categoryName: 'Networks & Protocols', items: ['Base Network', 'Ethereum / EVM Mainnet'] },
        { categoryName: 'Web3 & Frontend', items: ['Ethers.js v6', 'MetaMask', 'React', 'Vite', 'JavaScript'] },
      ],
      architecture: {
        overview:
          'BCT Staking Platform employs a modular smart contract architecture decoupling token custody, reward accumulation index math, and admin access control, connected via Ethers.js to client wallets.',
        flowSteps: [
          {
            step: '01',
            title: 'Client Wallet Connection',
            description: 'Ethers.js detects MetaMask, validates network ID, and reads user ERC-20 BCT balances.',
          },
          {
            step: '02',
            title: 'Approve & Stake Execution',
            description: 'Transaction executes through StakingContract.sol, transferring tokens into vault custody.',
          },
          {
            step: '03',
            title: 'State Accumulation',
            description: 'Contract updates totalStakedSupply and advances accumulatedRewardPerShare index.',
          },
          {
            step: '04',
            title: 'Claim Execution',
            description: 'User queries pending reward and triggers claim; tokens transferred via SafeERC20.',
          },
        ],
        nodes: [
          { name: 'BCTStaking.sol', role: 'Core Staking Vault & Logic', status: 'AUDITED' },
          { name: 'RewardAccumulator', role: 'Time-Weighted Index Math', status: 'ACTIVE' },
          { name: 'AccessControl.sol', role: 'Role-Based Admin Protection', status: 'LOCKED' },
          { name: 'Ethers.js Client', role: 'Provider RPC & Signer Bridge', status: 'CONNECTED' },
        ],
      },
      codeSpecimen: {
        filename: 'BCTStaking.sol',
        language: 'solidity',
        description:
          'Storage-packed staking position struct and constant-time reward calculation logic in Solidity.',
        code: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

contract BCTStaking is ReentrancyGuard, AccessControl {
    using SafeERC20 for IERC20;

    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    // Packed 32-byte storage slot layout for maximum gas efficiency
    struct StakerPosition {
        uint128 stakedAmount;   // 16 bytes
        uint64  rewardDebt;     // 8 bytes
        uint64  lastTimestamp;  // 8 bytes -> Exactly 32 bytes (1 slot)
    }

    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardToken;

    uint256 public constant PRECISION = 1e18;
    uint256 public rewardPerTokenStored;
    uint256 public lastUpdateTime;
    uint256 public rewardRate; // Rewards per second
    uint256 public totalStaked;

    mapping(address => StakerPosition) public positions;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    constructor(address _stakingToken, address _rewardToken, uint256 _rewardRate) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        rewardRate = _rewardRate;
    }

    function stake(uint128 amount) external nonReentrant {
        require(amount > 0, "Cannot stake 0");
        _updateReward(msg.sender);

        totalStaked += amount;
        positions[msg.sender].stakedAmount += amount;
        positions[msg.sender].lastTimestamp = uint64(block.timestamp);

        stakingToken.safeTransferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount);
    }
}`,
      },
    },
  },

  // ==========================================
  // 03 — Semantiscope | E-Commerce Reviews Analyzer (FYP)
  // ==========================================
  {
    id: 'semantiscope-review-analyzer',
    number: '03',
    title: 'Semantiscope',
    subtitle: 'AI & NLP E-Commerce Review Scraping & Sentiment Analysis Engine (FYP)',
    category: 'AI / NLP / FULL-STACK DEVELOPMENT',
    primaryGroup: 'AI & INTELLIGENT SYSTEMS',
    priorityOrder: 3,
    featured: false,
    year: '2024 – 2025',
    role: 'Full-Stack & AI Engineer (Final Year Project)',
    status: 'COMPLETED (FYP)',
    image: '/src/assets/images/semantiscope_mobile_app_1793552532853.jpg',
    visualType: 'nlp',
    githubClient: 'https://github.com/fatimahere7/fyp-client',
    githubServer: 'https://github.com/fatimahere7/fyp-server',
    github: 'https://github.com/fatimahere7/fyp-server',
    caseStudyUrl: '#project-semantiscope-review-analyzer',
    introduction:
      'Semantiscope is a full-stack mobile application and AI pipeline that automatically extracts customer reviews from e-commerce platforms such as Daraz, classifies review sentiment with a DistilBERT transformer model, and generates structured executive summaries using Google Gemini, freeing consumers from manually sifting through hundreds of reviews.',
    description:
      'Engineered an end-to-end sentiment intelligence solution combining a Python FastAPI web scraper, Hugging Face DistilBERT classification, Google Gemini generative summarization, and an intuitive React Native Expo mobile application.',
    problemStatement:
      'Online shoppers navigating platforms like Daraz encounter hundreds of unstructured, repetitive, and noisy reviews. Manually reading through them to uncover recurring product flaws or genuine consensus is inefficient, frustrating, and prone to subjective bias.',
    objectives: [
      'Build resilient backend REST APIs using FastAPI capable of extracting reviews from Daraz product URLs with configurable page limits.',
      'Process and classify review sentiments accurately using a localized DistilBERT transformer via Hugging Face Transformers.',
      'Generate natural language executive summaries of customer feedback using the Google Gemini generative API.',
      'Develop an intuitive mobile application in React Native and Expo to submit URLs and visualize sentiment metrics.',
      'Integrate the mobile client with the FastAPI backend with structured error handling and loading feedback.',
    ],
    roleAndContributions: {
      roleTitle: 'Full-Stack & AI Engineer (Final Year Project)',
      summary:
        'Individually designed and developed both the Python FastAPI AI backend and the React Native Expo mobile client for the Final Year Project.',
      personalContributions: [
        'Developed backend REST APIs using Python and FastAPI with request validation and asynchronous execution.',
        'Engineered web scraping routines that parse Daraz e-commerce product pages given a URL and configurable page limit.',
        'Extracted, cleaned, and normalized customer reviews for natural language processing.',
        'Integrated DistilBERT using Hugging Face Transformers for sentiment classification (positive, neutral, negative).',
        'Connected Google Gemini API to generate structured qualitative summaries of product strengths and drawbacks.',
        'Returned structured responses bundling individual review classifications, sentiment distribution ratios, and AI summaries.',
        'Developed the mobile client application using React Native and Expo.',
        'Implemented URL input screens with configurable scraping depth limits.',
        'Designed graphical views displaying overall sentiment distributions.',
        'Created presentation components for AI-generated product summaries and categorized review lists.',
        'Integrated mobile client with the FastAPI backend through asynchronous HTTP services.',
      ],
    },
    technicalImplementation: {
      overview:
        'The architecture combines a high-performance Python FastAPI service running web scraping and transformer inference with a React Native Expo client. Individual reviews are classified locally via DistilBERT, while aggregate review corpora are submitted to Google Gemini for contextual summary synthesis.',
      workflowSteps: [
        {
          step: '01',
          title: 'URL Submission & Crawling',
          description:
            'User submits a Daraz product link and max page limit on the mobile app; FastAPI initiates scraping routines to extract review text, star ratings, and metadata.',
        },
        {
          step: '02',
          title: 'Data Preprocessing & Normalization',
          description:
            'Extracted reviews are cleansed of markup, emojis, and noise, then structured into standardized tokenized sequences.',
        },
        {
          step: '03',
          title: 'DistilBERT Sentiment Inference',
          description:
            'Each review passes through Hugging Face DistilBERT to classify sentiment polarity (Positive, Neutral, Negative) and calculate overall distribution ratios.',
        },
        {
          step: '04',
          title: 'Gemini Generative Summarization',
          description:
            'The aggregated review set is prompted into Google Gemini API to generate a balanced summary of key pros, cons, and buyer verdict.',
        },
        {
          step: '05',
          title: 'Mobile Presentation',
          description:
            'React Native client renders sentiment charts, executive summaries, and searchable review cards in an organized dashboard.',
        },
      ],
      architecturalHighlights: [
        'Hybrid AI design: combining local transformer classification (DistilBERT) with cloud generative AI (Gemini).',
        'Asynchronous scraping routines accommodating pagination and dynamic e-commerce DOM structures.',
        'Clean separation of concerns with dual repositories: fyp-server (FastAPI) and fyp-client (React Native).',
        'Structured JSON response format pairing granular review sentiment with holistic executive summaries.',
      ],
    },
    mainFeatures: [
      'Automated e-commerce web scraping accepting direct Daraz product URLs.',
      'Configurable review page crawling limits to control extraction depth and speed.',
      'Granular sentiment classification for each review powered by DistilBERT.',
      'Aggregated sentiment distribution analytics with percentage breakdowns.',
      'AI-powered executive summaries highlighting top pros and cons via Google Gemini.',
      'Intuitive cross-platform mobile client built with React Native and Expo.',
      'Dual-repository open-source architecture with clear API separation.',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'React Native',
      'Expo',
      'JavaScript',
      'DistilBERT',
      'Hugging Face Transformers',
      'Google Gemini API',
      'Web Scraping',
      'REST APIs',
    ],
    techCategories: [
      { categoryName: 'Backend & APIs', items: ['Python 3.10+', 'FastAPI', 'REST APIs', 'BeautifulSoup'] },
      { categoryName: 'AI & NLP Models', items: ['DistilBERT', 'Hugging Face Transformers', 'Google Gemini API'] },
      { categoryName: 'Mobile Client', items: ['React Native', 'Expo', 'JavaScript', 'Axios'] },
      { categoryName: 'Data & Output', items: ['Sentiment Scoring', 'Generative Summarization', 'JSON Schemas'] },
    ],
    caseStudy: {
      challenge: {
        summary:
          'Consumers shopping on marketplaces like Daraz are inundated with hundreds of unstructured comments containing colloquialisms, noise, and contradictory feedback, while raw scraping often encounters page pagination and dynamic markup shifts.',
        bottlenecks: [
          'High latency when running heavy NLP classification sequentially on large review datasets.',
          'Noisy colloquial text with non-standard formatting confounding simplistic keyword sentiment tools.',
          'Need to combine granular per-review classification with a coherent high-level summary.',
        ],
        constraints: [
          'FastAPI endpoints must return combined sentiment classifications and AI summaries within reasonable mobile request timeouts.',
          'Model inference must run without requiring expensive dedicated GPU clusters.',
          'Mobile interface must provide clear progress feedback during scraping and analysis.',
        ],
      },
      objectives: [
        'Develop FastAPI backend endpoints for URL-based review extraction and page limit configuration.',
        'Integrate DistilBERT for reliable sentiment categorization.',
        'Incorporate Google Gemini for generative pros/cons summarization.',
        'Deliver a cross-platform mobile app in React Native and Expo.',
      ],
      roleAndContributions: {
        roleTitle: 'Full-Stack & AI Engineer (Final Year Project)',
        summary:
          'Sole developer of both the FastAPI server and the React Native mobile application for the university Final Year Project.',
        personalContributions: [
          'FastAPI REST API development with asynchronous scraping and validation.',
          'Daraz product page web scraping with configurable page depth.',
          'Review text cleaning, tokenization, and normalization.',
          'DistilBERT sentiment classification using Hugging Face Transformers.',
          'Google Gemini API integration for generative review summaries.',
          'React Native & Expo mobile application engineering.',
          'Mobile UI for URL input, review depth, and sentiment visualization.',
          'Client-server integration and error state handling.',
        ],
      },
      technicalImplementation: {
        overview:
          'FastAPI service extracts reviews, runs DistilBERT inference for sentiment polarity, sends aggregated text to Gemini for executive summaries, and serves the mobile client.',
        workflowSteps: [
          { step: '01', title: 'Product URL Parsing', description: 'FastAPI accepts Daraz URL and configurable page limit parameter.' },
          { step: '02', title: 'Web Scraping', description: 'Scraping module crawls paginated product reviews and cleans raw HTML.' },
          { step: '03', title: 'DistilBERT Inference', description: 'Reviews are classified into Positive, Neutral, or Negative classes.' },
          { step: '04', title: 'Gemini Summarization', description: 'Gemini synthesizes qualitative product feedback into structured pros and cons.' },
          { step: '05', title: 'Client Rendering', description: 'Expo mobile client renders sentiment distribution charts and summaries.' },
        ],
        architecturalHighlights: [
          'Hybrid NLP architecture pairing localized transformer classification with LLM summarization.',
          'Configurable scraping depth balancing latency and sample size.',
          'Complete client and server open-source codebases on GitHub.',
        ],
      },
      mainFeatures: [
        'Automated Daraz product review scraping with URL input.',
        'Configurable review page crawling limits.',
        'DistilBERT sentiment analysis per review.',
        'Overall sentiment distribution charts.',
        'Google Gemini-generated executive pros and cons summaries.',
        'React Native Expo cross-platform mobile interface.',
      ],
      techCategories: [
        { categoryName: 'Backend & APIs', items: ['Python', 'FastAPI', 'REST APIs', 'Web Scraping'] },
        { categoryName: 'AI & NLP Models', items: ['DistilBERT', 'Hugging Face Transformers', 'Google Gemini API'] },
        { categoryName: 'Mobile Client', items: ['React Native', 'Expo', 'JavaScript'] },
      ],
      architecture: {
        overview:
          'FastAPI orchestrates scraping, passes sanitized text through a localized DistilBERT pipeline, queries the Gemini API for executive synthesis, and streams structured JSON to the Expo mobile app.',
        flowSteps: [
          { step: '01', title: 'Mobile Request', description: 'React Native sends Daraz URL and page limit to FastAPI.' },
          { step: '02', title: 'Scraping Engine', description: 'Scraper fetches review text, ratings, and user feedback from Daraz.' },
          { step: '03', title: 'NLP Pipeline', description: 'DistilBERT scores sentiment polarity for each extracted review.' },
          { step: '04', title: 'Gemini Synthesis', description: 'Review collection prompted into Gemini for pros/cons executive summary.' },
        ],
        nodes: [
          { name: 'React Native Client', role: 'Expo Mobile Interface', status: 'ACTIVE' },
          { name: 'FastAPI Gateway', role: 'REST API & Scraping Orchestrator', status: 'ACTIVE' },
          { name: 'DistilBERT Model', role: 'Hugging Face Sentiment Classifier', status: 'LOADED' },
          { name: 'Google Gemini API', role: 'Generative Executive Summarizer', status: 'CONNECTED' },
        ],
      },
    },
  },

  // ==========================================
  // 04 — Resume RAG Implementation
  // ==========================================
  {
    id: 'resume-rag-implementation',
    number: '04',
    title: 'Resume RAG Implementation',
    subtitle: 'Progressive Framework-Free Retrieval-Augmented Generation Pipeline',
    category: 'ARTIFICIAL INTELLIGENCE / BACKEND / RAG',
    primaryGroup: 'AI & INTELLIGENT SYSTEMS',
    priorityOrder: 4,
    featured: false,
    year: '2024',
    role: 'AI & Python Developer',
    status: 'COMPLETED (V1–V4)',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85',
    visualType: 'rag',
    github: 'https://github.com/fatimahere7/resume-rag-implementation',
    caseStudyUrl: '#project-resume-rag-implementation',
    introduction:
      'A hands-on, framework-free exploration of Retrieval-Augmented Generation (RAG) fundamentals implemented from scratch in Python without high-level wrappers like LangChain or LlamaIndex. Uses resume data as the knowledge source and evolves across 4 distinct iterations: keyword matching, chunk-based retrieval, dense semantic vector similarity, and sliding-window PDF ingestion.',
    description:
      'Constructed a bare-metal RAG pipeline from first principles, comparing keyword retrieval (V1), hierarchical chunking (V2), dense embedding cosine similarity (V3), and overlapping sliding-window PDF processing (V4) to evaluate context precision.',
    problemStatement:
      'High-level RAG frameworks conceal the critical mechanical trade-offs between chunking boundaries, embedding distance metrics, and prompt injection structures, making it difficult to understand where information loss or hallucination occurs in production LLM pipelines.',
    objectives: [
      'Deconstruct the RAG pipeline into bare-metal components without third-party framework abstractions.',
      'Evolve retrieval progressively from naive keyword matching to dense vector embeddings and cosine similarity.',
      'Implement sliding-window chunking with overlapping boundaries to prevent split-context loss across sections.',
      'Support multi-format input (TXT and PDF) utilizing pypdf.',
      'Clearly document completed V1–V4 capabilities while defining an architectural roadmap for future enhancements.',
    ],
    roleAndContributions: {
      roleTitle: 'AI & Python Developer',
      summary:
        'Sole developer who conceived, implemented, tested, and documented all 4 evolutionary versions of the RAG pipeline in Python.',
      personalContributions: [
        'V1 — Keyword Retrieval: Implemented raw text loading, keyword token search, line-level retrieval, and basic prompt injection.',
        'V2 — Chunk-Based Retrieval: Developed hierarchical text chunking preserving heading and content relationships for coherent context.',
        'V3 — Semantic Retrieval: Generated text embeddings, implemented cosine similarity vector math, and ranked top-k chunks for LLM prompts.',
        'V4 — PDF-Based RAG: Integrated pypdf for PDF and TXT document ingestion, designed sliding-window chunking with configurable overlap.',
        'Benchmarked retrieval precision and hallucination resistance across each evolutionary phase.',
        'Documented clear architectural distinctions between completed functionality and planned future extensions.',
      ],
    },
    technicalImplementation: {
      overview:
        'Built entirely in Python using foundational libraries. The progression moves from simple token search (V1) to structured chunks (V2), vector embeddings with cosine similarity ranking (V3), and sliding-window PDF parsing with context overlap (V4).',
      workflowSteps: [
        {
          step: 'V1',
          title: 'Keyword Retrieval',
          description:
            'Loads raw text, scans query tokens across document lines, extracts matching rows, and injects them directly into the LLM prompt context.',
        },
        {
          step: 'V2',
          title: 'Chunk-Based Retrieval',
          description:
            'Divides documents into structured paragraphs preserving section headers, retrieving cohesive topic blocks rather than fragmented single lines.',
        },
        {
          step: 'V3',
          title: 'Semantic Retrieval',
          description:
            'Converts chunks into dense vector embeddings via embedding models, calculates cosine similarity against query vectors, and ranks top-k scoring chunks.',
        },
        {
          step: 'V4',
          title: 'PDF Sliding-Window Ingestion',
          description:
            'Extracts text from PDF/TXT documents using pypdf, applies sliding-window chunking with configurable token overlap, and feeds high-similarity chunks to the LLM.',
        },
      ],
      architecturalHighlights: [
        'Framework-free design providing complete visibility into vector math and context preparation.',
        'Sliding-window chunker with adjustable step size preventing critical boundary context loss.',
        'Pure cosine similarity vector ranking implemented without heavyweight vector database dependencies.',
        'Clear separation of current completed milestones (V1–V4) from the future architectural roadmap.',
      ],
    },
    mainFeatures: [
      'Four-stage evolutionary RAG implementation demonstrating foundational AI retrieval concepts.',
      'V1: Keyword token matching and line-level prompt injection.',
      'V2: Hierarchical chunking preserving heading and content associations.',
      'V3: Dense text embedding generation and cosine similarity vector ranking.',
      'V4: PDF text extraction via pypdf with overlapping sliding-window chunking.',
      'Context-grounded prompt engineering strictly constraining LLM answers to retrieved context.',
      'Zero-dependency framework architecture (no LangChain / LlamaIndex overhead).',
    ],
    futureRoadmap: [
      'Persistent vector database integration (Qdrant / ChromaDB).',
      'Hybrid search combining BM25 keyword frequency with dense vector embeddings.',
      'Cross-encoder reranking stage for high-precision context filtering.',
      'Automated RAG evaluation framework (Ragas) assessing faithfulness and answer relevance.',
    ],
    technologies: [
      'Python',
      'LLM APIs',
      'Text Embeddings',
      'Cosine Similarity',
      'pypdf',
      'Git',
      'GitHub',
    ],
    techCategories: [
      { categoryName: 'Core Runtime & Tooling', items: ['Python 3.10+', 'Git', 'GitHub'] },
      { categoryName: 'Document Processing', items: ['pypdf', 'Sliding-Window Chunker', 'Overlap Buffering'] },
      { categoryName: 'Retrieval & Vector Math', items: ['Text Embeddings', 'Cosine Similarity', 'Top-K Ranking'] },
      { categoryName: 'LLM & Generation', items: ['LLM APIs', 'Prompt Engineering', 'Context Grounding'] },
    ],
    caseStudy: {
      challenge: {
        summary:
          'High-level RAG frameworks hide the critical mechanics of chunking boundaries, embedding representations, and prompt injection, making it hard to identify the root cause of hallucination or retrieval degradation in domain-specific applications.',
        bottlenecks: [
          'Naive line-by-line retrieval loses semantic context surrounding sentences.',
          'Arbitrary chunk splits cut sentences in half, causing vector similarity to drop.',
          'Keyword search fails on synonyms and semantic equivalence.',
        ],
        constraints: [
          'No high-level frameworks (LangChain, LlamaIndex); must implement core mechanics explicitly in Python.',
          'Support both raw TXT and complex multi-page PDF documents.',
          'Ensure grounding: LLM responses must strictly reflect retrieved resume text.',
        ],
      },
      objectives: [
        'Implement an educational, progressive RAG pipeline across 4 clear versions.',
        'Compare keyword matching, chunking, and semantic vector similarity.',
        'Implement sliding-window PDF chunking with overlap using pypdf.',
        'Establish a clear foundation for future vector DB and reranking roadmap items.',
      ],
      roleAndContributions: {
        roleTitle: 'AI & Python Developer',
        summary:
          'Single-handedly built, evaluated, and documented all 4 versions of the RAG pipeline in Python.',
        personalContributions: [
          'V1 keyword search and line retrieval.',
          'V2 structured chunking preserving headers.',
          'V3 dense text embeddings and cosine similarity ranking.',
          'V4 pypdf PDF extraction and sliding-window overlapping chunking.',
          'Comparative analysis of retrieval quality across iterations.',
          'Documentation of completed V1–V4 vs future enhancements roadmap.',
        ],
      },
      technicalImplementation: {
        overview:
          'Evolutionary Python codebase starting with basic keyword matching, advancing through semantic vector embeddings, and culminating in sliding-window PDF processing.',
        workflowSteps: [
          { step: 'V1', title: 'Keyword Match', description: 'Token matching over lines; basic prompt injection.' },
          { step: 'V2', title: 'Hierarchical Chunks', description: 'Heading-aware chunks maintaining paragraph context.' },
          { step: 'V3', title: 'Dense Embeddings', description: 'Vectors generated and ranked using cosine similarity.' },
          { step: 'V4', title: 'Sliding-Window PDF', description: 'pypdf parses documents; overlapping chunks prevent split thoughts.' },
        ],
        architecturalHighlights: [
          'Direct mathematical cosine similarity implementation.',
          'Configurable chunk size and overlap parameters in V4.',
          'Transparent prompt templates for reliable LLM grounding.',
        ],
      },
      mainFeatures: [
        'V1 keyword search and prompt injection.',
        'V2 chunk-based structural retrieval.',
        'V3 vector embedding similarity ranking.',
        'V4 PDF sliding-window chunking with overlap.',
        'Framework-free architecture maximizing learning clarity.',
        'Clearly defined roadmap for future hybrid search and reranking.',
      ],
      techCategories: [
        { categoryName: 'Core Runtime', items: ['Python', 'Git', 'GitHub'] },
        { categoryName: 'Document Processing', items: ['pypdf', 'Sliding Window', 'Token Chunker'] },
        { categoryName: 'Vector Math & AI', items: ['Text Embeddings', 'Cosine Similarity', 'LLM APIs'] },
      ],
      architecture: {
        overview:
          'Documents are ingested, sliced via sliding windows, vectorized into dense representations, ranked against user query vectors via cosine similarity, and injected into the LLM context.',
        flowSteps: [
          { step: '01', title: 'Document Ingestion', description: 'pypdf extracts text streams from PDF and TXT knowledge files.' },
          { step: '02', title: 'Sliding-Window Chunking', description: 'Text split into overlapping chunks to preserve narrative boundaries.' },
          { step: '03', title: 'Vector Scoring', description: 'Query and chunks embedded; cosine similarity computes relevance ranking.' },
          { step: '04', title: 'Prompt Augmentation', description: 'Top-k chunks injected into system prompt to constrain LLM completion.' },
        ],
        nodes: [
          { name: 'Document Loader', role: 'pypdf Extraction Engine', status: 'ACTIVE' },
          { name: 'Sliding-Window Chunker', role: 'Context Overlap Manager', status: 'ACTIVE' },
          { name: 'Embedding Generator', role: 'Dense Vector Representation', status: 'ACTIVE' },
          { name: 'Cosine Ranker', role: 'Vector Similarity Math', status: 'ACTIVE' },
        ],
      },
    },
  },

  // ==========================================
  // 05 — Tycoonz Payslip | HRMS Backend
  // ==========================================
  {
    id: 'tycoonz-payslip-hrms',
    number: '05',
    title: 'Tycoonz Payslip',
    subtitle: 'Automated Payroll Calculation & Employee Management System',
    category: 'BACKEND DEVELOPMENT',
    primaryGroup: 'BACKEND & FINTECH',
    priorityOrder: 5,
    featured: false,
    year: '2024',
    role: 'Backend Developer',
    status: 'COMPLETED',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=85',
    visualType: 'hrms',
    caseStudyUrl: '#project-tycoonz-payslip-hrms',
    introduction:
      'Tycoonz Payslip is a business-oriented backend application for a Human Resource Management System (HRMS). Built with Node.js, Express.js, and MongoDB, it automates employee compensation calculations, recurring payslip generation, transactional email delivery, and personnel data management.',
    description:
      'Architected a reliable HRMS backend streamlining monthly employee payroll calculations, automating formatted payslip generation, dispatching transactional email notifications, and managing employee records with MongoDB persistence.',
    problemStatement:
      'Manual payroll processing across varying employee departments is labor-intensive, vulnerable to calculation discrepancies, and prone to delayed payslip delivery without automated notification systems.',
    objectives: [
      'Automate monthly employee salary calculations factoring base pay, allowances, overtime, and deductions.',
      'Generate structured electronic payslip documents and records programmatically.',
      'Integrate transactional email notification dispatch to deliver payslips directly to employee inboxes.',
      'Provide dependable CRUD endpoints for employee personnel profiles, department allocations, and role definitions.',
      'Persist compensation and payroll history in MongoDB for audit compliance.',
    ],
    roleAndContributions: {
      roleTitle: 'Backend Developer',
      summary:
        'Developed the backend architecture, payroll business logic, MongoDB data models, and email dispatch services.',
      personalContributions: [
        'Developed backend REST APIs using Node.js and Express.js adhering to service-layer separation.',
        'Engineered employee profile management modules with full CRUD capabilities and role assignments.',
        'Implemented automated payroll calculation algorithms accounting for variable deductions and bonuses.',
        'Automated payslip document data generation upon monthly payroll finalization.',
        'Integrated email notifications dispatching payslips directly to verified employee email addresses.',
        'Designed MongoDB document schemas using Mongoose for efficient storage and historical retrieval.',
      ],
    },
    technicalImplementation: {
      overview:
        'Constructed as a modular Node.js/Express.js backend utilizing MongoDB and Mongoose for document persistence. Business logic handles payroll calculations, while an asynchronous mailer service handles payslip dispatch.',
      workflowSteps: [
        {
          step: '01',
          title: 'Employee Administration',
          description:
            'HR managers create, update, and manage employee records, salary tiers, and department assignments via REST endpoints.',
        },
        {
          step: '02',
          title: 'Automated Payroll Run',
          description:
            'Backend computes gross pay, deductions, and net salary for each employee according to corporate compensation rules.',
        },
        {
          step: '03',
          title: 'Payslip Generation & Archival',
          description:
            'A structured payslip record is generated, linked to the employee ID, and persisted in MongoDB for auditing.',
        },
        {
          step: '04',
          title: 'Email Notification Dispatch',
          description:
            'An email notification containing the payslip breakdown is dispatched automatically to the employee inbox.',
        },
      ],
      architecturalHighlights: [
        'Modular Express.js controller-service pattern separating routing from payroll calculations.',
        'Mongoose schemas enforcing strict data validation on employee compensation and deduction fields.',
        'Automated email notification service sending formatted transaction summaries.',
      ],
    },
    mainFeatures: [
      'Employee record and departmental directory management with complete CRUD operations.',
      'Automated payroll computation factoring base salary, allowances, and deductions.',
      'Monthly electronic payslip generation with historical tracking.',
      'Automated transactional email dispatch delivering payslips directly to staff.',
      'MongoDB database persistence with Mongoose schema validation.',
    ],
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs'],
    techCategories: [
      { categoryName: 'Backend & Framework', items: ['Node.js', 'Express.js', 'REST APIs'] },
      { categoryName: 'Database & Models', items: ['MongoDB', 'Mongoose ODM'] },
      { categoryName: 'Automation & Mail', items: ['Email Dispatcher', 'Payroll Calculation Engine'] },
    ],
    caseStudy: {
      challenge: {
        summary:
          'Organizations need an automated, error-free system to compute monthly employee compensation, archive historical compensation records, and deliver verified payslips reliably without manual intervention.',
        bottlenecks: [
          'Manual spreadsheet calculations prone to formula errors and inconsistent historical records.',
          'Lack of centralized audit trails for past pay cycles.',
          'Delay in distributing physical or manual payslips to staff.',
        ],
        constraints: [
          'Precise numerical calculations for payroll figures.',
          'Guaranteed email delivery of finalized payslip notices.',
          'Structured employee record retention in MongoDB.',
        ],
      },
      objectives: [
        'Build Node.js/Express.js backend for HRMS and payroll automation.',
        'Implement automated payslip calculation logic.',
        'Integrate transactional email notifications.',
        'Manage employee records with MongoDB persistence.',
      ],
      roleAndContributions: {
        roleTitle: 'Backend Developer',
        summary:
          'Developed the backend REST APIs, MongoDB schemas, and payroll calculation logic.',
        personalContributions: [
          'Developing backend features using Node.js and Express.js.',
          'Implementing automated payslip generation.',
          'Implementing email notifications.',
          'Developing employee management modules.',
          'Working with MongoDB for data persistence.',
        ],
      },
      technicalImplementation: {
        overview:
          'Built with Node.js and Express.js, leveraging MongoDB and Mongoose for employee data and payslip archival, with an integrated email dispatch service.',
        workflowSteps: [
          { step: '01', title: 'Employee Management', description: 'CRUD endpoints for personnel details and departments.' },
          { step: '02', title: 'Payroll Calculation', description: 'Calculates salary, deductions, and tax figures.' },
          { step: '03', title: 'Payslip Creation', description: 'Generates structured payslip records in MongoDB.' },
          { step: '04', title: 'Email Dispatch', description: 'Sends automated payslip notifications to employee inboxes.' },
        ],
        architecturalHighlights: [
          'Service-oriented Express.js architecture.',
          'Mongoose validation rules ensuring data integrity.',
          'Automated email notification triggers.',
        ],
      },
      mainFeatures: [
        'Automated payslip generation.',
        'Email notification delivery.',
        'Employee directory and record management.',
        'MongoDB data persistence.',
      ],
      techCategories: [
        { categoryName: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs'] },
        { categoryName: 'Database', items: ['MongoDB', 'Mongoose'] },
      ],
      architecture: {
        overview:
          'Express.js backend coordinates employee state in MongoDB, processes payroll math through dedicated services, and triggers the email dispatch queue upon payroll completion.',
        flowSteps: [
          { step: '01', title: 'Admin Action', description: 'HR initiates monthly payroll run for target department.' },
          { step: '02', title: 'Calculation Engine', description: 'Backend calculates allowances, deductions, and net salary.' },
          { step: '03', title: 'Database Write', description: 'Payslip snapshot stored in MongoDB collections.' },
          { step: '04', title: 'Notification', description: 'Mailer service dispatches formatted payslips via SMTP.' },
        ],
        nodes: [
          { name: 'Employee API', role: 'Staff Directory Controller', status: 'ACTIVE' },
          { name: 'Payroll Calculator', role: 'Compensation Formula Engine', status: 'ACTIVE' },
          { name: 'MongoDB Database', role: 'Document Persistence', status: 'CONNECTED' },
          { name: 'Email Dispatcher', role: 'SMTP Notification Worker', status: 'ACTIVE' },
        ],
      },
    },
  },

  // ==========================================
  // 06 — Appointment Scheduler
  // ==========================================
  {
    id: 'appointment-scheduler',
    number: '06',
    title: 'Appointment Scheduler',
    subtitle: 'Booking Coordination & Timeslot Management Service',
    category: 'WEB DEVELOPMENT / BACKEND',
    primaryGroup: 'FULL-STACK APPLICATIONS',
    priorityOrder: 6,
    featured: false,
    year: '2023 – 2024',
    role: 'Web & Backend Developer',
    status: 'COMPLETED',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1400&q=85',
    visualType: 'scheduler',
    github: 'https://github.com/fatimahere7',
    caseStudyUrl: '#project-appointment-scheduler',
    introduction:
      'A web-based appointment scheduling application designed to help businesses and professionals coordinate client bookings, manage open timeslots, prevent scheduling collisions, and maintain verified appointment records using JavaScript, PHP, and MySQL.',
    description:
      'Engineered a lightweight, dependable booking coordination system with PHP and MySQL, offering conflict-free timeslot selection, dynamic calendar views, and administrative schedule controls.',
    problemStatement:
      'Coordinating client appointments manually via phone or email frequently results in double-booking conflicts, scheduling confusion, and administrative overhead without a centralized availability calendar.',
    objectives: [
      'Provide a clear interactive calendar interface for clients to select available appointment dates and timeslots.',
      'Enforce database-level uniqueness constraints and validation to prevent concurrent double-booking.',
      'Equip service providers with administrative tools to view, manage, and confirm bookings.',
      'Store customer details and appointment timestamps in a relational MySQL database.',
    ],
    roleAndContributions: {
      roleTitle: 'Web & Backend Developer',
      summary:
        'Developed the backend scripts, relational database schema, and client-side scheduling interface.',
      personalContributions: [
        'Designed relational MySQL database schemas for clients, appointments, and timeslot slots.',
        'Implemented PHP backend logic handling booking requests, validations, and status updates.',
        'Created server-side validation preventing overlapping bookings for the same timeslot.',
        'Built interactive client-side date and time selection using vanilla JavaScript.',
        'Developed administrative views to review, approve, and cancel scheduled appointments.',
      ],
    },
    technicalImplementation: {
      overview:
        'Structured around PHP server-side request processing with MySQL as the relational database. Client interactions use vanilla JavaScript for responsive DOM updates and date selection.',
      workflowSteps: [
        {
          step: '01',
          title: 'Availability Inquiry',
          description:
            'Client opens the booking view; JavaScript queries the PHP backend for open slots on the chosen date.',
        },
        {
          step: '02',
          title: 'Timeslot Selection & Submission',
          description:
            'Client selects an open window, enters contact details, and submits the booking form.',
        },
        {
          step: '03',
          title: 'Conflict Check & Insertion',
          description:
            'PHP validates availability, locks the slot within a MySQL transaction, and stores the booking.',
        },
        {
          step: '04',
          title: 'Booking Confirmation',
          description:
            'Client receives on-screen confirmation with booking reference; admin calendar reflects updated schedule.',
        },
      ],
      architecturalHighlights: [
        'PDO prepared statements safeguarding against SQL injection attacks.',
        'Relational constraints in MySQL preventing duplicate slot allocation.',
        'Lightweight, responsive frontend using vanilla JavaScript.',
      ],
    },
    mainFeatures: [
      'Interactive date and time slot selection interface.',
      'Server-side validation preventing schedule overlaps.',
      'MySQL relational storage of appointments and contact records.',
      'Administrative appointment dashboard for managing booked slots.',
      'Lightweight architecture with zero external framework dependencies.',
    ],
    technologies: ['JavaScript', 'PHP', 'MySQL', 'HTML5', 'CSS3'],
    techCategories: [
      { categoryName: 'Frontend', items: ['JavaScript', 'HTML5', 'CSS3'] },
      { categoryName: 'Backend & Database', items: ['PHP', 'MySQL', 'PDO Prepared Statements'] },
    ],
    caseStudy: {
      challenge: {
        summary:
          'Service professionals need a dependable digital booking system that prevents double-booking while keeping scheduling fast and friction-free for non-technical clients.',
        bottlenecks: [
          'Simultaneous booking attempts on the same calendar timeslot.',
          'Manual coordination overhead causing appointment drop-off.',
        ],
        constraints: [
          'No complex external framework dependencies.',
          'Database validation ensuring no conflicting bookings.',
        ],
      },
      objectives: [
        'Implement appointment booking with real-time slot checking.',
        'Prevent double-booking via MySQL transactional integrity.',
        'Provide administrative schedule management.',
      ],
      roleAndContributions: {
        roleTitle: 'Web & Backend Developer',
        summary:
          'Designed the database schema, wrote the PHP backend handlers, and implemented JavaScript client scheduling interactions.',
        personalContributions: [
          'PHP backend request handling and validation.',
          'MySQL database schema design and index optimization.',
          'Interactive calendar UI with vanilla JavaScript.',
          'Admin booking management functionality.',
        ],
      },
      technicalImplementation: {
        overview:
          'PHP server-side processing coupled with MySQL relational data storage and vanilla JavaScript for dynamic frontend calendar rendering.',
        workflowSteps: [
          { step: '01', title: 'Slot Selection', description: 'Client chooses date and reviews available timeslots.' },
          { step: '02', title: 'Data Submission', description: 'Contact details and slot posted to PHP endpoint.' },
          { step: '03', title: 'Database Storage', description: 'PDO prepared statements record booking in MySQL.' },
          { step: '04', title: 'Confirmation', description: 'Appointment verified and displayed on provider dashboard.' },
        ],
        architecturalHighlights: [
          'Secure PDO query execution.',
          'Indexed MySQL columns for fast slot availability checks.',
        ],
      },
      mainFeatures: [
        'Timeslot availability management.',
        'Conflict-free booking execution.',
        'MySQL appointment database.',
        'Administrative booking dashboard.',
      ],
      techCategories: [
        { categoryName: 'Technologies', items: ['JavaScript', 'PHP', 'MySQL', 'HTML5', 'CSS3'] },
      ],
      architecture: {
        overview:
          'Client selects slots through dynamic JavaScript, which sends AJAX requests to PHP endpoints backed by MySQL tables for clients and appointment timeslots.',
        flowSteps: [
          { step: '01', title: 'Fetch Available Slots', description: 'PHP queries MySQL for unclaimed slots on selected date.' },
          { step: '02', title: 'Submit Booking', description: 'Client POSTs contact details and chosen slot ID.' },
          { step: '03', title: 'Verify & Persist', description: 'Transaction checks slot availability and marks it reserved.' },
        ],
        nodes: [
          { name: 'Booking UI', role: 'JavaScript DOM Interface', status: 'ACTIVE' },
          { name: 'PHP Endpoint', role: 'Server Request Processor', status: 'ACTIVE' },
          { name: 'MySQL DB', role: 'Relational Slot Storage', status: 'CONNECTED' },
        ],
      },
    },
  },

  // ==========================================
  // 07 — E-Commerce Website
  // ==========================================
  {
    id: 'laravel-ecommerce-platform',
    number: '07',
    title: 'E-Commerce Website',
    subtitle: 'MVC Architecture & Transactional Catalog Engine in Laravel 11',
    category: 'WEB DEVELOPMENT / BACKEND',
    primaryGroup: 'FULL-STACK APPLICATIONS',
    priorityOrder: 7,
    featured: false,
    year: '2024',
    role: 'Backend & Full-Stack Developer',
    status: 'COMPLETED',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85',
    visualType: 'ecommerce',
    github: 'https://github.com/fatimahere7',
    caseStudyUrl: '#project-laravel-ecommerce-platform',
    introduction:
      'A full-featured e-commerce web platform developed using Laravel 11. Implements strict Model-View-Controller (MVC) architectural separation, Eloquent ORM relational models, shopping cart business logic, atomic inventory management, and payment processing.',
    description:
      'Engineered an e-commerce platform using Laravel 11, implementing clean MVC architecture, Blade templating, Eloquent ORM database relationships, shopping cart sessions, inventory tracking, and payment processing.',
    problemStatement:
      'Modern e-commerce platforms must manage complex product catalogs with variations, preserve persistent shopping cart states across user sessions, and maintain atomic inventory counts to avoid overselling during checkout bursts.',
    objectives: [
      'Implement clean MVC architecture adhering to modern Laravel 11 conventions and PSR coding standards.',
      'Model relational catalog data (products, categories, orders, order items) using Eloquent ORM.',
      'Build end-to-end shopping cart business logic with session persistence and quantity updates.',
      'Enforce atomic inventory updates using database transactions during checkout.',
      'Provide administrative CRUD interfaces for managing product catalogs, categories, and orders.',
    ],
    roleAndContributions: {
      roleTitle: 'Backend & Full-Stack Developer',
      summary:
        'Sole developer who built the application using Laravel 11, implementing backend business logic, Eloquent relationships, and Blade frontend templates.',
      personalContributions: [
        'Configured Laravel 11 MVC architecture with modular controllers, models, and request validators.',
        'Authored database migrations, seeders, and relational schemas in MySQL.',
        'Modeled complex Eloquent ORM relationships (hasMany, belongsTo, belongsToMany) with eager loading.',
        'Developed backend CRUD functionality for products, categories, and inventory items.',
        'Implemented shopping cart mechanics with dynamic subtotal, tax, and inventory validation.',
        'Integrated payment processing workflows and automated order creation upon payment validation.',
        'Created responsive storefront and admin management interfaces using Laravel Blade templates.',
      ],
    },
    technicalImplementation: {
      overview:
        'Built with Laravel 11 running PHP 8.2+ and MySQL. Uses Eloquent ORM for database transactions, Blade templates for server-rendered views, and transactional integrity during order placement.',
      workflowSteps: [
        {
          step: '01',
          title: 'Catalog Browsing & Search',
          description:
            'Users explore products filtered by category and keywords; Eloquent eager-loads category relationships to prevent N+1 query overhead.',
        },
        {
          step: '02',
          title: 'Cart Session Management',
          description:
            'Products are added to user cart sessions with server-side stock verification ensuring quantities do not exceed available inventory.',
        },
        {
          step: '03',
          title: 'Transactional Checkout',
          description:
            'During checkout, a database transaction validates payment, creates order records, and atomically decrements inventory counts.',
        },
        {
          step: '04',
          title: 'Order Tracking & Admin Management',
          description:
            'Users review past orders, while store administrators manage catalog items, restock inventory, and update order statuses.',
        },
      ],
      architecturalHighlights: [
        'Clean MVC structure with Form Request validation isolating HTTP validation from controllers.',
        'Eloquent ORM with eager loading preventing redundant database roundtrips.',
        'Database transactions guaranteeing atomicity across cart checkout and inventory decrementing.',
      ],
    },
    mainFeatures: [
      'Comprehensive product catalog with category hierarchies, search, and pagination.',
      'Shopping cart session management with dynamic tax, subtotal, and stock checking.',
      'Atomic inventory updates preventing stock overselling during checkout.',
      'Payment-related integration and order lifecycle tracking.',
      'Administrative back-office for managing products, categories, and inventory levels.',
      'Built on Laravel 11 following strict modern PHP standards.',
    ],
    technologies: ['PHP', 'Laravel 11', 'Blade', 'Eloquent ORM', 'MySQL', 'Tailwind CSS'],
    techCategories: [
      { categoryName: 'Framework & Language', items: ['PHP 8.2+', 'Laravel 11', 'MVC Architecture'] },
      { categoryName: 'Database & ORM', items: ['MySQL', 'Eloquent ORM', 'Database Migrations & Transactions'] },
      { categoryName: 'Presentation & Templating', items: ['Blade Templating', 'Tailwind CSS'] },
      { categoryName: 'E-Commerce Logic', items: ['Cart Sessions', 'Inventory Management', 'Payment Workflow'] },
    ],
    caseStudy: {
      challenge: {
        summary:
          'E-commerce systems require solid transactional integrity to prevent race conditions during stock updates, clean separation of concerns for maintainability, and efficient database querying for catalog browsing.',
        bottlenecks: [
          'N+1 query performance degradation when listing products with associated categories.',
          'Stock desynchronization if two users checkout the last inventory item simultaneously.',
        ],
        constraints: [
          'Full adherence to Laravel 11 MVC architectural guidelines.',
          'Atomic stock decrementing wrapped in database transactions.',
        ],
      },
      objectives: [
        'Develop an e-commerce platform using Laravel 11 and Blade.',
        'Model catalog and order relationships with Eloquent ORM.',
        'Implement cart, checkout, and inventory business logic.',
        'Provide administrative CRUD for catalog management.',
      ],
      roleAndContributions: {
        roleTitle: 'Backend & Full-Stack Developer',
        summary:
          'Built the entire Laravel 11 application from database schema design through backend logic and Blade views.',
        personalContributions: [
          'MVC architecture configuration and routing.',
          'Blade templating for storefront and admin views.',
          'Eloquent ORM relationship modeling and eager loading.',
          'Backend business logic for cart and checkout.',
          'CRUD functionality for products and categories.',
          'Payment-related functionality and inventory decrementing.',
        ],
      },
      technicalImplementation: {
        overview:
          'Laravel 11 backend utilizing Eloquent ORM for relational persistence, Blade for server-rendered UI, and MySQL database transactions during order processing.',
        workflowSteps: [
          { step: '01', title: 'Browse Products', description: 'Catalog rendered with eager-loaded category relationships.' },
          { step: '02', title: 'Cart Operations', description: 'Session-backed cart with stock validation.' },
          { step: '03', title: 'Checkout Transaction', description: 'Atomically creates order and updates inventory in MySQL.' },
          { step: '04', title: 'Admin Controls', description: 'Back-office dashboard for inventory and product catalog.' },
        ],
        architecturalHighlights: [
          'Strict Form Request validation classes.',
          'Eloquent eager loading to eliminate N+1 queries.',
          'Atomic database transactions during order finalization.',
        ],
      },
      mainFeatures: [
        'MVC architecture in Laravel 11.',
        'Eloquent ORM with eager loading.',
        'Blade templated responsive storefront.',
        'Session cart & transactional inventory deduction.',
        'Administrative catalog CRUD operations.',
      ],
      techCategories: [
        { categoryName: 'Framework', items: ['Laravel 11', 'PHP', 'Blade'] },
        { categoryName: 'Database', items: ['MySQL', 'Eloquent ORM'] },
      ],
      architecture: {
        overview:
          'Laravel 11 routes requests through middleware and Form Requests to controllers, which interact with Eloquent models to persist data to MySQL and render Blade views.',
        flowSteps: [
          { step: '01', title: 'Routing & Middleware', description: 'Request parsed and validated through Laravel Form Request.' },
          { step: '02', title: 'Controller Processing', description: 'Controller coordinates cart calculations and Eloquent calls.' },
          { step: '03', title: 'Transaction Commit', description: 'DB transaction writes order and decrements product inventory.' },
        ],
        nodes: [
          { name: 'Laravel Controller', role: 'MVC Request Orchestration', status: 'ACTIVE' },
          { name: 'Eloquent ORM', role: 'Relational Entity Mapper', status: 'ACTIVE' },
          { name: 'MySQL Database', role: 'Transactional Storage', status: 'CONNECTED' },
          { name: 'Blade Engine', role: 'Server View Rendering', status: 'ACTIVE' },
        ],
      },
    },
  },
];
