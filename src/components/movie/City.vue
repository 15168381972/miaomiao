<template>
  <div class="city_body">
    <div class="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li v-for="item in hotList" :key="item.id">{{ item.nm }}</li>
        </ul>
      </div>
      <div class="city_sort" ref="city_sort">
        <div v-for="item in cityList" :key="item.index">
          <h2>{{ item.index }}</h2>
          <ul>
            <li v-for="item2 in item.list" :key="item2.id">{{ item2.nm }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(item,index) in cityList" :key="item.index" v-on:touchstart="handleToIndex(index)">{{ item.index }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  data(){
    return{
      cityList: [],
      hotList: []
    }
  },
  mounted() {
    this.axios.get("/api/cityList").then(res => {
      console.log(res);
      if (res.data.msg == "ok") {
        var cities = res.data.data.cities;
        var { cityList, hotList} = this.formatCityList(cities);
        
        this.cityList = cityList;
        this.hotList = hotList;
      }
    });
  },
  methods: {
    formatCityList(cities) {
      var cityList = [];
      var hotList = [];

      for (var i = 0; i < cities.length; i++) {
        var firstLetter = cities[i].py.substring(0,1).toUpperCase();
        //如果，firstLetter不存在，则push一个对线
        if (toCom(firstLetter)) {
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        } else {
          //若firstLetter已经存在，累加到已有对应index的list中
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
            }
          }
        }

        //获取hot城市
        if(cities[i].isHot === 1){
          hotList.push(cities[i]);
        }
      }

      // console.log(hotList);

      //给cityList按照index排序
      cityList.sort((n1,n2)=>{
        if(n1.index > n2.index){
          return 1;
        }else if(n1.index < n2.index){
          return -1;
        }else{
          return 0;
        }
      })

      //此方法用于判断，firstLetter是否已经存在
      function toCom(firstLetter) {
        for (var i=0; i<cityList.length; i++) {
          //如果cityList中已存在该firstLetter，则不添加
          if (cityList[i].index === firstLetter) {
            return false;
          }
          //如果cityList中不存在该firstLetter，则新增
        }
        return true;
      }

      return{
        cityList,
        hotList
      }
    },
    //点击index跳到对应
    handleToIndex(index){
      var h2 = this.$refs.city_sort.getElementsByTagName('h2');
      
      //city_sort的parentNode即city_list
      this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop ;
    }
  }
};
</script>

<style lang="scss" scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>