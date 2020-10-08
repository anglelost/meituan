<template>
    <div>
        <div class="order-box">
          <div class="menu-box" ref="menuBox">
            <ul>
              <li class="menu-list" :class="{'active': currentIndex == index}" v-for="(item,index) in productList" :key="index"
              @click="changeMenu(index)"
              >{{item.name}}</li>

            </ul>
          </div>
          <div class="prod-box" ref="prodBox">
            <ul>
              <li class="cate-list" v-for="(item,typeIndex) in productList" :key="typeIndex">
                <div class="cate-title">{{item.name}}</div>
                <ul>
                  <li class="prod-list" v-for="(prod,index) in item.content" :key="prod.id">
                    <div class="prod-img-box">
                      <img :src="prod.img" alt="">
                    </div>
                    <div class="prod-info">
                      <div class="name">{{prod.name}}</div>
                      <div class="sale">
                        <span class="num">月销:{{prod.num}}</span>
                        <span>{{prod.up}}:赞</span>
                      </div>
                      <div class="price">{{prod.price}}:￥</div>
                    </div>
                    <div class="add-cart-container">
                      <addCart :type="typeIndex" :index="index"></addCart>
                    </div>
                  </li>

                </ul>
              </li>
            </ul>

          </div>

        </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import addCart from './../../components/add-cart/index'
    export default {
            data(){
              return {
                menuScroll:null,
                prodScroll:null,
                currentIndex:0,
                posY:[],
                menuList:[],
                scrollY:0
              }
            },
              components:{
                addCart
              },


            computed:{
              ...mapState('product',['productList'])
            },
      methods:{
              //点击左侧列表获得指定商品页
        changeMenu(index){
          let prodList = this.$refs.prodBox.getElementsByClassName('cate-list');
          let el = prodList[index];
          this.prodScroll.scrollToElement(el,300);
          this.currentIndex = index;
        },
              //初始化两个菜单栏
              initScroll(){
                this.menuScroll = new BScroll('.menu-box',{
                  bounce:false,
                  click:true //changeBox事件默认值时false，阻止了点击事件。
                });
                this.prodScroll = new BScroll('.prod-box',{
                  bounce:false,
                  click:true,
                  probeType:3
                });
                //获取右侧每个分类的位置 垂直方向位置：
                this.getPosY();
                //获取左侧li的列表
                this.menuList = this.$refs.menuBox.getElementsByClassName('menu-list')
                this.prodScroll.on("scroll",e=>{
                  this.scrollY = Math.abs(Math.round(e.y)); //先四舍五入取整，然后再取绝对值，取到这个滚动条滚动的位置高度
                })
              },
        getPosY(){
          //获取位置 元素垂直定位的位置
          let prodList = this.$refs.prodBox.getElementsByClassName('cate-list');
          let y = 0;
          for(let i=0;i<prodList.length;i++){
            if(i==0){
             this.posY.push(y);
            }else{
             let prevEle = prodList[i-1];
             y += prevEle.offsetHeight;
              this.posY.push(y);
            }
          }
        }
      },
        //声明周期一开始就调用action方法请求数据
      //this.$router.query.id 取到商家id
      created:function(){
        // this.$store.dispatch("product/getProdList", (this.$route.query.id))
        this.$store
          .dispatch("product/getProdList", this.$route.query).then(()=>{
          this.$nextTick(() => {  //初始化better-scroll
            this.initScroll();
          })
        });

      },
      watch:{
              scrollY(val){
                for(let i=0;i<this.posY.length;i++){
                  let pos1 = this.posY[i];
                  let pos2 = this.posY[i+1];
                  if(pos1<=val && pos2 > val){
                   let el = this.menuList[i];
                    this.menuScroll.scrollToElement(el,300,0,-100);
                    this.currentIndex = i;
                    break;
                  }
                }
              }
      }

    };
</script>

<style lang="scss" scoped>
.order-box{
  display: flex;
  height: calc(100vh - 44px);
}
.menu-box{
  width: 1.6rem;
  flex: 00 1.6rem;
  background-color: #d3d3d3;
  height: calc(100vh - 94px);
  overflow: hidden;
}
.menu-list{
  color: #2c3e50;
  font-size: 0.26rem;
  padding: 0.18rem 0.24rem 0.44rem;
  line-height: 0.36rem;
   &.active{
    color: mediumvioletred;

     }
}
.prod-box{
  flex: 1;
  min-width: 0;
  background-color: white;
  height: calc(100vh - 94px);
  overflow: hidden;
}
  .cate-list{
    padding: 0 0.2rem;
    .cate-title{
      height: 0.72rem;
      line-height: 0.72rem;
    }
    .prod-list{
      display: flex;
      margin-bottom: 0.4rem;
      position: relative;
      .prod-img-box{
        width: 1.5rem;
        flex: 00 1.5rem;
        margin-right: 0.15rem;
        img{
          width: 100%;
        }
        }
      .prod-info{
        flex: 1;
        min-width: 0;
        .name{
          font-size: 0.32rem;
          color: #333;
          font-width: bold;
          line-height: 0.45rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 0.04rem;
        }
        .sale{
          color: #666;
          font-size: 11px;
          margin-bottom: 0.06rem;
          .num{
            margin-right: 0.2rem;
          }
          }
        .price{
          color: #fb4e44;
          font-size: 0.36rem;
        }
      }
      .add-cart-container{
          position: absolute;
        right: 0;
        bottom: 0;

      }
    }
  }
</style>
