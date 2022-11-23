import { BasicPageParams } from '../../model/baseModel';
export type FileParams = {
  fileOwnDept?: string;
  fileName?: string;
};

export type userPageParams = BasicPageParams & FileParams;
