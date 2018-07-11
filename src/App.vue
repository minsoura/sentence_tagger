<template>
  <div id="app">
    <Navbar></Navbar>
    <div id="content">
      <router-view style="margin:0px; padding-top:10px;"></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/navbar.vue';
export default {
  name: 'App',
  components: {
    'Navbar': Navbar
  }
}
</script>

<style>
#content{

}
</style>
