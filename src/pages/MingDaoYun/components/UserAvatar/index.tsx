import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Menu, Spin } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { GetCurrentStaffAdmin, StaffAdminInterface } from '@/services/staffAdmin';
import styles from './index.less';

interface UserAvatarProps {
  onLogout: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ onLogout }) => {
  const [userInfo, setUserInfo] = useState<StaffAdminInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetCurrentStaffAdmin()
      .then((res) => {
        if (res?.code === 0 && res?.data) {
          setUserInfo(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  if (loading) {
    return <Spin size="small" />;
  }

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <div className={styles.userAvatarContainer}>
        <Avatar
          size={32}
          src={userInfo?.avatar_url}
          icon={!userInfo?.avatar_url && <UserOutlined />}
        />
        <span className={styles.userName}>{userInfo?.name || '用户'}</span>
      </div>
    </Dropdown>
  );
};

export default UserAvatar;
