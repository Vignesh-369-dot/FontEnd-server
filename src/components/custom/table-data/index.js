import React from "react";

import "ldrs/ring";

import { HStack, Table } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../components/ui/pagination";

// ! basic Data table for this project.
import { ring2 } from "ldrs";

ring2.register();

const DataTable = ({
  columns,
  currentPage,
  data,
  handlePagination,
  isError,
  isLoading,
  total,
}) => {
  if (isLoading) {
    return (
      <div className="loading">
        <l-ring-2
          size="40"
          stroke="5"
          stroke-length="0.25"
          bg-opacity="0.1"
          speed="0.8"
          color="blue"
        ></l-ring-2>
      </div>
    );
  }
  if (isError)
    return (
      <div>
        <h6>Something went wrong!!</h6>
      </div>
    );

  function calculateValue(input) {
    return input / 10;
  }

  return (
    <div className="table">
      <Table.Root size="md">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeader key={column.accessorKey}>
                {column.header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.id}>
              {columns.map((column) => (
                <Table.Cell key={column.accessorKey}>
                  {column.cell
                    ? column.cell({
                        getValue: () => row[column.accessorKey],
                        row,
                      })
                    : row[column.accessorKey]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <div className="pagination">
        <PaginationRoot
          count={total}
          pageSize={1}
          page={calculateValue(currentPage)}
          onPageChange={(e) => handlePagination(e.page * 10)}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </div>
    </div>
  );
};

DataTable.defaultProps = {
  columns: [],
  currentPage: 0,
  data: [],
  handlePagination: () => console.log("Pagination"),
  isError: false,
  isLoading: false,
  total: 0,
};

export default DataTable;
