<template>
  <div ref="editor" class="d-flex h-100 flex-column text">
    <!--可使用 min-height 实现编辑区域自动增加高度-->
  </div>
</template>

<script>
import WangEditor from 'wangeditor';

export default {
  name: 'RichText',
  props: {
    value: String,
  },
  data() {
    return {
      content: '',
      editor: {},
    };
  },
  computed: {},
  watch: {
    value(val) {
      if (val) {
        if (val !== this.content) {
          this.setContent(val);
        }
      } else {
        this.setContent('');
      }
    },

    content(val) {
      this.$emit('input', val);
    },
  },
  mounted() {
    this.content = this.value;
    this.$nextTick(() => {
      this.editor = new WangEditor(this.$refs.editor);
      // console.log("editor", this.editor);
      this.editor.config.onchange = (html) => {
        // 监控变化，同步更新到 textarea
        this.content = html;
      };
      // 使用 base64 格式保存图片
      this.editor.config.uploadImgShowBase64 = true;
      // 配置图片上传服务器接口
      // this.editor.customConfig.uploadImgServer =
      //   process.env.VUE_APP_BASE_API + "/file/upload/customizeDirUpload";
      // 文件名
      // this.editor.customConfig.uploadFileName = "file";
      // 配置上传图片请求头部
      // this.editor.customConfig.uploadImgHeaders = {}
      // 上传图片钩子函数
      // this.editor.customConfig.uploadImgHooks = {
      //   before: function(xhr, editor, files) {
      //     // 图片上传之前触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
      //     // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
      //     // return {
      //     //     prevent: true,
      //     //     msg: '放弃上传'
      //     // }
      //   },
      //   success: function(xhr, editor, result) {
      //     // 图片上传并返回结果，图片插入成功之后触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      //     // alert('成功')
      //   },
      //   fail: function(xhr, editor, result) {
      //     // 图片上传并返回结果，但图片插入错误时触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      //   },
      //   error: function(xhr, editor) {
      //     // 图片上传出错时触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      //   },
      //   timeout: function(xhr, editor) {
      //     // 图片上传超时时触发
      //     // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      //   },

      //   // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      //   // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      //   customInsert: function(insertImg, result, editor) {
      //     // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
      //     // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

      //     // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
      //     var url = result.data;
      //     insertImg(url);

      //     // result 必须是一个 JSON 格式字符串！！！否则报错
      //   }
      // };
      this.editor.create();
      this.editor.txt.html(this.value);
    });
  },
  methods: {
    // 生成随机字符串id
    // randomString(len) {
    //   len = len || 32;
    //   const $chars =
    //     'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
    //   const maxPos = $chars.length;
    //   let pwd = '';
    //   for (let i = 0; i < len; i++) {
    //     pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    //   }
    //   return `a${pwd}`;
    // },
    setContent(val) {
      this.editor.txt.html(val);
    },
  },
};
</script>

<style scoped lang="scss">
.text {
  display: flex;
  ::v-deep .w-e-text-container {
    flex-grow: 1;
  }
}
</style>
