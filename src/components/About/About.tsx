import "./About.scss";
import React, { ReactElement, SFC, useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Icon } from "@blueprintjs/core";
import pkg from "../../../package.json";

export const About: SFC = props => {
  return (
    <div className="about">
      <div className="yyx-layout row">
        <div className="item logo">
          <img width={100} height={100} src={logo} />
          <br />
          <small className="bp3-text-muted">v{pkg.version}</small>
        </div>
        <div className="item content">
          <dl>
            <dt>作者</dt>
            <dd>海外加速区 | AD钙奶猫</dd>
            <dt>NGA</dt>
            <dd>
              <a
                target="_blank"
                href="http://nga.178.com/read.php?tid=16557282"
              >
                链接 <Icon icon={"link"} />
              </a>
            </dd>
            <dt>GitHub</dt>
            <dd>
              <a target="_blank" href="https://github.com/OnmyojiX/yyx">
                链接 <Icon icon={"link"} />
              </a>
            </dd>
            <dt>QQ群</dt>
            <dd>496107455</dd>
            <dt>微博</dt>
            <dd>
              <a
                target="_blank"
                href="https://www.weibo.com/p/1005056044720097/home"
              >
                链接 <Icon icon={"link"} />
              </a>
            </dd>
          </dl>

          <h2 className="important">求赞</h2>
          <div className="important">
            请给我老婆 <strong>AD钙奶熊</strong> 点赞
          </div>
          <div className="important">
            请给我老婆 <strong>AD钙奶熊</strong> 点赞
          </div>
          <div className="important">
            请给我老婆 <strong>AD钙奶熊</strong> 点赞
          </div>
        </div>
      </div>
    </div>
  );
};
