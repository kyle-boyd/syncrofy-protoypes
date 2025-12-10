import React from 'react';
import MuiTable from '@mui/material/Table';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import MuiPaper from '@mui/material/Paper';
import { BaseComponentProps } from '@/types';

export interface TableColumn<T = any> {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  render?: (row: T) => React.ReactNode;
  minWidth?: number;
  width?: number;
}

export interface TableProps<T = any> extends BaseComponentProps {
  /**
   * Columns configuration
   */
  columns: TableColumn<T>[];
  /**
   * Table rows data
   */
  rows: T[];
  /**
   * Key extractor function for rows
   */
  getRowId?: (row: T) => string | number;
  /**
   * If true, shows sticky header
   */
  stickyHeader?: boolean;
  /**
   * Maximum height of the table
   */
  maxHeight?: number | string;
  /**
   * If true, shows table borders
   */
  bordered?: boolean;
  /**
   * If true, shows striped rows
   */
  striped?: boolean;
  /**
   * Size of the table cells
   */
  size?: 'small' | 'medium';
}

/**
 * Table component for displaying tabular data
 * Extends MUI Table with custom styling
 */
export function Table<T = any>({
  className,
  'data-testid': testId,
  columns,
  rows,
  getRowId,
  stickyHeader = false,
  maxHeight,
  bordered = false,
  striped = false,
  size = 'medium',
}: TableProps<T>) {
  const getRowKey = (row: T, index: number): string | number => {
    if (getRowId) {
      return getRowId(row);
    }
    return (row as any).id ?? index;
  };

  return (
    <MuiTableContainer
      component={MuiPaper}
      className={className}
      data-testid={testId}
      sx={{ maxHeight: maxHeight }}
    >
      <MuiTable stickyHeader={stickyHeader} size={size} sx={{ borderCollapse: bordered ? 'separate' : 'collapse' }}>
        <MuiTableHead>
          <MuiTableRow>
            {columns.map((column) => (
              <MuiTableCell
                key={column.id}
                align={column.align || 'left'}
                style={{ minWidth: column.minWidth, width: column.width }}
                sx={{
                  borderRight: bordered ? '1px solid' : 'none',
                  borderColor: 'divider',
                }}
              >
                {column.label}
              </MuiTableCell>
            ))}
          </MuiTableRow>
        </MuiTableHead>
        <MuiTableBody>
          {rows.map((row, index) => (
            <MuiTableRow
              key={getRowKey(row, index)}
              sx={{
                backgroundColor: striped && index % 2 === 1 ? 'action.hover' : 'transparent',
              }}
            >
              {columns.map((column) => (
                <MuiTableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={{
                    borderRight: bordered ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  {column.render ? column.render(row) : (row as any)[column.id]}
                </MuiTableCell>
              ))}
            </MuiTableRow>
          ))}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  );
}

