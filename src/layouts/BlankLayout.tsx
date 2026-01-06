import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Outlet } from '@umijs/max';
import 'dayjs/locale/zh-cn';

const Layout: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Outlet />
    </ConfigProvider>
  );
};

export default Layout;
