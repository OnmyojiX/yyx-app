import React, { SFC, useState, useEffect, EventHandler } from "react";
import "./EquipList.scss";
import { connect } from "react-redux";
import { IHeroEquip, HeroEquipAttrType, ISnapshot } from "../../interfaces";
import { IYyxState, IDispatch } from "../../store";
import {
  EquipSelectors,
  EquipActions,
  IEquipListOptions,
  EquipLevelFilter,
  EquipEquippedFilter
} from "../../modules/equip";
import { EquipGrid } from "./EquipGrid";
import {
  Card,
  Button,
  Divider,
  ButtonGroup,
  InputGroup,
  Callout
} from "@blueprintjs/core";
import { EquipTypeMultiSelector } from "./EquipTypeSelector";
import { EquipPosition } from "./EquipPosition";
import {
  HeroEquipPosAttrBaseTypes,
  getEquipAttrName
} from "../../modules/equip/attr";
import { useDebounce } from "../../hooks/debounce";
import classNames from "classnames";
import { DateInput } from "@blueprintjs/datetime";
import { formatDate, parseDate } from "../../utils";
import { SnapshotInfo } from "../Snapshot/SnapshotInfo";
import { exportJson } from "../../modules/equip/export";
import { equipsToOcr2 } from "../../modules/equip/ocr2";

const renderPositions = (
  value: number[],
  onClick: (value: number, active: boolean) => void
) => {
  const nodes = [];
  for (let i = 1; i <= 6; i++) {
    const active = value.includes(i);
    nodes.push(
      <EquipPosition
        key={i}
        active={active}
        position={i}
        onClick={() => onClick(i, active)}
      />
    );
  }
  return <ButtonGroup>{nodes}</ButtonGroup>;
};

const renderStars = (
  value: number[],
  onClick: (value: number, active: boolean) => void
) => {
  const nodes = [];
  for (let i = 1; i <= 6; i++) {
    const active = value.includes(i);
    nodes.push(
      <Button key={i} active={active} onClick={() => onClick(i, active)}>
        {i}星
      </Button>
    );
  }
  return <ButtonGroup>{nodes}</ButtonGroup>;
};

function getBaseAttrList(positions: number[]): HeroEquipAttrType[] {
  return Array.from(
    new Set(
      positions
        .map(pos => HeroEquipPosAttrBaseTypes.get(pos) || [])
        .reduce((l, r) => [...l, ...r], [])
    )
  );
}

