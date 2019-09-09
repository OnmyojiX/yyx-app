import React, { SFC, MouseEventHandler } from "react";
import "./SubNav.scss";
import classNames from "classnames";
import { Menu, Classes, MenuItem, MenuDivider, Icon } from "@blueprintjs/core";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { useAccountPath } from "../../modules/account/hooks";

export interface SubNavLink {
  label: string;
  to: string;
}

const Render: SFC<RouteComponentProps & { links: SubNavLink[] }> = props => {
  const accountPath = useAccountPath();
  const path = props.location.pathname;
  return (
    <Menu large className="sub-nav">
      {props.links.map((link, i) => {
        const to = `${accountPath}${link.to}`;
        return (
          <MenuItem
            key={i}
            active={path === to}
            text={link.label}
            href={to}
            onClick={(e: React.MouseEvent) => handleLinkClick(e, props, to)}
          />
        );
      })}
    </Menu>
  );
};

const handleLinkClick = (
  e: React.MouseEvent,
  route: RouteComponentProps,
  to: string
) => {
  e.preventDefault();
  route.history.push(to);
};

export const SubNav = withRouter(Render);
