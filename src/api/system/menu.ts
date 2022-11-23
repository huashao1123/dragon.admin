import { defHttp } from '/@/utils/http/axios';
import { MenuListGetResultModel, MenuParams, MenuForm } from './model/menuModel';

enum Api {
  GetMenuList = '/sysMenu/list',
  AddMenu = '/sysMenu/add',
  UpdateMenu = '/sysMenu/update',
  DeleteMenu = '/sysMenu/delete',
}

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.GetMenuList, params });

export const AddMenu = (params: MenuForm) => defHttp.post<boolean>({ url: Api.AddMenu, params });

export const UpdateMenu = (params: MenuForm) =>
  defHttp.put<boolean>({ url: Api.UpdateMenu, params });

export const DeleteMenu = (params: string) =>
  defHttp.delete<boolean>({ url: Api.DeleteMenu, params });
