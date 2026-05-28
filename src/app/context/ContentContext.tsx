import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.lula-asbl.org/api';
const ADMIN_TOKEN_KEY = 'lula-admin-token';

const formatBackendDate = (value?: string | null) => {
  if (!value) {
    return '';
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const slugify = (value: string) => {
  const normalized = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return normalized || 'content';
};

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

const getStoredAdminToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(ADMIN_TOKEN_KEY);
};

const clearStoredAdminToken = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
  }
};

const getAuthHeaders = (headers?: HeadersInit) => {
  const mergedHeaders = new Headers(headers);
  const token = getStoredAdminToken();

  if (token) {
    mergedHeaders.set('Authorization', `Bearer ${token}`);
  }

  return mergedHeaders;
};

const toNewsItem = (item: any): NewsItem => ({
  id: String(item.id),
  title: item.title || 'Untitled News',
  date: formatBackendDate(item.published_at || item.created_at) || 'Upcoming',
  image: item.image_url || '',
  category: 'News',
  content: item.content || item.excerpt || item.title || '',
});

const toProject = (item: any): Project => ({
  id: String(item.id),
  title: item.title || 'Untitled Project',
  description: item.content || item.description || '',
  image: item.image_url || '',
  category: item.category || '',
  region: item.location || 'Eastern DRC',
  status: item.status === 'ongoing' ? 'active' : item.status || 'active',
  featured: item.featured ?? false,
  beneficiaries: item.beneficiaries || '',
  duration: item.duration || '',
});

const toPartner = (item: any, featuredOverride?: boolean): Partner => ({
  id: String(item.id),
  name: item.name || 'Partner',
  type: item.category === 'government' ? 'government' : item.category === 'local' ? 'local' : 'international',
  logo: item.logo_url || undefined,
  featured: typeof featuredOverride === 'boolean' ? featuredOverride : item.category === 'international',
});

