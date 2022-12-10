<template>
  <div class="pdf-preview">
    <div class="page-tool">
      <div class="page-tool-item" @click="lastPage">上一页</div>
      <div class="page-tool-item" @click="nextPage">下一页</div>
      <div class="page-tool-item">{{ state.pageNum }}/{{ state.numPages }}</div>
      <div class="page-tool-item" @click="pageZoomOut">放大</div>
      <div class="page-tool-item" @click="pageZoomIn">缩小</div>
      <div class="page-tool-item" @click="downLoadFile">下载</div>
      <div class="page-tool-item" @click="PrintFile">打印</div>
    </div>
    <div class="pdf-wrap">
      <vue-pdf-embed
        :source="state.source"
        :style="scaleFun"
        class="vue-pdf-embed"
        :page="state.pageNum"
        ref="pdf"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { reactive, onMounted, computed, ref } from 'vue';
  import VuePdfEmbed from 'vue-pdf-embed';
  import { createLoadingTask } from 'vue3-pdfjs/esm'; // 获得总页数
  import { downloadByUrl } from '/@/utils/file/download';

  const props = defineProps({
    pdfUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  });
  const pdf = ref(null);

  const state = reactive({
    source: {
      url: props.pdfUrl,
      cMapPacked: true,
      cMapUrl: 'cmaps/',
    }, //预览pdf文件地址
    pageNum: 1, // 当前页面
    scale: 1, // 缩放比例
    numPages: 0, // 总页数
  });
  console.log(state.source);
  onMounted(() => {
    const loadingTask = createLoadingTask(state.source);
    loadingTask.promise.then((pdf: { numPages: number }) => {
      state.numPages = pdf.numPages;
    });
  });
  const scaleFun = computed(() => `transform:scale(${state.scale})`);
  function lastPage() {
    if (state.pageNum > 1) {
      state.pageNum -= 1;
    }
  }
  function nextPage() {
    if (state.pageNum < state.numPages) {
      state.pageNum += 1;
    }
  }
  function pageZoomOut() {
    if (state.scale < 2) {
      state.scale += 0.1;
    }
  }
  function pageZoomIn() {
    if (state.scale > 1) {
      state.scale -= 0.1;
    }
  }

  function downLoadFile() {
    downloadByUrl({ url: props.pdfUrl, fileName: props.fileName });
  }

  function PrintFile() {
    pdf.value.print(300, '', true);
  }
</script>
<style lang="css" scoped>
  .pdf-preview {
    position: relative;
    height: 100vh;
    padding: 20px 0;
    margin: 0 auto;
    box-sizing: border-box;
    background-color: #e9e9e9;
  }

  .pdf-wrap {
    display: flex;
    margin-top: 50px;
    overflow-y: auto;
  }

  .vue-pdf-embed {
    text-align: center;
    top: 80px;
    width: 515px;
    /* height: 720px; */
    border: 1px solid #110101;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .page-tool {
    position: absolute;
    top: 10px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    align-items: center;
    background: rgb(66, 66, 66);
    color: white;
    border-radius: 19px;
    z-index: 100;
    cursor: pointer;
    margin-left: 50%;
    transform: translateX(-50%);
  }

  .page-tool-item {
    padding: 5px 15px;
    padding-left: 10px;
    cursor: pointer;
  }
</style>
