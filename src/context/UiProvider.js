import { useEffect, useMemo, useState } from 'react';
import NProgress from 'nprogress';
import { UIContext } from '../hook/useUI';

function UIProvider({ children }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);

  const params = useMemo(() => {
    return { loading, setLoading };
  }, [loading]);

  return <UIContext.Provider value={params}>{children}</UIContext.Provider>;
}

export default UIProvider;
