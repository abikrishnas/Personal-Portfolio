import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import { useTheme } from '../context/ThemeContext';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { setTheme } = useTheme();

  // Static theme rules for pages without scroll transitions
  useEffect(() => {
    // Disable transitions during route changes to prevent background color blending
    document.body.classList.add('no-transition');

    if (pathname === '/work') {
      setTheme('light');
    } else if (
      pathname !== '/' && 
      pathname !== '/about'
    ) {
      setTheme('dark');
    }

    const t = setTimeout(() => {
      document.body.classList.remove('no-transition');
    }, 100);

    return () => clearTimeout(t);
  }, [pathname, setTheme]);

  return (
    <div className="theme-bg" style={{ minHeight: '100vh' }}>
      <CustomCursor />
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
