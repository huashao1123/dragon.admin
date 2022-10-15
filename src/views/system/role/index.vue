<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!--  :disabled="!hasPermission('sysRole:add')" -->
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
          ]"
          :dropDownActions="[
            {
              icon: 'ant-design:menu-outlined',
              label: '授权菜单',
              onClick: handleGrantMenu.bind(null, record),
            },
            {
              icon: 'ant-design:database-outlined',
              label: '授权数据',
              onClick: handleGrantData.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              label: '删除',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
    <GrantMenuDrawer @register="registerGrantMenuDrawer" />
    <GrantDataDrawer @register="registerGrantDataDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  // import { usePermission } from '/@/hooks/web/usePermission';

  import RoleDrawer from './RoleDrawer.vue';
  import GrantMenuDrawer from './GrantMenuDrawer.vue';
  import GrantDataDrawer from './GrantDataDrawer.vue';

  import { columns, searchFormSchema } from './role.data';
  import { GetRolePageList, DleteRole } from '/@/api/system/role';

  export default defineComponent({
    name: 'RoleManagement',
    components: {
      BasicTable,
      RoleDrawer,
      TableAction,
      GrantMenuDrawer,
      GrantDataDrawer,
    },
    setup() {
      // const { hasPermission } = usePermission();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerGrantMenuDrawer, { openDrawer: openGrantMenuDrawer }] = useDrawer();
      const [registerGrantDataDrawer, { openDrawer: openGrantDataDrawer }] = useDrawer();
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '角色列表',
        api: GetRolePageList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        rowKey: 'id',
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await DleteRole(record.id);
        reload();
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          updateTableDataRecord(values.id, values);
        } else {
          reload();
        }
      }

      function handleGrantMenu(record: Recordable) {
        openGrantMenuDrawer(true, { record });
      }

      function handleGrantData(record: Recordable) {
        openGrantDataDrawer(true, { record });
      }

      return {
        registerTable,
        registerDrawer,
        registerGrantMenuDrawer,
        registerGrantDataDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleGrantMenu,
        handleGrantData,
        // hasPermission,
      };
    },
  });
</script>