const renderBaseAttrs = (
  positions: number[],
  value: HeroEquipAttrType[] | null,
  onChange: (value: HeroEquipAttrType, active: boolean) => void
) => {
  if (!positions.length) {
    return (
      <Button minimal disabled alignText="left">
        请选择位置
      </Button>
    );
  }

  const attrs = getBaseAttrList(positions);
  return (
    <ButtonGroup>
      {attrs.map(type => {
        const active = !!(value && value.includes(type));
        return (
          <Button
            active={active}
            key={type}
            onClick={() => onChange(type, active)}
            disabled={attrs.length === 1}
          >
            {getEquipAttrName(type)}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

const renderScores = (
  value: number[],
  onClick: (value: number, active: boolean) => void
) => {
  const nodes = [];
  for (let i = 3; i <= 9; i++) {
    const active = value.includes(i);
    nodes.push(
      <Button key={i} active={active} onClick={() => onClick(i, active)}>
        {i}分
      </Button>
    );
  }
  return <ButtonGroup>{nodes}</ButtonGroup>;
};

const DefaultListOptions: IEquipListOptions = {
  id: "",
  types: null,
  positions: [],
  stars: [6],
  baseAttrs: null,
  trashed: false,
  level: EquipLevelFilter.Max,
  equipped: EquipEquippedFilter.Any,
  creationTimeFrom: null,
  creationTimeTo: null,
  scores: []
};

const Render: SFC<{
  equips: IHeroEquip[] | null;
  dispatch: IDispatch;
}> = props => {
  const [options, _setOptions] = useState<IEquipListOptions>(
    DefaultListOptions
  );
  const debouncedOptions = useDebounce(options, 500);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState("");

  useEffect(() => {
    if (debouncedOptions) {
      props.dispatch(EquipActions.setListOptions(debouncedOptions));
      setLoading(false);
    }
  }, [debouncedOptions]);

  const setOptions = (v: IEquipListOptions) => {
    _setOptions(v);
    setLoading(true);
  };

  if (!props.equips) {
    return null;
  }

  return (
    <div className="yyx-full-height yyx-layout row">
      <Card className="yyx-nav-left item yyx-options equip-list-options">
        <div className="item">
          <InputGroup
            leftIcon="filter"
            placeholder="搜索御魂ID"
            value={options.id}
            onChange={(e: any) =>
              setOptions({
                ...options,
                id: e.target.value
              })
            }
          />
        </div>
        <Divider className="item" />
        <div className="yyx-layout row item">
          <label className="item">类型: </label>
          <EquipTypeMultiSelector
            className="item"
            onChange={types =>
              setOptions({
                ...options,
                types
              })
            }
          />
        </div>
        <div className="item yyx-layout row">
          <label className="item">位置: </label>
          <div className="item pos-icons">
            {renderPositions(options.positions, (pos, active) => {
              let positions;
              if (active) {
                positions = options.positions.filter(p => p !== pos);
              } else {
                positions = [...options.positions.filter(p => p !== pos), pos];
              }
              setOptions({
                ...options,
                positions
              });
            })}
          </div>
        </div>
        <div className="item yyx-layout row">
          <label className="item">星级: </label>
          <div className="item">
            {renderStars(options.stars, (star, active) => {
              let stars;
              if (active) {
                stars = options.stars.filter(s => s !== star);
              } else {
                stars = [...options.stars.filter(s => s !== star), star];
              }
              setOptions({
                ...options,
                stars
              });
            })}
          </div>
        </div>
        <div className="item yyx-layout row ">
          <label className="item">主属性:</label>
          <div className="item">
            {renderBaseAttrs(
              options.positions,
              options.baseAttrs,
              (attr, active) => {
                let attrs;
                if (active) {
                  attrs = options.baseAttrs
                    ? options.baseAttrs.filter(a => a !== attr)
                    : [];
                } else {
                  attrs = options.baseAttrs
                    ? [...options.baseAttrs.filter(a => a !== attr), attr]
                    : [attr];
                }
                setOptions({
                  ...options,
                  baseAttrs: attrs
                });
              }
            )}
          </div>
        </div>
        <div className="item yyx-layout row">
          <label className="item">强化:</label>
          <div className="item">
            <ButtonGroup>
              <Button
                active={options.level === EquipLevelFilter.Zero}
                onClick={() => {
                  setOptions({
                    ...options,
                    level:
                      options.level === EquipLevelFilter.Zero
                        ? EquipLevelFilter.Any
                        : EquipLevelFilter.Zero
                  });
                }}
              >
                未强化
              </Button>
              <Button
                active={options.level === EquipLevelFilter.Max}
                onClick={() => {
                  setOptions({
                    ...options,
                    level:
                      options.level === EquipLevelFilter.Max
                        ? EquipLevelFilter.Any
                        : EquipLevelFilter.Max
                  });
                }}
              >
                +15
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="item yyx-layout row">
          <label className="item">装备:</label>
          <div className="item">
            <ButtonGroup>
              <Button
                active={options.equipped === EquipEquippedFilter.NotEquipped}
                onClick={() => {
                  setOptions({
                    ...options,
                    equipped:
                      options.equipped === EquipEquippedFilter.NotEquipped
                        ? EquipEquippedFilter.Any
                        : EquipEquippedFilter.NotEquipped
                  });
                }}
              >
                未装备
              </Button>
              <Button
                active={options.equipped === EquipEquippedFilter.Equipped}
                onClick={() => {
                  setOptions({
                    ...options,
                    equipped:
                      options.equipped === EquipEquippedFilter.Equipped
                        ? EquipEquippedFilter.Any
                        : EquipEquippedFilter.Equipped
                  });
                }}
              >
                装备
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="item yyx-layout row">
          <label className="item">弃置:</label>
          <div className="item">
            <ButtonGroup>
              <Button
                active={options.trashed === false}
                onClick={() => {
                  setOptions({
                    ...options,
                    trashed: options.trashed === false ? null : false
                  });
                }}
              >
                未弃置
              </Button>
              <Button
                active={options.trashed === true}
                onClick={() => {
                  setOptions({
                    ...options,
                    trashed: options.trashed === true ? null : true
                  });
                }}
              >
                已弃置
              </Button>
            </ButtonGroup>
          </div>
        </div>
        {/* <div className="item yyx-layout row ">
          <label className="item">评分: </label>
          <div className="item">
            {renderScores(options.scores, (score, active) => {
              let scores;
              if (active) {
                scores = options.scores
                  ? options.scores.filter(s => s !== score)
                  : [];
              } else {
                scores = options.scores
                  ? [...options.scores.filter(s => s !== score), score]
                  : [score];
              }
              setOptions({
                ...options,
                scores
              });
            })}
          </div>
        </div> */}
        <div className="item yyx-layout row">
          <label className="item">获取时间:</label>
          <div className="item">
            <DateInput
              showActionsBar
              placeholder="起始时间"
              timePrecision="minute"
              formatDate={formatDate}
              parseDate={parseDate}
              onChange={date =>
                setOptions({
                  ...options,
                  creationTimeFrom: date
                })
              }
              value={options.creationTimeFrom || undefined}
            />
            <br />
            <DateInput
              showActionsBar
              formatDate={formatDate}
              parseDate={parseDate}
              placeholder="结束时间"
              timePrecision="minute"
              onChange={date =>
                setOptions({
                  ...options,
                  creationTimeTo: date
                })
              }
              value={options.creationTimeTo || undefined}
            />
          </div>
          <div />
        </div>
        <Divider className="item" />
        <div className="item">数量: {props.equips.length}</div>
        <div className="item">
          <SnapshotInfo
            render={info => (
              <Button
                intent={"primary"}
                disabled={exporting}
                onClick={async () => {
                  if (info) {
                    setExporting(true);
                    const path = await exportOcr2Json(
                      info,
                      props.equips as IHeroEquip[]
                    );
                    setExported(path);
                    setExporting(false);
                  }
                }}
              >
                导出JSON (御魂导出器)
              </Button>
            )}
          />
          <br />
          <br />
          {exported && (
            <Callout intent={"success"}>
              导出成功: <br />
              <a href={`/export-files/${exported}`} target="_blank">
                {exported}
              </a>
            </Callout>
          )}
        </div>
      </Card>
      <Divider />
      <div
        className={classNames(
          "yyx-content yyx-content-scroll",
          "item",
          loading && "equip-list-loading"
        )}
      >
        <EquipGrid
          items={props.equips}
          onClickEquip={equip => {
            console.log(equip);
          }}
        />
      </div>
    </div>
  );
};

async function exportOcr2Json(
  snapshotInfo: ISnapshot,
  equips: IHeroEquip[]
): Promise<string> {
  const filename = `${snapshotInfo.data.player.name}_${
    snapshotInfo.data.player.id
  }_${formatDate(new Date(), "YYYYMMDD_HHmm")}.json`;
  return exportJson(filename, equipsToOcr2(equips));
}

export const EquipList = connect((state: IYyxState) => ({
  equips: EquipSelectors.selectDisplay(state)
}))(Render);
