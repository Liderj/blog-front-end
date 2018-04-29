<template>
     <div class="article">
         <v-progress-circular class="loading" v-if="loading" indeterminate color="primary"></v-progress-circular>
        <template v-if="post.id">
        <h2>{{post.title}}</h2>
        <div class="article-source">
             <v-avatar
                    size="30"
                    class="grey lighten-4"
                  >
                    <img :src="post.author.avatar" alt="avatar">
                  </v-avatar>
          <span>{{post.author.nickname}}</span>
          <span>{{post.created_at}}</span>
        </div>
        <div class="article-img mt-2">
            <img :src="post.img" >
        </div>
        <div class="article-content" v-html="post.content"></div>
        <div class="artical-footer">
            <span>点赞数({{post.likes}})</span>
             <v-icon class="like" size="15" color="blue lighten-1" @click="like">thumb_up</v-icon>
        </div>

        <div class="artical-com-in" v-if="!!post.is_comment">
            <v-btn color="info" small @click="comment">评论</v-btn>
            <textarea v-model="content" placeholder="说点什么吧。。。。。。。。。。。。。"   rows="5"></textarea>
        </div>
            <comment v-if="!!post.is_comment" :id="post.id" :miniInput="false" :isComment="!!post.is_comment"></comment>
        </template>
     </div>  
</template>
<script>
import comment from "./component/comment";
import vuetifyToast from "vuetify-toast";

export default {
  data() {
    return {
      loading: false,
      content: null,
      post: {
        author: {}
      }
    };
  },
  components: {
    comment
  },
  mounted() {
    this.getPost();
  },
  methods: {
    getPost() {
      this.loading = true;
      this.axios
        .get(`/api/front-end/post/${this.$route.params.id}`)
        .then(res => {
          if (res.code == 200) {
            this.post = res.data;
          }
          this.loading = false;
        });
    },
    comment() {
      this.axios
        .post("/api/front-end/comment", {
          pid: this.post.id,
          content: this.content
        })
        .then(res => {
          if (res.code == 200) {
            this.$router.go(0);
            this.content = "";
          }
        });
    },
    like() {
      this.axios.get(`/api/front-end/post/like/${this.post.id}`).then(res => {
        if (res.code == 200) {
          vuetifyToast.success(res.message);
          this.post.likes++;
        }
      });
    }
  }
};
</script>
<style scoped>
.like {
  cursor: pointer;
}
.article {
  min-height: 100%;
  position: relative;
}
.article h2 {
  font-size: 22px;
  font-weight: 700;
  line-height: 38px;
  color: #191919;
}
.article-source {
  display: flex;
  align-items: center;
}
.article-source span {
  margin-left: 10px;
}
.article-img img {
  width: 100%;
}
.article-content {
  color: #191919;
}
.artical-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.artical-com-in {
  position: relative;
  margin-top: 10px;
}
.artical-com-in textarea {
  border: 1px solid rgb(66, 165, 245);
  width: 100%;
  padding: 5px;
  margin: 0;
}
.artical-com-in button {
  position: absolute;
  right: 0;
  bottom: 7px;
  margin: 0;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
