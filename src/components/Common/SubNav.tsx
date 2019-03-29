import React, { SFC, MouseEventHandler } from "react";
import "./SubNav.scss";
import classNames from "classnames";
import { Menu, Classes, MenuItem, MenuDivider, Icon } from "@blueprintjs/core";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";

export interface SubNavLink {
  label: string;
  to: string;
}

const Render: SFC<RouteComponentProps & { links: SubNavLink[] }> = props => {
  const path = props.location.pathname;
  return (
    <Menu large className="sub-nav">
      {props.links.map((link, i) => (
        <MenuItem
          key={i}
          active={path === link.to}
          text={link.label}
          href={link.to}
          onClick={(e: React.MouseEvent) => handleLinkClick(e, props, link)}
        />
      ))}
    </Menu>
  );
};

const handleLinkClick = (
  e: React.MouseEvent,
  route: RouteComponentProps,
  link: SubNavLink
) => {
  e.preventDefault();
  route.history.push(link.to);
};

export const SubNav = withRouter(Render);
