<template>
  <div class="content">
    <div style="flex:1">
        <div class="title">
          <v-text-field label="标题" v-model="title" :rules="telRules" :counter="50" required ></v-text-field>
         <v-select
          :items="items"
          v-model="cid"
          label="选择分类"
          item-text="name"
          single-line
        ></v-select>
        </div>
           <vue-core-image-upload
            @imageuploaded="imageuploaded"
            :crop="false"
            :max-file-size="5242880"
            inputOfFile="file"
            url="/api/upload" >
            <v-btn color="success"  small>上传图片</v-btn>
         </vue-core-image-upload>
         <img :src="img" style="width:100%;" alt="">
    <ckeditor 
      v-model="content" 
      :config="config" 
      >
    </ckeditor>
    <v-btn color="info" @click="submit"  small>发布</v-btn>
  </div></div>
</template>
<script>
import Ckeditor from "vue-ckeditor2";
import VueCoreImageUpload from "vue-core-image-upload";

export default {
  components: {
    Ckeditor,
    "vue-core-image-upload": VueCoreImageUpload
  },
  data() {
    return {
      content: "",
      title: "",
      cid: "",
      config: {
        toolbar: [
          { name: "document", items: ["Source", "-", "Undo", "Redo"] },
          {
            name: "basicstyles",
            items: ["Bold", "Italic", "Strike", "-", "RemoveFormat"]
          },
          { name: "links", items: ["Link", "Unlink", "Anchor"] },
          { name: "insert", items: ["Image", "Format"] },
          { name: "tools", items: ["Maximize", "ShowBlocks", "About"] }
        ],
        height: 300
      },
      telRules: [
        v => !!v || "标题不能为空",
        v => v.length <= 50 || "标题不能超过50字符"
      ],
      items: [],
      img: null
    };
  },
  mounted() {
    this.axios.get("/api/front-end/category").then(res => {
      if (res.code == 200) {
        this.items = res.data.filter(v => v.id != 1);
      }
    });
  },
  methods: {
    submit() {
      let postval = {
        title: this.title,
        content: this.content,
        cid: this.cid.id,
        img: this.img
      };
      this.axios.post("/api/front-end/post/add", postval).then(res => {
        if (res.code == 200) {
          this.$router.push("/?my=1");
        }
      });
    },
    imageuploaded(res) {
      if (res.code == 200) {
        this.img = "http://lider.demo" + res.data;
      }
    }
  }
};
</script>
<style scoped>
.ckeditor {
  width: 100%;
}
</style>
