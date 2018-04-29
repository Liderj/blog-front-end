<template>
     <div class="center">
       <div class="post-list" v-if="list.length">
        <div class="post-item mb-2" v-for="(item,index) in list " :key="index">
          <div class="item-desc">
            <div class="user-info ">
                <v-avatar
                    size="50"
                    class="grey lighten-4"
                  >
                   <img :src="item.user.avatar">
                </v-avatar>
                <div class="user-name ml-2">
                  <span class="mb-1">{{item.user.nickname}}</span>
                  <span class="date">{{item.created_at.slice(0,16)}}</span>
                </div>
            </div>
            <div class="post-title" :class="{iswe:item.cid!=1}">
              <router-link v-if="item.cid!=1" :to="{path:'post/'+item.id+'?category='+item.cid}">{{item.title}}</router-link>
              <template v-else>{{item.title}}</template>
            </div>
            <div class="post-images" v-if="item.img" :class="{'one-img':item.cid!=1}">
              <img  :src="i" :preview="item.id"  v-for="(i,ind) in item.img.split(',')" :key="ind">
            </div>
            <div class="post-comment pb-1 pr-2">
              ({{item.likes}})
              <v-icon size="15" color="blue lighten-1" @click="like(item)">thumb_up</v-icon>
              {{item.comment_count}}
              <v-icon size="15" color="blue lighten-1" @click="getComment(item)">forum</v-icon>
            </div>
            <comment :id="item.id" v-if="item.showComment"></comment>
          </div>
        </div>
       </div>
       <div class="no-data" v-if="nodata">
          没有找到您想要的！！！！！
         </div>
       <div class="ml-2 top-10 hidden-sm-and-down pl-3 pt-3 pr-3 pb-3"  v-if="top && !$store.state.loading">
         <h3 class="mb-3">热门推荐</h3>
        <ul class="top">
           <li v-for="item in top" :key="item.id"><router-link :to="{path:'post/'+item.id}">{{item.title}}</router-link></li>
        </ul>
       </div>
     </div>
</template>
<script>
import comment from "./component/comment";
import vuetifyToast from "vuetify-toast";

export default {
  data() {
    return {
      page: 1,
      list: [],
      top: null,
      nodata: false,
      showCommentId: null
    };
  },
  components: { comment },
  created() {
    this.getList();
    this.getHotList();
  },
  mounted() {},
  methods: {
    getList() {
      this.$store.commit("SET_LOADING", true);
      let postVal = {
        page: this.page,
        type: this.$route.query.category || null,
        search: this.$route.query.search,
        my: this.$route.query.my ? 1 : 0
      };
      this.axios.get("/api/front-end/post", { params: postVal }).then(res => {
        if (res.data.list) {
          res.data.list.forEach(element => {
            element.showComment = false;
          });
          this.list = this.list.concat(res.data.list);
          this.page++;
        } else {
          this.nodata = true;
        }
        this.$store.commit("SET_LOADING", false);
      });
    },
    getHotList() {
      this.$store.commit("SET_LOADING", true);
      this.axios.get("/api/front-end/post/top").then(res => {
        this.top = res.data;
        this.$store.commit("SET_LOADING", false);
      });
    },
    getComment(item) {
      if (item.is_comment == 0) {
        return;
      }
      this.list.forEach(
        e =>
          e.id == item.id
            ? (e.showComment = !e.showComment)
            : (e.showComment = false)
      );
    },
    like(post) {
      this.axios.get(`/api/front-end/post/like/${post.id}`).then(res => {
        if (res.code == 200) {
          post.likes++;
          vuetifyToast.success(res.message);
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.page = 1;
      this.list = [];
      this.nodata = false;
      this.showCommentId = null;

      this.getList();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
  display: flex;
  justify-content: space-between;
}
.post-list {
  flex: 1;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul > li {
  padding: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin: 10px 0;
  font-size: 18px;
  line-height: 1.2;
}
ul > li a:hover {
  color: #42a5f5 !important;
  text-decoration: underline;
}
.top-10 {
  border-radius: 10px;
  width: 300px;
  background: #f2f2f5;
  max-height: 580px;
}

a {
  color: #333;
  text-decoration: none;
}
.user-info {
  display: flex;
  align-items: center;
}
.user-info .user-name span {
  font-size: 12px;
  color: #808080;
  display: block;
  line-height: 1;
}
.user-info .user-name span:first-child {
  font-size: 14px;
  color: #333;
}
.post-title {
  margin-left: 58px;
  line-height: 24px;
}
.iswe {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.post-images {
  display: flex;
  flex-wrap: wrap;
  margin-left: 58px;
}
.one-img img {
  width: 100% !important;
  max-height: 250px !important;
}
.post-images img {
  width: 33%;
  max-height: 120px;
  padding: 5px;
}
.post-comment {
  border-bottom: 1px solid #eee;
  margin-top: 5px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  color: #333;
}
.post-comment i {
  margin: 0 5px 0 15px;
  cursor: pointer;
}
@media only screen and (max-width: 599px) {
  .post-images img {
    max-height: 90px;
  }
  .one-img img {
    max-height: 150px !important;
  }
}
</style>

