<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center justify-center>
        <img src="@/assets/logo.png" alt="V博客">
        <v-form class="form" v-model="valid" ref="form" lazy-validation>
          <v-text-field label="手机号" v-model="tel" :rules="telRules" :counter="11" required type="tel"></v-text-field>
          <v-text-field label="昵称" v-model="nickname" :rules="nicknameRules" required type="text"></v-text-field>
          <v-text-field label="密码" v-model="password" :rules="passwordRules" required type="password"></v-text-field>
          <v-text-field label="确认密码" v-model="password1" :rules="passwordVerify" required type="password"></v-text-field>
           <v-radio-group v-model="sexSelected" row label="您愿意公开您的性别吗？">
            <v-radio
              v-for="(item,n) in sex"
              :key="n"
              :label="item"
              :value="n+1"
            ></v-radio>
          </v-radio-group>
          <v-layout justify-center align-center>
            <v-btn @click="_register" color="info" :disabled="!valid">注册</v-btn>
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
      sex: ["男", "女", "保密"],
      sexSelected: 1,
      tel: "",
      telRules: [
        v => !!v || "手机号不能为空",
        v => v.length <= 11 || "请输入11位手机号码",
        v =>
          /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(v) ||
          "请输入正确的手机号码"
      ],
      password: "",
      password1: "",
      passwordRules: [
        v => !!v || "密码不能为空",
        v =>
          (v.trim().length > 6 && v.trim().length <= 12) ||
          "密码长度必须为6-12位"
      ],
      passwordVerify: [v => v == this.password || "两次输入密码不一致"],
      captcha: "",
      nickname: "",
      nicknameRules: [
        v => !!v || "昵称不能为空",
        v =>
          (v.trim().length > 0 && v.trim().length <= 6) || "请输入6字以内昵称"
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    _register() {
      const postval = {
        mobile: this.tel,
        password: this.password,
        nickname: this.nickname
      };
      this.axios.post("/api/front-end/register", postval).then(res => {
        if (res.code == 200) {
          vuetifyToast.success(res.message);
          this.$router.push("login");
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
