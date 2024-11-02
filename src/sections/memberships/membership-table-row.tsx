import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import type { IMembershipItem } from './types/membership';

// ----------------------------------------------------------------------

type Props = {
  row: IMembershipItem;
  onViewRow: () => void;
  onDeleteRow: () => void;
};

export function OrderTableRow({ row, onViewRow, onDeleteRow }: Props) {
  const confirm = useBoolean();

  const collapse = useBoolean();

  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover>
      <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Box component="span">{row.name.toLocaleUpperCase()}</Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell> {row.user_limit} </TableCell>

      <TableCell>
        <Label variant="soft" color="default">
          {row.audit_limit}
        </Label>
      </TableCell>
      <TableCell>
        <Label variant="soft" color="default">
          {row.site_limit}
        </Label>
      </TableCell>
      <TableCell align="center"> {row.membership_type.toLocaleUpperCase()} </TableCell>

      <TableCell align="center"> {row.no_days} </TableCell>
      <TableCell align="center">
        <Label color="error">Active</Label>
      </TableCell>

      <TableCell>
        <Stack direction="row" alignItems="center">
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>

          <MenuItem
            onClick={() => {
              onViewRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
