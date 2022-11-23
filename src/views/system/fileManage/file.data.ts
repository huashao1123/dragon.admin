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
    dataIndex: 'fileSizeInBytes',
    width: 100,
    customRender: ({ text = 0 }) => {
      return text && (text / 1024).toFixed(2) + 'KB';
    },
  },
  {
    title: '文件版本',
    dataIndex: 'fileVersion',
    width: 200,
  },
  {
    title: '文件等级',
    dataIndex: 'fileLevel',
    width: 200,
    customRender: ({ record }) => {
      const dataScope = record.fileLevel;
      switch (dataScope) {
        case 1:
          return h(Tag, { color: 'orange' }, () => '公开文件');
        case 2:
          return h(Tag, { color: 'orange' }, () => '受控文件');
        case 3:
          return h(Tag, { color: 'orange' }, () => '商业机密');
        case 4:
          return h(Tag, { color: 'orange' }, () => '商业绝密');
      }
      return dataScope;
    },
  },
  {
    title: '作者',
    dataIndex: 'updateName',
    width: 100,
    align: 'left',
  },
  {
    title: '时间',
    dataIndex: 'updateTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '所属部门',
    field: 'fileOwnDept',
    component: 'Input',
    colProps: { span: 8 },
  },
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
    label: '数据范围',
    field: 'fileLevel',
    component: 'Select',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '公开文件', value: 1 },
        { label: '受控文件', value: 2 },
        { label: '商业机密', value: 3 },
        { label: '商业绝密', value: 4 },
      ],
    },
    colProps: { span: 16 },
    required: true,
  },
  {
    field: 'upfile',
    label: '上传文件',
    component: 'Input',
    slot: 'fileSlots',
    colProps: { span: 24 },
  },
];
