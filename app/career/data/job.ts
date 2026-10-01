export interface Job {
  id: string;
  title: string;
  slug?: string;
  department?: string;
  experience: string;
  location: string;
  jobType: string;
  salaryRange?: string;
  description: string[];
  responsibilities: string[];
  eligibility: string[];
  skills: string[];
  importantNote?: string;
  filter: "developer" | "design" | "sales" | "testing" | "operations";
  icon: "developer" | "design" | "sales" | "testing" | "operations";
}

export const jobsData: Job[] = [];
