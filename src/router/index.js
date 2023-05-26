import Vue from "vue"
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//把VueRouter原型身上的push方法保存在originPush里面
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
//重写replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
let router = new VueRouter({
    routes: [
        {
            path: '/home',
            name: "Home",
            component: () => import("@/view/Home"),
            children: [
                {
                    path: "/home/discoveringmusic",
                    name: "DiscoveringMusic",
                    meta: { isShow: true },
                    component: () => import("@/view/Home/DiscoveringMusic"),
                    children: [
                        {
                            path: "/home/discoveringmusic/recommend",
                            name: "Recommend",
                            component: () => import("@/view/Home/DiscoveringMusic/Recommend"),
                            meta: { isShow: true },
                        },
                        {
                            path: "/home/discoveringmusic/singinglistdetails",
                            name: "singingListDetails",
                            component: () => import("@/view/Home/DiscoveringMusic/singingListDetails"),
                            meta: { isShow: true },

                        },

                        {
                            path: "/home/discoveringmusic/playlist",
                            name: "playList",
                            component: () => import("@/view/Home/DiscoveringMusic/playList"),
                            meta: { isShow: true },
                        },
                        {
                            path: "/home/discoveringmusic",
                            redirect: "/home/discoveringmusic/recommend"
                            // redirect: "/home"
                        }
                    ],
                },
                {
                    path: "/home/myfavorite",
                    name: "myFavorite",
                    component: () => import("@/view/Home/myFavorite"),
                    // meta: { isShow: true },
                    children: [
                        {
                            path: "/home/myfavorite/mycollection",
                            name: "myCollection",
                            component: () => import("@/view/Home/myFavorite/myCollection"),
                            meta: { isShow: true },
                        },
                        {
                            path: "/home/myfavorite",
                            redirect: "/home/myfavorite/mycollection"
                        }
                    ]
                },
                {
                    path: "/home/latestmv",
                    name: "LatestMV",
                    component: () => import("@/view/Home/LatestMV"),
                    // meta: { isShow: true },
                    children: [
                        {
                            path: "/home/latestmv/newmv",
                            component: () => import("@/view/Home/LatestMV/NewMV")
                        },
                        {
                            path: "/home/latestmv/videoplayer",
                            component: () => import("@/view/Home/LatestMV/videoPlayer")
                        },
                        {
                            path: "/home/latestmv",
                            redirect: "/home/latestmv/newmv"
                        }
                    ]

                },
                {
                    path: "/home",
                    redirect: "/home/discoveringmusic/recommend"
                    // redirect: "/home"
                }
            ],
        },
        {
            path: "/search",
            name: "Search",
            component: () => import("@/view/Search"),
            meta: { isShow: true }

        },
        {
            path: "*",
            redirect: "/home/discoveringmusic/recommend"
            // redirect: "/home"
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.path == "/home/myfavorite/mycollection") {
        let code = localStorage.getItem("code")
        if (code == "true") {
            next()
        }
        else {
            alert("请登入")
        }
    }
    else {
        next()
        console.log();
    }

})
export default router