<template>
     <div class="center">
       <div class="post-list">
        <div class="post-item">
          <div class="item-desc">
            <div class="user-info ">
                <v-avatar
                    size="50"
                    class="grey lighten-4"
                  >
                   <img src="http://lider.demo/storage/QXaMnW2Su9UfQ8CEVE5hgWdDJKNxp1m4BmQjhzMS.jpeg">
                </v-avatar>
                <div class="user-name ml-2">
                  <span class="mb-1">我我哦我</span>
                  <span class="date">2018-04-25</span>
                </div>
            </div>
            <div class="post-title">
              三十年前，在武大图书馆读了《硅谷之火》，心情久久不能平静，人生有了梦想：决定做一个伟大的人，决定做一个与众不同的人！
            </div>
          </div>
          <!-- <img src="http://lider.demo/storage/QXaMnW2Su9UfQ8CEVE5hgWdDJKNxp1m4BmQjhzMS.jpeg"> -->
        </div>
       </div>
       <div class="top-10 hidden-sm-and-down pl-3">
          <ul>
          <li>aaaaaaaaaaaaaaaa</li>
          <li>aaaaaaaaaaaaaaaa</li>
          <li>aaaaaaaaaaaaaaaa</li>
          <li>aaaaaaaaaaaaaaaa</li>
          <li>aaaaaaaaaaaaaaaa</li>
          <li>aaaaaaaaaaaaaaaa</li>
          <li>aaaaaaaaaaaaaaaa</li>
          <li>aaaaaaaaaaaaaaaa</li>
        
        </ul>
       </div>
     </div>
</template>
<script>
export default {
  data() {
    return {
      page: 0,
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(
      page = this.page,
      category = this.$route.query.category || null,
      search = this.$route.query.category
    ) {
      console.log("aaa");
      this.page++;
    }
  },
  watch: {
    $route(to, from) {
      this.page = 0;
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
  line-height: 1;
}
.top-10 {
  width: 300px;
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

