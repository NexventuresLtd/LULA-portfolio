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

const ORG_SETTINGS_MARKER = '<!--ORG_SETTINGS:';

const parseOrgSettings = (vision: string): OrgSettings | null => {
  const idx = vision.indexOf(ORG_SETTINGS_MARKER);
  if (idx === -1) return null;
  try {
    const json = vision.slice(idx + ORG_SETTINGS_MARKER.length, vision.indexOf('-->', idx));
    return JSON.parse(json);
  } catch { return null; }
};

const embedOrgSettings = (vision: string, settings: OrgSettings): string => {
  const idx = vision.indexOf(ORG_SETTINGS_MARKER);
  const cleanVision = idx === -1 ? vision : vision.slice(0, idx);
  return `${cleanVision}${ORG_SETTINGS_MARKER}${JSON.stringify(settings)}-->`;
};

const toAboutContent = (item: any): AboutContent => ({
  mission: item.mission || '',
  vision: (item.vision || '').split(ORG_SETTINGS_MARKER)[0],
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

export interface OrgSettings {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
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

  orgSettings: OrgSettings;
  updateOrgSettings: (settings: Partial<OrgSettings>) => void;

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
  const [programs, setPrograms] = useState<Program[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [impactStories, setImpactStories] = useState<ImpactStory[]>([]);
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    mission: '',
    vision: '',
    story: ''
  });
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [orgSettings, setOrgSettings] = useState<OrgSettings>({
    name: 'Let Us Live Association',
    email: 'letusliveassociation@gmail.com',
    phone: '+243 890 423 191',
    address: 'Avenue Kabasha, No. 01, Goma, North Kivu, DR Congo',
    website: 'www.lula-asbl.org'
  });

  const updateOrgSettings = async (settings: Partial<OrgSettings>) => {
    const updated = { ...orgSettings, ...settings };
    setOrgSettings(updated);
    // Persist to backend by embedding in vision field
    const currentVision = aboutContent.vision || '';
    const visionWithOrg = embedOrgSettings(currentVision, updated);
    try {
      await requestJson<any>('/site-content/', {
        method: 'PUT',
        body: JSON.stringify({
          mission: aboutContent.mission,
          vision: visionWithOrg,
          story: aboutContent.story,
        }),
      });
    } catch (error) {
      console.warn('Failed to persist org settings to backend', error);
    }
  };

  // --- REMOVED HARDCODED FALLBACK DATA - frontend now relies on backend only ---
  const _REMOVED_PLACEHOLDER = null; // eslint-disable-line
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
          const parsed = parseOrgSettings(siteContentResult.value.vision || '');
          if (parsed) setOrgSettings(prev => ({ ...prev, ...parsed }));
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
        orgSettings,
        updateOrgSettings,
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