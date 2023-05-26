<template>
  <div>
    <el-tabs v-model="activeName" class="box" @tab-click="tab">
      <el-tab-pane label="个性推荐" name="first">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="second">
        <router-view></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PlayList from "./playList.vue";
import Recommend from "@/view/Home/DiscoveringMusic/Recommend";
export default {
  name: "DiscoveringMusic",
  data() {
    return {
      activeName: localStorage.getItem("Nav") || "first",
    };
  },
  components: {
    PlayList,
    Recommend,
  },
  mounted() {
    if (this.$route.name === "Recommend") {
      localStorage.setItem("Nav", "first");
      this.activeName = "first";
      this.$router.push("/home/discoveringmusic/recommend");
    }
    this.$bus.$on("current", this.demo);
  },
  methods: {
    tab(ele) {
      if (ele.index == 0) {
        this.$router.push("/home/discoveringmusic/recommend");
        localStorage.setItem("Nav", this.activeName);
      } else if (ele.index == 1) {
        this.$router.push("/home/discoveringmusic/playlist");
        localStorage.setItem("Nav", this.activeName);
      }
    },
    demo() {
      this.activeName = "second";
    },
  },
};
</script>

<style scoped>
.box {
  width: 1200px;
  margin-top: 10px;
  margin-left: 30px;
}
</style>