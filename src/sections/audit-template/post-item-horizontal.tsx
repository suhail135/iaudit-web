import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Button, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { maxLine } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = CardProps & {
  post: {
    name: string;
    description: string;
    createdAt: number;
    updatedAt: number;
    published: boolean;
    id: string;
  };
};

export function PostItemHorizontal({ post, sx, ...other }: Props) {
  const popover = usePopover();

  const router = useRouter();

  return (
    <>
      <Card sx={{ display: 'flex', ...sx }} {...other}>
        <Stack spacing={1} flexGrow={1} sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Label variant="soft" color={(post?.published && 'info') || 'default'}>
              {post?.published ? 'Published' : 'Draft'}
            </Label>

            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
              Created: {fDate(post.createdAt)}
            </Box>
          </Box>

          <Stack spacing={1} flexGrow={1}>
            <Link
              component={RouterLink}
              href={paths.dashboard.auditTemplate.edit(post?.id)}
              color="inherit"
              variant="subtitle2"
              sx={{ ...maxLine({ line: 2 }) }}
            >
              {post?.name}
            </Link>

            <Typography variant="body2" sx={{ ...maxLine({ line: 2 }), color: 'text.secondary' }}>
              {post.description}
            </Typography>
          </Stack>
          <Box display="flex" alignItems="center">
            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
              Last Updated on: {fDate(post.updatedAt)}
            </Box>
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>
          </Box>
          <Button
            onClick={() => {
              router.push(`${paths.dashboard.audit.new}?template=${post.id}`);
            }}
          >
            Create Audit from Template
            <Iconify icon="eva:arrow-right-fill" />
          </Button>
        </Stack>

        <Box
          sx={{
            p: 1,
            width: 180,
            height: '100%',
            flexShrink: 0,
            position: 'relative',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Image
            alt={post?.name}
            src="https://iaudit.s3.ap-south-1.amazonaws.com/demo-dark.png"
            sx={{ height: 1, borderRadius: 1.5 }}
          />
        </Box>
      </Card>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'bottom-center' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
              router.push(paths.dashboard.auditTemplate.edit(post.id));
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
              router.push(paths.dashboard.auditTemplate.edit(post.id));
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
