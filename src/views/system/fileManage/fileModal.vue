<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :closeFunc="handleCloseFunc"
    width="800px"
    :destroyOnClose="true"
  >
    <BasicForm @register="registerForm">
      <template #fileSlots>
        <CustomUpload
          :maxNumber="maxNumber"
          :max-size="100"
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
  import { uploadApi } from '/@/api/system/upload';
  import { CustomUpload } from '/@/components/Upload';
  import { FileItem } from '/@/components/Upload/src/typing';
  import type { fileUploadParams } from './fileUpload';
  //import CryptoJS  from 'crypto-js';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();
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
      const maxNumber = ref(5);
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId = data.record.id;
          maxNumber.value = data.maxNumber;
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增文件' : '编辑文件'));
      const fileList = ref<FileItem[]>([]);
      //const closeState = ref(0); //取消列表
      const isUploadingRef = ref(false);
      // 点击关闭：则所有操作不保存，包括上传的
      async function handleCloseFunc() {
        if (!isUploadingRef.value) {
          //closeState.value++;
          return true;
        } else {
          createMessage.warning(t('component.upload.uploadWait'));
          return false;
        }
      }

      function HandleChang(files: FileItem[]) {
        fileList.value = [...(files || [])];
      }

      async function UploadFile(uploadParams: fileUploadParams, files: File[]) {
        const data = await uploadApi(
          { data: { ...uploadParams }, file: files },
          function onUploadProgress(progressEvent: ProgressEvent) {
            ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            //item.percent = complete;
          },
        );
        return data;
      }

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          const files: File[] =
            fileList.value.map((item) => {
              return item.file;
            }) || [];
          let uploadParams;
          if (!unref(isUpdate)) {
            values.id = 0;
            if (files.length == 0) {
              createMessage.info('请选择文件上传');
              return;
            }
          } else {
            values.id = rowId;
          }
          uploadParams = values;
          isUploadingRef.value = true;
          const result = await UploadFile(uploadParams, files);
          console.log(result);
          if (result) {
            isUploadingRef.value = false;
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
        maxNumber,
        handleSubmit,
        HandleChang,
        handleCloseFunc,
      };
    },
  });
</script>
