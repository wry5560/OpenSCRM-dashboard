import React, { useEffect, useState } from 'react';
import { PageLoading } from '@ant-design/pro-components';
import type { ConnectProps } from '@umijs/max';
import { connect, Navigate, Outlet } from '@umijs/max';
import type { ConnectState } from '@/models/connect';
import type { StaffAdminInterface } from '@/services/staffAdmin';
import { LSExtStaffAdminID } from '../../config/constant';

// 存储 MingDaoYun 登录后的重定向 URL
const LS_MINGDAOYUN_REDIRECT = 'mingdaoyun_redirect';

type SecurityLayoutProps = {
  loading?: boolean;
  currentStaffAdmin?: StaffAdminInterface;
  dispatch?: ConnectProps['dispatch'];
};

const MingDaoYunSecurityLayout: React.FC<SecurityLayoutProps> = (props) => {
  const { dispatch, loading } = props;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    if (dispatch) {
      dispatch({
        type: 'staffAdmin/getCurrent',
      });
    }
  }, [dispatch]);

  const isLogin = localStorage.getItem(LSExtStaffAdminID) !== null;

  if ((!isLogin && loading) || !isReady) {
    return <PageLoading />;
  }
  if (!isLogin && !window.location.pathname.includes('/mingdaoyun/login')) {
    // 存储当前路径，登录后重定向回来
    localStorage.setItem(LS_MINGDAOYUN_REDIRECT, window.location.pathname);
    return <Navigate to="/mingdaoyun/login" replace />;
  }
  return <Outlet />;
};

export { LS_MINGDAOYUN_REDIRECT };

export default connect(({ staffAdmin, loading }: ConnectState) => ({
  currentStaffAdmin: staffAdmin.currentStaffAdmin,
  loading: loading.models.staffAdmin,
}))(MingDaoYunSecurityLayout);
