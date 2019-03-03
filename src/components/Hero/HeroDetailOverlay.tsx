import React, { SFC, useRef } from "react";
import "./HeroDetailOverlay.scss";
import { IHero } from "../../interfaces";
import { Overlay } from "@blueprintjs/core";
import { HeroDetail } from "./HeroDetail";
import { getHeroData } from "../../modules/hero/data";

export interface HeroDetailOverlayProps {
  hero: IHero | null;
  onClose: () => void;
}

export const HeroDetailOverlay: SFC<HeroDetailOverlayProps> = props => {
  const contentEl = useRef<HTMLDivElement>(null);

  return (
    <Overlay
      className="hero-detail-overlay"
      backdropClassName="hero-detail-overlay-backdrop"
      isOpen={!!props.hero}
      onClose={() => {
        if (contentEl.current) {
          contentEl.current.classList.add("closing");
        }
        props.onClose();
      }}
    >
      {props.hero && (
        <div ref={contentEl} className="content">
          <div style={{ flex: "0 0 auto" }}>
            <HeroDetail hero={props.hero} />
          </div>
          {/* <pre
            style={{ height: 400, maxWidth: 600, overflow: "auto", flex: "1" }}
          >
            {JSON.stringify(props.hero, null, "  ")}
          </pre> */}
        </div>
      )}
    </Overlay>
  );
};
