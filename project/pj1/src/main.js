import Vue from 'vue';
import Vuex from 'vuex';
import demo from '../components/demo';
import '../css/index';
import _ from 'lodash';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++;
    }
  }
});

// eslint-disable-next-line no-unused-vars
const vm = new Vue({
  el: '#app',
  components: {
    demo
  },
  store,
  data: {},
  methods: {
    increment() {
      this.$store.commit('increment');
      console.log(this.$store.state.count);
    }
  },
  mounted () {
    this.increment();
    console.log('success');
    console.log($('body'));
    console.log(_.trim(' 123123 '));
  }
});
