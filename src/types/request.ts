/** 获取列表数据 */
export interface getRequestType {
  /** 年份数组 空数组查所有 */
  year: string[];
  /** 分页参数 */
  limit?: string | number;
  offset?: string | number;
}

/** 添加数据 */
export interface addRequestType<T> {
  /** 数组内部包含year */
  data: T[];
}

/** 修改数据 */
export interface updateRequestType<T> {
  /** 需要修改的数据 */
  data: T;
  /** 年份 */
  year: string;
}

/** 删除数据 */
export interface deleteRequestType {
  /** 年份数组 */
  year: string[];
}

/** 返回消息类型 */
export interface messageType {
  message: string;
}
