import { reqAllMv } from "@/api"
const state = {
    mvList: [],
    total: ""
}
const actions = {
    async getNewMv({ commit }, parameter) {
        let result = await reqAllMv(parameter.option, parameter.limit, parameter.currentPage)
        // console.log(result);
        if (result.data.code == 200) {
            commit("GETNEWMV", result.data)
        }

    }
}
const mutations = {
    GETNEWMV(state, data) {
        state.mvList = data.data
        if (data.count) {
            state.total = data.count
        }
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