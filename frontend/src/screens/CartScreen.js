import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl } from "../utils";

/* eslint-disable quotes */

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find(x => x.product === item.product);
    if(existItem){
        cartItems = cartItems.map((x) => x.product === existItem.product ? item : x);
    }else{
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
};


const CartScreen = {
    after_render: () =>{

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
                        cartItems.length === 0 ? `<div>Cart is empty. <a href="/#/">Go Shopping</a></div>` : 
                        cartItems.map(item => `
                            <li>
                                <div class="cart-image">
                                    <img src="${item.image}" alt="${item.name}"/>
                                </div>
                                <div class="cart-name">
                                      <div class="product-name">
                                        <a href="/#/product/${item.product}">${item.name}</a>
                                      </div>
                                      <div class="but-select">
                                        <div class="select-first">
                                            <p>Quantity: </p>
                                                <select class="qty-select form-select-sm form-select"  aria-label="Default select example" id="${item.product}">
                                                    <option value="1" selected>1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                </select>
                                        </div>
                                        <button type="button" class="delete-button btn btn-danger" id="${item.product}">Delete</button>
                                       </div>
                                </div>
                                <div class="cart-price">
                                    $${item.price}
                                </div>
                            </li>
                        `).join("\n")
                    }
                </ul>
            </div>
            <div class="cart-action">
                <h3>Subtotal (<span>${cartItems.reduce((a, c) => a + c.qty, 0)}</span> items) : <span>$${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</span> </h3>
                <button id="checkout-button" class="btn btn-success">Checkout</button>
            </div>
        </div>
        `;
    },
};

export default CartScreen;