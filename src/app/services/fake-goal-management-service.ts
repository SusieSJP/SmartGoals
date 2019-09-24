import {Goal} from '../model/goal';

export class FakeGoalManagementService {
  goal: Goal;
  goals = new Map<string, Goal>();
  userGoals = new Map<string, Goal[]>();

  constructor() {}

  setGoal(
      name: string, startDate: Date, endDate: Date, workload: number,
      avgWorkload: number) {
    let id = this.goals.size;
    let diffDays =
        (endDate.valueOf() - startDate.valueOf()) / (1000 * 3600 * 24);
    let dailyProgress = new Array<number>(diffDays);
    let groups = new Array<number>();

    this.goal = {
      id,
      name,
      startDate,
      endDate,
      workload,
      avgWorkload,
      dailyProgress,
      groups
    };
  }

  addGoal(goal: Goal, userName: string) {
    let goalKey = userName + goal.name;
    this.goals.set(goalKey, goal);

    // if user has at least one goal
    if (this.userGoals.has(userName)) {
      this.userGoals.get(userName).push(goal);
    } else {
      let goalArr = new Array<Goal>();
      goalArr.push(goal);
      this.userGoals.set(userName, goalArr);
    }
  }

  // get the detail information of a specific goal
  // goalKey is the combination of goal.name and userName
  getGoal(goalKey: string): Goal {
    return this.goals.get(goalKey);
  }
  // get all the goals of the user
  getGoals(userName: string): Goal[] {
    return this.userGoals.get(userName);
  }
}
