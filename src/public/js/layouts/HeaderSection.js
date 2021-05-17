import cart from "../CartComp";
import search from "../FilterComp";

const headerSection = {
  components: {
    cart,
    search,
  },
  props:["isFeatured"],
  template: `
  <header class="header center">
            <div class="header__left">
                <a href="index.html"><img src="img/logo.svg" alt="logo"></a>
                
            </div>
            <div class="header__right">
                <div class="menu header__link">
                    <input id="switcher" type="checkbox">
                    <label for="switcher" v-if="isFeatured"><img class="switcher_menu"  src="img/menu.svg" alt="menu"> </label>
                    <div class="drop">
                        <div class="drop__menu">
                            <div class="drop__icons">
                                <img class="header__link" src="img/account.svg" alt="account">
                                <img class="header__link" src="img/cart.svg" alt="cart">
                            </div>
                            <label class="drop__menu_close" for="switcher" v-if="isFeatured"><img src="img/closemenu.svg" alt="close"></label>
                            <div class="drop__menu_text" v-if="isFeatured">
                                <p class="drop__menu_text__menu">MENU</p>
                                <p class="drop__menu_text__headers">MEN</p>
                                <p class="drop__menu_text__categories">Accessories</p>
                                <p class="drop__menu_text__categories">Bags</p>
                                <p class="drop__menu_text__categories">Denim</p>
                                <p class="drop__menu_text__categories">T-Shirts</p>
                                <p class="drop__menu_text__headers">WOMEN</p>
                                <p class="drop__menu_text__categories">Accessories</p>
                                <p class="drop__menu_text__categories">Jackets & Coats</p>
                                <p class="drop__menu_text__categories">T-Shirts</p>
                                <p class="drop__menu_text__categories">Polos</p>
                                <p class="drop__menu_text__categories">Shirts</p>
                                <p class="drop__menu_text__headers">KIDS</p>
                                <p class="drop__menu_text__categories">Accessories</p>
                                <p class="drop__menu_text__categories">Jackets & Coats</p>
                                <p class="drop__menu_text__categories">T-Shirts</p>
                                <p class="drop__menu_text__categories">Polos</p>
                                <p class="drop__menu_text__categories">Shirts</p>
                            </div>
                        </div>
                    </div>
                </div>
                <img class="header__link header__link_img" src="img/account.svg" alt="account">
                
                
                <div class="cart">
                    <search ref="search"></search>
                    <cart ref="cart"></cart>
                </div>
            </div>
        </header>
  `,
};

export default headerSection;
