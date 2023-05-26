<template>
  <div class="playList">
    <el-collapse accordion class="collapse">
      <el-collapse-item :title="cat + ' 选择分类'">
        <el-button size="mini"
          ><a href="javascript:void(0)">全部风格</a></el-button
        >
        <el-button type="danger" size="mini" @click="getHotPlayList"
          >热门</el-button
        >
        <hr />
        <dl v-for="(categore, index1) in all.categories" :key="index1">
          <dt>
            {{ categore }}
          </dt>
          <dd
            v-for="(item, index) in all.sub"
            :key="index"
            v-show="item.category == index1"
            @click="getCateGore(item)"
          >
            <a href="javascript:void(0)">{{ item.name }}</a>
          </dd>
        </dl>
      </el-collapse-item>
    </el-collapse>
    <ul class="topList" @click="goSinginglistdetails($event)">
      <li v-for="(topList, index) in topPlatList" :key="index" :index="index">
        <img :src="topList.coverImgUrl" alt="" :index="index" />
        <!-- <span class="playCount">1111 </span> -->
        <span class="text" :index="index">{{ topList.name }}</span>
      </li>
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
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "playList",
  data() {
    return {
      all: {
        categories: {},
        sub: [],
      },
      cat: "全部",
      limit: 48,
      offset: "1",
      currentPage: "0",
    };
  },
  mounted() {
    this.getPlayList();
    this.getList();
  },
  methods: {
    async getPlayList() {
      let ruselt = await this.$API.reqPlayList();
      this.all.categories = ruselt.data.categories;
      this.all.sub = ruselt.data.sub;
    },
    getCateGore(item) {
      this.cat = item.name;
      this.getList();
    },
    //获取热门歌单
    getHotPlayList() {
      this.order = "hot";
      this.getList();
    },
    getList() {
      let { limit, cat, order, currentPage } = this;
      this.$store.dispatch("getTopPlatList", {
        limit,
        cat,
        order,
        currentPage,
      });
    },
    changeSize(page) {
      this.currentPage = (page - this.offset) * 48;
      this.getList();
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

<style scoped >
a {
  text-decoration: none;
  color: #000;
}
li {
  list-style: none;
}
.category {
  top: 0;
  left: 0;
  font-weight: normal;
  margin-right: 10px;
}
dl {
  width: 720px;
  border-bottom: 1px solid #c4c3c3;
  padding: 6px 0;
  zoom: 1;
  display: flex;
  flex-wrap: wrap;
}
dt {
  font-size: 14px;
  width: 60px;
  line-height: 47px;
  text-align: center;
  font-weight: 700;
}
dd {
  margin: 10px;
  padding: 0 20px;
  padding: 3px 0 0;
  overflow: hidden;
}
.topList {
  display: flex;
  flex-wrap: wrap;
}
li {
  flex: 14%;
  padding: 10px;
}
.playList img {
  width: 100%;
  cursor: pointer;
}
.text {
  padding: 0 3px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.playCount {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 10px;
  height: 20px;
}
.pagination {
  text-align: center;
}
</style>