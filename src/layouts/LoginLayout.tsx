import type { MenuDataItem } from '@ant-design/pro-components';
import { getMenuData, getPageTitle } from '@ant-design/pro-components';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import type { ConnectProps } from '@umijs/max';
import { connect, Link, Outlet, useLocation } from '@umijs/max';
import React from 'react';
import type { ConnectState } from '@/models/connect';
import logoPng from '../assets/logo.png';
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
              <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <img alt="logo" className={styles.logo} src={logoPng} />
                <span style={{ fontSize: '24px', fontWeight: 500, color: '#1890ff' }}>极星SCRM</span>
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
