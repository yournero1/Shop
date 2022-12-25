import Vue from 'vue'
import Vuex from 'vuex'

import commonActions from './actions/actions'
import apiRequests from './actions/api-requests'
import mutations from './mutations/mutations'
import getters from './getters/getters'

const actions = {...commonActions, ...apiRequests}//объеденил папку actions
// в одну переменную

Vue.use(Vuex)

export default new Vuex.Store({
    state:{ //состояние
        searchValue:'',
        isMobile: false,
        isDesktop: true,
        products: [],
        cart:[]
    },
    mutations,//мутации
        
    actions,//действия
    
    getters//гетеры
        
    
    
})
