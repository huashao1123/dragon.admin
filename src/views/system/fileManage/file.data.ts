import { BasicColumn, TableImg } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();
export const columns: BasicColumn[] = [
  {
    title: '作者',
    dataIndex: 'provider',
    width: 100,
    align: 'left',
  },
  {
    title: '文件名称',
    dataIndex: 'fileName',
    width: 200,
  },
  {
    title: '文件后缀',
    dataIndex: 'suffix',
    width: 80,
    customRender: ({ record }) => {
      return h(Tag, { color: 'blue' }, () => record.suffix);
    },
  },
  {
    title: '预览',
    width: 120,
    customRender: ({ record }) => {
      if (
        record.suffix.indexOf('png') > 0 ||
        record.suffix.indexOf('jpg') > 0 ||
        record.suffix.indexOf('bmp') > 0
      ) {
        const filePath = record.url
          ? record.url
          : uploadUrl + '/' + record.filePath + '/' + record.id + record.suffix;
        return h(TableImg, {
          size: 60,
          simpleShow: true,
          imgList: [filePath],
        });
      } else return h(Tag, { color: 'orange' }, () => '无法预览');
    },
  },
  {
    title: '大小KB',
    dataIndex: 'sizeKb',
    width: 100,
  },
  {
    title: '存储标识',
    dataIndex: 'uid',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'fileName',
    label: '文件名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'fileVersion',
    label: '文件版本',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'file',
    label: '文件',
    component: 'Upload',
    slot: 'fileSlots',
    required: true,
  },
];
