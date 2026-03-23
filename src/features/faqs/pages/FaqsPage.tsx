import { useDeferredValue, useState } from 'react';

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

import { useScopedTranslation } from '@shared/hooks';

import { useAppSelector } from '@store';

import { FAQ_CATEGORY_VALUES, type FaqCategory, matchesFaqSearch } from '../model';

const BASE_KEY = 'pages.FaqsPage';

type PublicFaqCategoryFilter = 'all' | FaqCategory;

const publicCategoryChipColorMap = {
  all: 'default',
  general: 'default',
  billing: 'warning',
  technical: 'info',
} as const;

export const FaqsPage = () => {
  const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'faqs' });
  const faqItems = useAppSelector((state) => state.faqManagement.items);
  const publishedFaqs = faqItems.filter((faq) => faq.isPublished);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PublicFaqCategoryFilter>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(publishedFaqs[0]?.id ?? null);

  const deferredSearchQuery = useDeferredValue(searchQuery);
  const filteredFaqs = publishedFaqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;

    return matchesCategory && matchesFaqSearch(faq, deferredSearchQuery);
  });

  const displayedExpandedFaqId = filteredFaqs.some((faq) => faq.id === expandedFaqId)
    ? expandedFaqId
    : (filteredFaqs[0]?.id ?? null);

  return (
    <Stack spacing={3} sx={{ p: { xs: 2, md: 3 } }}>
      <Box
        sx={(theme) => ({
          border: 1,
          borderColor: 'divider',
          borderRadius: 5,
          overflow: 'hidden',
          p: { xs: 3, md: 4 },
          background: `radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.18)} 0%, ${alpha(theme.palette.background.paper, 0.96)} 42%, ${theme.palette.background.paper} 100%)`,
        })}
      >
        <Stack spacing={2} sx={{ maxWidth: 860 }}>
          <Chip
            icon={<HelpOutlineOutlinedIcon />}
            label={tScoped('eyebrow')}
            sx={{ alignSelf: 'flex-start' }}
            variant="outlined"
          />
          <Typography variant="h3">{tScoped('title')}</Typography>
          <Typography color="text.secondary" variant="body1">
            {tScoped('description')}
          </Typography>

          <Chip
            label={tScoped('stats.published', { count: publishedFaqs.length })}
            size="small"
            sx={{ alignSelf: 'flex-start' }}
            variant="outlined"
          />
        </Stack>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 4 }} variant="outlined">
        <Stack spacing={2.5}>
          <Stack spacing={0.75}>
            <Typography variant="h5">{tScoped('browse.title')}</Typography>
            <Typography color="text.secondary" variant="body2">
              {tScoped('browse.description')}
            </Typography>
          </Stack>

          <TextField
            fullWidth
            label={tScoped('browse.searchLabel')}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
            placeholder={tScoped('browse.searchPlaceholder')}
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

          <Stack direction="row" flexWrap="wrap" gap={1}>
            <Chip
              clickable
              color={selectedCategory === 'all' ? 'primary' : publicCategoryChipColorMap.all}
              label={tScoped('browse.categories.all')}
              onClick={() => {
                setSelectedCategory('all');
              }}
              variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
            />

            {FAQ_CATEGORY_VALUES.map((category) => (
              <Chip
                key={category}
                clickable
                color={
                  selectedCategory === category ? 'primary' : publicCategoryChipColorMap[category]
                }
                label={tScoped(`browse.categories.${category}`)}
                onClick={() => {
                  setSelectedCategory(category);
                }}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>

          <Typography color="text.secondary" variant="body2">
            {tScoped('browse.results', { count: filteredFaqs.length, total: publishedFaqs.length })}
          </Typography>

          {filteredFaqs.length === 0 ? (
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
                <Typography variant="subtitle1">{tScoped('browse.emptyTitle')}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {tScoped('browse.emptyDescription')}
                </Typography>
              </Stack>
            </Box>
          ) : (
            <Stack spacing={1.5}>
              {filteredFaqs.map((faq) => (
                <Accordion
                  disableGutters
                  expanded={displayedExpandedFaqId === faq.id}
                  key={faq.id}
                  onChange={(_, isExpanded) => {
                    setExpandedFaqId(isExpanded ? faq.id : null);
                  }}
                  sx={{
                    border: 1,
                    borderColor: displayedExpandedFaqId === faq.id ? 'primary.main' : 'divider',
                    borderRadius: 3,
                    boxShadow: 'none',
                    overflow: 'hidden',
                    '&::before': {
                      display: 'none',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreOutlinedIcon />}
                    sx={{ px: 2.5, py: 0.5 }}
                  >
                    <Stack spacing={1.25} sx={{ width: '100%', pr: 2 }}>
                      <Typography sx={{ fontWeight: 600 }} variant="subtitle1">
                        {faq.question}
                      </Typography>

                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        <Chip
                          color={publicCategoryChipColorMap[faq.category]}
                          label={tScoped(`browse.categories.${faq.category}`)}
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    </Stack>
                  </AccordionSummary>

                  <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                    <Typography
                      color="text.secondary"
                      sx={{ whiteSpace: 'pre-line' }}
                      variant="body1"
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};
