import React, { SFC } from "react";
import "./Star.scss";
import classNames from "classnames";

export interface StarProps {
  type: StarType;
}

export enum StarType {
  Grey = "grey",
  Orange = "orange",
  Purple = "purple",
  Blue = "blue"
}

const renderStar = (i: number, type: StarType) => {
  return <i key={i} className={classNames("star", `star-${type}`)} />;
};

const Elements: { [key: string]: JSX.Element[][] } = {
  [StarType.Orange]: [],
  [StarType.Purple]: [],
  [StarType.Blue]: []
};
for (let i = 0; i < 6; i++) {
  const orangeElems = [];
  const purpleElems = [];
  const blueElems = [];
  for (let ii = 0; ii <= i; ii++) {
    orangeElems.push(renderStar(ii, StarType.Orange));
    purpleElems.push(renderStar(ii, StarType.Purple));
    blueElems.push(renderStar(ii, StarType.Blue));
  }
  for (let ii = i + 1; ii < 6; ii++) {
    orangeElems.push(renderStar(ii, StarType.Grey));
    purpleElems.push(renderStar(ii, StarType.Grey));
    blueElems.push(renderStar(ii, StarType.Grey));
  }
  Elements[StarType.Orange].push(orangeElems);
  Elements[StarType.Purple].push(purpleElems);
  Elements[StarType.Blue].push(blueElems);
}

export const Stars: SFC<StarProps & { level: number }> = props => {
  return <>{Elements[props.type][props.level - 1]}</>;
};
