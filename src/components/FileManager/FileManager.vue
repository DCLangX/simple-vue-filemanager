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
        @share="onShare"
      ></FileList>
    </div>
    <div class="right">
      <Preview
        :info="rightPanelInfo"
        :edit="onEditRichText"
        :upload="onUpload"
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
      // 禁用编辑和新增，隐藏新增编辑按钮，此状态用于仅预览的需求
      type: Boolean,
      default: false,
    },
  },
  components: { Tree, FileList, Preview },
  computed: {},
  data() {
    return {
      treeCollapse: false,
      // 是否隐藏左侧导航树
      treeList: [
        { type: 0, name: '文字', count: 0 },
        { type: 1, name: '文档', count: 0 },
        { type: 2, name: '图片', count: 0 },
        { type: 3, name: '视频', count: 0 },
      ],
      // 左侧导航树列表
      activeTreeId: null,
      fileList: [],
      // 中间文件列表
      rightPanelInfo: {
        // 右侧面板数据，类型有text，img，video，doc等一堆组件类型，模式有view，edit，new三种模式，edit为富文本组件独有
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
      // 初次加载，需要获取文件夹数据
      // console.log(data, "文件夹数据");
      // this.treeList = data;
    },
    onSelectFile(fileInfo) {
      this.treeCollapse = true;
      console.log(fileInfo, '选中文件信息');
      this.rightPanelInfo = {
        type: this.allType[this.activeTreeId],
        mode: 'view',
        detail: fileInfo,
      };
    },
    onDeleteFile(fileInfo) {
      // 删除文件
    },
    async onSelectFileType(treeId) {
      // 获取文件夹中的文件
      this.activeTreeId = treeId;
      console.log(treeId, '文件夹id');
      this.treeCollapse = false;
      this.loadingFile = true;
      setTimeout(() => {
        this.loadingFile = false;
        const mockFileList = {
          0: {
            id: 1,
            type: 'richtext',
            name: '111',
            isShare: true,
            content: '<h2><b id="jxfpc">呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱古古怪怪</b></h2>',
          },
          1: {
            id: 1,
            type: 'pdf',
            name: '222',
            isShare: true,
            file:
              'https://www-file.huawei.com/-/media/corporate/pdf/annual-report/annual_report_2019_cn.pdf?la=zh',
          },
          2: {
            id: 1,
            type: 'img',
            name: '333',
            isShare: true,
            file: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          },
          3: {
            id: 1,
            type: 'mp4',
            name: '444',
            isShare: true,
            file: 'http://static.biligame.com/deadcells/gw/pc/images/video-2.mp4',
          },
        };
        this.fileList = [mockFileList[treeId]];
      }, 1000);
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
    onShare(fileInfo) {
      // 分享文件
      console.log(fileInfo, '分享文件');
      const { isShare } = fileInfo;
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
      setTimeout(() => {
        this.$notify.closeAll();
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
        });
        this.onSelectFileType(this.activeTreeId);
        this.$set(this.rightPanelInfo.detail, 'isShare', !isShare);
      }, 1000);
    },
    upLoadFile(...rest) {
      this.$notify({
        title: '警告',
        message: '文件正在提交，请不要关闭页面',
        type: 'warning',
        duration: 0,
      });
      // 此处请务必返回一个promise，以便组件判断，例如下
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
      // 如果是新建模式，会执行一次文件重名检测，编辑模式不会
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