const fetchJson = async <T,>(url: string, options?: { requireAuth?: boolean }): Promise<T> => {
  const headers = options?.requireAuth ? getAuthHeaders() : undefined;
  const response = await fetch(url, headers ? { headers } : undefined);

  if (response.status === 401) {
    clearStoredAdminToken();
    throw new Error('Your session has expired. Please sign in again.');
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

const requestJson = async <T,>(path: string, options: RequestInit = {}): Promise<T> => {
  const headers = getAuthHeaders(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearStoredAdminToken();
    throw new Error('Your session has expired. Please sign in again.');
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
};

const buildNewsPayload = (newsItem: Omit<NewsItem, 'id' | 'date'>) => ({
  title: newsItem.title,
  excerpt: stripHtml(newsItem.content).slice(0, 160),
  content: newsItem.content,
  image_url: newsItem.image,
  author: 'Admin',
  slug: slugify(newsItem.title),
  published: true,
});

const buildProjectPayload = (project: Omit<Project, 'id'>) => ({
  title: project.title,
  description: project.description,
  content: project.description,
  image_url: project.image,
  location: project.region,
  slug: slugify(project.title),
  status: project.status === 'active' ? 'ongoing' : project.status,
  featured: project.featured ?? false,
  published: true,
});

const buildPartnerPayload = (partner: Omit<Partner, 'id'>) => ({
  name: partner.name,
  logo_url: partner.logo || '',
  description: '',
  website_url: '',
  category: partner.type,
  is_active: true,
});

const toProgram = (item: any): Program => ({
  id: String(item.id),
  title: item.title || 'Untitled Program',
  description: item.description || item.details || '',
  details: item.description || item.details || '',
  beneficiaries: item.beneficiaries || 'Community members',
  icon: item.icon || 'Shield',
  color: item.color || 'bg-green-50 text-green-600',
  image: item.image_url || item.image || '',
  featured: item.featured ?? false,
});

const toTeamMember = (item: any): TeamMember => ({
  id: String(item.id),
  name: item.name || 'Team Member',
  role: item.role || 'Team Member',
  bio: item.bio || '',
  image: item.image || item.image_url || '',
  email: item.email || '',
  location: item.location || '',
  type: item.type === 'leadership' ? 'leadership' : 'staff',
  linkedin: item.linkedin || '',
});

const toImpactStory = (item: any): ImpactStory => ({
  id: String(item.id),
  title: item.title || 'Impact Story',
  quote: item.quote || item.story || 'Community impact story',
  name: item.person_name || 'Community Member',
  role: item.person_role || 'Beneficiary',
  image: item.image || item.image_url || '',
  story: item.story || '',
  featured: item.featured ?? false,
});

const toAboutContent = (item: any): AboutContent => ({
  mission: item.mission || '',
  vision: item.vision || '',
  story: item.story || '',
});

const toEnquiry = (item: any): Enquiry => ({
  id: String(item.id),
  name: item.name || 'Anonymous',
  email: item.email || '',
  phone: item.phone || '',
  subject: item.subject || '',
  message: item.message || '',
  date: formatBackendDate(item.created_at) || 'Recently',
  status: item.status === 'in_progress' ? 'in-progress' : item.status === 'resolved' ? 'resolved' : 'new',
});

const toInterest = (item: any): Interest => ({
  id: String(item.id),
  name: item.name || 'Anonymous',
  email: item.email || '',
  phone: item.phone || '',
  type: (item.type || item.interest_type || 'donate') as Interest['type'],
  message: item.message || '',
  date: formatBackendDate(item.created_at) || 'Recently',
  status: item.status || 'new',
});

const buildProgramPayload = (program: Omit<Program, 'id'>) => ({
  title: program.title,
  description: program.description,
  icon: program.icon,
  image_url: '',
  is_active: true,
});

const buildTeamMemberPayload = (member: Partial<TeamMember>) => ({
  name: member.name || '',
  role: member.role || '',
  bio: member.bio || '',
  image: member.image || '',
  email: member.email || '',
  location: member.location || '',
  linkedin: member.linkedin || '',
  type: member.type || 'staff',
});

const buildImpactStoryPayload = (story: Partial<ImpactStory>) => ({
  title: story.title || '',
  quote: story.quote || story.story || '',
  story: story.story || '',
  person_name: story.name || '',
  person_role: story.role || '',
  image_url: story.image || '',
  featured: story.featured ?? false,
  published: true,
});

const buildInterestPayload = (interest: Omit<Interest, 'id' | 'date' | 'status'>) => ({
  name: interest.name,
  email: interest.email,
  phone: interest.phone,
  type: interest.type,
  message: interest.message,
});

// Types
export interface Program {
  id: string;
  title: string;
  description: string;
  details: string;
  beneficiaries: string;
  icon: string;
  color: string;
  image?: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  location?: string;
  type: 'leadership' | 'staff';
  linkedin?: string;
}

export interface Partner {
  id: string;
  name: string;
  type: 'international' | 'government' | 'local';
  logo?: string;
  featured?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  image: string;
  category: string;
  content: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  region: string;
  status: 'active' | 'completed' | 'planned';
  featured?: boolean;
  beneficiaries?: string;
  duration?: string;
}

export interface ImpactStory {
  id: string;
  title: string;
  quote: string;
  name: string;
  role: string;
  image: string;
  story: string;
  featured?: boolean;
}

export interface AboutContent {
  mission: string;
  vision: string;
  story: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'in-progress' | 'resolved';
}

export interface Interest {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'donate' | 'volunteer' | 'partner';
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'completed';
}

export interface Activity {
  id: string;
  type: 'program' | 'team' | 'partner' | 'news' | 'project' | 'story';
  action: 'added' | 'updated' | 'deleted';
  entityName: string;
  date: string;
  description: string;
}

interface ContentContextType {
  programs: Program[];
  addProgram: (program: Omit<Program, 'id'>) => Promise<void>;
  updateProgram: (id: string, program: Partial<Program>) => Promise<void>;
  deleteProgram: (id: string) => Promise<void>;
  
  teamMembers: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<void>;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  
  partners: Partner[];
  addPartner: (partner: Omit<Partner, 'id'>) => Promise<void>;
  updatePartner: (id: string, partner: Partial<Partner>) => Promise<void>;
  deletePartner: (id: string) => Promise<void>;
  
  news: NewsItem[];
  addNews: (newsItem: Omit<NewsItem, 'id'>) => Promise<void>;
  updateNews: (id: string, newsItem: Partial<NewsItem>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  
  impactStories: ImpactStory[];
  addImpactStory: (story: Omit<ImpactStory, 'id'>) => Promise<void>;
  updateImpactStory: (id: string, story: Partial<ImpactStory>) => Promise<void>;
  deleteImpactStory: (id: string) => Promise<void>;

  aboutContent: AboutContent;
  updateAboutContent: (content: Partial<AboutContent>) => Promise<void>;

  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'date' | 'status'>) => Promise<void>;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => Promise<void>;
  deleteEnquiry: (id: string) => Promise<void>;

  interests: Interest[];
  addInterest: (interest: Omit<Interest, 'id' | 'date' | 'status'>) => Promise<void>;
  updateInterestStatus: (id: string, status: Interest['status']) => Promise<void>;
  deleteInterest: (id: string) => Promise<void>;

  activities: Activity[];
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  // Initial data
  const [programs, setPrograms] = useState<Program[]>([
    {
      id: '1',
      title: 'Child Protection',
      description: 'Safeguarding vulnerable children across Eastern DRC',
      details: 'Providing safe spaces, psychosocial counseling, legal protection, and educational support for vulnerable children affected by conflict and displacement. Our child protection program includes family tracing and reunification services, protection against exploitation and abuse, and comprehensive support for orphaned children.',
      beneficiaries: '25,000+ children',
      icon: 'Shield',
      color: 'bg-green-50 text-green-600'
    },
    {
      id: '2',
      title: 'HIV Prevention',
      description: 'Comprehensive testing, treatment support, and awareness campaigns',
      details: 'Comprehensive HIV testing, antiretroviral treatment support, counseling services, and community awareness campaigns. Our program includes youth-focused education on sexual and reproductive health, prevention of mother-to-child transmission (PMTCT), and support groups for people living with HIV/AIDS.',
      beneficiaries: '40,000+ individuals',
      icon: 'Stethoscope',
      color: 'bg-green-50 text-green-600'
    },
    {
      id: '3',
      title: 'Women Empowerment',
      description: 'Economic independence through skills training and microfinance',
      details: 'Vocational skills training in tailoring, agriculture, crafts, and entrepreneurship. We provide microfinance loans, business development support, and access to markets. Our program includes gender-based violence prevention, women\'s leadership development, and support for women-headed households in refugee camps and host communities.',
      beneficiaries: '15,000+ women',
      icon: 'Heart',
      color: 'bg-pink-50 text-pink-600'
    },
    {
      id: '4',
      title: 'Education & Youth Development',
      description: 'Building brighter futures through quality education',
      details: 'Primary and secondary education support, school infrastructure rehabilitation, teacher training, and provision of learning materials. We run accelerated learning programs for out-of-school youth, vocational training for young adults, and peace education initiatives promoting social cohesion in conflict-affected communities.',
      beneficiaries: '30,000+ students',
      icon: 'GraduationCap',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: '5',
      title: 'Refugee & IDP Support',
      description: 'Comprehensive assistance for displaced populations',
      details: 'Emergency shelter, food distribution, water and sanitation facilities, and healthcare services for refugees and internally displaced persons. We provide protection services, livelihood support, and community integration programs in camps across North Kivu, South Kivu, and Ituri provinces.',
      beneficiaries: '35,000+ displaced persons',
      icon: 'Users',
      color: 'bg-gray-50 text-gray-900'
    },
    {
      id: '6',
      title: 'Community Health',
      description: 'Strengthening health systems in rural communities',
      details: 'Community health worker training, maternal and child health services, nutrition programs, disease prevention campaigns, and health facility support. We focus on improving access to healthcare in remote areas through mobile clinics and community-based health education programs.',
      beneficiaries: '50,000+ community members',
      icon: 'Handshake',
      color: 'bg-emerald-50 text-emerald-600'
    },
  ]);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Dr. Marie Nzigire',
      role: 'Executive Director',
      bio: 'Dr. Nzigire brings over 15 years of experience in humanitarian work across Central Africa. Former WHO regional advisor specializing in maternal health and HIV prevention. She holds a PhD in Public Health from the University of Kinshasa and has led numerous successful community health initiatives in conflict-affected regions.',
      image: 'https://images.unsplash.com/photo-1744973056064-0484e01486fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tZW4lMjBsZWFkZXJzaGlwJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3OTM1NTkzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      email: 'marie.nzigire@lulacongo.org',
      location: 'Goma, North Kivu',
      type: 'leadership'
    },
    {
      id: '2',
      name: 'Patrick Mukendi',
      role: 'Programs Director',
      bio: 'Expert in community development with a focus on child protection and women\'s empowerment. Patrick has coordinated multi-million dollar programs for international NGOs and has deep knowledge of Eastern DRC communities. He is passionate about sustainable development and local capacity building.',
      image: 'https://images.unsplash.com/photo-1764169689207-e23fb66e1fcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWFuJTIwcHJvZmVzc2lvbmFsJTIwbGVhZGVyfGVufDF8fHx8MTc3OTM1NTkzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      email: 'patrick.mukendi@lulacongo.org',
      location: 'Bukavu, South Kivu',
      type: 'leadership'
    },
    {
      id: '3',
      name: 'Dr. Sarah Kabuo',
      role: 'Health Programs Manager',
      bio: 'Public health specialist with 10 years of experience in HIV/AIDS prevention and treatment programs. Sarah leads our community health initiatives and has successfully implemented integrated health services in over 50 rural communities across Eastern DRC. She holds an MD from the University of Bukavu and a Master\'s in Public Health.',
      image: 'https://images.unsplash.com/photo-1632054226770-9ce6a8915462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwd29tYW4lMjBkb2N0b3J8ZW58MXx8fHwxNzc5MzU2NDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      email: 'sarah.kabuo@lulacongo.org',
      location: 'Bunia, Ituri',
      type: 'leadership'
    },
    {
      id: '4',
      name: 'Jean-Paul Nzanzu',
      role: 'Child Protection Coordinator',
      bio: 'Dedicated child rights advocate with extensive experience in emergency response and child protection in conflict zones. Jean-Paul oversees our safe spaces program and family reunification services, having successfully reunited over 500 separated children with their families.',
      image: 'https://images.unsplash.com/photo-1522366973393-c86778cf310b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDZW50cmFsJTIwQWZyaWNhJTIwaHVtYW5pdGFyaWFuJTIwd29ya2VyfGVufDF8fHx8MTc3OTM1NTkzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      email: 'jeanpaul.nzanzu@lulacongo.org',
      location: 'Goma, North Kivu',
      type: 'staff'
    },
    {
      id: '5',
      name: 'Grace Mukenge',
      role: 'Women\'s Empowerment Officer',
      bio: 'Passionate advocate for women\'s economic rights and gender equality. Grace manages our vocational training centers and microfinance programs, helping hundreds of women start successful businesses and become financially independent.',
      image: 'https://images.unsplash.com/photo-1655720357872-ce227e4164ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tZW4lMjBjb29wZXJhdGl2ZSUyMG1lZXRpbmd8ZW58MXx8fHwxNzc5MzU1OTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      email: 'grace.mukenge@lulacongo.org',
      location: 'Bukavu, South Kivu',
      type: 'staff'
    },
    {
      id: '6',
      name: 'Emmanuel Kasongo',
      role: 'Education Programs Officer',
      bio: 'Former teacher and education administrator with a passion for quality education in emergency contexts. Emmanuel coordinates our accelerated learning programs and teacher training initiatives, reaching thousands of children who missed years of schooling due to conflict.',
      image: 'https://images.unsplash.com/photo-1649532355244-e011eebe7a81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwbWFuJTIwc3VpdHxlbnwxfHx8fDE3NzkzNTY1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      email: 'emmanuel.kasongo@lulacongo.org',
      location: 'Bunia, Ituri',
      type: 'staff'
    },
    {
      id: '7',
      name: 'Beatrice Tshiani',
      role: 'Finance & Operations Manager',
      bio: 'Experienced financial manager with expertise in NGO accounting, donor reporting, and operational management. Beatrice ensures transparency and accountability in all LULA\'s financial operations and manages our growing team across three provinces.',
      image: 'https://images.unsplash.com/photo-1573164574511-73c773193279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tZW4lMjBncm91cCUyMG1lZXRpbmd8ZW58MXx8fHwxNzc5MTg3NzUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      email: 'beatrice.tshiani@lulacongo.org',
      location: 'Goma, North Kivu',
      type: 'staff'
    },
    {
      id: '8',
      name: 'Joseph Kitoko',
      role: 'Monitoring & Evaluation Specialist',
      bio: 'Data-driven professional focused on measuring program impact and improving service delivery. Joseph has developed comprehensive M&E frameworks for LULA\'s programs and produces regular impact reports for donors and stakeholders.',
      image: 'https://images.unsplash.com/photo-1621905252472-943afaa20e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWFuJTIwZW5naW5lZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc5MzU2NDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      email: 'joseph.kitoko@lulacongo.org',
      location: 'Bukavu, South Kivu',
      type: 'staff'
    },
    {
      id: '9',
      name: 'Claudine Mwamba',
      role: 'Communications & Advocacy Officer',
      bio: 'Skilled communicator and advocate with a background in journalism and public relations. Claudine manages LULA\'s communications strategy, social media presence, and advocacy campaigns to raise awareness about humanitarian needs in Eastern DRC.',
      image: 'https://images.unsplash.com/photo-1677195063105-276fd4b95b21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tYW4lMjBudXJzZSUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzc5MzU2NTAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      email: 'claudine.mwamba@lulacongo.org',
      location: 'Goma, North Kivu',
      type: 'staff'
    },
    {
      id: '10',
      name: 'David Lukusa',
      role: 'Refugee Services Coordinator',
      bio: 'Experienced humanitarian worker specializing in refugee assistance and camp management. David coordinates our programs in IDP camps across North Kivu and Ituri, ensuring displaced families receive essential services and protection.',
      image: 'https://images.unsplash.com/photo-1659189143902-219a5b03bb94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWFuJTIwc29jaWFsJTIwd29ya2VyfGVufDF8fHx8MTc3OTM1NjUwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      email: 'david.lukusa@lulacongo.org',
      location: 'Bunia, Ituri',
      type: 'staff'
    },
  ]);

  const [partners, setPartners] = useState<Partner[]>([
    { id: '1', name: 'UNICEF', type: 'international', featured: true },
    { id: '2', name: 'WHO', type: 'international', featured: true },
    { id: '3', name: 'UNHCR', type: 'international', featured: true },
    { id: '4', name: 'World Vision', type: 'international', featured: true },
    { id: '5', name: 'Save the Children', type: 'international', featured: true },
    { id: '6', name: 'Oxfam', type: 'international', featured: true },
    { id: '7', name: 'USAID', type: 'international', featured: true },
    { id: '8', name: 'Ministry of Health - DRC', type: 'government', featured: true },
    { id: '9', name: 'Ministry of Social Affairs - DRC', type: 'government', featured: false },
    { id: '10', name: 'North Kivu Provincial Government', type: 'government', featured: false },
    { id: '11', name: 'Goma Community Health Network', type: 'local', featured: false },
    { id: '12', name: 'Bukavu Women\'s Association', type: 'local', featured: false },
  ]);

  const [news, setNews] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'New Safe Space Initiative Launched in Goma',
      date: 'May 15, 2026',
      image: 'https://images.unsplash.com/photo-1602200938695-33e9dde52087?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEUiUyMENvbmdvJTIwY2hpbGRyZW4lMjBjb21tdW5pdHklMjBzY2hvb2x8ZW58MXx8fHwxNzc5MzU1OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Program Launch',
      content: '<h2>Protecting Vulnerable Children in IDP Camps</h2><p>LULA has launched a new safe space initiative in Goma, providing a protective environment for over 500 vulnerable children in the Mugunga IDP camp. The facility includes educational spaces, counseling rooms, and recreational areas designed specifically for children who have experienced trauma.</p><h3>Comprehensive Support Services</h3><p>This initiative is part of our comprehensive child protection program, funded by UNICEF and the European Union with a budget of $1.2 million over three years. The safe space will serve as a hub for psychosocial support, education, and family tracing services.</p><p>The facility features:</p><ul><li>Four classrooms for accelerated learning programs</li><li>Two counseling rooms staffed by trained psychologists</li><li>A recreational area with sports equipment and games</li><li>A nutrition center providing daily meals</li><li>Family tracing and reunification services</li></ul><h3>Leadership Perspective</h3><p>"Children who have experienced trauma need specialized support in a safe and nurturing environment," said Dr. Marie Nzigire, LULA\'s Executive Director. "This safe space will provide not just physical protection, but also the emotional and educational support children need to heal, learn, and play."</p><h3>Community Impact</h3><p>The Mugunga camp hosts over 10,000 displaced families, with approximately 3,000 children under the age of 15. The new safe space represents a critical investment in the well-being and future of these vulnerable children.</p>'
    },
    {
      id: '2',
      title: '1,000 Women Receive Vocational Training Certificates',
      date: 'May 10, 2026',
      image: 'https://images.unsplash.com/photo-1751130562241-3323a0362831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tZW4lMjBlbnRyZXByZW5ldXJzaGlwJTIwbWFya2V0fGVufDF8fHx8MTc3OTM1NTkzMHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Success Story',
      content: '<h2>Celebrating Women\'s Economic Empowerment</h2><p>Over 1,000 women graduated from LULA\'s vocational training programs across North and South Kivu provinces in a historic milestone for women\'s empowerment in Eastern DRC. The women received comprehensive training in tailoring, agriculture, soap making, and small business management.</p><h3>Graduation Ceremony</h3><p>The graduation ceremony, held at the Bukavu Convention Center, was attended by local government officials, community leaders, and representatives from partner organizations including UNICEF, UN Women, and the Ministry of Social Affairs.</p><p>Each graduate received:</p><ul><li>A vocational training certificate recognized by the DRC government</li><li>A startup kit containing tools and materials valued at $200</li><li>Access to microfinance loans ranging from $100-$500</li><li>Six months of business mentorship and support</li></ul><h3>Life-Changing Impact</h3><p>"I can now provide for my five children," said Amani Mukendi, one of the graduates from Bukavu. "The skills I learned have changed my life and given me hope for the future. I\'ve already received my first orders and am training two other women in my community."</p><h3>Program Results</h3><p>Since its launch in 2019, LULA\'s Women\'s Empowerment Program has trained over 3,500 women, with an impressive 78% of graduates successfully starting their own businesses. The program has created an estimated 5,000 jobs and generated over $2 million in income for women-led households.</p><h3>Looking Ahead</h3><p>Grace Mukenge, LULA\'s Women\'s Empowerment Officer, announced plans to expand the program to Ituri province in 2027, with a goal of training an additional 2,000 women over the next three years.</p>'
    },
    {
      id: '3',
      title: 'Partnership Announcement with Global Health Initiative',
      date: 'May 5, 2026',
      image: 'https://images.unsplash.com/photo-1551191003-9262a720b971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY29tbXVuaXR5JTIwaGVhbHRoJTIwb3V0cmVhY2h8ZW58MXx8fHwxNzc5MzU1OTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Partnership',
      content: '<h2>Strengthening Community Health Systems</h2><p>LULA is proud to announce a groundbreaking partnership with the Global Health Initiative (GHI) to strengthen community health systems across Eastern DRC. This three-year, $2.5 million partnership represents one of the largest health infrastructure investments in the region.</p><h3>Program Scope</h3><p>The partnership will support 25 health centers across North Kivu, South Kivu, and Ituri provinces, providing:</p><ul><li>Infrastructure rehabilitation and medical equipment</li><li>Training for 500 community health workers</li><li>Essential medicines and medical supplies</li><li>Mobile clinic services for remote communities</li><li>Health information management systems</li></ul><h3>Focus Areas</h3><p>The program will prioritize three critical areas:</p><p><strong>Maternal and Child Health:</strong> Improving access to prenatal care, safe delivery services, and postnatal support to reduce maternal and infant mortality rates.</p><p><strong>HIV Prevention and Treatment:</strong> Expanding HIV testing, treatment, and prevention services, with a focus on prevention of mother-to-child transmission (PMTCT).</p><p><strong>Disease Surveillance:</strong> Establishing early warning systems for infectious disease outbreaks and strengthening epidemic preparedness.</p><h3>Partnership Statement</h3><p>"This partnership represents a significant step forward in our mission to ensure every community in Eastern DRC has access to quality healthcare," said Dr. Sarah Kabuo, LULA\'s Health Programs Manager. "By combining GHI\'s technical expertise with LULA\'s deep community connections, we can create sustainable health systems that truly serve the needs of vulnerable populations."</p><h3>Expected Impact</h3><p>Over the three-year period, the program is expected to:</p><ul><li>Reach 150,000 people with essential health services</li><li>Train 500 community health workers</li><li>Conduct 50,000 HIV tests</li><li>Provide prenatal care to 20,000 pregnant women</li><li>Vaccinate 30,000 children</li></ul>'
    },
    {
      id: '4',
      title: 'Mobile Clinic Brings Healthcare to Remote Villages',
      date: 'April 28, 2026',
      image: 'https://images.unsplash.com/photo-1608052026785-0bc249c733e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcmVmdWdlZSUyMGNhbXAlMjBodW1hbml0YXJpYW58ZW58MXx8fHwxNzc5MzU1OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Health',
      content: '<h2>Reaching the Unreachable</h2><p>LULA\'s new mobile clinic has successfully completed its first circuit through 15 remote villages in Ituri province, providing essential healthcare services to over 3,000 people who previously had no access to medical care.</p><h3>Mobile Health Services</h3><p>The fully-equipped mobile clinic, funded by Médecins Sans Frontières (MSF) and the WHO, offers:</p><ul><li>General medical consultations</li><li>Childhood vaccinations</li><li>Prenatal and postnatal care</li><li>HIV testing and counseling</li><li>Treatment for common illnesses</li><li>Nutrition screening for children under 5</li><li>Health education sessions</li></ul><h3>First Circuit Results</h3><p>During its inaugural month of operation, the mobile clinic achieved remarkable results:</p><ul><li>3,247 patients treated</li><li>856 children vaccinated</li><li>412 women received prenatal care</li><li>189 people tested for HIV</li><li>95 cases of malnutrition identified and treated</li></ul><h3>Community Response</h3><p>"Before the mobile clinic, we had to walk for six hours to reach the nearest health center," said Mama Fatuma, a village elder from Rwampara. "Many people, especially pregnant women and sick children, couldn\'t make that journey. Now, healthcare comes to us. It\'s saving lives in our community."</p><h3>Sustainable Model</h3><p>The mobile clinic follows a systematic monthly route, visiting each of the 15 villages on a predictable schedule. This ensures continuous access to healthcare and allows for proper follow-up care for chronic conditions.</p><p>David Lukusa, LULA\'s Refugee Services Coordinator who oversees the mobile clinic program, explained: "Consistency is key. People need to know when the clinic will arrive so they can plan for consultations and bring their children for vaccinations. We\'re not just providing one-time care – we\'re building a sustainable health system for these remote communities."</p><h3>Expansion Plans</h3><p>Based on the success of the pilot program, LULA plans to deploy two additional mobile clinics in North and South Kivu provinces by the end of 2026, extending quality healthcare to an estimated 15,000 additional people in remote and underserved areas.</p>'
    },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Safe Spaces for Children in Goma',
      description: 'Creating protective environments for vulnerable children in refugee camps across North Kivu. Our safe spaces provide education, psychosocial support, and recreational activities in a secure environment where children can heal from trauma and build resilience.',
      image: 'https://images.unsplash.com/photo-1602200938695-33e9dde52087?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEUiUyMENvbmdvJTIwY2hpbGRyZW4lMjBjb21tdW5pdHklMjBzY2hvb2x8ZW58MXx8fHwxNzc5MzU1OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Child Protection',
      region: 'North Kivu',
      status: 'active',
      beneficiaries: '2,500 children',
      duration: '2024-2026'
    },
    {
      id: '2',
      title: 'Women Economic Empowerment',
      description: 'Providing vocational training and microfinance to women-led households. We train women in tailoring, agriculture, crafts, and entrepreneurship, and provide small loans and business mentorship to help them achieve economic independence.',
      image: 'https://images.unsplash.com/photo-1751130562241-3323a0362831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tZW4lMjBlbnRyZXByZW5ldXJzaGlwJTIwbWFya2V0fGVufDF8fHx8MTc3OTM1NTkzMHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Women Empowerment',
      region: 'South Kivu',
      status: 'active',
      beneficiaries: '1,800 women',
      duration: '2023-2025'
    },
    {
      id: '3',
      title: 'HIV Prevention & Treatment Support',
      description: 'Community-based sexual and reproductive health education programs and health facility support. We strengthen local health systems by training health workers, providing medical supplies, and conducting health education campaigns.',
      image: 'https://images.unsplash.com/photo-1551191003-9262a720b971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY29tbXVuaXR5JTIwaGVhbHRoJTIwb3V0cmVhY2h8ZW58MXx8fHwxNzc5MzU1OTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Health',
      region: 'Ituri',
      status: 'active',
      beneficiaries: '12,000 individuals',
      duration: '2022-2027'
    },
    {
      id: '4',
      title: 'Community Health Workers Training',
      description: 'Rebuilding and equipping schools destroyed by conflict in North Kivu. This project includes construction of classrooms, provision of learning materials, teacher training, and establishment of school gardens for nutrition programs.',
      image: 'https://images.unsplash.com/photo-1744809495173-217ca4faa8bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZ2lybHMlMjBlZHVjYXRpb24lMjBjbGFzc3Jvb218ZW58MXx8fHwxNzc5MzU1OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Education',
      region: 'Ituri',
      status: 'completed',
      beneficiaries: '300 health workers',
      duration: '2023-2024'
    },
    {
      id: '5',
      title: 'Refugee Camp Support Program',
      description: 'Comprehensive assistance including shelter, food, water, sanitation, and healthcare for displaced populations in camps across Eastern DRC. We also provide livelihood programs to help refugees become self-reliant.',
      image: 'https://images.unsplash.com/photo-1608052026785-0bc249c733e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwcmVmdWdlZSUyMGNhbXAlMjBodW1hbml0YXJpYW58ZW58MXx8fHwxNzc5MzU1OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Humanitarian Aid',
      region: 'North Kivu',
      status: 'active',
      beneficiaries: '5,000 refugees',
      duration: '2024-2026'
    },
    {
      id: '6',
      title: 'Youth Vocational Training Center',
      description: 'Supporting small-scale farmers with training, seeds, tools, and market access. This project helps rural communities improve food security and generate income through sustainable agricultural practices.',
      image: 'https://images.unsplash.com/photo-1729005818676-b1fd299e8769?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb25nbyUyMHJ1cmFsJTIwZGV2ZWxvcG1lbnQlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NzkzNTU5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Livelihoods',
      region: 'North Kivu',
      status: 'planned',
      beneficiaries: '500 youth',
      duration: '2026-2028'
    },
  ]);

  const [impactStories, setImpactStories] = useState<ImpactStory[]>([
    {
      id: '1',
      title: 'From Vulnerability to Empowerment',
      quote: 'Through LULA\'s vocational training, I learned tailoring and now run my own business. I can provide for my children and give them hope for a better future.',
      name: 'Amani Mukendi',
      role: 'Women\'s Cooperative Member',
      image: 'https://images.unsplash.com/photo-1751130562241-3323a0362831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tZW4lMjBlbnRyZXByZW5ldXJzaGlwJTIwbWFya2V0fGVufDF8fHx8MTc3OTM1NTkzMHww&ixlib=rb-4.1.0&q=80&w=1080',
      story: 'Amani was a widow with five children when she joined LULA\'s women empowerment program. After six months of tailoring training and business skills development, she received a small loan to purchase a sewing machine. Today, she runs a successful tailoring business in Bukavu, employing two other women from her community.'
    },
    {
      id: '2',
      title: 'A Child\'s Journey to Recovery',
      quote: 'The safe space gave me a place to be a child again. I can play, learn, and feel protected. Now I dream of becoming a teacher to help other children like me.',
      name: 'Jean-Luc',
      role: 'Safe Space Beneficiary, Age 12',
      image: 'https://images.unsplash.com/photo-1602200938695-33e9dde52087?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEUiUyMENvbmdvJTIwY2hpbGRyZW4lMjBjb21tdW5pdHklMjBzY2hvb2x8ZW58MXx8fHwxNzc5MzU1OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      story: 'Jean-Luc arrived at the Mugunga IDP camp traumatized and withdrawn after being separated from his family during conflict. Through LULA\'s child protection program, he received psychosocial counseling, enrolled in accelerated learning classes, and was successfully reunited with his mother after 8 months of family tracing efforts.'
    },
    {
      id: '3',
      title: 'Community Health Transformation',
      quote: 'The health education programs have transformed our community. We now have the knowledge to protect ourselves and our families. Lives are being saved every day.',
      name: 'Grace Kabuo',
      role: 'Community Health Worker',
      image: 'https://images.unsplash.com/photo-1551191003-9262a720b971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY29tbXVuaXR5JTIwaGVhbHRoJTIwb3V0cmVhY2h8ZW58MXx8fHwxNzc5MzU1OTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      story: 'Grace trained as a community health worker through LULA\'s program and now serves 15 villages in Ituri province. She provides health education, conducts HIV testing, supports pregnant women, and refers serious cases to health facilities. Her work has significantly reduced maternal and child mortality in her community.'
    },
    {
      id: '4',
      title: 'Education Opens Doors',
      quote: 'I missed three years of school because of the war. LULA\'s accelerated learning program helped me catch up, and now I\'m preparing for university.',
      name: 'Emmanuel',
      role: 'Student, Age 18',
      image: 'https://images.unsplash.com/photo-1761039808115-77b271985e47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIweW91dGglMjBlbXBvd2VybWVudCUyMHRyYWluaW5nfGVufDF8fHx8MTc3OTM1NTkzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      story: 'Emmanuel\'s education was interrupted when conflict forced his family to flee their village. Through LULA\'s accelerated learning program, he completed three years of curriculum in 18 months. He\'s now a top student in his class and has received a scholarship to study medicine at the University of Goma.'
    },
  ]);

  const [aboutContent, setAboutContent] = useState<AboutContent>({
    mission: 'Let Us Live Association (LULA) is a community-driven humanitarian organization working in conflict-affected and displacement settings in Eastern Democratic Republic of Congo (DRC), with a core mission to protect the health, rights, and future of children, adolescents, women, and caregivers facing heightened vulnerability to HIV, exploitation, and poor access to essential services. Our work is rooted in refugee camps and host communities in North and South Kivu Provinces, where poverty, insecurity, and weak health access continue to fuel paediatric and adolescent HIV transmission.',
    vision: 'LULA ASBL envisions a region free from social discrimination and stigma related to sexual violence, HIV/AIDS, and other vulnerabilities faced by women, girls, and children in the DR Congo.',
    story: '<h2>Our Story</h2><p><strong>Let Us Live Association (LULA)</strong> (REG No: JUST.112/921/NK/2025) is a community-based humanitarian organization dedicated to addressing the unique vulnerabilities of marginalized groups, especially children, women and girls living in conflict-affected areas in North and South Kivu Provinces of DR Congo.</p><p>Currently, LULA has more than <strong>100 staff, members and volunteers</strong>. Its programs have directly reached nearly <strong>850,000 beneficiaries</strong> including girls and young women, orphans and vulnerable children heading families, and the most vulnerable young women and girls.</p><p>Through targeted interventions, LULA has made significant strides in improving life conditions and reducing violations against women, SGBV, HIV and early forced marriages in North and South Kivu Provinces.</p>'
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      subject: 'Inquiry about Child Protection Program',
      message: 'I would like to learn more about LULA\'s child protection program and how I can support it.',
      date: 'May 15, 2026',
      status: 'new'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+0987654321',
      subject: 'Volunteer Application',
      message: 'I am interested in volunteering with LULA Congo. Please provide more information about available positions.',
      date: 'May 10, 2026',
      status: 'in-progress'
    },
  ]);

  const [interests, setInterests] = useState<Interest[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '+111222333444',
      type: 'donate',
      message: 'I would like to make a donation to support LULA Congo\'s education programs.',
      date: 'May 5, 2026',
      status: 'new'
    },
    {
      id: '2',
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      phone: '+555666777888',
      type: 'volunteer',
      message: 'I am interested in volunteering with LULA Congo. Please provide more information about available positions.',
      date: 'April 28, 2026',
      status: 'contacted'
    },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      type: 'program',
      action: 'added',
      entityName: 'Child Protection',
      date: 'May 15, 2026',
      description: 'Added a new program: Child Protection'
    },
    {
      id: '2',
      type: 'team',
      action: 'updated',
      entityName: 'Dr. Marie Nzigire',
      date: 'May 10, 2026',
      description: 'Updated Dr. Marie Nzigire\'s bio'
    },
    {
      id: '3',
      type: 'partner',
      action: 'added',
      entityName: 'Global Health Initiative',
      date: 'May 5, 2026',
      description: 'Added a new partner: Global Health Initiative'
    },
    {
      id: '4',
      type: 'news',
      action: 'added',
      entityName: 'Mobile Clinic Brings Healthcare to Remote Villages',
      date: 'April 28, 2026',
      description: 'Added a new news item: Mobile Clinic Brings Healthcare to Remote Villages'
    },
  ]);

  useEffect(() => {
    let cancelled = false;

    const loadBackendContent = async () => {
      try {
        const [
          newsResult,
          projectsResult,
          partnersResult,
          programsResult,
          teamMembersResult,
          impactStoriesResult,
          siteContentResult,
          enquiriesResult,
          interestsResult,
        ] = await Promise.allSettled([
          fetchJson<any[]>(`${API_BASE_URL}/news/`),
          fetchJson<any[]>(`${API_BASE_URL}/projects/`),
          fetchJson<any[]>(`${API_BASE_URL}/partners/`),
          fetchJson<any[]>(`${API_BASE_URL}/programs/`),
          fetchJson<any[]>(`${API_BASE_URL}/team-members/`),
          fetchJson<any[]>(`${API_BASE_URL}/impact-stories/`),
          fetchJson<any>(`${API_BASE_URL}/site-content/`),
          fetchJson<any[]>(`${API_BASE_URL}/enquiries/`, { requireAuth: true }),
          fetchJson<any[]>(`${API_BASE_URL}/interests/`, { requireAuth: true }),
        ]);

        if (cancelled) {
          return;
        }

        if (newsResult.status === 'fulfilled' && Array.isArray(newsResult.value)) {
          setNews(newsResult.value.map(toNewsItem));
        }

        if (projectsResult.status === 'fulfilled' && Array.isArray(projectsResult.value)) {
          setProjects(projectsResult.value.map(toProject));
        }

        if (partnersResult.status === 'fulfilled' && Array.isArray(partnersResult.value)) {
          setPartners(partnersResult.value.map(toPartner));
        }

        if (programsResult.status === 'fulfilled' && Array.isArray(programsResult.value)) {
          setPrograms(programsResult.value.filter(Boolean).map(toProgram));
        }

        if (teamMembersResult.status === 'fulfilled' && Array.isArray(teamMembersResult.value)) {
          setTeamMembers(teamMembersResult.value.filter(Boolean).map(toTeamMember));
        }

        if (impactStoriesResult.status === 'fulfilled' && Array.isArray(impactStoriesResult.value)) {
          setImpactStories(impactStoriesResult.value.filter(Boolean).map(toImpactStory));
        }

        if (siteContentResult.status === 'fulfilled' && siteContentResult.value) {
          setAboutContent(toAboutContent(siteContentResult.value));
        }

        if (enquiriesResult.status === 'fulfilled' && Array.isArray(enquiriesResult.value)) {
          setEnquiries(enquiriesResult.value.filter(Boolean).map(toEnquiry));
        }

        if (interestsResult.status === 'fulfilled' && Array.isArray(interestsResult.value)) {
          setInterests(interestsResult.value.filter(Boolean).map(toInterest));
        }
      } catch (error) {
        if (!cancelled) {
          console.warn('Unable to load content from backend, keeping local fallback data.', error);
        }
      }
    };

    void loadBackendContent();

    return () => {
      cancelled = true;
    };
  }, []);

  const addProgram = async (program: Omit<Program, 'id'>) => {
    const createdProgram = await requestJson<any>('/programs/', {
      method: 'POST',
      body: JSON.stringify(buildProgramPayload(program)),
    });

    setPrograms(prev => [toProgram(createdProgram), ...prev]);
  };

  const updateProgram = async (id: string, program: Partial<Program>) => {
    const currentProgram = programs.find(p => p.id === id);
    const updatedProgram = await requestJson<any>(`/programs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(buildProgramPayload({
        title: program.title || currentProgram?.title || 'Untitled Program',
        description: program.description || currentProgram?.description || '',
        details: program.details || currentProgram?.details || '',
        beneficiaries: program.beneficiaries || currentProgram?.beneficiaries || '',
        icon: program.icon || currentProgram?.icon || 'Shield',
        color: program.color || currentProgram?.color || 'bg-green-50 text-green-600',
      })),
    });

    setPrograms(prev => prev.map(p => p.id === id ? toProgram(updatedProgram) : p));
  };

  const deleteProgram = async (id: string) => {
    await requestJson<{ message: string }>(`/programs/${id}`, { method: 'DELETE' });
    setPrograms(prev => prev.filter(p => p.id !== id));
  };

  const addTeamMember = async (member: Omit<TeamMember, 'id'>) => {
    const createdMember = await requestJson<any>('/team-members/', {
      method: 'POST',
      body: JSON.stringify(buildTeamMemberPayload(member)),
    });

    setTeamMembers(prev => [toTeamMember(createdMember), ...prev]);
  };

  const updateTeamMember = async (id: string, member: Partial<TeamMember>) => {
    const currentMember = teamMembers.find(m => m.id === id);
    const updatedMember = await requestJson<any>(`/team-members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(buildTeamMemberPayload({
        id: id,
        name: member.name || currentMember?.name || 'Team Member',
        role: member.role || currentMember?.role || 'Team Member',
        bio: member.bio || currentMember?.bio || '',
        image: member.image || currentMember?.image || '',
        email: member.email || currentMember?.email || '',
        location: member.location || currentMember?.location || '',
        type: member.type || currentMember?.type || 'staff',
        linkedin: member.linkedin || currentMember?.linkedin || '',
      })),
    });

    setTeamMembers(prev => prev.map(m => m.id === id ? toTeamMember(updatedMember) : m));
  };

  const deleteTeamMember = async (id: string) => {
    await requestJson<{ message: string }>(`/team-members/${id}`, { method: 'DELETE' });
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  const addPartner = async (partner: Omit<Partner, 'id'>) => {
    const createdPartner = await requestJson<any>('/partners/', {
      method: 'POST',
      body: JSON.stringify(buildPartnerPayload(partner)),
    });

    setPartners(prev => [toPartner(createdPartner, partner.featured), ...prev]);
  };

  const updatePartner = async (id: string, partner: Partial<Partner>) => {
    const currentPartner = partners.find(p => p.id === id);
    const featured = typeof partner.featured === 'boolean' ? partner.featured : currentPartner?.featured;

    const updatedPartner = await requestJson<any>(`/partners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(buildPartnerPayload({
        id,
        name: partner.name || currentPartner?.name || 'Partner',
        type: partner.type || currentPartner?.type || 'international',
        logo: partner.logo || currentPartner?.logo,
        featured: featured ?? false,
      })),
    });

    setPartners(prev => prev.map(p => p.id === id ? toPartner(updatedPartner, featured) : p));
  };

  const deletePartner = async (id: string) => {
    await requestJson<{ message: string }>(`/partners/${id}`, { method: 'DELETE' });
    setPartners(prev => prev.filter(p => p.id !== id));
  };

  const addNews = async (newsItem: Omit<NewsItem, 'id'>) => {
    const createdNews = await requestJson<any>('/news/', {
      method: 'POST',
      body: JSON.stringify(buildNewsPayload(newsItem)),
    });

    setNews(prev => [toNewsItem(createdNews), ...prev]);
  };

  const updateNews = async (id: string, newsItem: Partial<NewsItem>) => {
    const currentNews = news.find(n => n.id === id);
    const payload = buildNewsPayload({
      id,
      title: newsItem.title || currentNews?.title || 'Untitled News',
      date: newsItem.date || currentNews?.date || '',
      image: newsItem.image || currentNews?.image || '',
      category: newsItem.category || currentNews?.category || 'News',
      content: newsItem.content || currentNews?.content || '',
    });

    const updatedNews = await requestJson<any>(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });

    setNews(prev => prev.map(n => n.id === id ? toNewsItem(updatedNews) : n));
  };

  const deleteNews = async (id: string) => {
    await requestJson<{ message: string }>(`/news/${id}`, { method: 'DELETE' });
    setNews(prev => prev.filter(n => n.id !== id));
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    const createdProject = await requestJson<any>('/projects/', {
      method: 'POST',
      body: JSON.stringify(buildProjectPayload(project)),
    });

    setProjects(prev => [toProject(createdProject), ...prev]);
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    const currentProject = projects.find(p => p.id === id);
    const payload = buildProjectPayload({
      id,
      title: project.title || currentProject?.title || 'Untitled Project',
      description: project.description || currentProject?.description || '',
      image: project.image || currentProject?.image || '',
      category: project.category || currentProject?.category || '',
      region: project.region || currentProject?.region || 'Eastern DRC',
      status: project.status || currentProject?.status || 'active',
      featured: project.featured ?? currentProject?.featured ?? false,
      beneficiaries: project.beneficiaries || currentProject?.beneficiaries || '',
      duration: project.duration || currentProject?.duration || '',
    });

    const updatedProject = await requestJson<any>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });

    setProjects(prev => prev.map(p => p.id === id ? toProject(updatedProject) : p));
  };

  const deleteProject = async (id: string) => {
    await requestJson<{ message: string }>(`/projects/${id}`, { method: 'DELETE' });
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addImpactStory = async (story: Omit<ImpactStory, 'id'>) => {
    const createdStory = await requestJson<any>('/impact-stories/', {
      method: 'POST',
      body: JSON.stringify(buildImpactStoryPayload(story)),
    });

    setImpactStories(prev => [toImpactStory(createdStory), ...prev]);
  };

  const updateImpactStory = async (id: string, story: Partial<ImpactStory>) => {
    const currentStory = impactStories.find(s => s.id === id);
    const updatedStory = await requestJson<any>(`/impact-stories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(buildImpactStoryPayload({
        id,
        title: story.title || currentStory?.title || 'Impact Story',
        quote: story.quote || currentStory?.quote || '',
        name: story.name || currentStory?.name || 'Community Member',
        role: story.role || currentStory?.role || 'Beneficiary',
        image: story.image || currentStory?.image || '',
        story: story.story || currentStory?.story || '',
        featured: story.featured ?? currentStory?.featured ?? false,
      })),
    });

    setImpactStories(prev => prev.map(s => s.id === id ? toImpactStory(updatedStory) : s));
  };

  const deleteImpactStory = async (id: string) => {
    await requestJson<{ message: string }>(`/impact-stories/${id}`, { method: 'DELETE' });
    setImpactStories(prev => prev.filter(s => s.id !== id));
  };

  const updateAboutContent = async (content: Partial<AboutContent>) => {
    const updatedContent = await requestJson<any>('/site-content/', {
      method: 'PUT',
      body: JSON.stringify({
        mission: content.mission,
        vision: content.vision,
        story: content.story,
      }),
    });

    setAboutContent(toAboutContent(updatedContent));
  };

  const addEnquiry = async (enquiry: Omit<Enquiry, 'id' | 'date' | 'status'>) => {
    const createdEnquiry = await requestJson<any>('/enquiries/', {
      method: 'POST',
      body: JSON.stringify({
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        subject: enquiry.subject,
        message: enquiry.message,
      }),
    });

    setEnquiries(prev => [toEnquiry(createdEnquiry), ...prev]);
  };

  const updateEnquiryStatus = async (id: string, status: Enquiry['status']) => {
    const updatedEnquiry = await requestJson<any>(`/enquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: status === 'in-progress' ? 'in_progress' : status }),
    });

    setEnquiries(prev => prev.map(e => e.id === id ? toEnquiry(updatedEnquiry) : e));
  };

  const deleteEnquiry = async (id: string) => {
    await requestJson<{ message: string }>(`/enquiries/${id}`, { method: 'DELETE' });
    setEnquiries(prev => prev.filter(e => e.id !== id));
  };

  const addInterest = async (interest: Omit<Interest, 'id' | 'date' | 'status'>) => {
    const createdInterest = await requestJson<any>('/interests/', {
      method: 'POST',
      body: JSON.stringify(buildInterestPayload(interest)),
    });

    setInterests(prev => [toInterest(createdInterest), ...prev]);
  };

  const updateInterestStatus = async (id: string, status: Interest['status']) => {
    const updatedInterest = await requestJson<any>(`/interests/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });

    setInterests(prev => prev.map(i => i.id === id ? toInterest(updatedInterest) : i));
  };

  const deleteInterest = async (id: string) => {
    await requestJson<{ message: string }>(`/interests/${id}`, { method: 'DELETE' });
    setInterests(prev => prev.filter(i => i.id !== id));
  };

  return (
    <ContentContext.Provider
      value={{
        programs,
        addProgram,
        updateProgram,
        deleteProgram,
        teamMembers,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        partners,
        addPartner,
        updatePartner,
        deletePartner,
        news,
        addNews,
        updateNews,
        deleteNews,
        projects,
        addProject,
        updateProject,
        deleteProject,
        impactStories,
        addImpactStory,
        updateImpactStory,
        deleteImpactStory,
        aboutContent,
        updateAboutContent,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        interests,
        addInterest,
        updateInterestStatus,
        deleteInterest,
        activities,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}