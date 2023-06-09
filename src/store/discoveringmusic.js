import { reqTopPlatList } from "@/api"
const state = {
    topPlatList: [],
    total: ""

}
const actions = {
    async getTopPlatList({ commit }, attribute) {
        let result = await reqTopPlatList(attribute.limit, attribute.cat, attribute.order, attribute.currentPage)
        if (result.data.code === 200) {
            commit("GETTOPPLATLIST", result.data
            )
        }
    }
}
const mutations = {
    GETTOPPLATLIST(state, data
    ) {
        state.topPlatList = data.playlists || []
        state.total = data.total || ""

    }
}
const getters = {

}
export default {
    state,
    actions,
    mutations,
    getters
}