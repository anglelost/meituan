<template>
    <div class="scrollBox">
      <div>
        <sellerHeader :seller="seller"></sellerHeader>
        <van-tabs v-model="active" sticky animated color="#ffda41">
          <van-tab title="菜单">
            <Order></Order>
          </van-tab>
          <van-tab title="评价">
            <comment></comment>
          </van-tab>
          <van-tab title="商家">
            <seller :seller="seller"></seller>
          </van-tab>
        </van-tabs>
      </div>
        <div>
          <cart :seller="seller"></cart>
        </div>
    </div>
</template>

<script>
  import { getStoreById } from '../../api/detail.js'
  import Order from './order'
  import sellerHeader from './seller-header'
  import BScroll from 'better-scroll'
  import cart from './cart'
  import comment from './../comment/index'
  import seller from './../seller/index'
    export default {
            components:{
              sellerHeader,
              Order,
              cart,
              comment,
              seller
            },

          data(){
              return {
                seller:[],
                active:0,
                scrollBox:null
              }
          },
       methods:{
         getStoreMsg(){
           //请求id =this.$route.query.id get_store_id
           getStoreById({id: this.$route.query.id}).then(res=>{
             // console.log(res)
             this.seller = res.data;
           })

         }
       },
      mounted() {
              this.scrollBox=new BScroll('.scrollBox',{
                bounce:false,
                click:true
              })
      },
      created(){
         this.getStoreMsg()
      }
    };
</script>

<style scoped>
.scrollBox{
  height: 100vh;
}
</style>
