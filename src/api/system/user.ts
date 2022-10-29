import { defHttp } from '/@/utils/http/axios';
enum Api {
  setUserStatus = '/sysuser/setStatus',
  GetUserPageList = '/sysuser/pagelist',
  AddUser = '/sysuser/add',
  UpdateUser = '/sysuser/update',
  DeleteUser = '/sysuser/delete/',
  grantUserRole = '/sysuser/grantrole',
  grantUserData = '/sysuser/grantdept',
  ownRoleList = '/sysuser/ownrolelist',
  userOwnDeptIdList = '/sysuser/owndeptidlist',
}

import {
  userPageParams,
  UserPageListResultModel,
  userListItem,
  userRoleInput,
  userDeptInput,
} from './model/userModel';

export const setUserStatus = (id: number, status: string | number) =>
  defHttp.post<boolean>({ url: Api.setUserStatus, params: { id, status } });

export const GetUserPageList = (params?: userPageParams) =>
  defHttp.get<UserPageListResultModel>({ url: Api.GetUserPageList, params });

export const AddUser = (params: userListItem) =>
  defHttp.post<boolean>({ url: Api.AddUser, params });

export const UpdateUser = (params: userListItem) =>
  defHttp.put<boolean>({ url: Api.UpdateUser, params });

export const DeleteUser = (params: string | number) =>
  defHttp.delete<string>({ url: Api.DeleteUser, params });

export const grantUserRole = (params: userRoleInput) =>
  defHttp.post<boolean>({ url: Api.grantUserRole, params });

export const grantUserData = (params: userDeptInput) =>
  defHttp.post<boolean>({ url: Api.grantUserData, params });

export const ownrolelist = (userId: string | number) =>
  defHttp.get<number[]>({ url: Api.ownRoleList, params: { userId } });

export const userOwnDeptIdList = (userId: string | number) =>
  defHttp.get<number[]>({ url: Api.userOwnDeptIdList, params: { userId } });
