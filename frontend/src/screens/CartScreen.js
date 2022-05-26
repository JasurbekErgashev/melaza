/* eslint-disable no-use-before-define */
import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender } from "../utils";

/* eslint-disable quotes */

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find(x => x.product === item.product);
    if(existItem){
        if(forceUpdate){
            cartItems = cartItems.map((x) => x.product === existItem.product ? item : x);
        };
    }else{
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if(forceUpdate){
        rerender(CartScreen);
    }
};

const removeFromCart = (id) =>{
    setCartItems(getCartItems().filter(x => x.product !== id));
    if(id === parseRequestUrl().id){
        document.location.hash = '/cart';
    }else{
        rerender(CartScreen);
    }
};

const CartScreen = {
    after_render: () =>{
        const qtySelects = document.getElementsByClassName("qty-select");
        Array.from(qtySelects).forEach( qtySelect =>{
            qtySelect.addEventListener("change", (e) =>{
                const item = getCartItems().find(x => x.product === qtySelect.id);
                addToCart({...item, qty: Number(e.target.value)}, true);
            });
        });
        const deleteButtons = document.getElementsByClassName("delete-button");
        Array.from(deleteButtons).forEach(deleteButton => {
            deleteButton.addEventListener("click", () => {
                removeFromCart(deleteButton.id);
            });
        });
        document.getElementById("checkout-button").addEventListener("click", () =>{
            document.location.hash = "/login";
        });
    },
    render: async () =>{
        const request = parseRequestUrl();
        if(request.id){
            const product = await getProduct(request.id);
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantityInStock: product.quantityInStock,
                qty: 1,
            });
        }
        const cartItems = getCartItems();
        return `
        <div class="cart">
            <div class="cart-list">
                <ul class="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    ${
                        cartItems.length === 0 ? `<div>
                        <h4 style="color: #0066ff">Cart is empty.</h4>
                        <img class="no-item-img" src="../images/homepage/main/goshopping.svg"/>
                        <a class="goshopping" href="/#/">Go Shopping</a>
                        </div>` : 
                        cartItems.map(item => `
                            <li>
                                <div class="cart-image">
                                    <img class="img-fluid" src="${item.image}" alt="${item.name}"/>
                                </div>
                                <div class="cart-name">
                                    <div class="product-name">
                                        <a href="/#/product/${item.product}">${item.name}</a>
                                        <div class="cart-price">
                                            $${item.price}
                                        </div>
                                    </div>
                                    <div class="but-select">
                                        <div class="select-first">
                                            <p>Quantity: </p>
                                            <select class="qty-select form-select-sm form-select"  aria-label="Default select example" id="${item.product}">
                                                ${
                                                    [...Array(item.quantityInStock).keys()].map(x => item.qty === x+1 ?
                                                        `<option selected value="${x+1}">${x+1}</option>`
                                                        : `<option value="${x+1}">${x+1}</option>`
                                                        )
                                                    }
                                            </select>
                                        </div>
                                        <button type="button" class="delete-button btn btn-danger" id="${item.product}">Delete</button>
                                    </div>
                                </div>
                                
                            </li>
                        `).join("\n")
                    }
                </ul>
            </div>
            <div class="cart-action mb-2">
                <h3>Subtotal (<span>${cartItems.reduce((a, c) => a + c.qty, 0)}</span> items) : <span>$${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</span> </h3>
                <button id="checkout-button" class="btn btn-success">Checkout</button>
            </div>
        </div>
        `;
    },
};

export default CartScreen;