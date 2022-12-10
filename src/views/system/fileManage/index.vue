<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" v-if="hasPermission('sysfile:add')"
          >新增文件</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              ifShow: hasPermission('sysfile:update'),
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:eye-outlined',
              label: '预览',
              ifShow: hasPermission('sysuser:preview'),
              onClick: handlePreview.bind(null, record),
            },
          ]"
          :dropDownActions="[
            {
              icon: 'ant-design:arrow-down-outlined',
              label: '下载',
              ifShow: hasPermission('sysfile:download'),
              onClick: handleDownload.bind(null, record),
            },
            {
              icon: 'ant-design:printer-filled',
              label: '打印',
              ifShow: hasPermission('sysfile:download'),
              onClick: handlePrint.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              label: '删除',
              ifShow: hasPermission('sysfile:delete'),
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <FileModal @register="registModal" @success="handleSuccess" />
    <PreviewModal @register="register1"
  /></div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getFileList, deleteFile } from '/@/api/system/file';
  import { columns, searchFormSchema } from './file.data';
  import FileModal from './fileModal.vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  import PreviewModal from './previewFileModal.vue';
  import { downLoadFile } from '/@/api/system/file';
  //import { printByData } from '/@/utils/file/print';
  import { downloadByData } from '/@/utils/file/download';
  import printJS from 'print-js';
  const { createMessage } = useMessage();
  export default defineComponent({
    name: 'FileManagement',
    components: { BasicTable, TableAction, FileModal, PreviewModal },
    setup() {
      const [registModal, { openModal }] = useModal();
      const [register1, { openModal: openModal1 }] = useModal();
      const { hasPermission } = usePermission();
      const [registerTable, { reload }] = useTable({
        title: '文件列表',
        api: getFileList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        rowKey: 'id',
        pagination: true,
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
        openModal(true, {
          record,
          isUpdate: true,
          maxnumber: 1,
        });
      }
      async function handlePreview(record: Recordable) {
        const id = record.id;
        if (record.suffix.indexOf('pdf') < 0) {
          createMessage.error('目前只支持pdf文件预览,可以先下载再预览');
          return;
        }
        const file = await downLoadFile(id);
        const blob = new Blob([file], { type: 'application/pdf' });
        record.url = window.URL.createObjectURL(blob);
        openModal1(true, {
          record,
        });
      }
      async function handleDelete(record: Recordable) {
        //console.log(record);
        const id = record.id;
        console.log(id);
        const msg = await deleteFile(id);
        if (msg) {
          createMessage.success('删除成功');
          reload();
        }
      }

      async function handleDownload(record: Recordable) {
        const id = record.id;
        const file = await downLoadFile(id);
        const fileName = record.fileName;
        downloadByData(file, fileName);
      }

      async function handlePrint(record: Recordable) {
        if (record.suffix.indexOf('pdf') < 0) {
          createMessage.error('目前只支持pdf文件打印,可以先下载再打印');
          return;
        }
        const id = record.id;
        const file = await downLoadFile(id);
        const blob = new Blob([file], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        printJS({ printable: url, type: 'pdf' });
      }

      function handleSuccess() {
        // if (isUpdate) {
        //   updateTableDataRecord(values.id, values);
        // } else {
        //   reload();
        // }
        reload();
      }
      return {
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        registModal,
        hasPermission,
        handlePreview,
        register1,
        handleDownload,
        handlePrint,
      };
    },
  });
</script>
