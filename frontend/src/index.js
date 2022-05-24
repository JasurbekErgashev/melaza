import CartScreen from "./screens/CartScreen";
import Error404Screen from "./screens/Error404Screen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProductScreen from "./screens/ProductScreen";
import { hideLoading, parseRequestUrl, showLoading } from "./utils";
import Navbar from "./components/Navbar";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddressScreen from "./screens/AddressScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderScreen from "./screens/OrderScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ProductListScreen from "./screens/ProductListScreen";


const routes = {
    "/": HomeScreen,
    "/product/:id": ProductScreen,
    "/cart/:id": CartScreen,
    "/cart": CartScreen,
    "/login": LoginScreen,
    "/register": RegisterScreen,
    "/profile": ProfileScreen,
    "/address": AddressScreen,
    "/payment": PaymentScreen,
    "/order": OrderScreen,
    "/dashboard": DashboardScreen,
    "/productlist": ProductListScreen,
};

const router = async() => {

    showLoading();
    
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : "/") + 
    (request.id ? "/:id" : "") + 
    (request.verb ? `/${request.verb}` : "");
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    // navbar 

    const navbar = document.getElementById("navbar-container");
    navbar.innerHTML = await Navbar.render();
    await Navbar.after_render();

    // main container

    const main = document.getElementById("main-container");
    main.innerHTML = await screen.render();
    // to rerender additional JS code after rendering
    if (screen.after_render) await screen.after_render();

    hideLoading();

};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
