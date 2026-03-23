import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useScopedTranslation } from '@shared/hooks';

import type { FaqItem } from '../model';

export type FaqListPanelProps = {
  items: FaqItem[];
  onCreate: () => void;
  onSearchChange: (value: string) => void;
  onSelect: (faqId: string) => void;
  searchQuery: string;
  selectedFaqId: string | null;
  totalCount: number;
};

const categoryChipColorMap = {
  general: 'default',
  billing: 'warning',
  technical: 'info',
} as const;

export const FaqListPanel = ({
  items,
  onCreate,
  onSearchChange,
  onSelect,
  searchQuery,
  selectedFaqId,
  totalCount,
}: FaqListPanelProps) => {
  const { tScoped } = useScopedTranslation('components.FaqListPanel', { ns: 'faqs' });

  return (
    <Paper sx={{ p: 3, borderRadius: 4 }} variant="outlined">
      <Stack spacing={2.5}>
        <Stack
          alignItems={{ xs: 'stretch', sm: 'center' }}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          spacing={1.5}
        >
          <Stack spacing={0.5}>
            <Typography variant="h5">{tScoped('title')}</Typography>
            <Typography color="text.secondary" variant="body2">
              {tScoped('results', { count: items.length, total: totalCount })}
            </Typography>
          </Stack>

          <Button onClick={onCreate} startIcon={<NoteAddOutlinedIcon />} variant="contained">
            {tScoped('createAction')}
          </Button>
        </Stack>

        <TextField
          fullWidth
          label={tScoped('searchLabel')}
          onChange={(event) => {
            onSearchChange(event.target.value);
          }}
          placeholder={tScoped('searchPlaceholder')}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          value={searchQuery}
        />

        {items.length === 0 ? (
          <Box
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 3,
              p: 3,
              textAlign: 'center',
            }}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle1">{tScoped('emptyTitle')}</Typography>
              <Typography color="text.secondary" variant="body2">
                {tScoped('emptyDescription')}
              </Typography>
            </Stack>
          </Box>
        ) : (
          <List disablePadding sx={{ display: 'grid', gap: 1.25 }}>
            {items.map((faq) => {
              const updatedAtLabel = new Intl.DateTimeFormat(undefined, {
                dateStyle: 'medium',
              }).format(new Date(faq.updatedAtIso));

              return (
                <Paper
                  key={faq.id}
                  sx={{
                    borderRadius: 3,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: faq.id === selectedFaqId ? 'primary.main' : 'divider',
                    overflow: 'hidden',
                  }}
                  variant="outlined"
                >
                  <ListItemButton
                    onClick={() => {
                      onSelect(faq.id);
                    }}
                    selected={faq.id === selectedFaqId}
                    sx={{ alignItems: 'flex-start', py: 2 }}
                  >
                    <ListItemText
                      primary={faq.question}
                      primaryTypographyProps={{ sx: { fontWeight: 600, mb: 0.75 } }}
                      secondary={
                        <Stack spacing={1.25} sx={{ mt: 0.5 }}>
                          <Typography color="text.secondary" variant="body2">
                            {faq.answer}
                          </Typography>

                          <Stack direction="row" flexWrap="wrap" gap={1}>
                            <Chip
                              color={categoryChipColorMap[faq.category]}
                              label={tScoped(`category.${faq.category}`)}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              color={faq.isPublished ? 'success' : 'default'}
                              label={
                                faq.isPublished
                                  ? tScoped('status.published')
                                  : tScoped('status.unpublished')
                              }
                              size="small"
                            />
                          </Stack>

                          <Typography color="text.secondary" variant="caption">
                            {tScoped('updatedAt', { value: updatedAtLabel })}
                          </Typography>
                        </Stack>
                      }
                      secondaryTypographyProps={{ component: 'div' }}
                    />
                  </ListItemButton>
                </Paper>
              );
            })}
          </List>
        )}
      </Stack>
    </Paper>
  );
};
