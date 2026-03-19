import { useMemo, useState } from 'react';

import LanguageOutlined from '@mui/icons-material/LanguageOutlined';
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import type { MouseEvent } from 'react';

import { useScopedTranslation } from '@shared/hooks';

import { type Language, setLanguage } from '@features/ui/store';

import { useAppDispatch, useAppSelector } from '@store';

const BASE_KEY = 'languageSwitcher';

export const LanguageSwitcher = () => {
  const { tScoped } = useScopedTranslation(BASE_KEY, { ns: 'shared' });
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const tooltipLabel = tScoped('tooltip');

  const handleSetLanguage = (lang: Language) => {
    dispatch(setLanguage(lang));
  };

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = useMemo(() => {
    const langs: Language[] = ['en', 'es'];

    return langs
      .map((lang) => ({
        lang,
        label: tScoped(`languages.${lang}`),
      }))
      .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));
  }, [tScoped]);

  return (
    <>
      <Tooltip title={tooltipLabel} arrow>
        <IconButton
          size="small"
          color="inherit"
          aria-label={tooltipLabel}
          aria-haspopup="menu"
          aria-expanded={isOpen ? 'true' : undefined}
          onClick={handleOpen}
        >
          <LanguageOutlined fontSize="small" />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {options.map((opt) => {
          const selected = opt.lang === language;

          return (
            <MenuItem
              key={opt.lang}
              selected={selected}
              onClick={() => {
                handleSetLanguage(opt.lang);
                handleClose();
              }}
              sx={{ minWidth: 160 }}
            >
              <Box sx={{ width: 20, display: 'flex', justifyContent: 'center' }}>
                {selected ? (
                  <Typography component="span" variant="body2">
                    ✓
                  </Typography>
                ) : null}
              </Box>
              <Typography variant="body2">{opt.label}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
