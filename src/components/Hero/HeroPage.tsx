import React, { SFC, useEffect, useState } from "react";
import "./HeroPage.scss";
import { connect } from "react-redux";
import { Hero } from "../../interfaces";
import { IYyxState, IDispatch } from "../../store";
import { HeroActions } from "../../modules/hero";
import { Spinner, Callout } from "@blueprintjs/core";
import { HeroGrid } from "./HeroGrid";

const Render: SFC<{
  heroes: Hero[] | null;
  load: () => Promise<void>;
}> = props => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
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

  return <HeroGrid items={props.heroes} />;
};

export const HeroPage = connect(
  (state: IYyxState) => ({
    heroes: state.hero.heros
  }),
  (dispatch: IDispatch) => ({
    load: () => dispatch(HeroActions.load())
  })
)(Render);
