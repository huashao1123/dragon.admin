import { apiListItem, ApiListGetResultModel } from './model/apiModel';
import { defHttp } from '/@/utils/http/axios';

enum api {
  apiList = '/getapilist',
  addApi = '/addapimodule',
  updateApi = '/updateApiModule',
  deleteApi = '/deleteApiModule',
}

export const getApiList = (params?: apiListItem) =>
  defHttp.get<ApiListGetResultModel>({ url: api.apiList, params });
export const AddApiList = (params: apiListItem) =>
  defHttp.post<boolean>({ url: api.addApi, params });
export const UpdateApiList = (params: apiListItem) =>
  defHttp.put<boolean>({ url: api.updateApi, params });
export const DeleteApi = (data: any) =>
  defHttp.delete<boolean>({ url: api.deleteApi + '?id=' + data });
