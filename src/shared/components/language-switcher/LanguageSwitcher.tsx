import { Button, ButtonGroup } from '@mui/material';

import { type Language, setLanguage } from '@features/ui/store';

import { useAppDispatch, useAppSelector } from '@store';

export const LanguageSwitcher = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);

  const handleSetLanguage = (lang: Language) => {
    dispatch(setLanguage(lang));
  };

  return (
    <ButtonGroup size="small" variant="outlined">
      <Button onClick={() => handleSetLanguage('en')} disabled={language === 'en'}>
        EN
      </Button>
      <Button onClick={() => handleSetLanguage('es')} disabled={language === 'es'}>
        ES
      </Button>
    </ButtonGroup>
  );
};
