<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="授权用户数据"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #dept="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'name', key: 'id' }"
          v-model:checkedKeys="ownOrgData"
          checkable
          toolbar
          search
          title="部门列表"
          ref="treeAction"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, nextTick } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem, TreeActionType } from '/@/components/Tree';

  import { userOwnDeptIdList, grantUserData } from '/@/api/system/user';
  import { getDeptList } from '/@/api/system/dept';

  export default defineComponent({
    name: 'GranOrgDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);
      let rowId: number;
      let deptId: number;
      const ownOrgData = ref<number[]>([]);
      const treeAction = ref<Nullable<TreeActionType>>(null);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: [
          {
            label: ' ',
            field: 'DeptIdList',
            slot: 'dept',
            component: 'Input',
          },
        ],
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          treeData.value = (await getDeptList()) as any as TreeItem[];
          nextTick(() => {
            unref(treeAction)?.filterByLevel(1);
          });
        }
        rowId = data.record.id;
        deptId = data.record.departmentId;
        setFieldsValue({
          ...data.record,
        });

        ownOrgData.value = await userOwnDeptIdList(rowId);
        unref(treeAction)?.filterByLevel(1);
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });

          values.id = rowId;
          values.deptId = deptId;
          await grantUserData(values);

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        handleSubmit,
        treeData,
        ownOrgData,
        treeAction,
      };
    },
  });
</script>
