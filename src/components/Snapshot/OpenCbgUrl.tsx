import React from "react";
import {
  Dialog,
  Classes,
  Colors,
  TextArea,
  Intent,
  Button,
  Spinner,
  Callout,
  Card
} from "@blueprintjs/core";
import classNames from "classnames";
import { ICbgSnapshot } from "../../interfaces";
import { pullCbg } from "../../modules/cbg";
import { formatCurrency } from "../../utils";
import { useDispatch } from "react-redux";
import { SnapshotActions } from "../../modules/snapshot/actions";
import { IAccount } from "../../modules/account/types";
import { IDispatch } from "../../store";

export interface Props {
  open: boolean;
  onClose: () => void;
  onOpenAccount: (account: IAccount) => void;
}

const SnapshopPreview: React.SFC<{
  snapshot: ICbgSnapshot;
}> = ({ snapshot }) => {
  return (
    <Card>
      <h4 className={Classes.HEADING}>
        卖家: {snapshot.listing_info.player_name}
      </h4>
      <p>
        {snapshot.listing_info.server_name}
        <br />
        <strong className={Classes.TEXT_MUTED}>
          {snapshot.listing_info.player_level}级
        </strong>
        <br />
        <strong style={{ color: Colors.RED1 }}>
          {formatCurrency(snapshot.listing_info.price)}
        </strong>
      </p>
    </Card>
  );
};

const OpenCbgUrl: React.SFC<Props> = props => {
  const { open, onClose, onOpenAccount } = props;
  const dispatch = useDispatch<IDispatch>();
  const [url, setUrl] = React.useState("");
  const [snapshot, setSnapshot] = React.useState<ICbgSnapshot | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const onPull = async () => {
    setLoading(true);
    setError(null);
    try {
      const snapshot = await pullCbg(url);
      setSnapshot(snapshot);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const onOpen = async (snapshot: ICbgSnapshot) => {
    setLoading(true);
    setError(null);
    let account: IAccount | null = null;
    try {
      account = await dispatch(SnapshotActions.import(snapshot.snapshot));
    } catch (e) {
      setError(e);
    }
    setSnapshot(null);
    setLoading(false);
    onClose();
    if (account) {
      onOpenAccount(account);
    }
  };

  const load = (
    <>
      <div className={Classes.DIALOG_BODY}>
        {error && (
          <div className="yyx-space-v">
            <Callout title="读取藏宝阁数据失败" intent="danger">
              {error.message}
            </Callout>
          </div>
        )}

        <p className={classNames(Classes.TEXT_SMALL, Classes.TEXT_MUTED)}>
          打开任意藏宝阁商品详情页面，复制粘贴如下格式的整个网址:
          https://yys.cbg.163.com/cgi/mweb/equip/10/201907131401616...
        </p>
        <TextArea
          className={classNames(Classes.FILL)}
          growVertically={true}
          large={true}
          intent={Intent.PRIMARY}
          placeholder="粘贴藏宝阁商品链接"
          value={url}
          onChange={v => setUrl(v.target.value.trim())}
          disabled={loading}
        />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          {loading ? (
            <Spinner size={24} />
          ) : (
            <Button intent="primary" onClick={onPull} disabled={!url}>
              读取藏宝阁数据
            </Button>
          )}
        </div>
      </div>
    </>
  );

  const preview = snapshot && (
    <>
      <div className={Classes.DIALOG_BODY}>
        <SnapshopPreview snapshot={snapshot} />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          {loading ? (
            <Spinner size={24} />
          ) : (
            <>
              <Button
                intent="primary"
                onClick={() => onOpen(snapshot)}
                disabled={!url}
              >
                打开
              </Button>
              <Button onClick={() => setSnapshot(null)}>重新输入链接</Button>
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <Dialog isOpen={open} onClose={onClose} title="打开藏宝阁链接">
      {snapshot ? preview : load}
    </Dialog>
  );
};

export { OpenCbgUrl };
