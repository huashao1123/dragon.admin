import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
export const columns: BasicColumn[] = [
  {
    title: '接口名称',
    dataIndex: 'apiName',
    width: 150,
    align: 'left',
  },
  {
    title: '接口地址',
    dataIndex: 'apiUrl',
    width: 250,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
  {
    title: '创建者',
    dataIndex: 'createdName',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'apiName',
    label: '接口名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '停用', value: 1 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'apiName',
    label: '接口名称',
    component: 'Input',
    required: true,
    rules: [{ min: 2, max: 20, message: '长度必须大于2小于20' }],
    colProps: { span: 30 },
  },
  {
    field: 'apiUrl',
    label: '接口地址',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入接口地址',
    },
    colProps: { span: 30 },
  },
  {
    field: 'order',
    label: '排序',
    component: 'InputNumber',
    defaultValue: 0,
    required: true,
    colProps: { span: 30 },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    colProps: { span: 30 },
  },
];
