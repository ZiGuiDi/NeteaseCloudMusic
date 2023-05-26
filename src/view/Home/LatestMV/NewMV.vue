<template>
  <div>
    <ul class="option" @click="getOption($event)">
      <li class="color">内地</li>
      <li>港台</li>
      <li>欧美</li>
      <li>日本</li>
      <li>韩国</li>
    </ul>
    <ul class="mvlist" @click="goVideo">
      <li v-for="(list, index) in mvList" :key="index" :index="index">
        <img :src="list.cover" alt="" :title="list.name" :index="index" />
        <span :index="index">{{ list.name }}</span>
      </li>
      <li index=""></li>
      <li index=""></li>
      <li index=""></li>
      <li index=""></li>
    </ul>
    <el-pagination
      :page-size="limit"
      :pager-count="9"
      layout="prev, pager, next"
      :total="total || 0"
      class="pagination"
      :current-page="currentpage"
      @current-change="changeSize"
    >
    </el-pagination>
    <el-backtop>
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          }
        "
      >
        TOP
      </div>
    </el-backtop>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NewMV",
  data() {
    return {
      option: "内地",
      limit: 30,
      offset: "1",
      currentPage: 0,
      currentpage: 1,
    };
  },
  mounted() {
    let { option, limit, currentPage } = this;
    this.getNewMv(option, limit, currentPage);
  },
  methods: {
    getNewMv(option, limit, currentPage) {
      this.$store.dispatch("getNewMv", { option, limit, currentPage });
    },
    changeSize(page) {
      this.currentPage = (page - this.offset) * 30;
      this.currentpage = this.currentPage / 30 + 1;
      this.getNewMv(this.option, this.limit, this.currentPage);
    },
    getOption(event) {
      let { limit } = this;
      this.option = event.target.innerHTML;
      this.getNewMv(this.option, limit, 0);
      let lis = document.querySelector(".option").querySelectorAll("li");
      lis.forEach((ele) => {
        ele.classList = "";
      });
      event.target.classList = "color";
      this.currentpage = 1;
    },
    async goVideo(event) {
      if (event.target.attributes.index.value) {
        let eleIndex = event.target.attributes.index.value || undefined;
        let MVId = this.mvList[eleIndex].id;
        this.$router.push(`/home/latestmv/videoplayer?id=${MVId}`);
        let a = await this.$API.reqMvUrl(MVId);
        console.log(a);
      }
    },
  },
  computed: {
    ...mapState({
      mvList: (state) => state.mvList.mvList,
      total: (state) => state.mvList.total,
    }),
  },
};
</script>

<style scoped>
.mvlist {
  display: flex;
  flex-wrap: wrap;
}
.mvlist li {
  cursor: pointer;
  padding: 10px;
  flex: 15%;
  list-style: none;
}
.mvlist img {
  width: 100%;
}
.mvlist span {
  padding: 0 2px;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.option {
  display: flex;
}
.option li {
  list-style: none;
  cursor: pointer;

  padding: 0 10px;
}
.pagination {
  text-align: center;
}
.color {
  color: #1989fa;
}
</style>