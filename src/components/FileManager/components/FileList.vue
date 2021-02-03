<template>
  <div :class="['h-100', 'file-list', { 'no-tool-bar': disableEdit }]">
    <div class="w-100 text-right fs-21 toolbar" v-if="!disableEdit">
      <el-tooltip class="item" effect="dark" content="新建文件" placement="bottom">
        <el-button
          icon="el-icon-plus"
          size="mini"
          circle
          :disabled="!activeAddBtn"
          @click="handleAdd"
        ></el-button>
      </el-tooltip>
      <!-- <el-tooltip
        class="item"
        effect="dark"
        content="删除文件"
        placement="bottom"
      >
        <el-button
          icon="el-icon-delete"
          size="mini"
          circle
          @click="handleDeleFile"
        ></el-button>
      </el-tooltip> -->
    </div>
    <el-menu
      class="w-100 h-100 menu-vertical"
      @select="handleSelect"
      @close="handleClose"
      v-loading="loading"
    >
      <el-menu-item
        :index="String(index)"
        v-for="(item, index) in fileList"
        :key="item.id"
        class="text-nowrap"
      >
        <el-tooltip class="share-icon" effect="dark" content="文件已分享" placement="top">
          <i class="el-icon-share" v-if="item.is_share" />
        </el-tooltip>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <div class="empty fs-18 text-gray" v-show="fileList.length === 0">
        暂无数据哦！尝试{{ disableEdit ? '选择一个分类' : '新增一个' }}吧！
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'FileList',
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
    activeAddBtn: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disableEdit: {
      // 禁用编辑和新增，隐藏新增编辑按钮
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  data() {
    return {
      selectFileInfo: {},
    };
  },
  methods: {
    handleSelect(index) {
      const fileInfo = this.fileList[index];
      this.$emit('select', fileInfo);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleDeleFile() {
      this.$emit('delete', this.fileInfo);
    },
    handleAdd() {
      this.$emit('add');
    },
  },
};
</script>

<style scoped lang="scss">
$toolBarHeight: 50px;
.file-list {
  width: 300px;
  padding-top: $toolBarHeight;
  position: relative;
  // .menu-vertical {
  //   width: 400px;
  // }
  &.no-tool-bar {
    padding-top: 0;
  }
  .toolbar {
    height: $toolBarHeight;
    line-height: $toolBarHeight;
    position: absolute;
    border-right: solid 1px #e6e6e6;
    border-bottom: 1px solid #ebeef5;
    padding: 0 20px;
    top: 0;
    left: 0;
    box-shadow: 0px 2px 6px -4px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }
  .empty {
    text-align: center;
    padding-top: 20px;
  }
  .menu-vertical {
    overflow: auto;
    .text-nowrap {
      padding-left: 25px !important;
      .share-icon {
        position: absolute;
        line-height: inherit;
        left: 5px;
        font-size: 15px;
        color: cadetblue;
      }
      span {
        vertical-align: unset;
      }
    }
  }
}
</style>
