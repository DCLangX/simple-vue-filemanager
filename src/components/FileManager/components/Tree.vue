<template>
  <div class="h-100 tree">
    <el-menu
      class="menu-vertical"
      @select="handleSelect"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-menu-item
        :index="String(item.type)"
        v-for="item in folderList"
        :key="item.type"
        class="menu-container"
      >
        <i :class="iconNameList[item.type] || 'el-icon-document'"></i>
        <span class="text-justify" slot="title">
          <span>{{ item.name }}</span>
          <!-- <span>{{ item.count }}</span> -->
        </span>
      </el-menu-item>
      <!-- <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">文件二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">文件三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">文件四</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Tree',
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
    folderList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isCollapse: {
      get() {
        return this.collapse;
      },
      // setter
      set(newValue) {
        this.$emit('update:collapse', newValue);
      },
    },
  },
  data() {
    return {
      iconNameList: {
        0: 'el-icon-tickets',
        1: 'el-icon-document',
        2: 'el-icon-picture-outline',
        3: 'el-icon-video-camera',
      },
    };
  },
  methods: {
    handleSelect(index) {
      this.$emit('select', index);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped lang="scss">
.tree {
  .menu-vertical {
    height: 100%;
    &:not(.el-menu--collapse) {
      width: 200px;
    }
    .menu-container {
      padding-left: 20px !important;
      ::v-deep .el-tooltip {
        padding: 0 20px !important;
      }
    }
  }
}
</style>
