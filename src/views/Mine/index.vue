<template>
  <div id="main">
      <Header title="我的喵喵"/>
        <div id="main">
          <Login/>
        </div>
      <TabBar/>
  </div>
</template>

<script>

import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Login from '@/components/login/Login';

export default {
  name: "Mine",
  components: {
      Header,
      TabBar,
      Login
  }
};
</script>

<style lang="scss" scoped>
</style>