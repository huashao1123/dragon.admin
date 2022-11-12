import { defHttp } from '/@/utils/http/axios';
enum Api {
  GetFileList = '/sysfile/page',
  addFile = '/sysfile/add',
  updateFile = '/sysfile/update',
  deleteFile = '/sysfile/delete',
}

export const getFileList = (params?: any) => defHttp.get<any>({ url: Api.GetFileList, params });

export const addFile = (params?: any) => defHttp.post<any>({ url: Api.addFile, params });

export const updateFile = (params?: any) => defHttp.put<any>({ url: Api.updateFile, params });

export const deleteFile = (params?: any) => defHttp.put<any>({ url: Api.deleteFile, params });
