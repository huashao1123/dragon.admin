<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" v-if="hasPermission('sysapi:add')"
          >新增API接口</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              ifShow: hasPermission('sysapi:update'),
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              ifShow: hasPermission('sysapi:delete'),
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <api-modal @register="registModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './apiModule.data';
  import ApiModal from './apiModal.vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  import { getApiList, DeleteApi } from '/@/api/system/apiModule';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'ApiModule',
    components: { BasicTable, TableAction, ApiModal },
    setup() {
      const { hasPermission } = usePermission();
      const [registModal, { openModal }] = useModal();
      const [registerTable, { reload, updateTableDataRecord, deleteTableDataRecord }] = useTable({
        title: 'api接口列表', //页面
        api: getApiList,
        columns, //列表
        formConfig: { labelWidth: 120, schemas: searchFormSchema }, //表单配置
        pagination: false,
        striped: false, //斑马纹
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        rowKey: 'id',
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
        console.log(id);
        const msg = await DeleteApi(id);
        if (msg) {
          deleteTableDataRecord(id);
          createMessage.success('删除成功');
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
