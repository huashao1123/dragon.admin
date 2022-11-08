import { withInstall } from '/@/utils';
import basicUpload from './src/BasicUpload.vue';
import customUpload from './src/CustomUpload.vue';

export const BasicUpload = withInstall(basicUpload);

export const CustomUpload = withInstall(customUpload);
