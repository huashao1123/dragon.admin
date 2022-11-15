import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '所属部门',
    dataIndex: 'fileOwnDept',
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
    title: '大小KB',
    dataIndex: 'sizeKb',
    width: 100,
  },
  {
    title: '作者',
    dataIndex: 'provider',
    width: 100,
    align: 'left',
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
    field: 'upfile',
    label: '上传文件',
    component: 'Input',
    slot: 'fileSlots',
    colProps: { span: 24 },
  },
];
