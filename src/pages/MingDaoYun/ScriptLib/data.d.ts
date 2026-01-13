export interface ScriptGroup {
  id: string;
  ext_corp_id: string;
  ext_creator_id: string;
  name: string;
  parent_id: string;
  departments: number[];
  is_top_group: number;
  sub_group?: ScriptGroup[];
  created_at: Date;
  updated_at: Date;
}

export interface Script {
  id: string;
  ext_creator_id: string;
  ext_corp_id: string;
  name: string;
  quick_reply_type: number;
  send_count: number;
  staff_ext_id: string;
  staff_name: string;
  scope: string;
  reply_details: ReplyDetail[];
  group_id: string;
  quick_reply_group: QuickReplyGroup;
  created_at: Date;
  updated_at: Date;
  avatar?: string;
}

export interface ReplyDetail {
  id: string;
  quick_reply_id: string;
  quick_reply_content: QuickReplyContent;
  content_type: number;
  send_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface QuickReplyContent {
  image?: { title: string; size: string; picurl: string };
  link?: { title: string; url: string; picurl: string; desc: string };
  video?: { title: string; size: string; picurl: string };
  pdf?: { title: string; size: string; fileurl: string };
  text?: { content: string };
}

export interface QuickReplyGroup {
  id: string;
  group_name: string;
  parent_id: string;
  departments: number[];
}

// 话术类型：1=复合消息, 2=文本, 3=图片, 4=链接, 5=PDF, 6=视频
export const ScriptTypeMap: Record<number, string> = {
  1: '复合消息',
  2: '文本',
  3: '图片',
  4: '链接',
  5: 'PDF',
  6: '视频',
};

export const ScriptTypeColorMap: Record<number, string> = {
  1: 'purple',
  2: 'default',
  3: 'green',
  4: 'blue',
  5: 'red',
  6: 'orange',
};
