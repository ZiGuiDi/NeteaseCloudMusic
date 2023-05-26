import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import discoveringmusic from "./discoveringmusic"
import mvList from "./mvList"
export default new Vuex.Store({
    modules: {
        discoveringmusic,
        mvList
    }
})