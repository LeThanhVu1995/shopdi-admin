import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LOCAL_LNG } from '../core/constants';
import { LanguageContext } from '../hook/useLng';

function LanguageProvider({ children }) {
  const [lng, setLng] = useState(localStorage.getItem(LOCAL_LNG) || 'en');
  const { i18n } = useTranslation();

  const changeLng = useCallback((lng) => {
    setLng(lng);
    localStorage.setItem(LOCAL_LNG, lng);
    i18n.changeLanguage(lng);
  }, []);

  const params = useMemo(() => {
    return { lng, setLng, changeLng };
  }, [lng]);

  return (
    <LanguageContext.Provider value={params}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
