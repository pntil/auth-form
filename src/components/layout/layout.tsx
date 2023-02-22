import { FC, ReactNode } from 'react';

import { Footer } from 'components/footer/footer';

import './layout.css';

interface LayoutProps {
  noHeader?: boolean;
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ noHeader, children }) => {
  return (
    <div className="layout">
      {!noHeader && (
        <header className="layout__header">This is the header!</header>
      )}

      <main className="layout__main">{children}</main>

      <footer className="layout__footer">
        <Footer />
      </footer>
    </div>
  );
};
