import React, { ReactElement, SFC, useState, useEffect, lazy } from "react";
import pkg from "../../../package.json";
import { HttpClient } from "../../modules/http";
import {
  Popover,
  Icon,
  Spinner,
  Intent,
  Button,
  Tag,
  Divider
} from "@blueprintjs/core";
import "./UpdateInfo.scss";
const os: string = require("platform").os.family;
const Markdown = require("react-markdown");

const MyTargets: string[] =
  os === "OS X"
    ? ["macOS"]
    : os.includes("Windows")
    ? [
        "Windows",
        "Windows-32bit",
        "Windows-64bit",
        "Steam",
        "Facebook-Gameroom"
      ]
    : ["Ubuntu", "Debian", "Fedora", "Red Hat"].some(v => os.includes(v))
    ? ["Linux"]
    : [];

const R_FILENAME = /^(yyx|yyx-snapshot)-(\d+\.\d+.\d+)-([^.]+)\.(.+)$/;

function getProxyUrl(url: string): string {
  return url.replace(
    "https://github.com/OnmyojiX/yyx/",
    "http://yyx.cloud/github/"
  );
}

function getAssetElement(asset: GithubAsset) {
  const parts = asset.name.match(R_FILENAME);
  if (!parts) {
    return null;
  }
  const [_, product, version, target] = parts;
  const myTarget = MyTargets.includes(target);
  const productName = product === "yyx" ? "痒痒熊主程序" : "痒痒熊快照";
  return (
    <>
      <a href={asset.browser_download_url} target="_blank">
        <Icon icon="download" />
        &nbsp;
        {myTarget ? <strong>{productName}</strong> : productName}
      </a>
      &nbsp;
      <Tag intent={Intent.PRIMARY} minimal={!myTarget}>
        {target.replace("-", " ")}
      </Tag>
      &nbsp;v{version}
    </>
  );
}

interface GithubAsset {
  browser_download_url: string;
  content_type: string;
  name: string;
  size: number;
}

interface GithubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  assets: Array<GithubAsset>;
}

const ReleaseInfo: SFC<{ release: GithubRelease }> = ({ release }) => {
  return (
    <div className="release-info">
      <h2>{release.name}</h2>
      <p>
        <small>v{release.tag_name}</small>
      </p>
      <Markdown source={release.body} />
      <Divider />
      <ul className="asset-list">
        {release.assets.map(a => (
          <li key={a.browser_download_url}>{getAssetElement(a)}</li>
        ))}
      </ul>
    </div>
  );
};

export const UpdateInfo: SFC = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const [latest, setLatest] = useState<GithubRelease | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    Promise.race([
      HttpClient.get<GithubRelease>(
        "http://yyx.cloud/github-api/releases/latest"
      ).then(res => {
        res.data.assets.forEach(
          a => (a.browser_download_url = getProxyUrl(a.browser_download_url))
        );
        return res;
      }),
      HttpClient.get<GithubRelease>(
        "https://api.github.com/repos/OnmyojiX/yyx/releases/latest"
      )
    ]).then(
      res => {
        if (res.data) {
          if (res.data.tag_name > pkg.version) {
            setLatest(res.data);
          }
        }
        setLoading(false);
      },
      err => {
        setError(err);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <Spinner size={16} />;
  }

  if (error) {
    return (
      <a href="http://nga.178.com/read.php?tid=16557282" target="_blank">
        检查更新
      </a>
    );
  }

  return (
    <span className="bp3-text-muted">
      {!latest && pkg.version}
      {latest && (
        <Popover defaultIsOpen={true}>
          <Button minimal intent={Intent.PRIMARY}>
            <Icon icon="info-sign" />
            &nbsp; <strong>有更新</strong>
          </Button>
          <ReleaseInfo release={latest} />
        </Popover>
      )}
    </span>
  );
};
