import { connect } from "react-redux";
import { ISnapshotInfo } from "../../modules/snapshot";
import { ReactElement, SFC } from "react";
import { IYyxState } from "../../store";

interface RenderProps {
  current: ISnapshotInfo | null;
  notSelected: boolean;
  render: (info: ISnapshotInfo | null) => ReactElement | null;
}

const Render: SFC<RenderProps> = (props: RenderProps) => {
  return props.render(props.current);
};

export interface SnapshotInfoProps {
  render: (info: ISnapshotInfo | null) => ReactElement | null;
}

export const SnapshotInfo = connect(
  (state: IYyxState) => ({
    current: state.snapshot.current,
    notSelected: state.snapshot.currentNotSelected
  }),
  null,
  (stateProps, dispatchProps, ownProps: SnapshotInfoProps) => ({
    ...stateProps,
    render: ownProps.render
  })
)(Render);
