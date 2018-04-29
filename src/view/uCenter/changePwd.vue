<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center justify-center>
        <v-form class="form"  v-model="valid"  ref="form" lazy-validation>
          <v-text-field label="原密码" placeholder="请输入原密码"  v-model="oldPassword" :rules="passwordRules" required type="password"></v-text-field>
            <v-text-field label="新密码" v-model="password" :rules="passwordRules" required type="password"></v-text-field>
          <v-text-field label="确认密码" v-model="password1" :rules="passwordVerify" required type="password"></v-text-field>
          <v-layout justify-center align-center>
            <v-btn @click="submit" color="info" :disabled="!valid">提交</v-btn>
          </v-layout>
        </v-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import vuetifyToast from "vuetify-toast";
export default {
  data() {
    return {
      valid: false,
      oldPassword: "",
      password: "",
      password1: "",
      passwordRules: [
        v => !!v || "密码不能为空",
        v =>
          (v.trim().length > 5 && v.trim().length <= 12) ||
          "密码长度必须为6-12位"
      ],
      passwordVerify: [v => v == this.password || "两次输入密码不一致"]
    };
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    submit() {
      const postval = {
        oldPassword: this.oldPassword,
        password: this.password
      };
      this.axios.post("/api/front-end/changePWd", postval).then(res => {
        if (res.code == 200) {
          vuetifyToast.success(res.message);
          this.$router.push("/");
        }
      });
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
