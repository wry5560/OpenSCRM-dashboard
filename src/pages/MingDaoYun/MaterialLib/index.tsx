import React, { useEffect, useState } from 'react';
import { Button, Switch, Radio, Space, message } from 'antd';
import styles from './index.less';
import Material from '@/pages/StaffAdmin/MaterialLibrary/Material/index';
import TagModal from '@/pages/StaffAdmin/MaterialLibrary/components/TagModal/index';
import TagProvider, { TagContext } from '@/pages/StaffAdmin/MaterialLibrary/TagProvider';
import { getMaterialSidebarStatus, updateMaterialSidebarStatus } from '@/pages/StaffAdmin/MaterialLibrary/service';
import { StaffAdminLogout } from './service';
import { LSExtStaffAdminID } from '../../../../config/constant';
import UserAvatar from '../components/UserAvatar';

const MingDaoYunMaterialLib: React.FC = () => {
  const [currentType, setCurrentType] = React.useState('链接');
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onRadioChange = (e: any) => {
    setCurrentType(e.target.value);
  };

  useEffect(() => {
    getMaterialSidebarStatus().then((res) => {
      if (res?.code === 0) {
        setSidebarOpen(res?.data?.status !== 2);
      }
    });
  }, []);

  const switchSidebarStatus = (value: boolean) => {
    setSidebarOpen(value);
    message.success('设置成功');
    updateMaterialSidebarStatus({ status: value ? 1 : 2 });
  };

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
    <TagProvider>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>素材库</h2>
          <UserAvatar onLogout={handleLogout} />
        </div>

        <div className={styles.filterHeader}>
          <div className={styles.filterContainer}>
            <span>筛选：</span>
            <Radio.Group onChange={onRadioChange} value={currentType}>
              <Radio value={'文章'} key={1} disabled={true}>文章</Radio>
              <Radio value={'链接'} key={2}>链接</Radio>
              <Radio value={'海报'} key={3}>海报</Radio>
              <Radio value={'视频'} key={4}>视频</Radio>
              <Radio value={'PDF'} key={5}>PDF</Radio>
              <Radio value={'PPT'} key={6}>PPT</Radio>
              <Radio value={'表格'} key={7}>表格</Radio>
              <Radio value={'文档'} key={8}>文档</Radio>
            </Radio.Group>
          </div>
          <div className={styles.headerOptions}>
            <Space>
              <span>侧边栏开关：</span>
              <Switch checked={sidebarOpen} onChange={(value) => switchSidebarStatus(value)} />
              <Button onClick={() => setTagModalVisible(true)}>标签管理</Button>
            </Space>
          </div>
        </div>

        <div className={styles.content}>
          <Material fileType={currentType} />
        </div>

        {/* 添加&删除标签 */}
        <TagContext.Consumer>
          {(contextValue) => (
            <TagModal
              width={560}
              isEditable={true}
              allTags={contextValue.allTags}
              setAllTags={contextValue.setAllTags}
              visible={tagModalVisible}
              setVisible={setTagModalVisible}
              reloadTags={contextValue.setTagsItemsTimestamp}
            />
          )}
        </TagContext.Consumer>
      </div>
    </TagProvider>
  );
};

export default MingDaoYunMaterialLib;
