/* eslint-disable quotes */
import { getUserInfo } from "../localStorage";
import {parseRequestUrl} from "../utils";

/* eslint-disable arrow-body-style */
const Header = {
    render: () => {
        const {name, isAdmin} = getUserInfo();
        const {value} = parseRequestUrl();
        return `
        <div class="brand">
            <a class="navbar-brand" href="/#/"><img class="logo-img img-fluid" src="./images/homepage/main/logo.svg" alt="logo-img">Melaza</a>
        </div>
        <div class="search">
          <form class="search-form" id="search-form">
            <input class="form-control" type="text" name="q" id="q" value="${value || ''}">
            <button type="submit" id="search-form" class="btn btn-success">Search</button>
          </form>
        </div>
        <div class="nav-links">
            ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ''}
            <div class="shopping-cart btn" id="cart-basket">
                <a href="/#/cart/">
                  <img class="shopping-cart-icon" src="./images/homepage/main/cart.svg" alt="shopping-cart">
                  
                </a>
            </div>
              <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#login">Login</button> -->
              
              ${name ? `<a class="profile-name" href="/#/profile"><i class="bi bi-person"></i>${name}</a>` : `<a href="/#/login" class="btn btn-primary">Login</a>`}
        </div>
        `;
    },
    after_render: () => {
      document.getElementById("search-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById("q").value;
        document.location.hash = `?q=${searchKeyword}`;
      });
    },
};

export default Header;