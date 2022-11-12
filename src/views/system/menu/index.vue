<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <!-- ///:disabled="!hasPermission('sysMenu:add')" -->
        <a-button type="primary" @click="handleCreate" v-if="hasPermission('sysmenu:add')">
          新增菜单
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              label: '编辑',
              ifShow: hasPermission('sysmenu:update'),
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              label: '删除',
              color: 'error',
              ifShow: hasPermission('sysmenu:delete'),
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './menuDrawer.vue';
  import { columns, searchFormSchema } from './menu.data';
  import { getMenuList, DeleteMenu } from '/@/api/system/menu';
  import { usePermission } from '/@/hooks/web/usePermission';
  export default defineComponent({
    name: 'MenuManage',
    components: { BasicTable, MenuDrawer, TableAction },
    setup() {
      const { hasPermission } = usePermission();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '菜单列表',
        api: getMenuList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        rowKey: 'id',
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 150,
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
        console.log(record);
        await DeleteMenu(record.id);
        reload();
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          const result = updateTableDataRecord(values.id, values);
          console.log(result);
        } else {
          reload();
        }
      }

      function onFetchSuccess() {
        // // 默认展开所有表项
        //nextTick(expandAll);
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
        hasPermission,
      };
    },
  });
</script>
