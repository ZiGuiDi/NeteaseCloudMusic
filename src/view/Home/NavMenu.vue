<template>
  <div class="father">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo NavMenu"
          @select="menuSelect"
        >
          <el-menu-item index="1" route="/home/discoveringmusic">
            <template slot="title">
              <i class="el-icon-search"></i>
              <span>发现音乐</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2" route="/home/myfavorite/mycollection">
            <i class="el-icon-magic-stick"></i>
            <span slot="title">我的喜欢</span>
          </el-menu-item>
          <el-menu-item index="3" route="/home/latestmv">
            <i class="el-icon-more-outline"></i>
            <span slot="title">全部MV</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  data() {
    return {
      activeIndex: sessionStorage.getItem("index") || "1",
    };
  },
  mounted() {
    this.$bus.$on("changeActive", this.changeActive);
  },
  methods: {
    async menuSelect(index, indexPath, vc) {
      sessionStorage.setItem("index", index);
      this.$router.push(vc.route);
      if (index == 2) {
        let code = localStorage.getItem("code");
        if (code == "true") {
          let timeStamp = Date.parse(new Date());
          let result = await this.$API.reqStatus(timeStamp);
          // console.log(result.data.data);
          //若登入成功
          if (result.data.data.profile) {
            let uid = result.data.data.account.id;
            this.$bus.$emit("emitUid", uid);
          }
        }
      }
    },
  },
};
</script>

<style lang="css" scoped>
.NavMenu {
  width: 200px;
  text-align: center;
}
.father {
  display: flex;
  justify-content: flex-start;
}
</style>