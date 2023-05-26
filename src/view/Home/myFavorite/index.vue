<template>
  <div>
    <div>
      <el-tabs v-model="activeName" class="box" @tab-click="tabVc">
        <el-tab-pane label="歌曲列表" name="first"
          ><router-view></router-view
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "myFavorite",
  data() {
    return {
      activeName: "first",
    };
  },
  mounted() {},
  methods: {
    tabVc(ele) {
      if (ele.index == "0") {
        this.$router.push("/home/myfavorite/mycollection");
      }
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