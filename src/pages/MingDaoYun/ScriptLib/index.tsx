import React, { useRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
import EnterpriseScript from '@/pages/StaffAdmin/ScriptLibrary/EnterpriseScript';
import { StaffAdminLogout } from './service';
import { LSExtStaffAdminID } from '../../../../config/constant';
import UserAvatar from '../components/UserAvatar';

const MingDaoYunScriptLib: React.FC = () => {
  const enterpriseScriptRef = useRef<any>({});

  // 退出登录
  const handleLogout = async () => {
    try {
      await StaffAdminLogout();
    } catch (e) {
      // 忽略错误，继续退出
    }
    localStorage.removeItem(LSExtStaffAdminID);
    window.location.href = '/mingdaoyun/login?redirect=' + encodeURIComponent(window.location.pathname);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>企业话术库</h2>
        <div className={styles.headerRight}>
          <Button
            type="primary"
            icon={<PlusOutlined style={{ fontSize: 16, verticalAlign: '-3px' }} />}
            onClick={() => {
              enterpriseScriptRef.current.createEnterpriseScript();
            }}
          >
            新建话术
          </Button>
          <UserAvatar onLogout={handleLogout} />
        </div>
      </div>

      <div className={styles.content}>
        <EnterpriseScript ref={enterpriseScriptRef} />
      </div>
    </div>
  );
};

export default MingDaoYunScriptLib;
