<template>
    <div>
        <my-scroll  class="wrapper" :data="productData" :listenScroll="isScroll" @scroll="_scroll" :pullup="pullup" @pullup="_pullup"  ref="scroll">
        <div class="content">
                <nav-bar>
                    <i class="iconfont icon-scan" slot="left"></i>
                    <div class="search-box-wrapper" slot="center">
                        <i class="iconfont icon-search"></i>
                        <input class="search-box" type="text" title="搜索框" placeholder="开学季5折优惠">
                        <i class="iconfont icon-close"></i>
                    </div>
                    <i class="iconfont icon-msg" slot="right"></i>
                </nav-bar>
                    <!-- swiper 轮播图 -->
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(val,key) in sliders" :key="key">
                        <a :href="val.imgurl">
                            <img :src="val.imgName" alt>
                        </a>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                    <!-- nav 导航 -->
                <nav class="nav">
                    <ul class="nav-list">
                        <li class="nav-item" v-for="(val,key) in navs" :key="key">
                            <a href="#" class="nav-link">
                                <img :src="val.navurl"  class="nav-pic">
                                <span>{{val.title}}</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                    <!-- 产品展示数据 -->
                <product-list @loaded="getProductData" ref="productList"></product-list>
            </div>
        </my-scroll>
         <div class="g-backtop-container">
            <me-backtop :visible="isBacktopVisible" @backtop="backToTop"/>
        </div>
    </div>
</template>

<script>
//  @ --> ./src
// 导入 navbar 组件
import NavBar from "@/components/navbar";
import MyScroll from  "@/components/scroll";
import MeBacktop from "@/components/backtop";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ProductList from "./productList.vue";
    export default {
        name:"home",
        components:{
            // 挂子
            NavBar,
            MyScroll,
            swiper,
            swiperSlide,
            ProductList,
            MeBacktop
        },
        data(){
            return{
                isScroll:true,
                isBacktopVisible:false,
                productData:[],
                page:1,
                totalPage:0,
                pulldown:true,
                pullup:true,
                sliders: [
                    {
                        imgurl:"http://www.sohu.com",
                        imgName:require("./images/1.jpg")
                    },
                    {
                        imgurl:"http://www.baidu.com",
                        imgName:require("./images/2.jpg")
                    },
                    {
                        imgurl:"http://www.jd.com",
                        imgName:require("./images/3.jpg")
                    },
                    {
                        imgurl:"http://www.tmall.com",
                        imgName:require("./images/4.jpg")
                    },
                ],
                swiperOption:{
                    direction:'horizontal',
                    loop:true,
                    pagination:{
                        el:".swiper-pageination"
                    },
                    autoplay:{
                        delay:2500,
                        disableOnInteraction:false
                    }
                },
                navs:[
                    {
                        navurl: require("./images/nav-item-1.png"),
                        title:"热卖"
                    },
                    {
                        navurl: require("./images/nav-item-2.png"),
                        title:"热卖"
                    },
                    {
                        navurl: require("./images/nav-item-3.png"),
                        title:"团购"
                    },
                    {
                        navurl: require("./images/nav-item-4.png"),
                        title:"海鲜"
                    },
                    {
                        navurl: require("./images/nav-item-5.png"),
                        title:"化妆"
                    },
                    {
                        navurl: require("./images/nav-item-6.png"),
                        title:"秒杀"
                    },
                    {
                        navurl: require("./images/nav-item-7.png"),
                        title:"服装"
                    },
                    {
                        navurl: require("./images/nav-item-8.png"),
                        title:"鞋包"
                    },
                ]
            };
        },
        methods:{
            getProductData(obj){
                this.productData = obj.productList;
                this.page = obj.page;//第几页
                this.totalPage = obj.totalPage;//总页数
            },
            _scroll(pos){
                //检测滚动条,滚动高度 pos.y
                console.log(pos);
                console.log(pos.y);
                this.isBacktopVisible = pos.y < 0 && -pos.y > 200;
            },
            // 下拉刷新
            _pulldown(){
                console.log("正在下拉");
                // this.$refs.swiper.update().then(end);
            },
            // 上拉加载
            _pullup(){
                console.log("正在上拉");
     
                if (this.page > this.tatalPage){
                    console.log("没有更多了");
                    this.pullup = fasle;
                    return false;
                }
                this.$refs.productList.update();//重要调用组件product-list中 update()实现ajax数据分页
            },
            backToTop(){
                this.$refs.scroll &&
                this.$refs.scroll.scrollTo(0,0);
            }
        }
    };
</script>

<style scoped>
.navbar{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:row;
    height:50px;
    background-color:#f60;
}
.search-box-wrapper{
    display:flex;
    align-items:center;
    width:100%;
    padding:7px;
    background-color:#fff;
    border-radius:15px;
}
.g-container .iconfont{
    color:#fff;
    font-size:20px;
    font-weight:bold;
}
.search-box{
    flex:1;
    background:none;
    border:none;
    margin:0 9px;
    color:#666;
    line-height: 1.5;
}
/* 轮播图 */
.swiper-container{
    width:100%;
    height:200px;
}
.swiper-container img{
    width:100%;
    height:100%;
}

/* nav 导航样式 */
.nav {
    width:100%;
    padding-top: 0.15rem;
    background-color:#fff;
}
.nav-list{
    display:flex;
    flex-wrap:wrap;
}
.nav-item {
    width:25%;
    margin-bottom:0.15rem;
}
.nav-link {
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
}
.nav-pic{
    width:60%;
    margin-bottom: 0.08rem;
}
/* 滚动条 */
.wrapper{
    width:100%;
    height:800px;
    overflow: hidden;
}
.content{
    height:auto;
}
</style>


