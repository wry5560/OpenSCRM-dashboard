import type { MenuDataItem } from '@ant-design/pro-components';
import { getMenuData, getPageTitle } from '@ant-design/pro-components';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import type { ConnectProps } from '@umijs/max';
import { connect, Link, Outlet, useLocation } from '@umijs/max';
import React from 'react';
import type { ConnectState } from '@/models/connect';
import logo from '../assets/logo_black.svg';
import styles from './LoginLayout.less';

export type UserLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
} & Partial<ConnectProps>;

const LoginLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const location = useLocation();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
              </Link>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(LoginLayout);
