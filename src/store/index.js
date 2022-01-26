import Vuex from 'vuex';
import Vue from 'vue';
import formulas from './modules/formulas.js'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        formulas
    }
})