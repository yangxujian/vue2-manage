<template>
  <div id="app" class="fillcontain">
		<router-view></router-view>
  </div>
</template>

<script>
    export default {
      mounted() {

      },
      methods:{
      }
    }
</script>

<style lang="scss">
  	@import './style/common';
    .fade-transform-leave-active,.fade-transform-enter-active {
      transition: all .5s;
    }
    .fade-transform-enter {
      opacity: 0;
      transform: translateX(-30px);
    }
    .fade-transform-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }
</style>
