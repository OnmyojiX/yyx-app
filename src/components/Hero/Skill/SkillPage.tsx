import React, { SFC, useState } from "react";
import "./SkillPage.scss";
import { connect } from "react-redux";
import { IYyxState } from "../../../store";
import {
  IHeroBookShard,
  IHeroData,
  HeroRarity,
  IHero
} from "../../../interfaces";
import { ALL_HERO_DATA, RarityRank } from "../../../modules/hero/data";
import { HeroDataIcon } from "../HeroIcon";
import { computeOnce } from "../../../utils";
import { getSkillMaxLevelMap } from "../../../modules/skill/data";
import { HeroSelectors } from "../../../modules/hero";
import { Icon } from "@blueprintjs/core";

interface Item {
  data: IHeroData;
  all_skills: number[];
  skill_max_levels: number[];
}

const getDataList = computeOnce<Item[]>(() => {
  const SkillMaxLevelMap = getSkillMaxLevelMap();
  return ALL_HERO_DATA.filter(
    i => RarityRank[i.rarity] >= RarityRank[HeroRarity.SR]
  )
    .sort((a, b) => -(RarityRank[a.rarity] - RarityRank[b.rarity]))
    .map(data => {
      const all_skills = [
        ...data.skills,
        ...(data.awake_skill ? [data.awake_skill] : [])
      ].sort();
      return {
        data,
        all_skills,
        skill_max_levels: all_skills.map(s => SkillMaxLevelMap.get(s) || 0)
      };
    });
});

const formatUpgrade = (hero: IHero, item: Item) => {
  let done = true;
  const numbers = item.all_skills.map((s, i) => {
    const skill = hero.skills.find(skill => skill.id === s);
    const max = item.skill_max_levels[i];
    const level = skill ? skill.level : 1;
    const color =
      level === max ? "#0A6640" : level === 1 ? "#BFCCD6" : "#FFC940";
    done = done && level === max;
    return (
      <span key={s} style={{ color }}>
        {level}
      </span>
    );
  });
  return <div className="levels">{numbers}</div>;
};

const Render: SFC<{
  heroesMap: Map<number, IHero[]> | null;
}> = props => {
  if (!props.heroesMap) {
    return null;
  }

  return (
    <>
      <table className="bp3-html-table bp3-html-table-striped skill-table">
        <thead>
          <tr>
            <th>式神</th>
            <th>技能最大等级</th>
            <th>升级</th>
          </tr>
        </thead>
        <tbody>
          {getDataList().map(i => {
            const heroes =
              (props.heroesMap && props.heroesMap.get(i.data.id)) || [];
            return (
              <tr key={i.data.id}>
                <td>
                  <HeroDataIcon data={i.data} />
                </td>
                <td>
                  <div className="levels big">
                    {i.skill_max_levels.map((l, i) => (
                      <span key={i}>{l}</span>
                    ))}
                  </div>
                </td>
                <td>
                  {heroes.length ? (
                    <ul className="bp3-list bp3-list-unstyled">
                      {heroes.map(h => (
                        <li key={h.id}>{formatUpgrade(h, i)}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="bp3-text-muted">未获取</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export const SkillPage = connect((state: IYyxState) => ({
  heroesMap: HeroSelectors.selectMapByHeroId(state)
}))(Render);
