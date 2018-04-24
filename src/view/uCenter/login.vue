<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center justify-center>
        <img src="@/assets/logo.png" alt="V博客">
        <v-form class="form" v-model="valid" ref="form" lazy-validation>
          <v-text-field label="手机号" v-model="tel" :rules="telRules" :counter="11" required type="tel"></v-text-field>
          <v-text-field label="密码" v-model="password" :rules="passwordRules" required type="password"></v-text-field>
          <v-layout justify-space-between align-center="">
            <v-btn to="/register">注册</v-btn>
            <v-btn color="success" :disabled="!valid" @click="login">
              登录
            </v-btn>
          </v-layout>
        </v-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      title: "登录",
      valid: false,
      tel: "",
      telRules: [
        v => !!v || "手机号不能为空",
        v => v.length <= 11 || "请输入11位手机号码",
        v =>
          /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(v) ||
          "请输入正确的手机号码"
      ],
      password: "",
      passwordRules: [v => !!v || "密码不能为空"]
    };
  },
  methods: {
    login() {
      const postval = {
        mobile: this.tel,
        password: this.password
      };
      this.axios.post("/api/front-end/login", postval).then(res => {
        if (res.code == 200) {
          localStorage.setItem("v-token", res.data.token);
          this.$store.commit("SET_TOKEN", res.data.token);
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push("/");
          }
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
  width: 90%;
  max-width: 400px;
}
</style>
