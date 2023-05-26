<template>
  <div class="frame_work">
    <div>
      <el-input
        v-model="keywords"
        placeholder="请输入音乐名字"
        clearable
        class="search"
        size="medium"
        prefix-icon="el-icon-search"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="medium"
        @click="goSearch"
      >
        搜索
      </el-button>
    </div>
    <div>
      <router-link
        to="/home/discoveringmusic"
        class="topNav"
        @click.native="isSearch = !isSearch"
        v-if="isSearch"
        >发现音乐</router-link
      >
      <span class="userInfo"
        >{{ nickname }}
        <img :src="avatarUrl" alt="" />
      </span>
      <el-button type="text" @click="open" class="topNav" v-if="isShow"
        >登录</el-button
      >
      <el-button type="text" class="topNav" @click="logout" v-if="!isShow"
        >退出登录</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
  data() {
    return {
      keywords: "",
      unikey: "",
      qrimg: "",
      timer: "",
      code: "",
      nickname: "",
      avatarUrl: "",
      isShow: true,
      isInHome: true,
      isSearch: false,
    };
  },
  mounted() {
    this.loginStatus();
  },
  methods: {
    goSearch() {
      if (!this.keywords) {
        alert("请输入内容");
      } else {
        this.$router.push(`/search?keywords=${this.keywords}`);
        this.keywords = undefined;
        this.$bus.$emit("getMusic");
      }
      this.isSearch = !this.isSearch;
    },

    async getLoginQrKey() {
      let result = await this.$API.reqLoginQr();
      if (result.data.code === 200) {
        this.unikey = result.data.data.unikey;
        this.getLoginQrCreate(this.unikey);
      }
    },
    async getLoginQrCreate(key) {
      let timeStamp = Date.parse(new Date());
      let result = await this.$API.reqLoginQrCreate(key, timeStamp);
      if (result.data.code === 200) {
        this.qrimg = result.data.data.qrimg;
        this.$alert(`<img src=${this.qrimg} >`, "请扫码登入", {
          dangerouslyUseHTMLString: true,
          center: true,
          showConfirmButton: false,
          // showClose: false,
          beforeClose: (type, instance, done) => {
            if (type === "cancel") {
              clearInterval(this.timer);
              this.timer = null;
              done();
            }
          },
        }).catch(() => {});
        this.timer = setInterval(async () => {
          let timeStamp = Date.parse(new Date());
          let result = await this.$API.reqLoginQrCheck(this.unikey, timeStamp);
          this.code = result.data.code;
          if (this.code === 803) {
            clearInterval(this.timer);
            this.timer = null;
            this.$msgbox.close();
            this.loginStatus();
            localStorage.setItem("code", true);
          }
        }, 2000);
      }
    },
    open() {
      this.getLoginQrKey();
    },
    async loginStatus() {
      let timeStamp = Date.parse(new Date());
      let result = await this.$API.reqStatus(timeStamp);
      // console.log(result.data.data);
      //若登入成功
      if (result.data.data.profile) {
        this.nickname = result.data.data.profile.nickname;
        this.avatarUrl = result.data.data.profile.avatarUrl;
        this.isShow = !this.isShow;
        let uid = result.data.data.account.id;
        this.$bus.$emit("emitUid", uid);
      }
    },
    async logout() {
      let timeStamp = Date.parse(new Date());
      let result = await this.$API.reqLogout(timeStamp);
      this.loginStatus();
      this.nickname = "";
      this.avatarUrl = "";
      this.isShow = !this.isShow;
      localStorage.removeItem("code");
      this.$router.push("/home/discoveringmusic");
    },
  },
};
</script>

<style lang="css" scoped>
.frame_work {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  width: 1400px;
  height: 50px;
  line-height: 50px;
  /* background-color: #242424; */
  /* background-color: red; */
}
.search {
  width: 200px;
}
.topNav {
  font-family: sans-serif;
  color: #409eff;
  margin-right: 10px;
}
a {
  text-decoration: none;
}
.userInfo {
  margin-right: 10px;
  font-size: 14px;
}
.userInfo img {
  width: 40px;
  vertical-align: top;
  border-radius: 50%;
}
</style>