import requests from "./requests"
//获取轮播图
export const reqBanner = () =>
    requests({
        url: "/banner",
        method: "GET",
        withCredentials: true
    })

// 歌单分类/playlist/catlist
export const reqPlayList = () =>
    requests({
        url: "/playlist/catlist",
        method: "GET",
        withCredentials: true
    })

//热门歌单分类 /playlist/hot
export const reqHotPlatList = () =>
    requests({
        url: "/playlist/hot",
        method: "GET",
        withCredentials: true
    })
// 歌单 ( 网友精选碟 ) /top/playlist
export const reqTopPlatList = (limit, cat, order, offset) => {
    return requests({
        url: `/top/playlist?cat=${cat}&limit=${limit}&order=${order || "'new'"}&offset=${offset}`,
        method: "GET",
        withCredentials: true
    })

}

//获取歌单详情 /playlist/highquality/tags
export const reqDetail = (id) =>
    requests({
        url: `/playlist/detail?id=${id} `,
        method: "GET",
        withCredentials: true
    })
//获取歌单所有歌曲 /playlist/track/all
export const reqTrack = (id, limit, offset) =>
    requests({
        url: `/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`,
        method: "GET",
        withCredentials: true
    })
//  /playlist/detail/dynamic 
export const reqDynamic = (id) =>
    requests({
        url: `/song/url/v1id=?id=${id}&level=jymaster `,
        method: "GET",
        withCredentials: true
    })
//二维码登入接口
//1. 二维码 key 生成接口 /login/qr/key
export const reqLoginQr = () =>
    requests({
        url: `/login/qr/key`,
        method: "GET",
        withCredentials: true
    })
//2. 二维码生成接口 /login/qr/create
export const reqLoginQrCreate = (key, timeStamp) =>
    requests({
        url: `/login/qr/create?key=${key}&qrimg=true&timestamp=${timeStamp}`,
        method: "GET",
        withCredentials: true
    })
// 二维码检测扫码状态接口/login/qr/check
export const reqLoginQrCheck = (key, timeStamp) =>
    requests({
        url: `/login/qr/check?key=${key}&timestamp=${timeStamp}`,
        method: "GET",
        withCredentials: true
    })
// 登录状态/login/status
export const reqStatus = (timestamp) =>
    requests({
        url: `login/status?timestamp=${timestamp}`,
        method: "GET",
        withCredentials: true
    })
//退出登录 /logout
export const reqLogout = (timestamp) =>
    requests({
        url: `/logout?timestamp=${timestamp}`,
        method: "GET",
        withCredentials: true
    })
//搜索  /search 或者 /cloudsearch(更全)
export const reqSearch = (keywords, limit, currentPage, timestamp) =>
    requests({
        url: `cloudsearch?keywords=${keywords}&limit=${limit}&offset=${currentPage}&timestamp=${timestamp}`,
        method: "GET",
        withCredentials: true
    })
//获取用户歌单情/user/playlist?uid
export const reqUserDetail = (uid) =>
    requests({
        url: `/user/playlist?uid=${uid}`,
        method: "GET",
        withCredentials: true
    })
//喜欢音乐列表 /likelist
export const reqLikeList = (uid) =>
    requests({
        url: `/likelist?uid=${uid}`,
        method: "GET",
        withCredentials: true
    })
//全部 mv /mv/all
export const reqAllMv = (option, limit, currentPage) =>
    requests({
        url: `/mv/all?area=${option}&limit=${limit}&offset=${currentPage
            }`,
        method: "GET",
        withCredentials: true
    })
//mv 地址 /mv/url
export const reqMvUrl = (id) =>
    requests({
        url: ` /mv/url?id=${id}`,
        method: "GET",
        withCredentials: true
    })
//获取 mv 数据 /mv/detail
export const reqMDetail = (id) =>
    requests({
        url: ` /mv/detail?mvid=${id}`,
        method: "GET",
        withCredentials: true
    })