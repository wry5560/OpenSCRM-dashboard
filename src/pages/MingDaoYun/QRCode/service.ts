import request from '@/utils/request';

export interface QRCodeResponse {
  qr_code: string;
  config_id: string;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

/**
 * 获取企微联系我二维码
 * @param staffId 企微员工ID
 * @param userNO 明道云记录ID（rowid）
 */
export async function getQRCode(staffId: string, userNO?: string): Promise<QRCodeResponse> {
  const params = new URLSearchParams();
  params.append('staffId', staffId);
  if (userNO) {
    params.append('userNO', userNO);
  }

  const response = await request<ApiResponse<QRCodeResponse>>(
    `/api/v1/mingdaoyun/qrcode?${params.toString()}`,
    { method: 'GET' }
  );

  if (response.code !== 0) {
    throw new Error(response.message || '获取二维码失败');
  }

  return response.data;
}
