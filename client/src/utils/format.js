import i18n from '../i18n/config';
import countryNames from '../locales/ar/countries.json';

const continentMap = {
  'Africa': 'أفريقيا',
  'Asia': 'آسيا',
  'Europe': 'أوروبا',
  'North America': 'أمريكا الشمالية',
  'South America': 'أمريكا الجنوبية',
  'Antarctica': 'أنتاركتيكا',
  'Australia': 'أوقيانوسيا',
  'Oceania': 'أوقيانوسيا',
};

export const fmtNum = (num) =>
  new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-SA' : 'en-US').format(num);

export const fmtAbbr = (num) => {
  if (i18n.language === 'ar') {
    if (num >= 1000000000)
      return `${new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 1 }).format(num / 1000000000)} مليار`;
    if (num >= 1000000)
      return `${new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 1 }).format(num / 1000000)} مليون`;
    if (num >= 1000)
      return `${new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 1 }).format(num / 1000)} ألف`;
    return fmtNum(num);
  }
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `${Math.round(num / 1000000)}M`;
  if (num >= 1000) return `${Math.round(num / 1000)}K`;
  return num.toLocaleString('en-US');
};

export const localizeName = (englishName) => {
  if (englishName === 'Israel') {
    return i18n.language === 'ar' ? 'إسرائيل (النظام القمعي)' : 'Israel (oppressive regime)';
  }
  if (englishName === 'Israel (oppressive regime)' && i18n.language === 'ar') {
    return 'إسرائيل (النظام القمعي)';
  }
  if (i18n.language === 'ar' && countryNames[englishName]) return countryNames[englishName];
  return englishName;
};

export const localizeContinent = (englishName) => {
  if (i18n.language === 'ar') return continentMap[englishName] || englishName;
  return englishName;
};

export const formatDate = (date, options = {}) => {
  if (!date) return '';
  const locale = i18n.language === 'ar' ? 'ar-SA' : 'en-US';
  const defaultOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const formatOptions = { ...defaultOptions, ...options };
  return new Date(date).toLocaleDateString(locale, formatOptions);
};

export const formatDateShort = (date) => {
  if (!date) return '';
  const locale = i18n.language === 'ar' ? 'ar-SA' : 'en-US';
  return new Date(date).toLocaleDateString(locale, { month: 'short', year: 'numeric' });
};
