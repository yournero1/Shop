<template>
  <div class="v-catalog">
    <router-link :to="{ name: 'cart', params: { cart_data: CART } }">
      <div class="v-catalog__link_to_cart">Корзина: {{ CART.length }}</div>
    </router-link>

    <h1>Каталог</h1>
   
    <div class="filters">
      <vSelectVue :selected="selected" :options="categories" @select="sortByCategories" :isExpanded="IS_DESKTOP" />
      <div class="range-slider">
        <input type="range" min="0" max="10000" step="1000" v-model.number="minPrice" @change="setRangeSlider">
        <input type="range" min="0" max="10000" step="1000" v-model.number="maxPrice" @change="setRangeSlider">
      </div>
      <div class="range-values">
        <p>Мин:{{ minPrice }}</p>
        <p>Макс:{{ maxPrice }}</p>
      </div>
    </div>

    <!-- <p v-if="!sortedProducts.length" >Товар не найден</p> -->
    <div class="v-catalog__list">
      <vCatalogItemVue v-for="product in filteredProducts" :key="product.article" :product_data="product"
        @addToCart="addToCart" />
    </div>
  
  </div>
</template>
<script>
import vCatalogItemVue from './v-catalog-item.vue';
import { mapActions, mapGetters } from 'vuex';
import vSelectVue from '../v-select.vue';

export default {
  name: 'v-catalog',
  components: {
    vCatalogItemVue,
    vSelectVue
  },
  props: {},
  data() {
    return {
      categories: [
        { name: 'Все', value: 'ВСЕ' },
        { name: 'Мужские', value: 'M' },
        { name: 'Женские', value: 'Ж' },
      ],
      selected: 'Все',
      sortedProducts: [],
      minPrice: 0,
      maxPrice: 10000,
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS',
      'CART',
      'IS_MOBILE',
      'IS_DESKTOP',
      'SEARCH_VALUE'
    ]),
    filteredProducts() {
      if (this.sortedProducts.length) {
        return this.sortedProducts
      } else {
        return this.PRODUCTS
      }
    },
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART'
    ]),
    setRangeSlider() {
      if (this.minPrice > this.maxPrice) {
        let temp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = temp
      }
      this.sortByCategories(this.selected)
    },
    sortByCategories(val = 'Все') {
      this.selected = val
      this.sortedProducts = [...this.PRODUCTS].filter((item) => {
        return item.price >= this.minPrice && item.price <= this.maxPrice
      })
      if (val !== 'Все') this.sortedProducts = this.sortedProducts.filter((item) => {
        return item.category === val
      })
    },

    addToCart(data) {
      this.ADD_TO_CART(data)
    },

    sortProductsBySearchValue(value) {
      this.sortedProducts = [...this.PRODUCTS]
      if (value){
        this.sortedProducts = this.sortedProducts.filter(function (item){
        return item.name.toLowerCase().includes(value.toLowerCase())
      })
      } else {
        this.sortedProducts = this.PRODUCTS;
      }
      
    }

  },
  watch: {
    SEARCH_VALUE(){
      this.sortProductsBySearchValue(this.SEARCH_VALUE)//когда значение в поисковой строке будет меняться вызываем эту функцию
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
    this.sortByCategories('Все')
  }
}
</script>
<style lang="scss">
.v-catalog {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  &__link_to_cart {
    position: absolute;
    right: 10px;
    padding: $padding*2;
    border: solid 1px grey;
  }
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.range-slider {
  width: 250px;
  margin: auto 16px;
  text-align: center;
  position: relative;
}

.range-slider svg,
.range-slider input[type=range] {
  position: absolute;
  left: 0;
  bottom: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  top: 2px;
  margin-top: -7px;
}
</style>