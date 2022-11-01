import { BasicPageParams, BasicFetchResult } from '../../model/baseModel';
export type UserParams = {
  name?: string;
  moblie?: string;
  departmentId: number;
};

export type userPageParams = BasicPageParams & UserParams;
export interface userListItem {
  id: string | number;
  name: string;
  account: string;
  avatar: string;
  sex: boolean;
  email: string;
  mobile: string;
  status: number;
  remark: string;
  createdTime: string;
  departmentId: number;
  jobStatus: number;
}

export interface userRoleInput {
  id: string | number;
  deptId: string | number;
  roleIdList: number[];
}

export interface userDeptInput {
  id: string | number;
  deptId: string | number;
  deptIdList: string | number;
}

export interface GrantUserRoleItem {
  id: string | number;
  deptId: string | number;
  roleIdList: number[];
}

export type UserPageListResultModel = BasicFetchResult<userListItem>;
export type UserListResultModel = userListItem[];
