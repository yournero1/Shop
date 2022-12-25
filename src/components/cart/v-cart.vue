<template>
    <div class="v-cart">
        <router-link :to="{ name: 'catalog' }">
            <div class="v-catalog__link_to_cart">Назад к каталогу</div>
        </router-link>
        <h1>Корзина</h1>
        <p v-if="!cart_data.length">Ваша корзина пуста...</p>
        <v-cart-item v-for="(item, index) in cart_data" :key="item.article" :cart_item_data="item"
            @deleteFromCart="deleteFromCart(index)" @increment="increment(index)" @decrement="decrement(index)" />

        <div class="v-cart__total">
            <p class="total__name">Сумма:</p>
            <p>{{ cartTotalCost }} Р.</p>
        </div>
    </div>
</template>

<script>
import VCartItem from './v-cart-item'
import { mapActions } from 'vuex'
export default {
    name: 'v-cart',
    components: { VCartItem },
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
        cartTotalCost() {
            let result = [];//умноженное количество товара на его цену

            for (let item of this.cart_data) {
                result.push(item.price * item.quantity);//возврат цены и количества
            }

            result = result.reduce((sum, el) => // сумма элементов и сам элемент
                sum + el, 0
            );
            return result;
        }
    },
    methods: {
        ...mapActions([
            'DELETE_FROM_CART',
            'INCREMENT_CART_ITEM',
            'DECREMENT_CART_ITEM'
        ]),
        increment(index) {
            this.INCREMENT_CART_ITEM(index)
        },
        decrement(index) {
            this.DECREMENT_CART_ITEM(index)
        },
        deleteFromCart(index) {
            this.DELETE_FROM_CART(index)
        }
    }
}
</script>

<style lang="scss">
.v-cart {
    margin-bottom: 100px;

    &__total {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        padding: $padding*2 $padding*3;
        display: flex;
        justify-content: center;
        background: #0084F4;
        color: #ffffff;
        font-size: 20px;
    }

    .total__name {
        margin-right: $margin*2;
    }
}
</style>