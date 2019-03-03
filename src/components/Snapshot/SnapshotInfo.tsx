import { connect } from "react-redux";
import { ReactElement, SFC } from "react";
import { IYyxState } from "../../store";
import { ISnapshot } from "../../interfaces";

interface RenderProps {
  current: ISnapshot | null;
  notSelected: boolean;
  render: (info: ISnapshot | null) => ReactElement | null;
}

const Render: SFC<RenderProps> = (props: RenderProps) => {
  return props.render(props.current);
};

export interface SnapshotInfoProps {
  render: (info: ISnapshot | null) => ReactElement | null;
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
