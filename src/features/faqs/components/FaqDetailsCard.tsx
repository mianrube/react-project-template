import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { Button, Chip, Divider, Paper, Stack, Typography } from '@mui/material';

import { useScopedTranslation } from '@shared/hooks';

import type { FaqItem } from '../model';

export type FaqDetailsCardProps = {
  faq?: FaqItem;
  onCreate?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  variant?: 'admin' | 'public';
};

const categoryChipColorMap = {
  general: 'default',
  billing: 'warning',
  technical: 'info',
} as const;

export const FaqDetailsCard = ({
  faq,
  onCreate,
  onDelete,
  onEdit,
  variant = 'admin',
}: FaqDetailsCardProps) => {
  const { tScoped } = useScopedTranslation('components.FaqDetailsCard', { ns: 'faqs' });
  const isAdmin = variant === 'admin';

  if (!faq) {
    return (
      <Paper sx={{ p: 3, borderRadius: 4 }} variant="outlined">
        <Stack spacing={2.5}>
          <Typography variant="h5">
            {tScoped(isAdmin ? 'emptyTitle' : 'publicEmptyTitle')}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {tScoped(isAdmin ? 'emptyDescription' : 'publicEmptyDescription')}
          </Typography>

          {onCreate ? (
            <Stack direction="row" justifyContent="flex-start">
              <Button onClick={onCreate} startIcon={<NoteAddOutlinedIcon />} variant="contained">
                {tScoped('createAction')}
              </Button>
            </Stack>
          ) : null}
        </Stack>
      </Paper>
    );
  }

  const updatedAtLabel = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(faq.updatedAtIso));

  return (
    <Paper sx={{ p: 3, borderRadius: 4 }} variant="outlined">
      <Stack spacing={3}>
        <Stack spacing={1.5}>
          <Stack
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={1.5}
          >
            <Typography variant="h5">{faq.question}</Typography>

            {isAdmin && onEdit && onDelete ? (
              <Stack direction="row" spacing={1}>
                <Button onClick={onEdit} startIcon={<EditOutlinedIcon />} variant="outlined">
                  {tScoped('actions.edit')}
                </Button>
                <Button color="error" onClick={onDelete} startIcon={<DeleteOutlineOutlinedIcon />}>
                  {tScoped('actions.delete')}
                </Button>
              </Stack>
            ) : null}
          </Stack>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            <Chip
              color={categoryChipColorMap[faq.category]}
              label={tScoped(`category.${faq.category}`)}
              size="small"
              variant="outlined"
            />
            <Chip
              color={faq.isPublished ? 'success' : 'default'}
              label={faq.isPublished ? tScoped('status.published') : tScoped('status.unpublished')}
              size="small"
            />
          </Stack>
        </Stack>

        <Divider />

        <Stack spacing={2}>
          <Stack spacing={0.75}>
            <Typography color="text.secondary" variant="overline">
              {tScoped('sections.answer')}
            </Typography>
            <Typography variant="body1">{faq.answer}</Typography>
          </Stack>

          <Stack spacing={0.75}>
            <Typography color="text.secondary" variant="overline">
              {tScoped('sections.updatedAt')}
            </Typography>
            <Typography variant="body2">{updatedAtLabel}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
