export interface Interview {
  id: number;
  company: string;
  role: string;
  date: string;
  status: 'Scheduled' | 'Completed';
  feedback?: string;
}
