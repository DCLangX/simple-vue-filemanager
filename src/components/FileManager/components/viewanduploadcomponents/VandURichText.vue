<template>
  <div class="h-100 rich-text">
    <div v-if="info.mode === 'view'" class="h-100 view">
      <div v-html="info.detail.content"></div>
      <div class="edit-btn" v-if="!disableEdit">
        <el-button type="primary" @click="handleEdit">编辑文档</el-button>
      </div>
    </div>
    <div v-else class="h-100 add-or-edit">
      <RichText v-model="html"></RichText>
      <div class="w-100 d-flex ai-center jc-between bottom-bar">
        <el-input
          v-model="name"
          placeholder="请输入文件名，不填则默认取文档内容前4位"
          class="file-name-input"
          :disabled="info.mode === 'edit'"
        ></el-input>
        <div>
          <span>是否共享：</span>
          <el-switch v-model="isShare" width="auto"> </el-switch>
        </div>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import RichText from '@/components/RichText.vue';

export default {
  name: 'VandURichText',
  components: { RichText },
  props: {
    info: Object,
    edit: Function,
    upload: Function,
    disableEdit: {
      // 禁用编辑和新增，隐藏新增编辑按钮
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { html: '', name: '', isShare: false };
  },
  watch: {
    info(newValue) {
      this.html = (newValue && newValue.detail && newValue.detail.content) || '';
      if (newValue.mode === 'edit') {
        this.isShare = (newValue && newValue.detail && newValue.detail.isShare) || false;
        this.name = newValue.detail.name;
      }
    },
  },
  computed: {},
  methods: {
    handleEdit() {
      this.edit && this.edit(this.info.detail);
    },
    handleSubmit() {
      let data;
      if (this.info.mode === 'edit') {
        data = { ...this.info.detail, file: this.html, isShare: this.isShare };
      } else {
        // 新建时下，获取文件名前四位并提交
        if (this.name !== '') {
          data = { file: this.html, name: this.name, isShare: this.isShare };
        } else {
          const oDiv = document.createElement('div');
          oDiv.innerHTML = this.html;
          data = {
            file: this.html,
            name: oDiv.textContent.slice(0, 4),
            isShare: this.isShare,
          };
        }
      }
      this.upload(data);
    },
  },
};
</script>

<style scoped lang="scss">
$BottomBarHeight: 100px;
.rich-text {
  .view {
    overflow: auto;
    position: relative;
    .edit-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      opacity: 0.2;
      &:hover {
        opacity: 1;
      }
    }
  }
  .add-or-edit {
    padding-bottom: $BottomBarHeight;
    position: relative;
    .bottom-bar {
      height: $BottomBarHeight;
      position: absolute;
      padding: 0 20px;
      bottom: 0;
      left: 0;
      .file-name-input {
        width: 50%;
      }
    }
  }
}
</style>
