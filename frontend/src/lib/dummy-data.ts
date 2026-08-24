export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  rating: number;
  reviewsCount: number;
  experience: string; // e.g., "0-2 Yrs"
  salary: string; // e.g., "3.5 - 5.0 LPA"
  location: string;
  postedTime: string; // e.g., "1 day ago"
  description: string;
  skills: string[];
  isHot?: boolean;
  department: string;
  workMode: "Work from office" | "Hybrid" | "Remote" | "Temp home";
  companyType: "MNC" | "Startup" | "Corporate" | "Indian MNC";
  jobType: "Full Time" | "Internship" | "Contract";
  aboutCompany: string;
  benefits: { icon: string; title: string; desc: string }[];
  similarJobs: string[]; // Job IDs
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewsCount: number;
  recommendToFriend: number; // percentage
  ceoApproval: number; // percentage
  industry: string;
  employees: string;
  founded: string;
  headquarters: string;
  overallRating: number;
  workLifeBalance: number;
  jobSecurity: number;
  salaryBenefits: number;
  careerGrowth: number;
  workCulture: number;
  pros: string[];
  cons: string[];
  reviewsList: {
    id: string;
    rating: number;
    title: string;
    department: string;
    employmentType: string;
    date: string;
    content: string;
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

export interface PopularRole {
  title: string;
  jobsCount: string;
  icon: string;
}

export interface InterviewQuestion {
  id: string;
  companyName: string;
  companyLogo: string;
  title: string;
  questionsCount: string;
  detailsLink?: string;
}

// -------------------------------------------------------------
// DUMMY DATA FOR THE JOB PORTAL
// -------------------------------------------------------------

export const companies: Company[] = [
  {
    id: "energizer",
    name: "Energizer",
    logo: "⚡",
    rating: 4.5,
    reviewsCount: 649,
    recommendToFriend: 89,
    ceoApproval: 92,
    industry: "Renewable Energy & Utilities",
    employees: "1,000 - 5,000 employees",
    founded: "2012",
    headquarters: "San Francisco, CA",
    overallRating: 4.5,
    workLifeBalance: 4.3,
    jobSecurity: 4.6,
    salaryBenefits: 4.4,
    careerGrowth: 4.2,
    workCulture: 4.5,
    pros: [
      "Excellent work-life balance with highly flexible hybrid work options.",
      "Very supportive management and transparent leadership communication.",
      "Great health benefits and competitive compensation packages."
    ],
    cons: [
      "Growth path can sometimes be slow depending on the team budget.",
      "Internal tooling is a bit outdated and needs refactoring."
    ],
    reviewsList: [
      {
        id: "rev1",
        rating: 5,
        title: "Energizing and Supportive Environment",
        department: "Engineering",
        employmentType: "Full Time",
        date: "July 2026",
        content: "Energizer is a fantastic company. The team is dynamic and really values innovation. The focus on renewable energy gives a strong sense of purpose to our day-to-day coding."
      },
      {
        id: "rev2",
        rating: 4,
        title: "Great learning curve for Juniors",
        department: "Product Management",
        employmentType: "Internship",
        date: "June 2026",
        content: "I started here as an intern. The onboarding was smooth and mentors are always available to guide you. Highly recommended for dynamic folks starting their career."
      }
    ]
  },
  {
    id: "tcs",
    name: "TCS",
    logo: "🌐",
    rating: 3.9,
    reviewsCount: 25400,
    recommendToFriend: 72,
    ceoApproval: 85,
    industry: "IT Services & Consulting",
    employees: "500,000+ employees",
    founded: "1968",
    headquarters: "Mumbai, India",
    overallRating: 3.9,
    workLifeBalance: 4.0,
    jobSecurity: 4.5,
    salaryBenefits: 3.2,
    careerGrowth: 3.5,
    workCulture: 3.8,
    pros: [
      "Unmatched job security and project variety.",
      "Great learning resources and global certifications for free.",
      "Work-life balance is generally good and stress is low in support projects."
    ],
    cons: [
      "Hikes are below industry standard for average performers.",
      "Bureaucracy is present due to massive organizational size."
    ],
    reviewsList: []
  },
  {
    id: "infosys",
    name: "Infosys BPM",
    logo: "🔷",
    rating: 3.8,
    reviewsCount: 18200,
    recommendToFriend: 68,
    ceoApproval: 79,
    industry: "IT Services & Consulting",
    employees: "300,000+ employees",
    founded: "1981",
    headquarters: "Bengaluru, India",
    overallRating: 3.8,
    workLifeBalance: 3.9,
    jobSecurity: 4.2,
    salaryBenefits: 3.1,
    careerGrowth: 3.4,
    workCulture: 3.7,
    pros: [
      "Beautiful campuses with excellent infrastructure.",
      "Strong training program for freshers (Mysore Campus is legendary).",
      "Flexible working arrangements depending on clients."
    ],
    cons: [
      "Compensation packages for entry-level roles have been stagnant.",
      "Promotion cycle can be highly competitive and slow."
    ],
    reviewsList: []
  },
  {
    id: "cognizant",
    name: "Cognizant",
    logo: "⚛️",
    rating: 3.7,
    reviewsCount: 15300,
    recommendToFriend: 65,
    ceoApproval: 74,
    industry: "IT Services & Consulting",
    employees: "340,000+ employees",
    founded: "1994",
    headquarters: "Teaneck, NJ",
    overallRating: 3.7,
    workLifeBalance: 3.6,
    jobSecurity: 3.8,
    salaryBenefits: 3.4,
    careerGrowth: 3.5,
    workCulture: 3.6,
    pros: [
      "Excellent opportunity to work with top-tier fortune 500 clients.",
      "Fast-paced environments that keep you technically sharp.",
      "Good team collaboration and technical peers."
    ],
    cons: [
      "Appraisal process is sometimes considered rigid by employees.",
      "Varying management quality across different business units."
    ],
    reviewsList: []
  }
];

export const jobs: Job[] = [
  {
    id: "1",
    title: "Intern/Junior Hiring - Young and Dynamic Folks",
    companyId: "energizer",
    companyName: "Energizer",
    companyLogo: "⚡",
    rating: 4.5,
    reviewsCount: 649,
    experience: "0 - 2 Yrs",
    salary: "4.5 - 7.5 LPA",
    location: "San Francisco, CA (Hybrid)",
    postedTime: "1 day ago",
    description: "Are you a young and dynamic individual passionate about technology? Energizer is hiring Junior Developers and Interns to join our fast-paced Engineering team. You will be working on modern web architectures using Next.js, React, Node, and Tailwind CSS. We offer hands-on mentorship, exciting project ownership, and a clear path to career growth.",
    skills: ["React", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript"],
    isHot: true,
    department: "Software Engineering",
    workMode: "Hybrid",
    companyType: "Corporate",
    jobType: "Full Time",
    aboutCompany: "Energizer is a leader in sustainable energy technology, creating modern energy grid applications, battery management software, and consumer energy trackers. We build high-performance green tech solutions to solve tomorrow's climate and power crises.",
    benefits: [
      { icon: "🏥", title: "Comprehensive Health Care", desc: "Top-tier health, dental, and vision insurance covered 100% for you and dependents." },
      { icon: "🏠", title: "Flexible Work Modes", desc: "Work from home up to 3 days a week. We provide a state-of-the-art office workspace." },
      { icon: "🎓", title: "Learning & Development", desc: "USD $2,500 annual allowance for courses, conferences, books, and certifications." },
      { icon: "🏋️", title: "Wellness allowance", desc: "Free gym membership and health club stipends up to $100 per month." }
    ],
    similarJobs: ["2", "3", "5"]
  },
  {
    id: "2",
    title: "React Web Developer (Junior)",
    companyId: "infosys",
    companyName: "Infosys BPM",
    companyLogo: "🔷",
    rating: 3.8,
    reviewsCount: 18200,
    experience: "1 - 3 Yrs",
    salary: "3.5 - 5.0 LPA",
    location: "Bengaluru, India (Office)",
    postedTime: "2 days ago",
    description: "Looking for an energetic frontend developer to build responsive user interfaces for a major global banking client. The candidate must possess solid knowledge of React, Redux, Tailwind, and CSS grids. You will collaborate closely with UI/UX designers and backend systems.",
    skills: ["React", "Redux", "CSS Grid", "HTML5", "Rest API"],
    isHot: false,
    department: "Software Engineering",
    workMode: "Work from office",
    companyType: "Indian MNC",
    jobType: "Full Time",
    aboutCompany: "Infosys BPM, the business process management subsidiary of Infosys, provides integrated outsourcing solutions to global corporations, utilizing cutting-edge automation and analytics.",
    benefits: [
      { icon: "🚌", title: "Free Cab Services", desc: "Complimentary pickup and drop from key points in the city." },
      { icon: "🍕", title: "Cafeteria Allowance", desc: "Subsidized meals at multi-cuisine food courts inside our campus." },
      { icon: "🏥", title: "Medical Insurance", desc: "Standard medical coverage for family up to 3 Lakhs." }
    ],
    similarJobs: ["1", "3"]
  },
  {
    id: "3",
    title: "Graduate Engineer Trainee (GET)",
    companyId: "tcs",
    companyName: "TCS",
    companyLogo: "🌐",
    rating: 3.9,
    reviewsCount: 25400,
    experience: "0 - 1 Yrs",
    salary: "3.6 - 4.2 LPA",
    location: "Pune, India (Hybrid)",
    postedTime: "Just now",
    description: "TCS is inviting applications from recent engineering graduates of 2025 and 2026 batches. Excellent opportunity to get trained on enterprise domains including Cloud Services, Salesforce, Full Stack Development, and Cyber Security. Strong analytical and communication skills are required.",
    skills: ["Python", "SQL", "Java", "HTML", "C++"],
    isHot: true,
    department: "Engineering",
    workMode: "Hybrid",
    companyType: "Indian MNC",
    jobType: "Full Time",
    aboutCompany: "Tata Consultancy Services (TCS) is an IT services, consulting and business solutions organization that has been partnering with many of the world’s largest businesses in their transformation journeys for over 50 years.",
    benefits: [
      { icon: "🛡️", title: "Job Security", desc: "Highly stable career environment with continuous learning and horizontal project changes." },
      { icon: "🎓", title: "TCS iON Training", desc: "Access to thousands of industry-standard courses and certification programs." }
    ],
    similarJobs: ["1", "2"]
  },
  {
    id: "4",
    title: "Senior Product Designer",
    companyId: "energizer",
    companyName: "Energizer",
    companyLogo: "⚡",
    rating: 4.5,
    reviewsCount: 649,
    experience: "5 - 8 Yrs",
    salary: "12.0 - 18.0 LPA",
    location: "Remote (USA)",
    postedTime: "3 days ago",
    description: "We are seeking a senior designer to lead our user research, wireframing, and interactive prototyping processes for our global energy dashboards. You should have a portfolio displaying complex analytics systems, modern styling aesthetics, and strong team leadership capabilities.",
    skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems"],
    isHot: true,
    department: "UI/UX Design",
    workMode: "Remote",
    companyType: "Corporate",
    jobType: "Full Time",
    aboutCompany: "Energizer is a leader in sustainable energy technology, creating modern energy grid applications, battery management software, and consumer energy trackers.",
    benefits: [
      { icon: "💻", title: "Home Office Stipend", desc: "$1,500 to buy premium chairs, desks, or monitors for your remote office." },
      { icon: "🏥", title: "Comprehensive Health Care", desc: "Top-tier health, dental, and vision insurance covered 100%." }
    ],
    similarJobs: ["1"]
  },
  {
    id: "5",
    title: "Associate Software Engineer",
    companyId: "cognizant",
    companyName: "Cognizant",
    companyLogo: "⚛️",
    rating: 3.7,
    reviewsCount: 15300,
    experience: "1 - 2 Yrs",
    salary: "4.0 - 6.0 LPA",
    location: "Chennai, India (Hybrid)",
    postedTime: "4 days ago",
    description: "Responsible for writing clean, tested backend code in Java Spring Boot or Node.js. You will participate in daily standups, construct RESTful endpoints, optimize PostgreSQL database queries, and perform code reviews under the guidance of senior technical leads.",
    skills: ["Java", "Spring Boot", "SQL", "Git", "REST APIs"],
    isHot: false,
    department: "Software Engineering",
    workMode: "Hybrid",
    companyType: "MNC",
    jobType: "Full Time",
    aboutCompany: "Cognizant engineered modern businesses, helping clients modernize technology, reimagine processes and transform experiences so they can stay ahead in our fast-changing world.",
    benefits: [
      { icon: "🏥", title: "Medical Cover", desc: "Inclusive insurance plans for parents, spouse, and children." },
      { icon: "⚽", title: "Recreation Hubs", desc: "Indoor games, gyms, and sports arenas built inside campuses." }
    ],
    similarJobs: ["2", "3"]
  },
  {
    id: "6",
    title: "Full Stack Engineer (Intern)",
    companyId: "energizer",
    companyName: "Energizer",
    companyLogo: "⚡",
    rating: 4.5,
    reviewsCount: 649,
    experience: "0 - 1 Yrs",
    salary: "30k - 50k / Month",
    location: "San Francisco, CA (Remote)",
    postedTime: "5 days ago",
    description: "Looking for an enthusiastic intern with experience in Node.js, Next.js, and MongoDB. You will collaborate on core features, fix active client bugs, write end-to-end tests using Playwright, and learn industry standards of Git flow, CI/CD, and serverless hosting.",
    skills: ["Next.js", "Node.js", "MongoDB", "Express", "GitHub"],
    isHot: false,
    department: "Software Engineering",
    workMode: "Remote",
    companyType: "Corporate",
    jobType: "Internship",
    aboutCompany: "Energizer is a leader in sustainable energy technology, creating modern energy grid applications, battery management software, and consumer energy trackers.",
    benefits: [
      { icon: "🎓", title: "Mentorship Program", desc: "Paired with a Principal Architect for bi-weekly 1-on-1 growth chats." },
      { icon: "📈", title: "PPO Potential", desc: "Over 80% of our successful interns receive pre-placement full-time offers." }
    ],
    similarJobs: ["1", "4"]
  }
];

export const popularCategories = [
  { name: "Remote", icon: "🌐" },
  { name: "MNC", icon: "🏢" },
  { name: "Analytics", icon: "📊" },
  { name: "Fresher", icon: "🎓" },
  { name: "Marketing", icon: "📈" },
  { name: "Sales", icon: "💰" },
  { name: "Startup", icon: "🚀" },
  { name: "Engineering", icon: "🛠️" },
  { name: "Software Dev", icon: "💻" },
  { name: "Fortune 100", icon: "💎" }
];

export const featuredCompanies = [
  { name: "Schneider Electric", logo: "🟢", rating: 4.1, reviews: "4.5k+ reviews", desc: "Global specialist in energy management.", link: "#" },
  { name: "JPMorgan Chase", logo: "💼", rating: 4.2, reviews: "12k+ reviews", desc: "Leading global financial services firm.", link: "#" },
  { name: "Coforge", logo: "🧬", rating: 4.0, reviews: "3.2k+ reviews", desc: "Leading global digital services integrator.", link: "#" },
  { name: "Infosys", logo: "🔷", rating: 3.8, reviews: "18k+ reviews", desc: "Next-generation digital consulting services.", link: "#" },
  { name: "Energizer", logo: "⚡", rating: 4.5, reviews: "649 reviews", desc: "Sustainable energy and automation systems.", link: "#" }
];

export const popularRoles: PopularRole[] = [
  { title: "Full Stack Developer", jobsCount: "25.4K+ Jobs", icon: "💻" },
  { title: "Front End Developer", jobsCount: "14.2K+ Jobs", icon: "🎨" },
  { title: "Tech Lead", jobsCount: "5.8K+ Jobs", icon: "🚀" },
  { title: "Technical Architect", jobsCount: "1.2K+ Jobs", icon: "🏗️" },
  { title: "Business Analyst", jobsCount: "9.5K+ Jobs", icon: "📊" },
  { title: "Functional Consultant", jobsCount: "3.4K+ Jobs", icon: "👔" }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Siddharth Verma",
    role: "Software Developer",
    company: "Energizer",
    avatar: "👨‍💻",
    quote: "Finding my dream job was an absolute breeze. The detailed company reviews, salary estimates, and the unique company comparison matrix guided me to exactly the right team."
  },
  {
    id: "t2",
    name: "Roshni Sen",
    role: "Senior UX Designer",
    company: "JPMorgan Chase",
    avatar: "👩‍🎨",
    quote: "The interface is super fast. The filter-sidebar is extremely helpful for targeting hybrid roles, and the structured interview preparation guides helped me ace the final rounds!"
  },
  {
    id: "t3",
    name: "Amit Patel",
    role: "Product Manager",
    company: "Schneider Electric",
    avatar: "👨‍💼",
    quote: "I love the clean design and the transparency. Being able to compare benefits and culture scores side-by-side saved me weeks of research and interview stress."
  }
];

export const interviewQuestions: InterviewQuestion[] = [
  { id: "q1", companyName: "TCS", companyLogo: "🌐", title: "Software Engineer", questionsCount: "2.4K+ Questions" },
  { id: "q2", companyName: "Flipkart", companyLogo: "🛍️", title: "Software Engineer", questionsCount: "1.2K+ Questions" },
  { id: "q3", companyName: "Cognizant", companyLogo: "⚛️", title: "QA Analyst", questionsCount: "850+ Questions" },
  { id: "q4", companyName: "Wipro", companyLogo: "🌈", title: "Business Analyst", questionsCount: "900+ Questions" },
  { id: "q5", companyName: "Amazon", companyLogo: "📦", title: "Cloud Support Associate", questionsCount: "1.5K+ Questions" },
  { id: "q6", companyName: "Accenture", companyLogo: "🏹", title: "Data Analyst", questionsCount: "700+ Questions" }
];
