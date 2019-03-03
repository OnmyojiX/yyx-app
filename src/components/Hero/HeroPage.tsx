import React, { SFC, useEffect, useState } from "react";
import "./HeroPage.scss";
import { connect } from "react-redux";
import { IHero } from "../../interfaces";
import { IYyxState } from "../../store";
import { Spinner, Callout, ButtonGroup, Button } from "@blueprintjs/core";
import { HeroGrid } from "./HeroGrid";
import { HeroDetailOverlay } from "./HeroDetailOverlay";
import { HeroSelectors } from "../../modules/hero";

const Render: SFC<{
  heroes: IHero[] | null;
  load: () => Promise<void>;
}> = props => {
  const hero = (props.heroes as IHero[]).find(
    h => h.id === "57fbed9f9567c93d496f1262"
  ) as IHero;

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeHero, setActiveHero] = useState<IHero | null>(hero);
  useEffect(() => {
    if (!props.heroes) {
      setLoading(true);
      props
        .load()
        .finally(() => setLoading(false))
        .catch(err => {
          setError(err);
        });
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Callout title="读取式神数据失败" intent="danger">
        {error.message}
      </Callout>
    );
  }

  if (!props.heroes) {
    return null;
  }

  return (
    <>
      <HeroDetailOverlay
        hero={activeHero}
        onClose={() => setActiveHero(null)}
      />
      <HeroGrid
        items={props.heroes}
        onClickHero={hero => setActiveHero(hero)}
      />
    </>
  );
};

export const HeroPage = connect((state: IYyxState) => ({
  heroes: HeroSelectors.selectAllSorted(state)
}))(Render);
