import request from '@/utils/request';
import { StaffAdminApiPrefix } from '../../../../config/constant';

export type QueryScriptListParams = Partial<{
  page: number;
  page_size: number;
  group_id?: string;
  department_id?: number[];
  key_word?: string;
}>;

export type QueryGroupsParams = Partial<{
  page: number;
  page_size: number;
}>;

// 查询话术分组列表
export async function QueryScriptGroups(params?: QueryGroupsParams) {
  return request(`${StaffAdminApiPrefix}/quick-reply-groups`, {
    params,
  });
}

// 查询话术列表
export async function QueryScriptList(params?: QueryScriptListParams) {
  return request(`${StaffAdminApiPrefix}/quick-replies`, {
    params,
  });
}

// 退出登录
export async function StaffAdminLogout() {
  return request(`${StaffAdminApiPrefix}/action/logout`, {
    method: 'POST',
  });
}
