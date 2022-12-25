<template>
    <div class="v-header">
        <router-link :to="{name:'mainPage'}">
            <img src="../../assets/images/Header-logo.jpg" alt="">
        </router-link>
        <div class="search-field">
            <input type="text" @keypress.enter="search(searchValue)" v-model="searchValue">
            <button class="search_btn btn" @click="search(searchValue)">
                Поиск
            </button>
            <button class="search_btn btn" @click="clearSearchField">Очистить</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
   export default {
name: "v-header",
data(){
    return{
        searchValue: ''
    }
},
computed:{
    ...mapGetters([
        'SEARCH_VALUE'
    ])
},
methods: {
    ...mapActions([
        'GET_SEARCH_VALUE_TO_VUEX'
    ]),
    search(value){
            this.GET_SEARCH_VALUE_TO_VUEX(value);
        this.$router.push('/catalog')//показываю путь на какую страницу перехожу при клике на кнопку поиска
    },
    clearSearchField(){
        this.searchValue = '';
        this.GET_SEARCH_VALUE_TO_VUEX();
        this.$router.push('/catalog')
    }
}
   }
</script>

<style lang="scss">
    .v-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #0084F4;
        padding: 16px;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        img{
            width: 50px;
        }
        .search-field{
            padding: 16px;
            position: relative;
            right: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .search_btn{
            margin-left: 16px;
            background: transparent;

        }
    }
</style>