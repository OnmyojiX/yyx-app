import React, { SFC } from "react";
import { Menu, Classes, MenuItem, MenuDivider, Icon } from "@blueprintjs/core";

export const HeroNav: SFC<{}> = props => {
  return (
    <Menu large>
      <MenuItem active text="式神列表" />
      {/* <MenuItem text="技能统计" />
      <MenuItem text="狗粮统计" />
      <MenuItem text="图鉴" /> */}
    </Menu>
  );
};
