import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Typography,
  TableSortLabel,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  PageHeader,
  ViewControls,
  FilterControls,
  FilterOption,
  Table,
  TableColumn,
  Tag,
} from '@kyleboyd/design-system';
import { PageLayout } from '../components/PageLayout';

// Transfer data interface
export interface Transfer {
  id: string;
  sender: string;
  receiver: string;
  direction: 'Inbound' | 'Outbound' | 'Unknown';
  senderFileName: string;
  senderFileSize: string;
  status: 'Success' | 'Failed';
  startTime: string; // "10:52 PM, Dec 17 2025"
  endTime: string; // "10:52 PM, Dec 17 2025" or "-"
}

// Mock data matching the image description
const mockTransfers: Transfer[] = [
  {
    id: 'S77978032085213674098',
    sender: 'Partner Payroll Engine',
    receiver: 'Sunrise Builders Payroll System',
    direction: 'Outbound',
    senderFileName: 'weekly_payroll_sunrs_9168.pgp',
    senderFileSize: '4.89 MB',
    status: 'Success',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '10:52 PM, Dec 17 2025',
  },
  {
    id: 'S33100120781663519971',
    sender: 'Partner Payroll Engine',
    receiver: 'Sunrise Builders',
    direction: 'Outbound',
    senderFileName: 'payroll_confirmation_sunrs_3934.pgp',
    senderFileSize: '6.93 MB',
    status: 'Failed',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '10:52 PM, Dec 17 2025',
  },
  {
    id: 'S35833673559415047731',
    sender: 'John Deere',
    receiver: 'Commercial Banking New York',
    direction: 'Inbound',
    senderFileName: 'incoming_wire_2518.zip',
    senderFileSize: '14.21 MB',
    status: 'Success',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '10:52 PM, Dec 17 2025',
  },
  {
    id: 'S036558100769505022024',
    sender: 'Branch Cash Operations System',
    receiver: '-',
    direction: 'Unknown',
    senderFileName: 'check_deposit_batch_046_6946.zip',
    senderFileSize: '9.95 MB',
    status: 'Failed',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '-',
  },
  {
    id: 'S285823851575222743240',
    sender: 'Joe\'s Burgers',
    receiver: 'Branch Cash Operations System',
    direction: 'Inbound',
    senderFileName: 'audit_shipment_confirm_1403.txt',
    senderFileSize: '1.55 MB',
    status: 'Success',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '10:52 PM, Dec 17 2025',
  },
  {
    id: 'S89114975934067908093',
    sender: 'Loan Management System',
    receiver: 'Silverhair Builders',
    direction: 'Outbound',
    senderFileName: 'loan_deposit_advice_8110.zip',
    senderFileSize: '9.85 MB',
    status: 'Failed',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '10:52 PM, Dec 17 2025',
  },
  {
    id: 'S40595348254815151069',
    sender: 'Loan Management System',
    receiver: 'Anderson & Sons',
    direction: 'Outbound',
    senderFileName: 'fund_notification_2452.zip',
    senderFileSize: '13.25 MB',
    status: 'Success',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '10:52 PM, Dec 17 2025',
  },
  {
    id: 'S4075176851632767870',
    sender: 'Sunrise Builders',
    receiver: 'Partner Payroll Engine',
    direction: 'Inbound',
    senderFileName: 'weekly_payroll_sunrs_4162.pgp',
    senderFileSize: '11.75 MB',
    status: 'Failed',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '10:52 PM, Dec 17 2025',
  },
  {
    id: 'S33100070005495799251',
    sender: 'Silverhair Builders',
    receiver: '-',
    direction: 'Inbound',
    senderFileName: 'weekly_payroll_anderson_3256.pgp',
    senderFileSize: '1.53 MB',
    status: 'Failed',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '-',
  },
  {
    id: 'S62534552404373423359',
    sender: 'Anderson & Sons',
    receiver: 'Partner Payroll Engine',
    direction: 'Inbound',
    senderFileName: 'weekly_payroll_anderson_3256.pgp',
    senderFileSize: '4.45 MB',
    status: 'Failed',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '10:52 PM, Dec 17 2025',
  },
  {
    id: 'S90352331962042129702',
    sender: 'Sunrise Builders',
    receiver: 'Partner Payroll Engine',
    direction: 'Inbound',
    senderFileName: 'weekly_payroll_sunrs_5398.pgp',
    senderFileSize: '11.70 MB',
    status: 'Success',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '10:52 PM, Dec 17 2025',
  },
  {
    id: 'S54155553231076851331',
    sender: 'Private Bank Billing Engine',
    receiver: 'Heritage Family Enterprises',
    direction: 'Outbound',
    senderFileName: 'fee_schedule_5153.zip',
    senderFileSize: '477 KB',
    status: 'Failed',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '10:52 PM, Dec 17 2025',
  },
  {
    id: 'S30045685279732711406',
    sender: 'Crestline Wealth & Capital Servic...',
    receiver: 'Wealth Compliance Engine',
    direction: 'Inbound',
    senderFileName: 'kyc_refresh_6103.zip',
    senderFileSize: '4.91 MB',
    status: 'Success',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '10:52 PM, Dec 17 2025',
  },
  {
    id: 'S35582176238901853313',
    sender: 'MBS Allocation Hub',
    receiver: '-',
    direction: 'Inbound',
    senderFileName: 'mbs_alloc_4107.zip',
    senderFileSize: '4.15 MB',
    status: 'Failed',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '-',
  },
  {
    id: 'S96891615408193111776',
    sender: 'Securities Trade Engine',
    receiver: 'Stonebridge Capital Management',
    direction: 'Outbound',
    senderFileName: 'trade_confirms_7534.zip',
    senderFileSize: '8.03 MB',
    status: 'Success',
    startTime: '10:52 PM, Dec 17 2025',
    endTime: '10:52 PM, Dec 17 2025',
  },
];

