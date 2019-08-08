<template>
  <div class="cinema_body">
    <ul>
      <li v-for="item in cinemaList" :key="item.id">
        <div>
          <span>{{ item.nm }}</span> 
          <span class="q">
            <span class="price">{{ item.sellPrice }}</span> 元起
          </span>
        </div>
        <div class="address">
          <span>{{ item.addr }}</span>
          <span>{{ item.distance }}</span>
        </div>
        <div class="card">
          <div class="bl" v-if="item.tag.hallTypeVOList" v-for="(item2,key) in item.tag.hallTypeVOList" :key="key">{{ item2.name }}</div>
          <div v-if="item.tag.vipTag">{{ item.tag.vipTag }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CinemaList",
  data(){
    return{
      cinemaList: []
    }
  },
  mounted() {
    this.axios.get('/api/cinemaList?cityId=10').then((res)=>{
      if(res.data.msg === 'ok'){
        this.cinemaList = res.data.data.cinemas;
      }
      
    })
  }
};
</script>

<style lang="scss" scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>