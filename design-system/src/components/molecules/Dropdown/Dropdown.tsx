import React, { useState } from 'react';
import MuiMenu, { MenuProps as MuiMenuProps } from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { BaseComponentProps } from '@/types';

export interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps extends Omit<MuiMenuProps, 'open' | 'onClose' | 'anchorEl' | 'onSelect'>, BaseComponentProps {
  /**
   * The element that triggers the dropdown
   */
  trigger: React.ReactElement;
  /**
   * Options to display in the dropdown
   */
  options: DropdownOption[];
  /**
   * Callback fired when an option is selected
   */
  onSelect?: (value: string | number) => void;
  /**
   * Currently selected value
   */
  value?: string | number;
  /**
   * If true, the dropdown is open
   */
  open?: boolean;
  /**
   * Callback fired when the dropdown should close
   */
  onClose?: () => void;
}

/**
 * Dropdown component for displaying a list of options
 * Extends MUI Menu with custom styling
 */
export const Dropdown: React.FC<DropdownProps> = ({
  className,
  'data-testid': testId,
  trigger,
  options,
  onSelect,
  open: controlledOpen,
  onClose: controlledOnClose,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalOpen(false);
    }
    setAnchorEl(null);
  };

  const handleTriggerClick = (event: React.MouseEvent<HTMLElement>) => {
    if (controlledOpen === undefined) {
      setInternalOpen(!internalOpen);
    }
    setAnchorEl(event.currentTarget);
    if ((trigger.props as any)?.onClick) {
      (trigger.props as any).onClick(event);
    }
  };

  const handleMenuItemClick = (value: string | number) => {
    if (onSelect) {
      onSelect(value);
    }
    handleClose();
  };

  return (
    <>
      {React.cloneElement(trigger, {
        onClick: handleTriggerClick,
        'aria-controls': open ? 'dropdown-menu' : undefined,
        'aria-haspopup': true,
        'aria-expanded': open ? true : undefined,
      } as any)}
      <MuiMenu
        className={className}
        data-testid={testId}
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'dropdown-button',
        }}
        {...props}
      >
        {options.map((option) => (
          <MuiMenuItem
            key={option.value}
            onClick={() => handleMenuItemClick(option.value)}
            disabled={option.disabled}
            selected={option.value === props.value}
          >
            {option.label}
          </MuiMenuItem>
        ))}
      </MuiMenu>
    </>
  );
};

