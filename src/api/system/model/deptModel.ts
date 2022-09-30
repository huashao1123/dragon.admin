import { BasicFetchResult } from '../../model/baseModel';
export interface DeptListItem {
  id: string | number;
  name: string;
  code: string;
  remark: string;
  status: number;
  parentId: string | number;
}

export interface deptParams {
  name: string;
  statis: number;
}

export type DeptListResultMode = BasicFetchResult<DeptListItem>;
