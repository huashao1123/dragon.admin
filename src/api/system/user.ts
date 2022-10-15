import { defHttp } from '/@/utils/http/axios';
enum Api {
  setUserStatus = '/sysuser/setStatus',
}

export const setUserStatus = (id: number, status: string | number) =>
  defHttp.post<boolean>({ url: Api.setUserStatus, params: { id, status } });
