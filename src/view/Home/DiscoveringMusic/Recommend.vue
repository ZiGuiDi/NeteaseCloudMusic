<template>
  <div>
    <!-- banner轮播图 -->
    <el-carousel :interval="3000" type="card" height="200px" trigger="click">
      <el-carousel-item v-for="item in banners" :key="item.argetId">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <div class="singingListHeader">
      <h3>热门歌单<i class="el-icon-arrow-right"></i></h3>
      <ul @click="getCat">
        <li v-for="tag in tags" :key="tag.id">{{ tag.name }}</li>
      </ul>
      <span class="more" @click="more"
        >更多<i class="el-icon-arrow-right"></i
      ></span>
    </div>
    <ul class="topList" @click="goSinginglistdetails($event)">
      <li
        v-for="(topList, index) in topPlatList"
        :key="topList.id"
        :index="index"
      >
        <img :src="topList.coverImgUrl" alt="" :index="index" />
        <span :index="index">{{ topList.name }}</span>
      </li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <el-pagination
      :page-size="limit"
      :pager-count="9"
      layout="prev, pager, next"
      :total="total || 0"
      class="pagination"
      @current-change="changeSize"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "recommend",
  data() {
    return {
      banners: [],
      tags: [],
      limit: 21,
      cat: "华语",
      currentPage: "0",
      offset: "1",
      singingListId: "",
    };
  },
  mounted() {
    this.getBanners();
    this.getHotList();
    this.getList();
  },

  methods: {
    async getBanners() {
      let result = await this.$API.reqBanner();
      if (result.status === 200) {
        this.banners = result.data.banners || [];
      }
    },
    async getHotList() {
      let result = await this.$API.reqHotPlatList();
      if (result.data.code == 200) {
        this.tags = result.data.tags;
      }
    },
    getList() {
      let { limit, cat, currentPage } = this;
      this.$store.dispatch("getTopPlatList", {
        limit,
        cat,
        currentPage,
      });
    },

    getCat(event) {
      this.cat = event.target.innerHTML;
      this.getList();
    },
    changeSize(page) {
      this.currentPage = (page - this.offset) * 21;
      localStorage.setItem("Nav", "first");
      this.getList();
    },
    more() {
      this.$router.push("/home/discoveringmusic/playlist");
      this.$bus.$emit("current");
    },
    goSinginglistdetails(event) {
      let eleIndex = event.target.attributes.index.value;
      this.singingListId = this.topPlatList[eleIndex].id;
      this.$router.push(
        `/home/discoveringmusic/singinglistdetails?id=${this.singingListId}`
      );
    },
  },
  computed: {
    ...mapState({
      topPlatList: (state) => state.discoveringmusic.topPlatList,
      total: (state) => state.discoveringmusic.total,
    }),
  },
};
</script>

<style scoped>
.pagination {
  text-align: center;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
img {
  width: 100%;
  cursor: pointer;
}
.singingListHeader {
  margin: 0;
  display: flex;
}
.singingListHeader ul {
  display: flex;
  padding: 0;
}
li {
  text-align: center;
  padding: 0;
  width: 70px;
  line-height: 30px;
  font-size: 14px;
  cursor: pointer;
}
.topList {
  display: flex;
  flex-wrap: wrap;
}
.topList li {
  padding: 0 5px;
  flex: 13%;
}
.topList li img {
  width: 100%;
}
.topList li span {
  padding: 0 3px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.more {
  line-height: 58px;
  cursor: pointer;

  margin-left: 80px;
}
</style>