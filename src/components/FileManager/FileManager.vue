<template>
  <div class="d-flex file-manager">
    <div class="left">
      <Tree :folderList="treeList" @select="onSelectFileType" :collapse="treeCollapse"></Tree>
    </div>
    <div class="middle">
      <FileList
        :fileList="fileList"
        :activeAddBtn="activeTreeId !== null"
        :loading="loadingFile"
        :disableEdit="disableEdit"
        @add="onNewFile"
        @select="onSelectFile"
        @delete="onDeleteFile"
      ></FileList>
    </div>
    <div class="right">
      <Preview
        :info="rightPanelInfo"
        :edit="onEditRichText"
        :upload="onUpload"
        :share="onShare"
        :disableEdit="disableEdit"
      ></Preview>
    </div>
  </div>
</template>

<script>
// import {
//   apiGetFiles,
//   apiGetHotFiles,
//   apiGetFileFolder,
//   apiGetShareFiles,
//   apiUploadFile,
//   apiCheckFileName,
//   apiPostShare,
// } from '@/api/filemanage';
import Tree from './components/Tree.vue';
import FileList from './components/FileList.vue';
import Preview from './components/Preview.vue';

export default {
  name: 'FileManager',
  props: {
    id: Number,
    disableEdit: {
      // 禁用编辑和新增，隐藏新增编辑按钮
      type: Boolean,
      default: false,
    },
    nameType: String,
  },
  // watch: {
  //   id(newValue) {
  //     if (newValue) {
  //       const { data } = apiGetFileFolder(newValue);
  //       console.log(data, "文件夹数据");
  //     }
  //   }
  // },
  components: { Tree, FileList, Preview },
  computed: {},
  data() {
    return {
      treeCollapse: false,
      // 是否隐藏左侧导航树
      treeList: [
        { type: 0, name: '文字', count: 0 },
        { type: 3, name: '视频', count: 0 },
      ],
      // 左侧导航树列表
      activeTreeId: null,
      fileList: [],
      // 中间文件列表
      rightPanelInfo: {
        // 右侧面板数据，有text等一堆组件类型，有view，edit，new三种模式，edit为富文本组件独有
        // type: "text",
        // mode: "view",
        // mode: "new",
        // detail: {
        //   id: 1,
        //   content:
        //     '<h2><b id="jxfpc">呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱古古怪怪</b></h2>'
        // }
      },
      allType: {
        // 记录各个type类型
        0: 'text',
        1: 'doc',
        2: 'img',
        3: 'video',
      },
      loadingFile: false,
    };
  },
  methods: {
    async fetchFolder() {
      // const { data } = await apiGetFileFolder(this.id);
      // console.log(data, "文件夹数据");
      // this.treeList = data;
    },
    onSelectFile(fileInfo) {
      this.treeCollapse = true;
      // console.log(fileInfo, "选中文件信息");
      this.rightPanelInfo = {
        type: this.allType[this.activeTreeId],
        mode: 'view',
        detail: fileInfo,
      };
    },
    onDeleteFile() {},
    async onSelectFileType(typeId) {
      this.activeTreeId = typeId;
      this.treeCollapse = false;
      this.loadingFile = true;
      const getFunc = this.getFun[this.nameType];
      const { data } = await getFunc(this.id, { folder_type: typeId });
      this.loadingFile = false;
      this.fileList = data;
    },
    onEditRichText(detail) {
      this.rightPanelInfo = {
        type: 'text',
        mode: 'edit',
        detail,
      };
    },
    onNewFile() {
      this.rightPanelInfo = {
        type: this.allType[this.activeTreeId],
        mode: 'new',
        detail: {},
      };
    },
    onShare(data) {
      const isShare = data.is_share;
      if (isShare) {
        this.$notify({
          title: '操作执行中',
          message: '正在取消分享文件',
          type: 'warning',
          duration: 0,
        });
      } else {
        this.$notify({
          title: '操作执行中',
          message: '正在分享文件',
          type: 'warning',
          duration: 0,
        });
      }
      // apiPostShare(this.id, { material_id: data.id, is_share: !isShare }).then(() => {
      //   this.$notify.closeAll();
      //   this.$notify({
      //     title: '成功',
      //     message: '操作成功',
      //     type: 'success',
      //   });
      //   this.onSelectFileType(this.activeTreeId);
      //   this.$set(this.rightPanelInfo.detail, 'is_share', !isShare);
      // });
    },
    upLoadFile(...rest) {
      // this.$notify({
      //   title: '警告',
      //   message: '文件正在提交，请不要关闭页面',
      //   type: 'warning',
      //   duration: 0,
      // });
      // return apiUploadFile(...rest)
      //   .then(() => {
      //     this.onSelectFileType(this.activeTreeId);
      //     this.rightPanelInfo = {};
      //     this.$notify.closeAll();
      //     this.$notify({
      //       title: '成功',
      //       message: '提交成功',
      //       type: 'success',
      //     });
      //   })
      //   .catch(() => {
      //     this.$notify.closeAll();
      //     this.$notify({
      //       title: '失败',
      //       message: '提交失败，请重试',
      //       type: 'error',
      //     });
      //   });
    },
    async onUpload(data, ...rest) {
      const parmas = {
        ...data,
        activity_id: this.id,
        folder_type: this.activeTreeId,
      };
      // console.log("进行同名检测");
      // const isRepeat = await this.checkName(data.name, ...rest);
      // console.log(isRepeat, "查看同名检测");
      if (
        this.rightPanelInfo.mode !== 'edit' &&
        data.name !== undefined &&
        (await this.checkName(data.name))
      ) {
        return this.$confirm('检测到同名文件, 是否覆盖?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            return this.upLoadFile(parmas, ...rest);
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作',
            });
            return Promise.reject();
          });
      }
      return this.upLoadFile(parmas, ...rest);
    },
    async checkName(name) {
      // const { data } = await apiCheckFileName({
      //   activity_id: this.id,
      //   folder_type: this.activeTreeId,
      //   name,
      // });
      // // console.log("重名检测", data);
      // return data.result;
    },
  },
};
</script>

<style scoped lang="scss">
.file-manager {
  margin: 0 20px 20px;
  height: 70vh;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .left,
  .middle,
  .right {
    // overflow: auto;
    height: 100%;
  }
  .left {
    // width: 15%;
  }
  .middle {
    // border-left: 1px solid #ebeef5;
    // border-right: 1px solid #ebeef5;
  }
  .right {
    flex: 1;
    min-width: 0;
  }
}
</style>
