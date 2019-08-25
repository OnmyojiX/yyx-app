import { IStoryTaskData, IHeroStoryTaskData } from "../../interfaces";
import { computeOnce } from "../../utils";

export const DATA: IHeroStoryTaskData[] = require("./STORY_TASK_DATA.json");

export const getStoryTaskMap = computeOnce(() => {
  return DATA.reduce((m, i) => {
    m.set(i.hero_id, i.tasks.slice(0, 3));
    return m;
  }, new Map<number, IStoryTaskData[]>());
});
