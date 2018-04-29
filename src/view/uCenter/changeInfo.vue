<template>
  <v-container fluid>
           <v-slide-y-transition mode="out-in">
       
      <v-layout column align-center justify-center>
             <vue-core-image-upload
            :crop="false"
            :max-file-size="5242880"
            inputOfFile="file"
            url="/api/upload" >
            <v-avatar size="150" class="grey lighten-4">
                <img v-if="$store.state.user" :src="avatar">
            </v-avatar>
         </vue-core-image-upload> 
        <v-form class="form"  v-model="valid"  ref="form" lazy-validation>
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
import VueCoreImageUpload from "vue-core-image-upload";
export default {
  data() {
    return {
      valid: false
    };
  },
  components: {
    "vue-core-image-upload": VueCoreImageUpload
  },
  computed: {
    avatar: {
      get: function() {
        return this.$store.state.user ? this.$store.state.user.avatar : null;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      //   this.avatar = this.$store.state.user
      //     ? this.$store.state.user.avatar
      //     : null;
    });
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
