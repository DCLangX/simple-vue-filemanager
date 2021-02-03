<template>
  <div class="h-100 d-flex flex-column preview">
    <div class="fs-21 file-name" v-if="info.mode === 'view'">
      {{ info.detail.name }}
      <!-- <el-button class="share-btn" icon="el-icon-share" @click="onShare" v-if="!disableEdit">{{
        info.detail.isShare ? '已分享' : '分享'
      }}</el-button> -->
    </div>
    <div class="flex-1 main">
      <VandURichText
        :info="info"
        :edit="edit"
        :upload="upload"
        :disableEdit="disableEdit"
        v-if="info.type === 'text'"
      ></VandURichText>
      <VandUVideo :info="info" :upload="upload" v-else-if="info.type === 'video'"></VandUVideo>
      <VandUImg :info="info" :upload="upload" v-else-if="info.type === 'img'"></VandUImg>
      <VandUDoc :info="info" :upload="upload" v-else-if="info.type === 'doc'"></VandUDoc>
    </div>
  </div>
</template>

<script>
import VandURichText from './viewanduploadcomponents/VandURichText.vue';
import VandUVideo from './viewanduploadcomponents/VandUVideo.vue';
import VandUImg from './viewanduploadcomponents/VandUImg.vue';
import VandUDoc from './viewanduploadcomponents/VandUDoc.vue';

export default {
  name: 'Preview',
  components: { VandURichText, VandUVideo, VandUImg, VandUDoc },
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
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss">
.preview {
  .file-name {
    padding: 0 50px;
    line-height: 49px;
    min-height: 50px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ebeef5;
    box-shadow: 0px 2px 6px -4px rgba(0, 0, 0, 0.2);
    // .share-btn {
    //   position: absolute;
    //   right: 10px;
    //   top: 3px;
    // }
  }
  .main {
    min-height: 0;
  }
}
</style>
