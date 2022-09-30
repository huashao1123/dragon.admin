<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="40%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { formSchema } from './menu.data';
  import { getMenuList, AddMenu, UpdateMenu } from '/@/api/system/menu';
  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      let rowId: string | number;
      let createdName: string;
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        const treeData = await getMenuList();
        updateSchema({ field: 'pid', componentProps: { treeData } });
        if (unref(isUpdate)) {
          rowId = data.record.id;
          createdName = data.record.createdName;
          setFieldsValue({
            ...data.record,
          });
        }
      });
      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));
      async function handleSubmit() {
        try {
          const values = await validate();
          let module = values.mid;
          if (module) {
            values.mid = module.value;
            values.apiName = module.label;
          } else {
            values.apiName = '';
          }

          setDrawerProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            values.createdName = createdName;
            values.id = rowId;
            await UpdateMenu(values);
          } else {
            await AddMenu(values);
          }

          closeDrawer();
          emit('success', {
            isUpdate: unref(isUpdate),
            values: { ...values, id: rowId },
          });
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }
      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
