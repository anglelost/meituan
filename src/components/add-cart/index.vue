<template>
    <div class="add-cart">
      <span class="iconfont icon-zu" v-if="product.count" @click="redeCart()">

      </span>
      <span class="num" v-if="product.count">{{product.count}}</span>
      <span class="iconfont icon-jiahao1" @click="addCart($event)">
      </span>


    </div>

</template>

<script>
    export default {
      props:["type","index"],
      computed:{
        product(){
          return this.$store.state.product.productList[this.type].content[this.index];
        }

      },
        methods:{
          addCart(e){//点单 加////
            this.$store.commit('product/addCart',{type:this.type,index:this.index});
            this.$store.commit('ball/show',e.target);
          },
          redeCart(){//点单 减
            return this.$store.commit('product/reduceCart',{type:this.type,index:this.index})
          }
        }
    }
</script>

<style lang="scss" scoped>
.add-cart{
  .iconfont{
    font-size: 0.48rem;
    padding: 0.18rem;
    vertical-align: middle;
  }
  .icon-zu{
    color: #e2e3e5;
  }
  .icon-jiahao1{
    color: #ffc134;
    margin-right: 0.18rem;
  }
  .num{
    vertical-align: middle;
  }
}
</style>
