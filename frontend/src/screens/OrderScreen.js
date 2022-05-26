import CheckoutSteps from "../components/CheckoutSteps";
import { getAddress, getCartItems, getPayment } from "../localStorage";
import { showEndJournay } from "../utils";


const convertCartToOrder = () =>{
    const orderItems = getCartItems();
    if(orderItems.length === 0){
        document.location.hash = "/cart";
    }
    const address = getAddress();
    if(!address.address){
        document.location.hash = "/address";
    }
    const payment = getPayment();
    if(!payment.paymentMethod){
        document.location.hash = "/payment";
    }
    const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
    // delivery price
    const deliveryPrice = itemsPrice > 100 ? 0 : 10;
    // tax price
    const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
    // total price
    const temp = itemsPrice + deliveryPrice + taxPrice;
    const totalPrice = Math.round(temp);
    return {
        orderItems,
        address,
        payment,
        itemsPrice,
        deliveryPrice,
        taxPrice,
        totalPrice
    };
};


const OrderScreen = {
    after_render: () => {
        document.getElementById("finishOrder").addEventListener("click", () => {
            showEndJournay();
        });
    },
    render: () => {
        const {
        orderItems,
        address,
        payment,
        itemsPrice,
        deliveryPrice,
        taxPrice,
        totalPrice
        } = convertCartToOrder();
        return `
        <div>${CheckoutSteps.render({step1: true, step2: true, step3: true, step4: true})}
            <div class="order container-md row">
                <div class="order-info col-lg-8 col-sm-12">
                    <div>
                        <h2>Address</h2>
                        <div>
                            ${address.address}, ${address.city}, ${address.postalCode}, ${address.country}
                        </div>
                    </div>
                    <div>
                        <h2>Payment</h2>
                        <div>
                            Payment Method : ${payment.paymentMethod}
                        </div>
                    </div>
                    <div>
                        <ul class="cart-list-container">
                            <li>
                                <h2>Shopping Cart</h2>
                                <div>Price</div>
                            </li>
                            ${
                                orderItems.map(item =>`
                                    <li>
                                        <div class="cart-image">
                                            <img src="${item.image}" alt="${item.name}">
                                        </div>
                                        <div class="cart-name">
                                            <div>
                                                <a href="/#/product/${item.product}" class="orderProduct">${item.name}</a>
                                            </div>
                                            <div> Qty: ${item.qty}</div>
                                        </div>
                                        <div class="cart-price">
                                            $${item.price}
                                        </div>
                                    </li>
                                `).join("\n")
                            }
                        </ul>
                    </div>
                </div>
                <div class="order-action col-lg-4">
                    <ul>
                        <li>
                            <h2 class="orderSummary">Order Summary</h2>
                        <li>
                        <li><div>Items</div><div>$${itemsPrice}</div></li>
                        <li><div>Delivery</div><div>$${deliveryPrice}</div></li>
                        <li><div>Tax</div><div>$${taxPrice}</div></li>
                        <li class="total"><div>Order Total</div><div>$${totalPrice}</div></li>
                        <li><button type="button" id="finishOrder" class="btn btn-success">Finish order</button></li>
                    </ul>
                </div>
            </div>
        </div>
        
        `;
    },
};


export default OrderScreen;