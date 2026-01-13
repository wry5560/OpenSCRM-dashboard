/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import type { ProLayoutProps, MenuDataItem, ProSettings } from '@ant-design/pro-components';
import { ProLayout } from '@ant-design/pro-components';
import React, { useMemo, useRef } from 'react';
import type { Dispatch } from '@umijs/max';
import { connect, history, Link, Outlet, useLocation, useAppData } from '@umijs/max';
import { Button, Result } from 'antd';
import Authorized from '@/utils/Authorized';
import type { ConnectState } from '@/models/connect';
import { getMatchMenu } from '@umijs/route-utils';
import logoPng from '../assets/logo.png';
import RightContent from '@/components/GlobalHeader/RightContent';
import {
  createFromIconfontCN,
  HomeOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  QrcodeOutlined,
  IdcardOutlined,
  UsergroupDeleteOutlined,
  TagsOutlined,
  MessageOutlined,
  TagOutlined,
} from '@ant-design/icons';
import defaultSettings from '../../config/defaultSettings';
import routes from '../../config/routes';

// Ant Design 图标名称映射
const antdIconMap: Record<string, React.ReactNode> = {
  Home: <HomeOutlined />,
  UsergroupAdd: <UsergroupAddOutlined />,
  User: <UserOutlined />,
  SafetyCertificate: <SafetyCertificateOutlined />,
  QrcodeOutlined: <QrcodeOutlined />,
  IdcardOutlined: <IdcardOutlined />,
  UsergroupDelete: <UsergroupDeleteOutlined />,
  Tags: <TagsOutlined />,
  MessageOutlined: <MessageOutlined />,
  TagOutlined: <TagOutlined />,
};

// 创建 IconFont 组件
const IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
});

// 将字符串图标转换为 React 组件
const convertIcon = (icon?: string): React.ReactNode => {
  if (!icon || typeof icon !== 'string') return undefined;

  // 检查是否为 Ant Design 内置图标
  if (antdIconMap[icon]) {
    return antdIconMap[icon];
  }

  // 检查是否为 iconfont 图标
  if (icon.startsWith('icon-')) {
    return <IconFont type={icon} />;
  }

  return undefined;
};

// 转换路由格式：routes -> children，过滤非菜单项，转换图标
const transformRoutes = (routeList: any[]): any[] => {
  return routeList
    .filter((route) => route.name && !route.redirect) // 只保留有名称且非重定向的路由
    .map((route) => ({
      ...route,
      icon: convertIcon(route.icon),
      children: route.routes ? transformRoutes(route.routes) : undefined,
      routes: undefined, // 移除 routes 属性
    }));
};

// 从路由配置中提取 BasicLayout 对应的菜单路由
const getBasicLayoutRoutes = () => {
  const rootRoute = routes[0];
  if (!rootRoute?.routes) return [];

  // 找到 /staff-admin/ 下的 StaffAdminSecurityLayout
  const staffAdminRoute = rootRoute.routes.find(
    (r: any) => r.path === '/staff-admin/' && r.component?.includes('StaffAdminSecurityLayout')
  );
  if (!staffAdminRoute?.routes) return [];

  // 找到 BasicLayout 的路由
  const basicLayoutRoute = staffAdminRoute.routes.find(
    (r: any) => r.component?.includes('BasicLayout')
  );

  const rawRoutes = basicLayoutRoute?.routes || [];
  return transformRoutes(rawRoutes);
};

const basicLayoutRoutes = getBasicLayoutRoutes();

export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: ProSettings;
  dispatch: Dispatch;
} & ProLayoutProps;

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};

/** Use Authorized check all menu item */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

// const defaultFooterDom = (
//   // <DefaultFooter
//   //   copyright={`${new Date().getFullYear()} OpenSCRM`}
//   //   links={
//   //     [
//   //     ]
//   //   }
//   // />
// );

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    settings,
  } = props;
  const location = useLocation();
  const menuDataRef = useRef<MenuDataItem[]>([]);

  /** Init variables */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const noMatch = (
    <Result
      status={403}
      title="403"
      subTitle="抱歉，您无权访问此页面"
      extra={
        <Button type="primary">
          <Link to={'staffAdmin/login'}>
            去登陆
          </Link>
        </Button>
      }
    />
  );

  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );

  return (
    <ProLayout
      logo={logoPng}
      {...props}
      {...settings}
      route={{
        path: '/staff-admin',
        children: basicLayoutRoutes,
      }}
      location={location}
      onCollapse={handleMenuCollapse}
      layout={'mix'}
      navTheme={'light'}
      siderWidth={260}
      className={'main'}
      token={{
        header: {
          colorBgHeader: '#001529',
          colorHeaderTitle: '#fff',
          colorTextMenu: '#dfdfdf',
          colorTextMenuSecondary: '#dfdfdf',
          colorTextMenuSelected: '#fff',
          colorTextMenuActive: '#fff',
          colorTextRightActionsItem: '#dfdfdf',
        },
      }}
      menu={{
        defaultOpenAll: true,
        type: 'sub',
        ignoreFlatMenu: true,
      }}
      onMenuHeaderClick={(e) => e?.preventDefault()}
      headerTitleRender={() => {
        return (
          <a style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'default' }}>
            <img src={logoPng} height={32} alt={'极星SCRM'} />
            <span style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>极星SCRM</span>
          </a>
        );
      }}
      menuRender={(_menuProps, defaultDom) => {
        return <div className={'sidebar-menu'}>{defaultDom}</div>;
      }}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      // breadcrumbRender={(routers = []) => [
      //   {
      //     path: '/',
      //     breadcrumbName: '首页',
      //   },
      //   ...routers,
      // ]}
      breadcrumbRender={false}
      footerRender={() => {
        // if (settings.footerRender || settings.footerRender === undefined) {
        //   return defaultFooterDom;
        // }

        return null;
      }}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      postMenuData={(menuData) => {
        menuDataRef.current = menuData || [];
        return menuData || [];
      }}
    >
      <Authorized authority={authorized!.authority} noMatch={noMatch}>
        <Outlet />
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
