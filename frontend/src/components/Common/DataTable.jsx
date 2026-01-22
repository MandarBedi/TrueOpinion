import React, { useState, useMemo } from 'react';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

/**
 * Enhanced data table component with sorting, filtering, and pagination
 * @param {Object} props - Component props
 */
const DataTable = ({
  data = [], columns = [], loading = false, error = null, searchable = false,
  sortable = false, paginated = false, pageSize = 10, emptyMessage = 'No data available',
  emptyIcon = 'bi-inbox', className = '', onRowClick, selectedRows = [], onRowSelect,
  bulkActions = [], onBulkAction, ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return data;
    return data.filter(row =>
      columns.some(column => {
        const value = row[column.key];
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns, searchable]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortable || !sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection, sortable]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, paginated]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const handleSort = (column) => {
    if (!sortable || !column.sortable) return;
    if (sortColumn === column.key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column.key);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleSelectAll = (checked) => {
    if (!onRowSelect) return;
    if (checked) {
      const allIds = paginatedData.map(row => row.id);
      onRowSelect([...new Set([...selectedRows, ...allIds])]);
    } else {
      const currentPageIds = paginatedData.map(row => row.id);
      onRowSelect(selectedRows.filter(id => !currentPageIds.includes(id)));
    }
  };

  const isAllSelected = paginatedData.length > 0 && 
    paginatedData.every(row => selectedRows.includes(row.id));

  const isIndeterminate = paginatedData.some(row => selectedRows.includes(row.id)) && !isAllSelected;
  const renderSortIcon = (column) => {
    if (!sortable || !column.sortable) return null;
    if (sortColumn !== column.key) {
      return <ChevronUpIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />;
    }
    return sortDirection === 'asc'
      ? <ChevronUpIcon className="w-4 h-4 text-gray-600" />
      : <ChevronDownIcon className="w-4 h-4 text-gray-600" />;
  };

  if (loading) {
    return <LoadingSpinner loading={true} />;
  }

  if (error) {
    return <LoadingSpinner error={error} showRetry={true} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      {/* Header with search and bulk actions */}
      {(searchable || bulkActions.length > 0) && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {searchable && (
              <div className="relative max-w-sm">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            )}

            {bulkActions.length > 0 && selectedRows.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedRows.length} selected
                </span>
                {bulkActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => onBulkAction(action.key, selectedRows)}
                    className={`btn btn-sm ${action.variant || 'btn-secondary'}`}
                  >
                    {action.icon && <span className="mr-1">{action.icon}</span>}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200" {...props}>
          <thead className="bg-gray-50">
            <tr>
              {onRowSelect && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                    ${sortable && column.sortable ? 'cursor-pointer hover:bg-gray-100 group' : ''}
                  `}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {renderSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (onRowSelect ? 1 : 0)} className="px-6 py-12">
                  <EmptyState
                    icon={emptyIcon}
                    title="No data found"
                    description={emptyMessage}
                  />
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={`
                    hover:bg-gray-50 transition-colors
                    ${onRowClick ? 'cursor-pointer' : ''}
                    ${selectedRows.includes(row.id) ? 'bg-primary-50' : ''}
                  `}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {onRowSelect && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          const newSelection = e.target.checked
                            ? [...selectedRows, row.id]
                            : selectedRows.filter(id => id !== row.id);
                          onRowSelect(newSelection);
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.render
                        ? column.render(row[column.key], row, index)
                        : row[column.key]
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`
                    px-3 py-1 text-sm rounded
                    ${currentPage === page
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;