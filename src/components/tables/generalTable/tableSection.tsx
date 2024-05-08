import React, { Dispatch, SetStateAction } from "react";
import { Checkbox, Table } from "flowbite-react";
import { v4 as uuidv4 } from "uuid";
import { ITableBody } from "./constants";
import { cn } from "@/lib/utils";

const TableSection = ({
  tableHeaders,
  tableBody,
  selectOn,
  selectedRows,
  setSelectedRows,
  onSelect,
}: IProps) => {
  // The selected rows from the current page
  const selectedFromCurrent = tableBody?.map((row: ITableBody) =>
    selectedRows.find((el) => el === row.rowId)
  );
  const allSelected = !selectedFromCurrent?.some((el) => el === undefined); // If all is selected

  // Invoke when a row is selected
  const handleSelect = (row: ITableBody, isSelected: boolean) => {
    const included = [...selectedRows, row.rowId];
    const removed = selectedRows.filter((el) => el !== row.rowId);
    onSelect(isSelected ? removed : included);
    setSelectedRows(isSelected ? removed : included);
  };

  //   Invoke when all rows are selected
  const handleSelectAll = () => {
    const included = [
      ...new Set([...selectedRows, ...tableBody.map((row) => row.rowId)]),
    ];
    const removed = selectedRows.filter(
      (el) => !tableBody.find((row: ITableBody) => row.rowId === el)
    );
    setSelectedRows(allSelected ? removed : included);
  };
  return (
    <Table hoverable striped>
      <Table.Head>
        {selectOn && (
          <Table.HeadCell className="sticky left-0 bg-gray-50">
            <Checkbox
              className="cursor-pointer"
              onChange={handleSelectAll}
              checked={allSelected}
            />
          </Table.HeadCell>
        )}
        {tableHeaders.map((el) => (
          <Table.HeadCell key={el} className="whitespace-nowrap">
            {el}
          </Table.HeadCell>
        ))}
      </Table.Head>

      <Table.Body>
        {tableBody.map((row, i) => {
          const isSelected = !!selectedRows.find((el) => el === row.rowId);

          return (
            <Table.Row
              key={row.rowId}
              {...row.rowProps}
              onClick={(e) =>
                selectOn
                  ? handleSelect(row, isSelected)
                  : row?.handleClick &&
                    row.handleClick(e, row.rowId, row.rowInfo)
              }
              className={cn({ "cursor-pointer": row?.handleClick })}
            >
              {selectOn && (
                <Table.Cell
                  className={cn("sticky left-0 bg-white", {
                    "bg-gray-50": i % 2 !== 0,
                  })}
                >
                  <Checkbox
                    className="cursor-pointer"
                    checked={isSelected}
                    onChange={() => handleSelect(row, isSelected)}
                  />
                </Table.Cell>
              )}
              {row.rowInfo.map((cell) => (
                <Table.Cell
                  key={uuidv4()}
                  {...cell?.cellProps}
                  onClick={(e) => {
                    !selectOn &&
                      cell?.handleClick &&
                      cell.handleClick(e, row.rowId, cell.text);
                  }}
                  className={cn(
                    "whitespace-nowrap",
                    cell?.cellProps?.className,
                    { "cursor-pointer": cell?.handleClick || selectOn }
                  )}
                >
                  <span>{cell.text}</span>
                </Table.Cell>
              ))}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default TableSection;

interface IProps {
  tableHeaders: string[];
  tableBody: ITableBody[];
  selectOn: boolean;
  selectedRows: string[];
  setSelectedRows: Dispatch<SetStateAction<string[]>>;
  onSelect: (selected: string[]) => void;
}
