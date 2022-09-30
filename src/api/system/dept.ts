import { DeptListItem, DeptListResultMode, deptParams } from './model/deptModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetDeptList = '/dept/list',
  AddDept = '/dept/add',
  UpdateDept = '/dept/update',
  DleteDept = '/dept/delete/',
}

export const getDeptList = (params?: deptParams) =>
  defHttp.get<DeptListResultMode>({ url: Api.GetDeptList, params });
export const addDept = (params: DeptListItem) =>
  defHttp.post<boolean>({ url: Api.AddDept, params });
export const updateDept = (params: DeptListItem) =>
  defHttp.post<boolean>({ url: Api.UpdateDept, params });

export const deleteDept = (params: string) =>
  defHttp.delete<boolean>({ url: Api.DleteDept, params });
