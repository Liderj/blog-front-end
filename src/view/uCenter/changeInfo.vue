<template>
  <v-container fluid>
           <v-slide-y-transition mode="out-in">
       
      <v-layout column align-center justify-center>
             <vue-core-image-upload
              @imageuploaded="imageuploaded"
            :crop="false"
            :max-file-size="5242880"
            inputOfFile="file"
            url="/api/upload" >
            <v-avatar size="150" class="grey lighten-4">
                <img :src="avatar">
            </v-avatar>
         </vue-core-image-upload> 
        <v-form class="form"  v-model="valid"  ref="form" lazy-validation>
            <v-text-field label="昵称" v-model="nickname" :rules="nicknameRules" required type="text"></v-text-field>
            <v-radio-group v-model="sexSelected" row label="性别">
              <v-radio
                v-for="(item,n) in sex"
                :key="n"
                :label="item"
                :value="n+1"
              ></v-radio>
            </v-radio-group>            
            <v-btn @click="submit" color="info" :disabled="!valid">提交</v-btn>
        </v-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import vuetifyToast from "vuetify-toast";
import VueCoreImageUpload from "vue-core-image-upload";
export default {
  data() {
    return {
      valid: false,
      nickname: "",
      avatar: null,
      sex: ["男", "女", "保密"],
      sexSelected: 1,
      nicknameRules: [
        v => !!v || "昵称不能为空",
        v =>
          (v.trim().length > 0 && v.trim().length <= 6) || "请输入6字以内昵称"
      ]
    };
  },
  components: {
    "vue-core-image-upload": VueCoreImageUpload
  },
  mounted() {
    this.axios.get("/api/front-end/user").then(res => {
      if (res.code === 200) {
        this.avatar = res.data.avatar;
        this.sexSelected = res.data.sex;
        this.nickname = res.data.nickname;
      }
    });
  },
  methods: {
    submit() {
      const postval = {
        avatar: this.avatar,
        sex: this.sexSelected,
        nickname: this.nickname
      };
      this.axios.post("/api/front-end/changeInfo", postval).then(res => {
        if (res.code == 200) {
          vuetifyToast.success(res.message);
          this.$store.dispatch("GETUSER");
          this.$router.push("/");
        }
      });
    },
    imageuploaded(res) {
      if (res.code == 200) {
        this.avatar = "http://lider.demo" + res.data;
      }
    }
  }
};
</script>

<style  scoped>
.container,
.container .layout {
  height: 100%;
}
.form {
  width: 100%;
  max-width: 400px;
}
.verify {
  width: 100%;
}
</style>
