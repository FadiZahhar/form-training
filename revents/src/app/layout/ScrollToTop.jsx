import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  //  saying:  when this particular component is mounted,then we can use an effect.

  //   adding pathname dependency means anytime the pathname changes it will rerender the useEffect hook
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
