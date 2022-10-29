import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type RoleParams = {
  name?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export interface RoleListItem {
  id: string | number;
  name: string;
  code: string;
  status: number;
  order: string;
  createdTime: string;
}

export interface RoleDeptInput {
  id: string | number;
  dataScope: number;
  deptIdList: number[];
}

export interface RoleMenuInPut {
  id: string | number;
  menuIdList: number[];
}
export interface roleInfo {
  id: string | number;
  name: string;
  code: string;
}

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];
