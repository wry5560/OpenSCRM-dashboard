import request from '@/utils/request';
import { StaffAdminApiPrefix } from '../../../../config/constant';

export type QueryMaterialListParams = Partial<{
  title: string;
  page: number;
  page_size: number;
  sort_field: string;
  sort_type: string;
  material_type: string;
  material_tag_list: string[];
}>;

export type QueryTagsParams = Partial<{
  name: string;
  page: number;
  page_size: number;
}>;

// 查询素材库列表
export async function QueryMaterialList(params?: QueryMaterialListParams) {
  return request(`${StaffAdminApiPrefix}/material/libs`, {
    params,
  });
}

// 查询素材库标签列表
export async function QueryMaterialTags(params?: QueryTagsParams) {
  return request(`${StaffAdminApiPrefix}/material/lib/tags`, {
    params,
  });
}

// 退出登录
export async function StaffAdminLogout() {
  return request(`${StaffAdminApiPrefix}/action/logout`, {
    method: 'POST',
  });
}
