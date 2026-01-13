import React, { useEffect, useState } from 'react';
import { Card, Descriptions } from 'antd';
import styles from './index.less';

const MingDaoYunQRCode: React.FC = () => {
  const [staffId, setStaffId] = useState<string>('');
  const [userNO, setUserNO] = useState<string>('');

  useEffect(() => {
    // 从 URL 参数中获取 staffId 和 userNO
    const urlParams = new URLSearchParams(window.location.search);
    const staffIdParam = urlParams.get('staffId') || '';
    const userNOParam = urlParams.get('userNO') || '';
    setStaffId(staffIdParam);
    setUserNO(userNOParam);
  }, []);

  return (
    <div className={styles.container}>
      <Card title="企业微信二维码" className={styles.card}>
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="员工ID (staffId)">
            {staffId || <span className={styles.emptyText}>未传入</span>}
          </Descriptions.Item>
          <Descriptions.Item label="用户编号 (userNO)">
            {userNO || <span className={styles.emptyText}>未传入</span>}
          </Descriptions.Item>
        </Descriptions>
        <div className={styles.qrcodeArea}>
          <p className={styles.placeholder}>二维码展示区域（待开发）</p>
        </div>
      </Card>
    </div>
  );
};

export default MingDaoYunQRCode;
