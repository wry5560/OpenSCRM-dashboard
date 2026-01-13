import React, { useEffect } from 'react';
import { connect } from '@umijs/max';
import type { Dispatch } from '@@/plugin-dva/connect';
import { Spin } from 'antd';

// 存储 MingDaoYun 登录后的重定向 URL
const LS_MINGDAOYUN_REDIRECT = 'mingdaoyun_redirect';

export type LoginCallbackProps = {
  dispatch: Dispatch;
};

const MingDaoYunLoginCallback: React.FC<LoginCallbackProps> = (props) => {
  useEffect(() => {
    const { dispatch } = props;
    if (dispatch) {
      dispatch({
        type: 'staffAdmin/getCurrent',
      });
    }

    // 从 localStorage 获取重定向 URL，默认到素材库
    const redirect = localStorage.getItem(LS_MINGDAOYUN_REDIRECT) || '/mingdaoyun/material-lib';
    // 清除存储的重定向 URL
    localStorage.removeItem(LS_MINGDAOYUN_REDIRECT);

    // 延迟一下确保 session 已保存
    setTimeout(() => {
      window.location.href = redirect;
    }, 500);
  }, [props]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" tip="登录成功，正在跳转..." />
    </div>
  );
};

export default connect(() => ({}))(MingDaoYunLoginCallback);
