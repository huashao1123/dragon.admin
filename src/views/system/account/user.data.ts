import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch, Tag } from 'ant-design-vue';
import { setUserStatus } from '/@/api/system/user';
import { useMessage } from '/@/hooks/web/useMessage';
import { getDeptList } from '/@/api/system/dept';
import { usePermission } from '/@/hooks/web/usePermission';

const { hasPermission } = usePermission();

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'name',
    width: 120,
    fixed: 'left',
  },
  {
    title: '工号',
    dataIndex: 'account',
    width: 100,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 100,
    slots: { customRender: 'avatar' },
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 50,
    customRender: ({ record }) => {
      const sex = record.sex;
      switch (sex) {
        case true:
          return h(Tag, { color: 'blue' }, () => '男');
        case false:
          return h(Tag, { color: 'red' }, () => '女');
        default:
          return h(Tag, { color: 'orange' }, () => '未知');
      }
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 100,
  },
  {
    title: '手机号码',
    dataIndex: 'mobile',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 0,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        disabled: !hasPermission('sysUser:setStatus'),
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 0 : 1;
          const { createMessage } = useMessage();
          setUserStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改账号状态`);
            })
            .catch(() => {
              createMessage.error('修改账号状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '用户名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'mobile',
    label: '手机号码',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '用户名',
    component: 'Input',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'account',
    label: '工号',
    component: 'Input',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'sex',
    label: '性别',
    component: 'RadioGroup',
    defaultValue: true,
    colProps: { span: 12 },
    componentProps: {
      options: [
        {
          label: '男',
          value: true,
        },
        {
          label: '女',
          value: false,
        },
      ],
    },
  },
  {
    field: 'mobile',
    label: '手机号码',
    component: 'Input',
    colProps: { span: 12 },
    required: true,
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'DepartmentId',
    label: '所属机构',
    component: 'ApiTreeSelect',
    defaultValue: 0,
    componentProps: {
      api: getDeptList,
      fieldNames: {
        label: 'name',
        key: 'id',
        value: 'id',
      },
    },
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'jobStatus',
    label: '岗位状态',
    component: 'Select',
    colProps: { span: 12 },
    componentProps: {
      options: [
        {
          label: '在职',
          value: 1,
          key: 1,
        },
        {
          label: '离职',
          value: 2,
          key: 2,
        },
        {
          label: '请假',
          value: 3,
          key: 3,
        },
      ],
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    colProps: { span: 24 },
  },
];
