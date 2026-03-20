import type { TypographyProps } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router';

import { useScopedTranslation } from '@shared/hooks';

export type AppBrandProps = {
  showLogo?: boolean;
  showTitle?: boolean;
  logoHeight?: number;
  titleVariant?: TypographyProps['variant'];
  titleI18nKey?: string;
};

export const AppBrand = ({
  showLogo = true,
  showTitle = true,
  logoHeight = 32,
  titleVariant = 'h6',
  titleI18nKey = 'projectName',
}: AppBrandProps) => {
  const { tScoped: tApp } = useScopedTranslation('app', { ns: 'shared' });
  const { tScoped: tNavigation } = useScopedTranslation('navigation', { ns: 'shared' });
  const brandTitle = tApp(titleI18nKey);

  return (
    <Box
      aria-label={tNavigation('home')}
      component={Link}
      sx={{
        alignItems: 'center',
        color: 'inherit',
        display: 'inline-flex',
        gap: 1.5,
        minWidth: 0,
        textDecoration: 'none',
      }}
      to="/"
    >
      {showLogo ? (
        <Box
          alt={brandTitle}
          component="img"
          src="/logo.svg"
          sx={{
            display: 'block',
            flexShrink: 0,
            height: logoHeight,
            width: 'auto',
          }}
        />
      ) : null}

      {showTitle ? (
        <Typography noWrap variant={titleVariant}>
          {brandTitle}
        </Typography>
      ) : null}
    </Box>
  );
};
