import React, { SFC } from "react";
import "./HeroDetailOverlay.scss";
import { Hero } from "../../interfaces";
import { Overlay } from "@blueprintjs/core";

export interface HeroDetailOverlayProps {
  hero: Hero | null;
  onClose: () => void;
}

export const HeroDetailOverlay: SFC<HeroDetailOverlayProps> = props => {
  return (
    <Overlay
      className="hero-detail-overlay"
      isOpen={!!props.hero}
      onClose={props.onClose}
    >
      <pre>{JSON.stringify(props.hero, null, "  ")}</pre>
    </Overlay>
  );
};
