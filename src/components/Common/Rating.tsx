import React, { SFC } from "react";
import "./Rating.scss";
import classNames from "classnames";
import { Ratings } from "../../interfaces";

export interface RatingProps {
  rating: Ratings;
}

export const Rating: SFC<RatingProps> = props => {
  return <i className={classNames("rating", `rating-${props.rating}`)} />;
};
