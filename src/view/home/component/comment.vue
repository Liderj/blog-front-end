<template>
  <div class="comment">
       <div class="comment-input" style="margin-left:0" v-if="miniInput">
        <span class="user-name">我:</span>
        <input type="text" v-model="content" placeholder="请输入评论内容"> <v-btn color="info" @click="comment"  small>评论</v-btn>
    </div>
      <v-progress-circular class="loading" v-if="loading" indeterminate color="primary"></v-progress-circular>
      <div class="com-item mt-1 mb-1" v-for="item in dataList" :key="item.id" >
          <div class="com-content"  @click.stop ="showInput(item)">
                <span class="user-name">{{item.nickname}}:</span>
                 <p>{{item.content}} <button v-if="isComment" @click.stop="showInput(item)" class="reply hidden-md-and-down">回复</button></p>
          </div>
          <template v-if="item.child.length || item.showInput">
             <reply :showInput="item.showInput" :comment="item" :isComment="isComment"></reply>
          </template> 
      </div>
  </div>
</template>
<script>
import Reply from "./reply";
export default {
  name: "z-comment",
  props: {
    id: Number,
    miniInput: {
      type: Boolean,
      default: true
    },
    isComment: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      dataList: [],
      content: null
    };
  },
  components: {
    Reply
  },
  mounted() {
    this.getComment();
  },
  methods: {
    getComment() {
      this.loading = true;
      this.axios
        .get("/api/front-end/comment", { params: { pid: this.id } })
        .then(res => {
          if (res.code == 200) {
            res.data.forEach(element => {
              element.showInput = false;
            });
            this.dataList = res.data;
          }
          this.loading = false;
        });
    },
    showInput(comment) {
      this.dataList.forEach(
        e =>
          e.id !== comment.id
            ? (e.showInput = false)
            : (e.showInput = !e.showInput)
      );
    },
    comment() {
      this.axios
        .post("/api/front-end/comment", {
          pid: this.id,
          content: this.content
        })
        .then(res => {
          if (res.code == 200) {
            this.getComment();
            this.content = "";
          }
        });
    }
  }
};
</script>
<style>
.comment {
  position: relative;
  padding: 5px;
}
.comment .loading {
  position: relative;
  margin-left: 50%;
  transform: translateX(-50%);
}
.com-content {
  display: flex;
}
.com-item span {
  color: #000;
  margin-right: 5px;
}
.com-item p {
  color: #7d7c7c;
  margin-bottom: 0;
}
.comment-input {
  margin-left: 2em;
  display: flex;
  align-items: center;
}
.comment-input input {
  display: block;
  height: 28px;
  flex: 1;
  border: 1px solid #eee;
}
.com-child {
  margin-left: 2em;
  display: flex;
  background-color: #eee;
  padding: 5px;
}
.reply {
  color: #1565c0;
  margin-left: 5px;
  outline: none;
}
</style>
