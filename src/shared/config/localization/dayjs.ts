import dayjs from 'dayjs';

import 'dayjs/locale/en';
import 'dayjs/locale/es';

export const setDayjsLocale = (locale: string) => {
  dayjs.locale(locale);
};
