import React, { useState } from 'react';
import {
  FunnelIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import Button from './Button';
import FormField from './FormField';

/**
 * Reusable filter panel component
 * @param {Object} props - Component props
 */
const FilterPanel = ({
  filters = [],
  values = {},
  onChange,
  onReset,
  onApply,
  title = 'Filters',
  collapsible = true,
  defaultExpanded = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [localValues, setLocalValues] = useState(values);

  const handleChange = (name, value) => {
    const newValues = { ...localValues, [name]: value };
    setLocalValues(newValues);
    
    if (onChange) {
      onChange(newValues);
    }
  };

  const handleReset = () => {
    const resetValues = {};
    filters.forEach(filter => {
      resetValues[filter.name] = filter.defaultValue || '';
    });
    
    setLocalValues(resetValues);
    
    if (onReset) {
      onReset();
    }
    
    if (onChange) {
      onChange(resetValues);
    }
  };

  const handleApply = () => {
    if (onApply) {
      onApply(localValues);
    }
  };

  const hasActiveFilters = Object.values(localValues).some(value => 
    value !== '' && value !== null && value !== undefined
  );

  const renderFilter = (filter) => {
    const value = localValues[filter.name] || '';

    switch (filter.type) {
      case 'select':
        return (
          <FormField
            key={filter.name}
            label={filter.label}
            name={filter.name}
            type="select"
            value={value}
            onChange={(e) => handleChange(filter.name, e.target.value)}
            options={[
              { value: '', label: filter.placeholder || 'All' },
              ...filter.options
            ]}
          />
        );

      case 'range':
        return (
          <div key={filter.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {filter.label}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder={filter.minPlaceholder || 'Min'}
                value={value.min || ''}
                onChange={(e) => handleChange(filter.name, { ...value, min: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                placeholder={filter.maxPlaceholder || 'Max'}
                value={value.max || ''}
                onChange={(e) => handleChange(filter.name, { ...value, max: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div key={filter.name} className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={value || false}
                onChange={(e) => handleChange(filter.name, e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">{filter.label}</span>
            </label>
          </div>
        );

      case 'date':
        return (
          <FormField
            key={filter.name}
            label={filter.label}
            name={filter.name}
            type="date"
            value={value}
            onChange={(e) => handleChange(filter.name, e.target.value)}
          />
        );

      case 'multiselect':
        return (
          <div key={filter.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {filter.label}
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {filter.options.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={(value || []).includes(option.value)}
                    onChange={(e) => {
                      const currentValues = value || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter(v => v !== option.value);
                      handleChange(filter.name, newValues);
                    }}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <FormField
            key={filter.name}
            label={filter.label}
            name={filter.name}
            type={filter.type || 'text'}
            value={value}
            onChange={(e) => handleChange(filter.name, e.target.value)}
            placeholder={filter.placeholder}
          />
        );
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow border border-gray-200 ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {hasActiveFilters && (
              <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
              >
                <XMarkIcon className="w-4 h-4 mr-1" />
                Clear
              </button>
            )}
            
            {collapsible && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                {isExpanded ? (
                  <ChevronUpIcon className="w-5 h-5" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {(!collapsible || isExpanded) && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filters.map(renderFilter)}
          </div>
          
          {onApply && (
            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
              <Button variant="secondary" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="primary" onClick={handleApply}>
                Apply Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;