/* eslint-disable quotes */
import { getUserInfo } from "../localStorage";

/* eslint-disable arrow-body-style */
const Header = {
    render: () => {
        const {name} = getUserInfo();
        return `
        <div class="brand">
            <a class="navbar-brand" href="/#/"><img class="logo-img img-fluid" src="./images/homepage/main/logo.svg" alt="logo-img">Melaza</a>
        </div>
        <div class="nav-links">
            <div class="shopping-cart btn" id="cart-basket">
                <a href="/#/cart/">
                  <img class="shopping-cart-icon" src="./images/homepage/main/cart.svg" alt="shopping-cart">
                  <div class="num-products">
                    <span id="basket">0</span>
                  </div>
                </a>
              </div>
              <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#login">Login</button> -->
              
              ${name ? `<a class="profile-name" href="/#/profile"><i class="bi bi-person"></i>${name}</a>` : `<a href="/#/login" class="btn btn-primary">Login</a>`}
        </div>
        `;
    },
    after_render: () => {},
};

export default Header;