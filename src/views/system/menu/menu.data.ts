import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { getApiList } from '/@/api/system/apiModule';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'title',
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 80,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '类型',
    dataIndex: 'menuType',
    width: 80,
    customRender: ({ record }) => {
      const type = record.menuType;
      if (~~type === 1) return h(Tag, { color: 'gold' }, () => '目录');
      if (~~type === 2) return h(Tag, { color: 'purple' }, () => '菜单');
      if (~~type === 3) return h(Tag, { color: 'blue' }, () => '按钮');
    },
  },
  {
    title: '路由',
    dataIndex: 'path',
  },
  {
    title: '组件',
    dataIndex: 'component',
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    width: 150,
  },
  {
    title: 'API接口名称',
    dataIndex: 'apiName',
    width: 150,
  },
  {
    title: '是否隐藏',
    dataIndex: 'hideMenu',
    width: 80,
    customRender: ({ record }) => {
      const hideMenu: boolean = record.hideMenu;
      const color = hideMenu ? 'red' : 'green';
      const text = hideMenu ? '隐藏' : '显示';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
  {
    title: '排序',
    dataIndex: 'order',
    width: 50,
  },
];

const isDir = (menuType: number) => menuType === 1;
const isMenu = (menuType: number) => menuType === 2;
const isButton = (menuType: number) => menuType === 3;

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'menuType',
    label: '菜单类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '目录', value: 1 },
        { label: '菜单', value: 2 },
        { label: '按钮', value: 3 },
      ],
    },
    colProps: { span: 8 },
  },
  // {
  //   field: 'status',
  //   label: '状态',
  //   component: 'Select',
  //   componentProps: {
  //     options: [
  //       { label: '启用', value: 0 },
  //       { label: '停用', value: 1 },
  //     ],
  //   },
  //   colProps: { span: 8 },
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: 'menuType',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '目录', value: 1 },
        { label: '菜单', value: 2 },
        { label: '按钮', value: 3 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'title',
    label: '菜单标题',
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    colProps: { span: 8 },
    required: true,
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'pid',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'title',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
    ifShow: ({ values }) => !isDir(values.menuType),
  },
  {
    field: 'order',
    label: '排序',
    component: 'InputNumber',
    defaultValue: 0,
    required: true,
    componentProps: { style: { width: '100%' } },
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '停用', value: 1 },
      ],
    },
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    //required: ({ values }) => isDir(values.type),
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'redirect',
    label: '跳转地址',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isDir(values.menuType),
  },
  {
    field: 'frameSrc',
    label: '内嵌地址',
    component: 'Input',
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isButton(values.menuType),
  },
  {
    field: 'ignoreKeepAlive',
    label: '忽略缓存',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'hideMenu',
    label: '是否隐藏',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'mid',
    label: 'API接口名称',
    component: 'ApiSelect',
    componentProps: {
      api: getApiList,
      labelField: 'apiName',
      valueField: 'id',
      labelInValue: true,
    },
    required: true,
    ifShow: ({ values }) => !isDir(values.menuType),
  },
];
