(function(){"use strict";var e={8329:function(e,t,n){var r={};n.r(r),n.d(r,{reqAllMv:function(){return K},reqBanner:function(){return _},reqDetail:function(){return O},reqDynamic:function(){return M},reqHotPlatList:function(){return A},reqLikeList:function(){return H},reqLoginQr:function(){return N},reqLoginQrCheck:function(){return U},reqLoginQrCreate:function(){return x},reqLogout:function(){return Q},reqMDetail:function(){return z},reqMvUrl:function(){return V},reqPlayList:function(){return I},reqSearch:function(){return B},reqStatus:function(){return Z},reqTopPlatList:function(){return D},reqTrack:function(){return j},reqUserDetail:function(){return F}});var i=n(6369),o=function(){var e=this,t=e._self._c;return t("div",[t("Top"),t("router-view"),e.$route.meta.isShow?t("audio",{attrs:{controls:"",autoplay:"",src:e.musicUrl}}):e._e()],1)},a=[],s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"frame_work"},[t("div",[t("el-input",{staticClass:"search",attrs:{placeholder:"请输入音乐名字",clearable:"",size:"medium","prefix-icon":"el-icon-search"},model:{value:e.keywords,callback:function(t){e.keywords=t},expression:"keywords"}}),t("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"medium"},on:{click:e.goSearch}},[e._v(" 搜索 ")])],1),t("div",[e.isSearch?t("router-link",{staticClass:"topNav",attrs:{to:"/home/discoveringmusic"},nativeOn:{click:function(t){e.isSearch=!e.isSearch}}},[e._v("发现音乐")]):e._e(),t("span",{staticClass:"userInfo"},[e._v(e._s(e.nickname)+" "),t("img",{attrs:{src:e.avatarUrl,alt:""}})]),e.isShow?t("el-button",{staticClass:"topNav",attrs:{type:"text"},on:{click:e.open}},[e._v("登录")]):e._e(),e.isShow?e._e():t("el-button",{staticClass:"topNav",attrs:{type:"text"},on:{click:e.logout}},[e._v("退出登录")])],1)])},c=[],l=(n(7658),{name:"Top",data(){return{keywords:"",unikey:"",qrimg:"",timer:"",code:"",nickname:"",avatarUrl:"",isShow:!0,isInHome:!0,isSearch:!1}},mounted(){this.loginStatus()},methods:{goSearch(){this.keywords?(this.$router.push(`/search?keywords=${this.keywords}`),this.keywords=void 0,this.$bus.$emit("getMusic")):alert("请输入内容"),this.isSearch=!this.isSearch},async getLoginQrKey(){let e=await this.$API.reqLoginQr();200===e.data.code&&(this.unikey=e.data.data.unikey,this.getLoginQrCreate(this.unikey))},async getLoginQrCreate(e){let t=Date.parse(new Date),n=await this.$API.reqLoginQrCreate(e,t);200===n.data.code&&(this.qrimg=n.data.data.qrimg,this.$alert(`<img src=${this.qrimg} >`,"请扫码登入",{dangerouslyUseHTMLString:!0,center:!0,showConfirmButton:!1,beforeClose:(e,t,n)=>{"cancel"===e&&(clearInterval(this.timer),this.timer=null,n())}}).catch((()=>{})),this.timer=setInterval((async()=>{let e=Date.parse(new Date),t=await this.$API.reqLoginQrCheck(this.unikey,e);this.code=t.data.code,803===this.code&&(clearInterval(this.timer),this.timer=null,this.$msgbox.close(),this.loginStatus(),localStorage.setItem("code",!0))}),2e3))},open(){this.getLoginQrKey()},async loginStatus(){let e=Date.parse(new Date),t=await this.$API.reqStatus(e);if(t.data.data.profile){this.nickname=t.data.data.profile.nickname,this.avatarUrl=t.data.data.profile.avatarUrl,this.isShow=!this.isShow;let e=t.data.data.account.id;this.$bus.$emit("emitUid",e)}},async logout(){let e=Date.parse(new Date);await this.$API.reqLogout(e);this.loginStatus(),this.nickname="",this.avatarUrl="",this.isShow=!this.isShow,localStorage.removeItem("code"),this.$router.push("/home/discoveringmusic")}}}),u=l,d=n(1001),h=(0,d.Z)(u,s,c,!1,null,"3b39439c",null),m=h.exports,f={name:"App",data(){return{musicUrl:""}},components:{Top:m},mounted(){this.$bus.$on("musicId",this.getMusicId)},methods:{async getDynamic(e){let t=await this.$API.reqDynamic(e);200===t.data.code&&(this.musicUrl=t.data.data[0].url)},getMusicId(e){this.getDynamic(e)}}},p=f,v=(0,d.Z)(p,o,a,!1,null,null,null),g=v.exports,y=n(8499),w=n.n(y),b=n(2631);i["default"].use(b.ZP);let k=b.ZP.prototype.push,$=b.ZP.prototype.replace;b.ZP.prototype.push=function(e,t,n){t&&n?k.call(this,e,t,n):k.call(this,e,(()=>{}),(()=>{}))},b.ZP.prototype.replace=function(e,t,n){t&&n?$.call(this,e,t,n):$.call(this,e,(()=>{}),(()=>{}))};let C=new b.ZP({routes:[{path:"/home",name:"Home",component:()=>n.e(188).then(n.bind(n,5188)),children:[{path:"/home/discoveringmusic",name:"DiscoveringMusic",meta:{isShow:!0},component:()=>n.e(23).then(n.bind(n,23)),children:[{path:"/home/discoveringmusic/recommend",name:"Recommend",component:()=>n.e(249).then(n.bind(n,8249)),meta:{isShow:!0}},{path:"/home/discoveringmusic/singinglistdetails",name:"singingListDetails",component:()=>n.e(639).then(n.bind(n,4639)),meta:{isShow:!0}},{path:"/home/discoveringmusic/playlist",name:"playList",component:()=>n.e(836).then(n.bind(n,6836)),meta:{isShow:!0}},{path:"/home/discoveringmusic",redirect:"/home/discoveringmusic/recommend"}]},{path:"/home/myfavorite",name:"myFavorite",component:()=>n.e(342).then(n.bind(n,2342)),children:[{path:"/home/myfavorite/mycollection",name:"myCollection",component:()=>n.e(748).then(n.bind(n,7748)),meta:{isShow:!0}},{path:"/home/myfavorite",redirect:"/home/myfavorite/mycollection"}]},{path:"/home/latestmv",name:"LatestMV",component:()=>n.e(463).then(n.bind(n,7463)),children:[{path:"/home/latestmv/newmv",component:()=>n.e(321).then(n.bind(n,5321))},{path:"/home/latestmv/videoplayer",component:()=>n.e(918).then(n.bind(n,918))},{path:"/home/latestmv",redirect:"/home/latestmv/newmv"}]},{path:"/home",redirect:"/home/discoveringmusic/recommend"}]},{path:"/search",name:"Search",component:()=>n.e(858).then(n.bind(n,7858)),meta:{isShow:!0}},{path:"*",redirect:"/home/discoveringmusic/recommend"}]});C.beforeEach(((e,t,n)=>{if("/home/myfavorite/mycollection"==e.path){let e=localStorage.getItem("code");"true"==e?n():alert("请登入")}else n(),console.log()}));var S=C,T=n(3822),E=n(4161),L=n(530),P=n.n(L);const q=E.Z.create({timeout:5e3});q.interceptors.request.use((function(e){return P().start(),e}),(function(e){return Promise.reject(e)})),q.interceptors.response.use((function(e){return P().done(),e}),(function(e){return Promise.reject(e)}));var G=q;const _=()=>G({url:"/banner",method:"GET",withCredentials:!0}),I=()=>G({url:"/playlist/catlist",method:"GET",withCredentials:!0}),A=()=>G({url:"/playlist/hot",method:"GET",withCredentials:!0}),D=(e,t,n,r)=>G({url:`/top/playlist?cat=${t}&limit=${e}&order=${n||"'new'"}&offset=${r}`,method:"GET",withCredentials:!0}),O=e=>G({url:`/playlist/detail?id=${e} `,method:"GET",withCredentials:!0}),j=(e,t,n)=>G({url:`/playlist/track/all?id=${e}&limit=${t}&offset=${n}`,method:"GET",withCredentials:!0}),M=e=>G({url:`/song/url/v1id=?id=${e}&level=jymaster `,method:"GET",withCredentials:!0}),N=()=>G({url:"/login/qr/key",method:"GET",withCredentials:!0}),x=(e,t)=>G({url:`/login/qr/create?key=${e}&qrimg=true&timestamp=${t}`,method:"GET",withCredentials:!0}),U=(e,t)=>G({url:`/login/qr/check?key=${e}&timestamp=${t}`,method:"GET",withCredentials:!0}),Z=e=>G({url:`login/status?timestamp=${e}`,method:"GET",withCredentials:!0}),Q=e=>G({url:`/logout?timestamp=${e}`,method:"GET",withCredentials:!0}),B=(e,t,n,r)=>G({url:`cloudsearch?keywords=${e}&limit=${t}&offset=${n}&timestamp=${r}`,method:"GET",withCredentials:!0}),F=e=>G({url:`/user/playlist?uid=${e}`,method:"GET",withCredentials:!0}),H=e=>G({url:`/likelist?uid=${e}`,method:"GET",withCredentials:!0}),K=(e,t,n)=>G({url:`/mv/all?area=${e}&limit=${t}&offset=${n}`,method:"GET",withCredentials:!0}),V=e=>G({url:` /mv/url?id=${e}`,method:"GET",withCredentials:!0}),z=e=>G({url:` /mv/detail?mvid=${e}`,method:"GET",withCredentials:!0}),W={topPlatList:[],total:""},R={async getTopPlatList({commit:e},t){let n=await D(t.limit,t.cat,t.order,t.currentPage);200===n.data.code&&e("GETTOPPLATLIST",n.data)}},J={GETTOPPLATLIST(e,t){e.topPlatList=t.playlists||[],e.total=t.total||""}},X={};var Y={state:W,actions:R,mutations:J,getters:X};const ee={mvList:[],total:""},te={async getNewMv({commit:e},t){let n=await K(t.option,t.limit,t.currentPage);200==n.data.code&&e("GETNEWMV",n.data)}},ne={GETNEWMV(e,t){e.mvList=t.data,t.count&&(e.total=t.count)}},re={};var ie={state:ee,actions:te,mutations:ne,getters:re};i["default"].use(T.ZP);var oe=new T.ZP.Store({modules:{discoveringmusic:Y,mvList:ie}});i["default"].config.productionTip=!1,i["default"].use(w()),new i["default"]({render:e=>e(g),beforeCreate(){i["default"].prototype.$API=r,i["default"].prototype.$bus=this},router:S,store:oe}).$mount("#app")}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}n.m=e,function(){n.amdO={}}(),function(){var e=[];n.O=function(t,r,i,o){if(!r){var a=1/0;for(u=0;u<e.length;u++){r=e[u][0],i=e[u][1],o=e[u][2];for(var s=!0,c=0;c<r.length;c++)(!1&o||a>=o)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(s=!1,o<a&&(a=o));if(s){e.splice(u--,1);var l=i();void 0!==l&&(t=l)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,i,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{23:"77858a78",188:"ff39e3ec",249:"f0e6f9d3",321:"f4a2e04d",342:"3b8b10f8",463:"49d77da8",639:"f79dfcf3",748:"d4f898ad",836:"b9690a94",858:"cd763328",918:"5c6a8a0f"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{23:"3ef5be0d",188:"80726bd3",249:"f86618e0",321:"49874e23",342:"af26d8b4",463:"011b10c4",639:"938fdf8e",748:"82931c11",836:"ab0a42a9",858:"1b28798c",918:"6afe6ae8"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="project:";n.l=function(r,i,o,a){if(e[r])e[r].push(i);else{var s,c;if(void 0!==o)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var d=l[u];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==t+o){s=d;break}}s||(c=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+o),s.src=r),e[r]=[i];var h=function(t,n){s.onerror=s.onload=null,clearTimeout(m);var i=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),i&&i.forEach((function(e){return e(n)})),t)return t(n)},m=setTimeout(h.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=h.bind(null,s.onerror),s.onload=h.bind(null,s.onload),c&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,n,r,i){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var a=function(n){if(o.onerror=o.onload=null,"load"===n.type)r();else{var a=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=a,c.request=s,o.parentNode&&o.parentNode.removeChild(o),i(c)}};return o.onerror=o.onload=a,o.href=t,n?n.parentNode.insertBefore(o,n.nextSibling):document.head.appendChild(o),o},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var i=n[r],o=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(o===e||o===t))return i}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){i=a[r],o=i.getAttribute("data-href");if(o===e||o===t)return i}},r=function(r){return new Promise((function(i,o){var a=n.miniCssF(r),s=n.p+a;if(t(a,s))return i();e(r,s,null,i,o)}))},i={143:0};n.f.miniCss=function(e,t){var n={23:1,188:1,249:1,321:1,342:1,463:1,639:1,748:1,836:1,858:1,918:1};i[e]?t.push(i[e]):0!==i[e]&&n[e]&&t.push(i[e]=r(e).then((function(){i[e]=0}),(function(t){throw delete i[e],t})))}}}(),function(){var e={143:0};n.f.j=function(t,r){var i=n.o(e,t)?e[t]:void 0;if(0!==i)if(i)r.push(i[2]);else{var o=new Promise((function(n,r){i=e[t]=[n,r]}));r.push(i[2]=o);var a=n.p+n.u(t),s=new Error,c=function(r){if(n.o(e,t)&&(i=e[t],0!==i&&(e[t]=void 0),i)){var o=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+o+": "+a+")",s.name="ChunkLoadError",s.type=o,s.request=a,i[1](s)}};n.l(a,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var i,o,a=r[0],s=r[1],c=r[2],l=0;if(a.some((function(t){return 0!==e[t]}))){for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(c)var u=c(n)}for(t&&t(r);l<a.length;l++)o=a[l],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},r=self["webpackChunkproject"]=self["webpackChunkproject"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(8329)}));r=n.O(r)})();
//# sourceMappingURL=app.9267c04f.js.map