import React, { SFC, useState } from "react";
import "./StoryPage.scss";
import { connect, useSelector } from "react-redux";
import { IYyxState } from "../../../store";
import {
  IHeroBookShard,
  IHeroData,
  HeroRarity,
  IHero,
  IStoryTask,
  IStoryTaskData
} from "../../../interfaces";
import { ALL_HERO_DATA, RarityRank } from "../../../modules/hero/data";
import { HeroDataIcon } from "../HeroIcon";
import { computeOnce } from "../../../utils";
import { HeroSelectors } from "../../../modules/hero";
import { Icon } from "@blueprintjs/core";
import { getStoryTaskMap } from "../../../modules/story/data";
import { StorySelectors } from "../../../modules/story";

interface Item {
  data: IHeroData;
  tasks: IStoryTaskData[];
}

const getDataList = computeOnce<Item[]>(() => {
  const TaskMap = getStoryTaskMap();
  return ALL_HERO_DATA.sort(
    (a, b) => -(RarityRank[a.rarity] - RarityRank[b.rarity])
  )
    .map(data => {
      return {
        data,
        tasks: TaskMap.get(data.id) || []
      };
    })
    .filter(i => i.tasks.length > 0);
});

const formatProgress = (v: number, max: number) => {
  const color = v === max ? "#0A6640" : v === 0 ? "#BFCCD6" : "#FFC940";
  return (
    <strong style={{ color }}>
      {v} / {max}
    </strong>
  );
};

export const StoryPage = () => {
  const progressMap = useSelector(StorySelectors.selectProgressMap);
  const items = React.useMemo(() => {
    if (!progressMap) {
      return null;
    }
    return getDataList().map(item => {
      const taskStatus = item.tasks.map(t => {
        const [v, max_v] = progressMap.get(t.id) || [0, t.cond_val];
        return {
          id: t.id,
          v,
          max_v
        };
      });
      return {
        ...item,
        taskTotal: taskStatus.length,
        taskDone: taskStatus.filter(s => s.v >= s.max_v).length,
        vTotal: taskStatus.map(s => s.max_v).reduce((t, v) => t + v, 0),
        vDone: taskStatus.map(s => s.v).reduce((t, v) => t + v, 0)
      };
    });
  }, [progressMap]);

  if (!progressMap || !items) {
    return null;
  }

  return (
    <>
      <table className="bp3-html-table bp3-html-table-striped story-table">
        <thead>
          <tr>
            <th>式神</th>
            <th>传记</th>
            <th>完成度</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => {
            return (
              <tr key={i.data.id}>
                <td>
                  <HeroDataIcon data={i.data} />
                </td>
                <td>
                  <ul className="task-list">
                    {i.tasks.map((t, i) => {
                      const [v, max] = progressMap.get(t.id) || [0, t.cond_val];
                      return (
                        <li key={i}>
                          {t.content} ({formatProgress(v, max)})
                        </li>
                      );
                    })}
                  </ul>
                </td>
                <td>
                  {formatProgress(i.taskDone, i.taskTotal)}
                  <br />
                  <small>{formatProgress(i.vDone, i.vTotal)}</small>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
