import { defHttp } from '/@/utils/http/axios';
import {
  RoleListItem,
  RolePageParams,
  RolePageListGetResultModel,
  RoleDeptInput,
  RoleMenuInPut,
  roleInfo,
} from './model/roleModel';

enum Api {
  GetRolePageList = '/sysrole/pagerolelist',
  AddRole = '/sysrole/add',
  UpdateRole = '/sysrole/update',
  DleteRole = '/sysrole/delete/',
  setRoleStatus = '/sysRole/setStatus',
  ownDeptList = '/sysRole/ownDept',
  grantRoleData = '/sysrole/grantDept',
  ownMenuList = '/sysRole/ownmenu',
  grantRoleMenu = '/sysrole/grantmenu',
  getRoleList = '/sysrole/list',
}

export const GetRolePageList = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.GetRolePageList, params });
export const AddRole = (params: RoleListItem) =>
  defHttp.post<boolean>({ url: Api.AddRole, params });
export const UpdateRole = (params: RoleListItem) =>
  defHttp.put<boolean>({ url: Api.UpdateRole, params });
export const DleteRole = (params: string) =>
  defHttp.delete<boolean>({ url: Api.DleteRole, params });
export const setRoleStatus = (id: number, status: string | number) =>
  defHttp.post<boolean>({ url: Api.setRoleStatus, params: { id, status } });
//// 获取角色拥有机构列表(数据范围)
export const ownDeptList = (id: number) =>
  defHttp.get<number[]>({ url: Api.ownDeptList, params: { id } });
// 授权角色数据
export const grantRoleData = (params: RoleDeptInput) =>
  defHttp.post<boolean>({ url: Api.grantRoleData, params });

export const ownMenuList = (id: number) =>
  defHttp.get<any>({ url: Api.ownMenuList, params: { id } });
export const grantRoleMenu = (params: RoleMenuInPut) =>
  defHttp.post<boolean>({ url: Api.grantRoleMenu, params });

export const getRoleList = (params?: any) =>
  defHttp.get<roleInfo[]>({ url: Api.getRoleList, params });
