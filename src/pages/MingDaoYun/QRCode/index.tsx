import React, { useEffect, useState } from 'react';
import { Card, Spin, Alert, Image } from 'antd';
import { getQRCode, QRCodeResponse } from './service';
import styles from './index.less';

const MingDaoYunQRCode: React.FC = () => {
  const [staffId, setStaffId] = useState<string>('');
  const [userNO, setUserNO] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [qrCodeData, setQrCodeData] = useState<QRCodeResponse | null>(null);

  useEffect(() => {
    // 从 URL 参数中获取 staffId 和 userNO
    const urlParams = new URLSearchParams(window.location.search);
    const staffIdParam = urlParams.get('staffId') || '';
    const userNOParam = urlParams.get('userNO') || '';
    setStaffId(staffIdParam);
    setUserNO(userNOParam);

    // 如果有 staffId，自动获取二维码
    if (staffIdParam) {
      fetchQRCode(staffIdParam, userNOParam);
    }
  }, []);

  const fetchQRCode = async (sid: string, uno: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await getQRCode(sid, uno);
      setQrCodeData(data);
    } catch (err: any) {
      console.error('获取二维码失败:', err);
      setError(err?.message || '获取二维码失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 如果 staffId 为空，显示错误提示
  if (!staffId) {
    return (
      <div className={styles.container}>
        <Alert
          message="配置错误"
          description="请先配置企微员工ID（staffId 参数不能为空）"
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Card title="企业微信二维码" className={styles.card}>
        {loading && (
          <div className={styles.loadingArea}>
            <Spin tip="正在生成二维码..." />
          </div>
        )}

        {error && (
          <Alert
            message="获取失败"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {!loading && !error && qrCodeData && (
          <div className={styles.qrcodeArea}>
            <Image
              src={qrCodeData.qr_code}
              alt="企业微信二维码"
              width={200}
              height={200}
              preview={true}
            />
            <p className={styles.tips}>请使用微信扫描二维码添加好友</p>
          </div>
        )}

        {!loading && !error && !qrCodeData && (
          <div className={styles.qrcodeArea}>
            <p className={styles.placeholder}>二维码加载中...</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MingDaoYunQRCode;