function Transfers() {
  const navigate = useNavigate();
  // State management
  const [selectedView, setSelectedView] = useState<string>('default');
  const [isViewFavorited, setIsViewFavorited] = useState(false);
  const [senderReceiverFilter, setSenderReceiverFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchValue, setSearchValue] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Column resizing state
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);
  const tableRef = useRef<HTMLDivElement>(null);

  // Get unique senders and receivers for filter options
  const allSenders = useMemo(() => {
    const senders = new Set(mockTransfers.map(t => t.sender));
    return Array.from(senders).sort();
  }, []);

  const allReceivers = useMemo(() => {
    const receivers = new Set(mockTransfers.map(t => t.receiver).filter(r => r !== '-'));
    return Array.from(receivers).sort();
  }, []);

  // Filter and sort data
  const filteredAndSortedTransfers = useMemo(() => {
    let filtered = [...mockTransfers];

    // Apply search filter
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter(t =>
        t.id.toLowerCase().includes(searchLower) ||
        t.sender.toLowerCase().includes(searchLower) ||
        t.receiver.toLowerCase().includes(searchLower) ||
        t.senderFileName.toLowerCase().includes(searchLower)
      );
    }

    // Apply filter dropdowns
    if (senderReceiverFilter !== 'all') {
      filtered = filtered.filter(
        t => t.sender === senderReceiverFilter || t.receiver === senderReceiverFilter
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    // Apply sorting
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue: any = a[sortField as keyof Transfer];
        let bValue: any = b[sortField as keyof Transfer];

        // Handle special cases
        if (sortField === 'startTime' || sortField === 'endTime') {
          // Parse date strings for comparison (simple string comparison works for this format)
          aValue = aValue === '-' ? '' : aValue;
          bValue = bValue === '-' ? '' : bValue;
        } else if (sortField === 'senderFileSize') {
          // Parse file sizes (convert to bytes for comparison)
          const parseSize = (size: string): number => {
            const match = size.match(/([\d.]+)\s*(KB|MB|GB)?/i);
            if (!match) return 0;
            const num = parseFloat(match[1]);
            const unit = match[2]?.toUpperCase() || 'B';
            if (unit === 'KB') return num * 1024;
            if (unit === 'MB') return num * 1024 * 1024;
            if (unit === 'GB') return num * 1024 * 1024 * 1024;
            return num;
          };
          aValue = parseSize(aValue);
          bValue = parseSize(bValue);
        } else {
          // String comparison for other fields
          aValue = String(aValue || '').toLowerCase();
          bValue = String(bValue || '').toLowerCase();
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchValue, senderReceiverFilter, statusFilter, sortField, sortDirection]);

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Column resizing handlers
  const handleResizeStart = useCallback((columnId: string, startX: number) => {
    // Get current width from state or use default
    let currentWidth = columnWidths[columnId];
    if (!currentWidth) {
      // Default widths for each column
      const defaultWidths: Record<string, number> = {
        id: 200,
        sender: 200,
        receiver: 200,
        direction: 120,
        senderFileName: 250,
        senderFileSize: 130,
        status: 100,
        startTime: 180,
        endTime: 180,
      };
      currentWidth = defaultWidths[columnId] || 200;
    }
    setResizingColumn(columnId);
    setResizeStartX(startX);
    setResizeStartWidth(currentWidth);
  }, [columnWidths]);

  const handleResizeMove = useCallback((currentX: number) => {
    if (!resizingColumn) return;
    const diff = currentX - resizeStartX;
    const newWidth = Math.max(50, resizeStartWidth + diff); // Minimum width of 50px
    setColumnWidths(prev => ({
      ...prev,
      [resizingColumn]: newWidth,
    }));
  }, [resizingColumn, resizeStartX, resizeStartWidth]);

  const handleResizeEnd = useCallback(() => {
    setResizingColumn(null);
  }, []);

  // Mouse event handlers for resizing
  useEffect(() => {
    if (!resizingColumn) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleResizeMove(e.clientX);
    };

    const handleMouseUp = () => {
      handleResizeEnd();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [resizingColumn, handleResizeMove, handleResizeEnd]);

  // Measure header cell positions for accurate resize handle placement
  const [headerPositions, setHeaderPositions] = useState<Record<string, { left: number; width: number }>>({});
  
  // Column IDs in order - defined before columns to avoid dependency issues
  const columnIds = useMemo(() => [
    'id', 'sender', 'receiver', 'direction', 'senderFileName', 
    'senderFileSize', 'status', 'startTime', 'endTime'
  ], []);
  
  useEffect(() => {
    if (!tableRef.current) return;
    
    const updatePositions = () => {
      const headerCells = tableRef.current?.querySelectorAll('.MuiTableCell-head');
      if (!headerCells) return;
      
      const positions: Record<string, { left: number; width: number }> = {};
      headerCells.forEach((cell, index) => {
        const rect = cell.getBoundingClientRect();
        const tableRect = tableRef.current?.getBoundingClientRect();
        if (tableRect && columnIds[index]) {
          positions[columnIds[index]] = {
            left: rect.left - tableRect.left,
            width: rect.width,
          };
        }
      });
      setHeaderPositions(positions);
    };
    
    // Use a small delay to ensure table is rendered
    const timeoutId = setTimeout(updatePositions, 0);
    window.addEventListener('resize', updatePositions);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updatePositions);
    };
  }, [columnIds, columnWidths, filteredAndSortedTransfers.length]);

  const filterOptions: FilterOption[] = [
    {
      id: 'senderReceiver',
      label: 'Sender/Receiver',
      value: senderReceiverFilter,
      options: [
        { value: 'all', label: 'All' },
        ...allSenders.map(s => ({ value: s, label: s })),
        ...allReceivers.map(r => ({ value: r, label: r })),
      ],
    },
    {
      id: 'date',
      label: 'Date',
      value: 'last30',
      options: [
        { value: 'last30', label: 'Last 30 days' },
      ],
    },
    {
      id: 'status',
      label: 'Status',
      value: statusFilter,
      options: [
        { value: 'all', label: 'All' },
        { value: 'Success', label: 'Success' },
        { value: 'Failed', label: 'Failed' },
      ],
    },
  ];

  // Table columns configuration with dynamic widths
  const columns: TableColumn<Transfer>[] = useMemo(() => [
    {
      id: 'id',
      label: (
        <TableSortLabel
          active={sortField === 'id'}
          direction={sortField === 'id' ? sortDirection : 'asc'}
          onClick={() => handleSort('id')}
        >
          Transfer ID
        </TableSortLabel>
      ),
      minWidth: 200,
      width: columnWidths.id || undefined,
      render: (row: Transfer) => (
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {row.id}
        </Typography>
      ),
    },
    {
      id: 'sender',
      label: (
        <TableSortLabel
          active={sortField === 'sender'}
          direction={sortField === 'sender' ? sortDirection : 'asc'}
          onClick={() => handleSort('sender')}
        >
          Sender
        </TableSortLabel>
      ),
      minWidth: 200,
      width: columnWidths.sender || undefined,
      render: (row: Transfer) => (
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {row.sender}
        </Typography>
      ),
    },
    {
      id: 'receiver',
      label: (
        <TableSortLabel
          active={sortField === 'receiver'}
          direction={sortField === 'receiver' ? sortDirection : 'asc'}
          onClick={() => handleSort('receiver')}
        >
          Receiver
        </TableSortLabel>
      ),
      minWidth: 200,
      width: columnWidths.receiver || undefined,
      render: (row: Transfer) => (
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {row.receiver}
        </Typography>
      ),
    },
    {
      id: 'direction',
      label: (
        <TableSortLabel
          active={sortField === 'direction'}
          direction={sortField === 'direction' ? sortDirection : 'asc'}
          onClick={() => handleSort('direction')}
        >
          Direction
        </TableSortLabel>
      ),
      minWidth: 120,
      width: columnWidths.direction || undefined,
      render: (row: Transfer) => {
        const directionConfig: Record<Transfer['direction'], { icon: typeof ArrowUpwardIcon; variant: 'warning' | 'primary' | 'neutral' }> = {
          Outbound: { icon: ArrowUpwardIcon, variant: 'warning' as const },
          Inbound: { icon: ArrowDownwardIcon, variant: 'primary' as const },
          Unknown: { icon: HelpOutlineIcon, variant: 'neutral' as const },
        };
        const config = directionConfig[row.direction];
        const IconComponent = config.icon;
        return (
          <Tag
            label={row.direction}
            variant={config.variant}
            icon={<IconComponent />}
            size="small"
          />
        );
      },
    },
    {
      id: 'senderFileName',
      label: (
        <TableSortLabel
          active={sortField === 'senderFileName'}
          direction={sortField === 'senderFileName' ? sortDirection : 'asc'}
          onClick={() => handleSort('senderFileName')}
        >
          Sender File Name
        </TableSortLabel>
      ),
      minWidth: 250,
      width: columnWidths.senderFileName || undefined,
      render: (row: Transfer) => (
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {row.senderFileName}
        </Typography>
      ),
    },
    {
      id: 'senderFileSize',
      label: (
        <TableSortLabel
          active={sortField === 'senderFileSize'}
          direction={sortField === 'senderFileSize' ? sortDirection : 'asc'}
          onClick={() => handleSort('senderFileSize')}
        >
          Sender File Size
        </TableSortLabel>
      ),
      minWidth: 130,
      width: columnWidths.senderFileSize || undefined,
      render: (row: Transfer) => (
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {row.senderFileSize}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: (
        <TableSortLabel
          active={sortField === 'status'}
          direction={sortField === 'status' ? sortDirection : 'asc'}
          onClick={() => handleSort('status')}
        >
          Status
        </TableSortLabel>
      ),
      minWidth: 100,
      width: columnWidths.status || undefined,
      render: (row: Transfer) => {
        return (
          <Tag
            label={row.status}
            variant={row.status === 'Success' ? 'success' : 'error'}
            size="small"
          />
        );
      },
    },
    {
      id: 'startTime',
      label: (
        <TableSortLabel
          active={sortField === 'startTime'}
          direction={sortField === 'startTime' ? sortDirection : 'asc'}
          onClick={() => handleSort('startTime')}
        >
          Start (MST)
        </TableSortLabel>
      ),
      minWidth: 180,
      width: columnWidths.startTime || undefined,
      render: (row: Transfer) => {
        if (row.startTime === '-') {
          return <Typography variant="body2">-</Typography>;
        }
        const [time, date] = row.startTime.split(', ');
        return (
          <Box>
            <Typography variant="body2">{time}</Typography>
            <Typography variant="body2" color="text.secondary">
              {date}
            </Typography>
          </Box>
        );
      },
    },
    {
      id: 'endTime',
      label: (
        <TableSortLabel
          active={sortField === 'endTime'}
          direction={sortField === 'endTime' ? sortDirection : 'asc'}
          onClick={() => handleSort('endTime')}
        >
          End (MST)
        </TableSortLabel>
      ),
      minWidth: 180,
      width: columnWidths.endTime || undefined,
      render: (row: Transfer) => {
        if (row.endTime === '-') {
          return <Typography variant="body2">-</Typography>;
        }
        const [time, date] = row.endTime.split(', ');
        return (
          <Box>
            <Typography variant="body2">{time}</Typography>
            <Typography variant="body2" color="text.secondary">
              {date}
            </Typography>
          </Box>
        );
      },
    },
  ], [sortField, sortDirection, columnWidths]);

  return (
    <PageLayout selectedNavItem="transfers" backgroundColor="#FAFCFC">
      {/* Scrollable Header Section */}
      <Stack spacing={2} sx={{ mb: '16px' }}>
        <PageHeader
          title="Transfers"
          showBreadcrumb={false}
          refreshStatus="Last refreshed: 27 mins ago"
        />

        <ViewControls
          viewName={selectedView === 'default' ? 'Default View' : 'My View'}
          selectedView={selectedView}
          onViewSelect={(val) => setSelectedView(String(val))}
          viewOptions={[
            { value: 'default', label: 'Default View' },
            { value: 'myview', label: 'My View' },
          ]}
          onStarClick={() => setIsViewFavorited(!isViewFavorited)}
          onMoreOptionsClick={() => { }}
        />
      </Stack>

      {/* Sticky FilterControls */}
      <Box
        sx={{
          position: 'sticky',
          top: -24, // Negative offset to account for parent padding (p: 3 = 24px)
          zIndex: 20,
          backgroundColor: '#FAFCFC',
          pt: 3, // Add padding top to compensate for the negative top offset
          pb: 2,
          mb: '16px',
          mx: -3, // Negative margin to extend to container edges
          px: 3, // Add padding back
        }}
      >
        <FilterControls
          search={{
            value: searchValue,
            onChange: setSearchValue,
          }}
          filters={filterOptions}
          onFilterChange={(id, val) => {
            if (id === 'senderReceiver') setSenderReceiverFilter(String(val));
            if (id === 'status') setStatusFilter(String(val));
          }}
          resultCount={`${filteredAndSortedTransfers.length} results`}
          layoutToggle={{
            mode: viewMode,
            onChange: (mode) => setViewMode(mode as 'list' | 'grid'),
          }}
          actions={{
            secondary: {
              label: 'Customize Columns',
              onClick: () => { },
            }
          }}
        />
      </Box>

      {/* Table */}
      <Box
        ref={tableRef}
        sx={{
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          position: 'relative',
          // Remove vertical grid lines for all cells
          '& .MuiTableCell-root': {
            borderLeft: 'none !important',
            borderRight: 'none !important',
          },
          // Header cell styles
          '& .MuiTableCell-head': {
            fontWeight: 700,
            color: 'text.secondary',
            padding: '6px 12px !important',
            borderTop: 'none !important',
            borderBottom: 'none !important',
            borderLeft: 'none !important',
            borderRight: 'none !important',
            position: 'relative',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            '& > *': {
              fontWeight: 700,
              color: 'text.secondary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
            },
            // Ensure TableSortLabel and its children truncate properly
            '& .MuiTableSortLabel-root': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
              '& .MuiTableSortLabel-icon': {
                flexShrink: 0,
                marginLeft: '4px',
              },
            },
          },
          // Use fixed table layout for accurate column widths
          '& .MuiTable-root': {
            tableLayout: 'fixed',
            width: '100%',
          },
          // Body cell styles - horizontal divider lines only
          '& .MuiTableCell-body': {
            padding: '6px 12px !important',
            borderBottom: '1px solid',
            borderBottomColor: 'divider',
            borderTop: 'none !important',
          },
          // Remove bottom border from last row
          '& .MuiTableBody-root .MuiTableRow-root:last-child .MuiTableCell-body': {
            borderBottom: 'none !important',
          },
        }}
      >
        <Table
          columns={columns}
          rows={filteredAndSortedTransfers}
          getRowId={(row) => row.id}
          stickyHeader
          bordered={false}
          sx={{
            border: 'none',
            '& .MuiTableCell-root': {
              borderLeft: 'none !important',
              borderRight: 'none !important',
            },
          }}
          {...({
            onRowClick: (row: Transfer) => {
              navigate(`/transfers/${row.id}`);
            },
          } as any)}
        />
        {/* Resize handles overlay - positioned using measured header cell positions */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0, // Match the header row height exactly
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {columnIds.map((columnId) => {
            const position = headerPositions[columnId];
            if (!position) return null;
            
            return (
              <Box
                key={`resize-handle-${columnId}`}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleResizeStart(columnId, e.clientX);
                }}
                sx={{
                  position: 'absolute',
                  left: `${position.left + position.width - 2}px`, // Center the handle on the edge
                  top: '4px',
                  bottom: '4px', // 4px gap from bottom
                  width: '4px',
                  cursor: 'col-resize',
                  pointerEvents: 'auto',
                  backgroundColor: 'transparent',
                }}
              />
            );
          })}
        </Box>
      </Box>
    </PageLayout>
  );
}

export default Transfers;
