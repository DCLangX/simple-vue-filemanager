<template>
  <div class="h-100 doc">
    <div v-if="info.mode === 'view'" class="h-100 view">
      <embed
        :src="info.detail.file"
        :key="info.detail.file"
        type="application/pdf"
        width="100%"
        height="100%"
        oncontextmenu="return false"
      />
    </div>
    <div v-else class="h-100 upload">
      <el-upload
        class="h-100 upload-area"
        drag
        action=""
        :http-request="handleUpload"
        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
      >
        <div class="upload-container">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </div>
        <div class="el-upload__tip" slot="tip">
          只能上传pdf/word/ppt/excel文档
          <div>
            <div class="is-share-text">是否共享：</div>
            <el-switch v-model="isShare" width="auto"> </el-switch>
          </div>
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VandUDoc',
  components: {},
  props: {
    info: Object,
    upload: Function,
  },
  data() {
    return {
      isShare: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleEdit() {},
    handleUpload(file) {
      // console.log(file);
      const data = {
        file: file.file,
        name: file.file.name,
        isShare: this.isShare,
      };
      // console.log(data, "结果");
      this.upload(data, file.onProgress).then(() => {
        file.onSuccess(); // 上传成功(打钩的小图标)
      });
    },
  },
};
</script>

<style scoped lang="scss">
$BottomBarHeight: 100px;
.doc {
  position: relative;
  .upload {
    padding: 100px 100px 0;
    ::v-deep .el-upload {
      width: 100%;
      height: 50%;
      .el-upload-dragger {
        width: 100%;
        height: 100%;
        .upload-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .is-share-text {
      margin: 50px 0 10px;
    }
  }
}
</style>
