<template>
  <basic-modal :="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </basic-modal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './apiModule.data';
  const { createMessage } = useMessage();
  import { AddApiList, UpdateApiList } from '/@/api/system/apiModule';

  export default defineComponent({
    name: 'ApiModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
      });
      let rowId;
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          rowId = data.record.id;
          setFieldsValue({ ...data.record });
        }
      });
      const getTitle = computed(() => (!unref(isUpdate) ? '新增API接口' : '编辑API接口'));
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          let msg = false;
          if (!unref(isUpdate)) {
            msg = await AddApiList(values);
          } else {
            values.id = rowId;
            msg = await UpdateApiList(values);
          }
          //console.log(msg);
          if (msg) {
            createMessage.success('操作成功');
          }
          closeModal();
          emit('success', {
            isUpdate: unref(isUpdate),
            values: { ...values, id: rowId },
          });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
