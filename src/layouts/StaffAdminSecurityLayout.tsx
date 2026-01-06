import React, {useEffect, useState} from 'react';
import {PageLoading} from '@ant-design/pro-components';
import type {ConnectProps} from '@umijs/max';
import {connect, Navigate, Outlet} from '@umijs/max';
import {stringify} from 'querystring';
import type {ConnectState} from '@/models/connect';
import type {StaffAdminInterface} from '@/services/staffAdmin';
import {LSExtStaffAdminID} from '../../config/constant';

type SecurityLayoutProps = {
  loading?: boolean;
  currentStaffAdmin?: StaffAdminInterface;
  dispatch?: ConnectProps['dispatch'];
};

const StaffAdminSecurityLayout: React.FC<SecurityLayoutProps> = (props) => {
  const {dispatch, loading} = props;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    if (dispatch) {
      dispatch({
        type: 'staffAdmin/getCurrent',
      });
    }
  }, [dispatch]);

  // You can replace it with your own login authentication rules (such as judging whether the token exists)
  const isLogin = localStorage.getItem(LSExtStaffAdminID) !== null;
  const queryString = stringify({
    redirect: window.location.href,
  });

  if ((!isLogin && loading) || !isReady) {
    return <PageLoading/>;
  }
  if (!isLogin && window.location.pathname !== '/staff-admin/login') {
    return <Navigate to={`/staff-admin/login?${queryString}`} replace />;
  }
  return <Outlet />;
};

export default connect(({staffAdmin, loading}: ConnectState) => ({
  currentStaffAdmin: staffAdmin.currentStaffAdmin,
  loading: loading.models.staffAdmin,
}))(StaffAdminSecurityLayout);
