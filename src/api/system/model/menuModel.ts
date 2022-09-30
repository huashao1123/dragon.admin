import { BasicFetchResult } from '/@/api/model/baseModel';

export type MenuParams = {
  title?: string;
  menuType?: number;
};

export interface MenuForm {
  id: string | number;
  menuType: number;
  name: string;
  title: string;
  pid: string | number;
  order: number;
  status: number;
  icon: string;
  path: string;
  commponent: string;
  redirect: string;
  frameSrc: string;
  permission: string;
  ignoreKeepAlive: boolean;
  hideMenu: boolean;
  mid: string | number;
}

export interface MenuListItem {
  id: string | number;
  menuType: number;
  name: string;
  title: string;
  order: number;
  status: number;
  icon: string;
  path: string;
  commponent: string;
  redirect: string;
  frameSrc: string;
  ignoreKeepAlive: boolean;
  hideMenu: boolean;
  permission: string;
  apiName: string;
  createdTime: string;
  mid: string | number;
  children?: MenuListItem;
}
export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;
