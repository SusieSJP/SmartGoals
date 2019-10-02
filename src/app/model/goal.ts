
export interface Goal {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  // workload is the total number of works before complete the goal
  workload: number;
  // avgWorkload is the expected daily workload
  avgWorkload: number;

  // daily progress is the list of number, where each number represents the
  // actual progress of the user the length of the list should be the same as
  // the duration of the goal
  dailyProgress: number[];
  // groups is the list of number, where each number represents the group id
  // that contains this goal.
  groups: number[];
  userEmail: string;
}
