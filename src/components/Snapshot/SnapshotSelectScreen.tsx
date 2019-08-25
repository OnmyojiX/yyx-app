import React, { SFC, ChangeEvent, FormEventHandler, useState } from "react";
import "./SnapshotSelectScreen.scss";
import logo from "../../assets/logo.svg";
import {
  FileInput,
  Callout,
  Spinner,
  Button,
  Divider
} from "@blueprintjs/core";
import { YyxStore, IDispatch } from "../../store";
import { SnapshotActions } from "../../modules/snapshot";
import { connect } from "react-redux";
import { OpenCbgUrl } from "./OpenCbgUrl";

const SnapshotSelectScreenImpl: SFC<{
  dispatch: IDispatch;
}> = props => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [openCbg, setOpenCbg] = useState(false);

  const handleSelectFile: FormEventHandler<HTMLInputElement> = e => {
    const { files } = e.target as any;
    if (files.length) {
      setError(null);
      setLoading(true);
      props
        .dispatch(SnapshotActions.select(files[0]))
        // .finally(() => setLoading(false))
        .catch((err: Error) => {
          setLoading(false);
          setError(err);
        });
    }
  };

  return (
    <>
      <div className="snapshot-select-screen">
        <div className="bp3-non-ideal-state">
          <div className="bp3-non-ideal-state-visual">
            <img src={logo} className="logo" />
          </div>
          <h4 className="bp3-heading">痒痒熊</h4>
          <div className="bp3-text-small bp3-text-muted">
            痒痒鼠超厉害的的小伙伴。
          </div>
          {error && (
            <Callout title="打开快照失败" intent="danger">
              {error.message}
            </Callout>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <>
              <FileInput
                text="选择本地快照文件"
                onInputChange={handleSelectFile}
                large
              />
              <Button minimal intent="primary" onClick={() => setOpenCbg(true)}>
                打开藏宝阁网址
              </Button>
            </>
          )}
        </div>
      </div>
      <OpenCbgUrl open={openCbg} onClose={() => setOpenCbg(false)} />
    </>
  );
};

export const SnapshotSelectScreen = connect()(SnapshotSelectScreenImpl);
