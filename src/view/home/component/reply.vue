<template>
  <div>
    <div class="comment-input" v-if="new_showInput && isComment">
        <span class="user-name">我:</span>
        <input type="text" v-model="content" placeholder="请输入回复内容"> <v-btn color="info" @click.stop="reply" small>回复</v-btn>
    </div>
    <template v-if="new_comment">
        <div class="com-child"  v-for="(i,ind) in new_comment.child" :key="ind">
            <span class="user-name">{{i.nickname}}:</span>
            <p>{{i.content}}</p>
        </div> 
    </template>
  </div>
</template>
<script>
export default {
  props: {
    showInput: Boolean,
    comment: Object,
    isComment: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      new_comment: {
        child: []
      },
      content: null,
      new_showInput: false
    };
  },
  mounted() {
    this.new_comment = this.comment;
    this.new_showInput = this.showInput;
  },
  methods: {
    reply() {
      this.axios
        .post("/api/front-end/reply", {
          cid: this.new_comment.id,
          content: this.content
        })
        .then(res => {
          if (res.code == 200) {
            this.new_comment.child.unshift({
              nickname: this.$store.state.user.nickname,
              content: this.content
            });
            this.new_showInput = false;
          }
        });
    }
  },
  watch: {
    showInput: function() {
      this.new_showInput = this.showInput;
    }
  }
};
</script>
