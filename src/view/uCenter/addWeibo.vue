<template>
  <div class="content">
    <div style="flex:1">
        <div class="title">
          <v-text-field label="内容" v-model="title" :rules="telRules" :counter="200" required multi-line></v-text-field>
        </div>
         <vue-core-image-upload
            v-if="img.length<=9"
            @imageuploaded="imageuploaded"
            :crop="false"
            :max-file-size="5242880"
            inputOfFile="file"
            url="/api/upload" >
            <v-btn color="success"  small>上传图片</v-btn>
         </vue-core-image-upload>
            
        <div class="img-list">
            <img :src="e" v-for="(e,i) in img" :key="i">
        </div>
        
    <v-btn color="info" @click="submit"  small>发布</v-btn>
  </div></div>
</template>
<script>
import VueCoreImageUpload from "vue-core-image-upload";

export default {
  data() {
    return {
      content: "",
      title: "",
      cid: "",
      img: [],
      telRules: [
        v => !!v || "内容不能为空",
        v => v.length <= 200 || "内容不能超过200字符"
      ]
    };
  },
  components: {
    "vue-core-image-upload": VueCoreImageUpload
  },
  mounted() {},
  methods: {
    submit() {
      let postval = {
        title: this.title,
        cid: 1,
        img: this.img.toString()
      };
      this.axios.post("/api/front-end/post/add", postval).then(res => {
        if (res.code == 200) {
          this.$router.push("/?my=1");
        }
      });
    },
    imageuploaded(res) {
      if (res.code == 200) {
        this.img.push("http://lider.demo" + res.data);
      }
    }
  }
};
</script>
<style scoped>
.ckeditor {
  width: 100%;
}
.img-list {
  display: flex;
  flex-wrap: wrap;
}
.img-list img {
  width: 33%;
  max-height: 120px;
  padding: 5px;
}
@media only screen and (max-width: 599px) {
  .img-list img {
    max-height: 90px;
  }
}
</style>
