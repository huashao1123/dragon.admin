<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" v-if="hasPermission('sysdept:add')"
          >新增部门</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              ifShow: hasPermission('sysdept:update'),
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              ifShow: hasPermission('sysdept:delete'),
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <OrgModal @register="registModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getDeptList, deleteDept } from '/@/api/system/dept';
  import { columns, searchFormSchema } from './dept.data';
  import OrgModal from './deptModal.vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  const { createMessage } = useMessage();
  export default defineComponent({
    name: 'OrgManagement',
    components: { BasicTable, TableAction, OrgModal },
    setup() {
      const [registModal, { openModal }] = useModal();
      const { hasPermission } = usePermission();
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '部门列表',
        api: getDeptList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        rowKey: 'id',
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });
      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }
      function handleEdit(record: Recordable) {
        console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }
      async function handleDelete(record: Recordable) {
        //console.log(record);
        const id = record.id;
        //console.log(id);
        const msg = await deleteDept(id);
        if (msg) {
          createMessage.success('删除成功');
          reload();
        }
      }
      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          updateTableDataRecord(values.id, values);
        } else {
          reload();
        }
      }
      return {
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        registModal,
        hasPermission,
      };
    },
  });
</script>
