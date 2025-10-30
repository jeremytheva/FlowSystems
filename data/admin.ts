export interface BacklogItem {
  platform: string;
  stage: 'Discovery' | 'Scoping' | 'In flight';
  notes: string;
}

export interface PublishingItem {
  title: string;
  status: 'Scheduled' | 'Drafting' | 'Needs QA';
  date: string;
}

export interface CourseCohort {
  slug: string;
  title: string;
  status: 'Recording' | 'Waitlist' | 'Published';
}

export const reviewBacklog: BacklogItem[] = [
  { platform: 'ChannelDesk', stage: 'Discovery', notes: 'Need first operator interview and access to sandbox.' },
  { platform: 'LedgerLoop', stage: 'Scoping', notes: 'Mapping accounting workflows to migration checklist.' },
  { platform: 'SupportFlow', stage: 'In flight', notes: 'Pilot running with 3 beta customers.' },
];

export const publishingPipeline: PublishingItem[] = [
  { title: 'FlowOS review v1.0', status: 'Scheduled', date: 'May 20' },
  { title: 'Automation CRM comparison', status: 'Drafting', date: 'May 24' },
  { title: 'SprintKit migration guide', status: 'Needs QA', date: 'May 28' },
];

export const courseCohorts: CourseCohort[] = [
  { slug: 'automation-foundations', title: 'Automation Foundations', status: 'Recording' },
  { slug: 'revops-fast-start', title: 'RevOps Fast Start', status: 'Waitlist' },
];
