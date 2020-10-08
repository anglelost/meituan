<template>
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
      <ul class="list-container">
        <li class="shop-list" v-for="item in cateList" :key="item.id" @click="goDetail(item.id)">
          <div class="img-box">
            <img :src="item.img">
          </div>
          <div class="info-box">
            <div class="title">{{item.title}}</div>
            <div class="rate-box">
              <div>
                <star :score="item.score">1</star>
                <span class="rate">{{item.score}}</span>
                <span>月销{{item.num}}</span>
              </div>
              <div>
                <span>{{item.minute}}分钟</span>
                <span class="left-line">{{item.distance}}</span>
              </div>
            </div>
            <div class="distribution-box">
              <span>起送{{item.per_capita}}</span>
              <span class="left-line">配送{{item.fee}}</span>
              <span class="left-line">人均{{item.price}}</span>
            </div>
          </div>
        </li>
      </ul>
        </van-list>
    </div>
</template>

<script>

  import star from '../../components/star/index'
  // import axios from 'axios'  //直接调用axios
  import { getStore } from '../../api/home.js'
    export default {

      components: {
        star
      },
      /*         data(){
          return {cateList:[]}  //这里返回的是下面函数执行后返回的数据
          },
      created() {
        axios.get('http://admin.gxxmglzx.com/tender/test/get_store',{
          params:{
            current:0,
            size:10,
           }
        }).then(res=>{
          if(res.data.errcode == 200){
            // console.log(res.data.data.list)
            this.cateList = res.data.data.list
          }else{
            conole.log(res.data.errmsg)
          }
        }).catch(res=>{
          console.log(res);
        })
      }
      */
      data() {
        return {
          current: 0,
          size: 10,
          cateList: [],
          loading:false,
          finished:false,
          total:0
        };
      },
      methods: {
        // 获取商家列表
        getData() {
          getStore(
            {
              current: this.current,
              size: this.size
            }).then(res => {
            // this.cateList = res.data.list;
            this.cateList=this.cateList.concat(res.data.list);
            this.loading = false;
            this.current++;
            this.total = res.data.total;
            if(this.cateList.length >= this.total){
              this.finished = true;
            }
          });
        },
        goDetail(id){
          this.$router.push({path:'/detail',query:{id}})
        }
      },
      // created() {
      //   this.getData(); //vant-list 打开会来调用一次getdata 所以不需要再调用了
      // }
    };

</script>

<style scoped>
 .list-container{
  padding:0.1rem 0.2rem;}
   .shop-list{
     margin: 0.2rem 0 0.5rem 0;
     display: flex;
   }
.img-box{
  width: 1.52rem;
  height: 1.14rem;
  margin-right: 0.16rem;
}
  img{
    width: 100%;
    height: 100%;
  }
.info-box{
  flex: 1;}
  .title{
    font-size: 0.32rem;
    color: #333;
    line-height: 1.4;
    font-width: 600;
  }
.rate-box,.distribution-box{
  display: flex;
  color: #333;
  line-height: 1.4;
  font-family: mtsi-font;
  font-size: 11px;
}
 .rate-box{
   justify-content: space-between;
 }
  .rate{
    margin-right:0.2rem ;
  }
.left-line::before{
  content: "";
  display: inline-block;
  width: 1px;
  height: 6px;
  margin: 0 3px;
  background: #333333;

}
</style>
