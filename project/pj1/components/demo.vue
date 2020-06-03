<template>
  <div>
    <h1>
      Hello World!
      <span>this is a {{msg}} demo!</span>
    </h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'webpack-stream'
    };
  },
  mounted () {
    console.log('demo success');
  }
};
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 0.6rem;
    span {
      font-size: 0.6rem;
      color: red;
    }
  }
</style>