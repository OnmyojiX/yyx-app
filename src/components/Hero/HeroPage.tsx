import React, { SFC, useEffect, useState } from "react";
import "./HeroPage.scss";
import { connect } from "react-redux";
import { Hero } from "../../interfaces";
import { IYyxState, IDispatch } from "../../store";
import { HeroActions } from "../../modules/hero";
import { Spinner } from "@blueprintjs/core";

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

  if (!props.heroes) {
    return null;
  }

  return (
    <ul>
      {props.heroes.map(h => {
        return (
          <li style={{ float: "left" }} key={h.id}>
            <img src={`/res/hero/${h.hero_id}.png`} />
          </li>
        );
      })}
    </ul>
  );
};

export const HeroPage = connect(
  (state: IYyxState) => ({
    heroes: state.hero.heros
  }),
  (dispatch: IDispatch) => ({
    load: () => dispatch(HeroActions.load())
  })
)(Render);
