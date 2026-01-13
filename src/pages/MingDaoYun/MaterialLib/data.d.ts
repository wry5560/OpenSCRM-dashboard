export interface MaterialTag {
  id: string;
  ext_corp_id: string;
  ext_creator_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Material {
  id: string;
  ext_corp_id: string;
  ext_creator_id: string;
  material_type: string;
  title: string;
  content: string;
  digest: string;
  file_size: string;
  media_id: string;
  publish_status: string;
  show_cover: number;
  thumb_media_id: string;
  thumb_url: string;
  url: string;
  link: string;
  material_tag_list?: string[];
  created_at: Date;
  updated_at: Date;
}

export type MaterialType = 'link' | 'poster' | 'video' | 'pdf' | 'ppt' | 'word' | 'excel';

export const MaterialTypeOptions = [
  { label: '全部', value: '' },
  { label: '链接', value: 'link' },
  { label: '海报', value: 'poster' },
  { label: '视频', value: 'video' },
  { label: 'PDF', value: 'pdf' },
  { label: 'PPT', value: 'ppt' },
  { label: 'Word', value: 'word' },
  { label: 'Excel', value: 'excel' },
];
