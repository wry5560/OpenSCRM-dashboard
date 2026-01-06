import React, { useEffect } from 'react';
import { history } from '@@/core/history';
import { connect } from '@umijs/max';
import type { Dispatch } from '@@/plugin-dva/connect';

export type LoginCallbackProps = {
  dispatch: Dispatch;
};

const LoginCallback: React.FC<LoginCallbackProps> = (props) => {
  useEffect(() => {
    const { dispatch } = props;
    if (dispatch) {
      dispatch({
        type: 'staffAdmin/getCurrent',
      });
    }
  }, [props]);
  return <>{history.push('/staff-admin/welcome')}</>;
};

export default connect(() => ({}))(LoginCallback);
