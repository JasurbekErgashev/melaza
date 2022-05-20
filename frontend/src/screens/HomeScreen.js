/* eslint-disable quotes */
import axios from "axios";
import Rating from "../components/Rating";
import { parseRequestUrl } from "../utils";

const HomeScreen = {
    
    // after render

    after_render: () =>{

        const request = parseRequestUrl();
        document.getElementById("cartCheckout").addEventListener('click',
        () => {
            document.location.hash = `/cart/${request.id}`;
        });

        // document.getElementById("addBasket").addEventListener('click',
        // () => {
        //     const num = document.getElementById("basket");
        //     let value = parseInt(num.innerHTML, 10);
        //     value += 1;
        //     document.getElementById("basket").innerHTML = value;
        // });
        
        // document.getElementById(`${product.name}`).addEventListener('click',
        // () => {
        //     const proq = document.getElementById("${product.name}");
        //     // eslint-disable-next-line radix
        //     let v = parseInt(proq.innerHTML);
        //     if(v > 1){
        //         v -= 1;
        //     }
        //     document.getElementById("${product.name}").innerHTML = v;
        // });
        // document.getElementById("${product.name}").addEventListener('click',
        // () => {
        //     const proq = document.getElementById("${product.name}");
        //     // eslint-disable-next-line radix
        //     let v = parseInt(proq.innerHTML);
        //         v += 1;
        //     document.getElementById("productQuantity").innerHTML = v;
        // });
    },
    render: async() =>{
       
        const response = await axios({
            url: "http://localhost:3000/api/products",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(!response || response.statusText !== "OK"){
            return "<div>Error in getting products data</div>";
        }
        const products = response.data;
        return `
        <ul class="products">
        ${products.map(product=> `
                  <li>
                      <div class="product">
                          <a href="/#/product/${product._id}">
                              <img class="product-image" src="${product.image}" alt="${product.name}" data-tilt>
                          </a>
                          <div class="product-name">
                              <a href="/#/${product._id}">
                                  ${product.name}
                              </a>
                          </div>
                          <div class="product-rating">
                            ${Rating.render({value: `${product.rating}`, text: `${product.numReviews} reviews`})}
                          </div>
                          <div class="quantity-price">
                              <div class="product-quantity">
                                  <button class="btn minus" id="${product.name}">-</button>
                                  <span class="q-num" id="${product.name}">0</span>
                                  <button class="btn plus" id="${product.name}">+</button>
                              </div>
                              <div class="product-price">
                                  $${product.price}/${product.unitMeasure}
                              </div>
                          </div>
                          <div class="product-buttons">
                              <a href="/#/cart"  class="buynow btn btn-primary" id="cartCheckout">Buy Now</a>
                              <button class="btn addCart" id="addBasket"><img src="./images/homepage/main/cart-plus.svg" alt="cart-plus"></button>
                          </div>
                      </div>
                  </li>
        `).join("\n")}
        `;
    }
};
export default HomeScreen;