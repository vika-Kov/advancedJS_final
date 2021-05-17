const product = {
  props: ["product"],
  data() {
    return {
      /**
       * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
       * то мы легко можем получить доступ к ним используя свойство $root.
       * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
       */
      // cartAPI: this.$root.$refs.cart, // добираемся до компонента корзины, чтобы далее использовать метод добавления
      cartAPI: this.$root.$refs.header.$refs.cart, // добираемся до компонента корзины, чтобы далее использовать метод добавления
    };
  },

  template: `    
        <div class="items_item">
            <a href="#"><img class="item__img" :src="product.img" alt="item"></a>
            <p class="header-2">{{ product.product_name }}</p>
            <p class="items_text">{{ product.description }}</p>
            <p class="items_price">&#8381;{{ product.price }}</p>
            <a href="#" class="product_add" @click="cartAPI.addProduct(product)">Add to Cart</a>
<!--                <div class="desc">-->
<!--                    <button class="buy-btn" @click="cartAPI.addProduct(product)">Add to cart</button>-->
<!-- 1                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>-->
<!-- 2                    <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>-->
<!--                </div>-->
        </div>    
    `,
};

const products = {
  components: { product },
  data() {
    return {
      products: [],
      filtered: [],
    };
  },
  props:["isFeatured"],
  methods: {
    filter(userSearch) {
      let regexp = new RegExp(userSearch, "i");
      this.filtered = this.products.filter((el) =>
        regexp.test(el.product_name)
      );
    },
  },
  watch: {
    isFeatured(oldValue, newValue) {
      console.log("isFeatured changed ", oldValue, newValue);
      if (!newValue) {
        this.filtered = this.products.filter((el) => el.featured);
      } else {
        this.filtered = this.products;
      }
    },
  },
  mounted() {
    this.$parent.getJson("/api/products").then((data) => {
      for (let el of data) {
        this.products.push(el);
        if (el.featured) this.filtered.push(el);
      }
    });
  },
  template: `
  <div>
        <div class="items_top" v-if="isFeatured">
            <h1 class="items_text_top">Featured Items</h1>
            <p class="items_text header-1">Shop for items based on what we featured in this week</p>
        </div>
        <div class="items_top" v-if="!isFeatured">
        <h1 class="items_text_top">All Products</h1>
        <p class="items_text header-1">Today's content of our shop to your service!</p>
    </div>
        
        <div class="products items_mid center">
            <product v-for="item of filtered" :key="item.id_product" :product="item"></product>
        </div>
  </div>
    `,
};

export default products;
