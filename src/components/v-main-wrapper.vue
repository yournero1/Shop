<template>
    <div class="v-main-wrapper">
        <v-header/>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>


    </div>
</template>

<script>
import vHeader from './layouts/v-header.vue'


export default {
  components: { vHeader },
    name: 'v-main-wrapper',

    props: {
        cart_data: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {}
}
</script>


<style scoped>
.v-main-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* max-width: 900px; */
    margin: 0 auto;
}
</style>