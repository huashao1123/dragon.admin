import { BasicFetchResult } from '/@/api/model/baseModel';
export interface apiListItem {
  id: string | number;
  apiName: string;
  apiUrl: string;
  createTime: string;
  createName: string;
  remark: string;
  status: number;
}

export type ApiListGetResultModel = BasicFetchResult<apiListItem>;
