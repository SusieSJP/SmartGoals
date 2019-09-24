export interface Goal {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  workload: number;
  avgWorkload: number;
  dailyProgress: number[];
  groups: number[];
}
