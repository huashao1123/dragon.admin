<template>
  <div class="upload-modal-toolbar">
    <Alert :message="getHelpText" type="info" banner class="upload-modal-toolbar__text" />

    <Upload
      :accept="getStringAccept"
      :multiple="multiple"
      :before-upload="beforeUpload"
      :show-upload-list="false"
      class="upload-modal-toolbar__btn"
    >
      <a-button type="primary">
        {{ t('component.upload.choose') }}
      </a-button>
    </Upload>
  </div>
  <FileList :dataSource="fileListRef" :columns="columns" :actionColumn="actionColumn" />
</template>
<script lang="ts">
  import { defineComponent, ref, toRefs, unref } from 'vue';
  import { Upload, Alert } from 'ant-design-vue';
  //import { BasicModal, useModalInner } from '/@/components/Modal';
  //   import { BasicTable, useTable } from '/@/components/Table';
  // hooks
  import { useUploadType } from './useUpload';
  import { useMessage } from '/@/hooks/web/useMessage';
  //   types
  import { FileItem } from './typing';
  import { basicProps } from './props';
  import { createTableColumns, createActionColumn } from './customData';
  // utils
  //import { checkImgType, getBase64WithFile } from './helper';
  import { buildUUID } from '/@/utils/uuid';
  //import { isFunction } from '/@/utils/is';
  //import { warn } from '/@/utils/log';
  import FileList from './FileList.vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'CustomUpload',
    components: { Upload, Alert, FileList },
    props: {
      ...basicProps,
      // closeState: {
      //   type: Number as PropType<number>,
      // },
    },
    emits: ['delete', 'change'],
    setup(props, { emit }) {
      const fileListRef = ref<FileItem[]>([]);
      // watch(
      //   () => props.closeState,
      //   (value = 0, oldValue = 0) => {
      //     if (value > oldValue) {
      //       fileListRef.value = [];
      //     }
      //   },
      // ); //无需监听了，弹窗的destroyOnClose设置为true，自动销毁子组件

      const { accept, helpText, maxNumber, maxSize } = toRefs(props);

      const { t } = useI18n();

      const { getStringAccept, getHelpText } = useUploadType({
        acceptRef: accept,
        helpTextRef: helpText,
        maxNumberRef: maxNumber,
        maxSizeRef: maxSize,
      });

      const { createMessage } = useMessage();

      // 上传前校验
      function beforeUpload(file: File) {
        const { size, name } = file;
        const { maxSize } = props;
        // 设置最大值，则判断
        if (maxSize && file.size / 1024 / 1024 >= maxSize) {
          createMessage.error(t('component.upload.maxSizeMultiple', [maxSize]));
          return false;
        }

        const commonItem = {
          uuid: buildUUID(),
          file,
          size,
          name,
          percent: 0,
          type: name.split('.').pop(),
        };
        // 生成图片缩略图
        // if (checkImgType(file)) {
        //   // beforeUpload，如果异步会调用自带上传方法
        //   // file.thumbUrl = await getBase64(file);
        //   getBase64WithFile(file).then(({ result: thumbUrl }) => {
        //     fileListRef.value = [
        //       ...unref(fileListRef),
        //       {
        //         thumbUrl,
        //         ...commonItem,
        //       },
        //     ];
        //   });
        // } else {
        //   fileListRef.value = [...unref(fileListRef), commonItem];
        // }
        fileListRef.value = [...unref(fileListRef), commonItem];
        emit('change', fileListRef.value);
        return false;
      }

      // 删除
      function handleRemove(record: FileItem) {
        const index = fileListRef.value.findIndex((item) => item.uuid === record.uuid);
        index !== -1 && fileListRef.value.splice(index, 1);
        emit('delete', record);
        emit('change', fileListRef.value);
      }

      function handlePreview(record: FileItem) {
        console.log(record.name);
      }

      return {
        columns: createTableColumns() as any[],
        actionColumn: createActionColumn(handleRemove, handlePreview) as any,
        getHelpText,
        getStringAccept,
        beforeUpload,
        fileListRef,
        t,
      };
    },
  });
</script>
<style lang="less">
  .upload-modal {
    .ant-upload-list {
      display: none;
    }

    .ant-table-wrapper .ant-spin-nested-loading {
      padding: 0;
    }

    &-toolbar {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      &__btn {
        margin-left: 8px;
        text-align: right;
        flex: 1;
      }
    }
  }
</style>
