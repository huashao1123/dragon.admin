import { defHttp } from '/@/utils/http/axios';
enum Api {
  // 服务器监控接口
  ServerBase = '/server/base',
  ServerUse = '/server/use',
  ServerNetWork = '/server/network',
}
////////// 服务器监控管理接口 //////////
// 获取服务器基本配置
export const serverBase = () => defHttp.get<any>({ url: Api.ServerBase });
// 获取服务器资源使用
export const serverUse = () => defHttp.get<any>({ url: Api.ServerUse });
// 获取服务器网络信息
export const serverNetWork = () => defHttp.get<any>({ url: Api.ServerNetWork });
