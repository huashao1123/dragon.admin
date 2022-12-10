<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    :showCancelBtn="false"
    :showOkBtn="false"
    :defaultFullscreen="true"
    :destroyOnClose="true"
    @cancel="CloseModal"
  >
    <PdfPreview :pdfUrl="fileUrl" :file-name="fileName" v-if="ifShow" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  //import { uploadApi } from '/@/api/system/upload';
  import { PdfPreview } from '/@/components/PdfPreview';
  export default defineComponent({
    name: 'PreviewFileModal',
    components: { BasicModal, PdfPreview },
    emits: ['success', 'register'],
    setup() {
      //let id: string | number;
      const fileUrl = ref('');
      const fileName = ref('');
      //let blob: Blob;
      const ifShow = ref(false);
      const [registerModal, { setModalProps }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        //id = data.record.id;
        if (data.record.suffix.indexOf('pdf') > 0) {
          fileUrl.value = data.record.url;
          fileName.value = data.record.fileName;
          ifShow.value = true;
        } else {
          ifShow.value = false;
        }
        //let fileName = data.record.fileName;
        //window.open(url.value);
        // const link = document.createElement('a'); //创建一个a标签
        // link.style.display = 'none';
        // link.href = url.value;
        // // 获取文件名
        // // download 属性定义了下载链接的地址而不是跳转路径
        // link.setAttribute('download', fileName);
        // document.body.appendChild(link);
        // link.click();
      });
      const getTitle = ref('预览文件');

      function CloseModal() {
        ifShow.value = false;
      }
      return {
        registerModal,
        getTitle,
        fileUrl,
        ifShow,
        fileName,
        CloseModal,
      };
    },
  });
</script>
