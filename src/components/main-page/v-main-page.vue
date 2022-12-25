<template>
    <div class="v-main-page">
        <h1>Онлайн-магазин</h1>
        <p>
            <router-link :to="{name:'catalog'}">
                В Каталог
            </router-link>
        </p>
    </div>
</template>

<script>
   export default {
    name: "v-main-page",
   }
</script>

<style>
    
</style>