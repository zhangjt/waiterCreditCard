<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
        <!-- <button v-on:click="getContent">查看内容</button>    -->
        <div style="display: none;">{{editorCon}}</div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    // let editor;
    export default {
      name: 'editor',
      data () {
        return {
          editorContent: '',
          editor: null,
        }
      },
      props: ['editorCon'],
      methods: {
        // getContent: function () {
        //     // alert(this.editorContent)
        //     this.$emit("editor1", this.editorContent)
        // }
      },
      mounted() {
        this.editor = new E(this.$refs.editor)
        this.editor.customConfig.menus = [
            // 'head',
            // 'bold',
            // 'fontName',
            'fontSize',
            'foreColor',
            // 'underline',
            // 'image',
            // 'link'
        ];
        this.editor.customConfig.zIndex = 1
        this.editor.customConfig.onchange = (html) => {
          this.editorContent = html
          this.$emit("editor", this.editorContent)
        }
        this.editor.create()
        // console.log(this.editorContent)
        this.editor.txt.html(this.editorCon)
      },
      beforeUpdate() {
        // console.log(this.editorCon)
        this.editor.txt.html(this.editorCon)
      }
    }
</script>

<style scoped>
</style>
