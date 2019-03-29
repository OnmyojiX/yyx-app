import SKILL_LEVEL_DATA from "./SKILL_LEVEL_DATA.json";
import { number } from "prop-types";
import { computeOnce } from "../../utils";

export const getSkillMaxLevelMap = computeOnce(() => {
  return SKILL_LEVEL_DATA.reduce((m, i) => {
    m.set(i[0], i[2]);
    return m;
  }, new Map<number, number>());
});
