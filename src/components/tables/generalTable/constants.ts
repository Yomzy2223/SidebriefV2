import { HTMLAttributes, MouseEvent } from "react";

export interface ITableBody {
  rowId: string;
  rowInfo: IRowInfo[];
  rowProps?: HTMLAttributes<HTMLSpanElement>;
  handleClick?: (
    e: MouseEvent<HTMLTableRowElement>,
    rowId: string,
    rowInfo: IRowInfo[]
  ) => void;
}

export interface IRowInfo {
  text: string;
  cellProps?: HTMLAttributes<HTMLSpanElement>;
  handleClick?: (
    e: MouseEvent<HTMLTableCellElement>,
    rowId: string,
    text: string
  ) => void;
}
