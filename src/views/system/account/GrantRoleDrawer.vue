<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="授权用户角色"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { grantUserRole, ownrolelist } from '/@/api/system/user';
  import { getRoleList } from '/@/api/system/role';
  import { GrantUserRoleItem } from '/@/api/system/model/userModel';
  export default defineComponent({
    name: 'GrantRoleDrawer',
    components: { BasicDrawer, BasicTable },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      let rowId: number;
      let deptId: number;
      const [registerTable, { getSelectRowKeys, setSelectedRowKeys }] = useTable({
        title: '',
        api: getRoleList,
        columns: [
          {
            title: '角色名称',
            dataIndex: 'name',
            width: 150,
          },
          {
            title: '编码',
            dataIndex: 'code',
            width: 120,
          },
        ],
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        canResize: true,
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
        },
        pagination: {
          pageSize: 50,
        },
      });
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });

        rowId = data.record.id;
        deptId = data.record.departmentId;
        setSelectedRowKeys(await ownrolelist(rowId));
      });
      async function handleSubmit() {
        try {
          setDrawerProps({ confirmLoading: true });

          let userRole: GrantUserRoleItem = {
            id: rowId,
            deptId: deptId,
            roleIdList: getSelectRowKeys() as unknown as number[],
          };
          await grantUserRole(userRole);

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerTable,
        handleSubmit,
      };
    },
  });
</script>
