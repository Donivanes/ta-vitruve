import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import { Athlete } from '@vitruve/database';
import { PaginateAthletes } from '../../types';
import { css } from '../../../styled-system/css';
import { Button } from '../Button';
import { routeResolver } from '../../constants';

interface AthletesTableProps extends PaginateAthletes {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const columnHelper = createColumnHelper<Athlete>();
const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
    size: 150,
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: (info) => info.getValue(),
    size: 70,
  }),
  columnHelper.accessor('team', {
    header: 'Team',
    cell: (info) => info.getValue(),
    size: 150,
  }),
];

export const AthletesTable = ({ data, meta, setPage }: AthletesTableProps) => {
  const isFirstPage = meta?.currentPage === 1;
  const isLastPage = meta?.currentPage === meta?.totalPages;

  const history = useHistory();

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (row: Row<Athlete>) => {
    history.push(routeResolver.athlete(row.original.id));
  };

  return (
    <>
      <div
        className={css({
          overflowX: 'auto',
        })}
      >
        <table
          data-cy="athletes-table"
          className={css({
            width: '100%',
            textAlign: 'left',
            borderCollapse: 'collapse',
            borderSpacing: 0,
            tableLayout: 'fixed',
          })}
        >
          <thead
            className={css({
              fontWeight: 'bold',
              borderBottom: '2px solid token(colors.gray.700)',
            })}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.column.getSize() }}
                    className={css({
                      padding: '10px !important',
                    })}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                className={css({
                  transition: 'background-color 0.2s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'emerald.100' },
                })}
                key={row.original.id}
                onClick={() => handleRowClick(row)}
                data-cy="athletes-table-row"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className={css({
                      verticalAlign: 'middle',
                      padding: '5px 10px !important',
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: '30px',
            gap: '20px',
          })}
        >
          <Button
            disabled={isFirstPage}
            onClick={() => setPage((prev) => prev - 1)}
            data-cy="prev-page"
          >
            Previous
          </Button>
          <p
            className={css({
              fontSize: '16px',
            })}
          >{`Page ${meta?.currentPage} of ${meta?.totalPages}`}</p>
          <Button
            disabled={isLastPage}
            onClick={() => setPage((prev) => prev + 1)}
            data-cy="next-page"
          >
            Next
          </Button>
        </div>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          })}
        >
          <p>Go to page:</p>
          <select
            onChange={(e) => setPage(Number(e.target.value))}
            className={css({
              padding: '10px 15px',
              borderRadius: '5px',
              border: '1px solid token(colors.gray.500)',
              transition: 'all 0.2s ease',
              '&:focus': {
                outline: 'none',
              },
            })}
          >
            {Array.from({ length: meta?.totalPages || 1 }).map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
