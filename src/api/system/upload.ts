import { defHttp } from '/@/utils/http/axios';
import { UploadFilesParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFilesParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFiles<any>(
    {
      url: uploadUrl + '/sysfile/upload',
      onUploadProgress,
    },
    params,
  );
}
