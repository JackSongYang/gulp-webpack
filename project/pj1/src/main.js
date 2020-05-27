import Vue from 'vue'
import demo from '../components/demo.vue'
import '../css/index.scss'

let vm = new Vue({
  el: '#app',
  components: {
    demo
  },
  mounted () {
    console.log('success')
    console.log($('body'))
  }
})