import Vue from 'vue'
import demo from '../components/demo'
import '../css/index'
import _ from 'lodash'

let vm = new Vue({
  el: '#app',
  components: {
    demo
  },
  mounted () {
    console.log('success')
    console.log($('body'))
    console.log(_.trim(' 123123 '))
  }
})