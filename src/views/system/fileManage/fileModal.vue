<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :closeFunc="handleCloseFunc"
    width="800px"
  >
    <BasicForm @register="registerForm">
      <template #fileSlots>
        <CustomUpload
          :maxNumber="20"
          :max-size="2024"
          :close-state="closeState"
          :accept="['zip', 'doc', 'docx', 'pdf', 'txt', 'xls', 'xlsx', 'image/*']"
          @change="HandleChang"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './file.data';
  import { addFile, updateFile } from '/@/api/system/file';
  import { CustomUpload } from '/@/components/Upload';
  import { FileItem } from '/@/components/Upload/src/typing';
  import { t } from '/@/hooks/web/useI18n';

  const { createMessage } = useMessage();
  export default defineComponent({
    name: 'FileModal',
    components: { BasicModal, BasicForm, CustomUpload },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      let rowId: string | number;
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
      });
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }
      });
      const getTitle = computed(() => (!unref(isUpdate) ? '新增文件' : '编辑文件'));
      const fileList = ref<FileItem[]>([]);
      const closeState = ref(0); //取消列表
      const isUploadingRef = ref(false);
      // 点击关闭：则所有操作不保存，包括上传的
      async function handleCloseFunc() {
        if (!isUploadingRef.value) {
          closeState.value++;
          return true;
        } else {
          createMessage.warning(t('component.upload.uploadWait'));
          return false;
        }
      }

      function HandleChang(files: FileItem[]) {
        fileList.value = [...(files || [])];
      }

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          let msg = false;
          // if (!unref(isUpdate)) {
          //   msg = await addFile(values);
          // } else {
          //   values.id = rowId;
          //   msg = await updateFile(values);
          // }
          console.log(fileList.value);
          if (msg) {
            createMessage.success('操作成功');
            closeModal();
            emit('success', {
              isUpdate: unref(isUpdate),
              values: { ...values, id: rowId },
            });
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerModal,
        registerForm,
        getTitle,
        handleSubmit,
        HandleChang,
        handleCloseFunc,
        closeState,
      };
    },
  });
</script>
