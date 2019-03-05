<template>
  <div id="app" class="g-container">
    <div class="g-view-container">
     <keep-alive>
        <transition :name="transitionName">
          <!-- 显示不同的组件页面 -->
          <router-view></router-view>
        </transition>
     </keep-alive>
    </div>
    <div class="g-footer-container">
      <!-- 底部导航列表超链接 -->
      <tab-bar></tab-bar>
    </div>
  </div>
</template>

<script>
// 哈哈我在这
// 导入 tabbar组件
// import loading from "@/compnents/loading";55
import TabBar from "@/components/tabbar";
export default {
  name: 'App',
  data(){
    return{
      transitionName:"fold-left"
    };
  },
  watch: {
    // watch $route 决定使用哪种过渡
    $route(to, from) {
      console.log(from.path); //
      console.log(to.path); //
      //to、from是最基本的路由对象，分别表示从(from)某个页面跳转到(to)另一个页面,to.path（表示要跳转到的路由地址），from.path同理。
      const routerDeep = [
        "/home",
        "/category",
        "/cart",
        "/personal",
        "/product"
      ];
      //找到to.path和from.path在routerDeep数组中的下标
      const toDepth = routerDeep.indexOf(to.path);
      const fromDepth = routerDeep.indexOf(from.path);
      this.transitionName = toDepth > fromDepth ? "fold-left" : "fold-right";
    }
  },
  components: {
    TabBar
  }
};
</script>

<style socped>
.fold-left-enter-active{
  animation-name:fold-left-in;
  animation-duration: 0.3s;
}
.fold-left-leave-active {
  animation-name:fold-left-out;
  animation-duration:0.3s;
}
@keyframes fold-left-in {
  0% {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    /* visibility: visible; */
  }
  /*50% {
      transform: translate3d(50%, 0, 0);
    }*/
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-left-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  /*50% {
      transform: translate3d(-50%, 0 , 0);
    }*/
  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    /* visibility: hidden; */
  }
}

.fold-right-enter-active {
  animation-name: fold-right-in;
  animation-duration: 0.3s;
}
.fold-right-leave-active {
  animation-name: fold-right-out;
  animation-duration: 0.3s;
}
@keyframes fold-right-in {
  0% {
    width: 100%;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    /* visibility: visible; */
  }
  /*50% {
      transform: translate3d(50%, 0, 0);
    }*/
  100% {
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-right-out {
  0% {
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  /*50% {
      transform: translate3d(-50%, 0 , 0);
    }*/
  100% {
    width: 100%;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    /* visibility: hidden; */
  }
}
</style>
