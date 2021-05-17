const cartItem = {
  props: ["cartItem", "img"],
  template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `,
};

const cart = {
  components: { cartItem },
  data() {
    return {
      
      cartItems: [],
      showCart: false,
    };
  },
  methods: {
    addProduct(product) {
      let find = this.cartItems.find(
        (el) => el.id_product === product.id_product
      );
      if (find) {
        this.$root.putJson(`/api/cart/${find.id_product}`, { quantity: 1 });
        find.quantity++;
      } else {
        let prod = Object.assign({ quantity: 1 }, product);
        this.$root.postJson("/api/cart", prod).then((data) => {
          if (data.result === 1) {
            this.cartItems.push(prod);
          }
        });
      }
    },
    remove(item) {
      if (item.quantity > 1) {
        this.$root
          .putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
          .then((data) => {
            if (data.result === 1) {
              item.quantity--;
            }
          });
      } else {
        this.$root.deleteJson(`/api/cart/${item.id_product}`).then((data) => {
          if (data.result === 1) {
            this.cartItems.splice(this.cartItems.indexOf(item), 1);
          }
        });
      }
    },
  },
  mounted() {
    this.$root.getJson("/api/cart").then((data) => {
      for (let el of data.contents) {
        this.cartItems.push(el);
      }
    });
  },
  template: `
        <div>
            <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
            <div class="items_mid center">
                  <div class="cart-block" v-show="showCart">
                      <p v-if="!cartItems.length">Корзина пуста</p>
                      <cart-item class="cart-item" 
                      v-for="item of cartItems" 
                      :key="item.id_product"
                      :cart-item="item" 
                      :img="item.img"
                      @remove="remove">
                      </cart-item>
                  </div>
            </div>
            
            
        </div>`,
  styles: {},
};

export default cart;
