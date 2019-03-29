import React, { SFC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { IHero, HeroRarity } from "../../interfaces";
import { IYyxState, IDispatch } from "../../store";
import { HeroGrid } from "./HeroGrid";
import { HeroDetailOverlay } from "./HeroDetailOverlay";
import {
  HeroSelectors,
  RarityOption,
  IHeroFolded,
  IHeroListOptions,
  HeroActions,
  ActionType
} from "../../modules/hero";
import { Card, Switch, Button, MenuItem, InputGroup } from "@blueprintjs/core";
import { Select, ItemRenderer } from "@blueprintjs/select";
import { Rarity } from "../Common/Rarity";
import { useDebounce } from "../../hooks/debounce";

const RaritySelect = Select.ofType<RarityOption>();
const RarityOptions = [
  "*",
  HeroRarity.SP,
  HeroRarity.SSR,
  HeroRarity.SR,
  HeroRarity.R,
  HeroRarity.N,
  "M"
] as Array<RarityOption>;

const getRarityElem = (option: RarityOption) => {
  let elem;
  if (option === "M") {
    elem = "素材";
  } else if (option === "*") {
    elem = "全部";
  } else {
    elem = <Rarity rarity={option} />;
  }
  return elem;
};

const renderRarityOption: ItemRenderer<RarityOption> = (option, params) => {
  let text = getRarityElem(option);
  return (
    <MenuItem
      key={option}
      text={text}
      onClick={params.handleClick}
      active={params.modifiers.active}
    />
  );
};

const StarSelect = Select.ofType<number>();
const StarOptions = [0, 6, 5, 4, 3, 2];
const renderStarOption: ItemRenderer<number> = (option, params) => {
  let text;
  if (option === 0) {
    text = "全部";
  } else {
    text = `${option}星`;
  }
  return (
    <MenuItem
      key={option}
      text={text}
      onClick={params.handleClick}
      active={params.modifiers.active}
    />
  );
};

const Render: SFC<{
  heroes: (IHero | IHeroFolded)[] | null;
  mapById: Map<string, IHero> | null;
  dispatch: IDispatch;
}> = props => {
  const { dispatch } = props;

  const [activeHero, setActiveHero] = useState<IHero | null>(null);
  const [fold, setFold] = useState(true);
  const [rarity, setRarity] = useState<RarityOption>("*");
  const [star, setStar] = useState(0);
  const [term, setTerm] = useState("");
  const debouncedTerm = useDebounce(term, 300);

  useEffect(() => {
    dispatch(
      HeroActions.setListOptions({
        fold: fold && !debouncedTerm,
        rarity,
        star,
        term: debouncedTerm
      })
    );
  }, [fold, rarity, star, debouncedTerm]);

  if (!props.heroes) {
    return null;
  }

  return (
    <>
      <HeroDetailOverlay
        hero={activeHero}
        onClose={() => setActiveHero(null)}
      />
      <Card className="yyx-space-v yyx-layout row yyx-options">
        <div className="item">
          <InputGroup
            leftIcon="filter"
            placeholder="搜索式神名称/昵称..."
            value={term}
            onChange={(e: any) => setTerm(e.target.value)}
          />
        </div>
        <div className="item">
          <RaritySelect
            filterable={false}
            items={RarityOptions}
            itemRenderer={renderRarityOption}
            onItemSelect={item => {
              setRarity(item);
            }}
          >
            <Button>
              <div className="yyx-layout row">
                稀有度: {getRarityElem(rarity)}
              </div>
            </Button>
          </RaritySelect>
        </div>
        <div className="item">
          <StarSelect
            filterable={false}
            items={StarOptions}
            itemRenderer={renderStarOption}
            onItemSelect={item => setStar(item)}
          >
            <Button>星级: {star ? `${star}星` : "全部"}</Button>
          </StarSelect>
        </div>
        <div style={{ flex: 1 }} />
        <div className="item">
          <Switch
            checked={fold}
            onChange={() => setFold(!fold)}
            className="item"
            label="折叠"
          />
        </div>
      </Card>
      <HeroGrid
        items={props.heroes}
        onClickHero={item =>
          item.id &&
          setActiveHero((props.mapById && props.mapById.get(item.id)) || null)
        }
      />
    </>
  );
};

export const HeroList = connect((state: IYyxState) => ({
  heroes: HeroSelectors.selectList(state),
  mapById: HeroSelectors.selectMapById(state)
}))(Render);
