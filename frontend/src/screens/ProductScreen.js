/* eslint-disable quotes */
import { getProduct } from "../api";
import {parseRequestUrl} from "../utils";
import Rating from "../components/Rating";

const ProductScreen = {

    // After render

    after_render: () =>{
        const request = parseRequestUrl();
        document.getElementById("add-button").addEventListener('click',
        () => {
            const addCart = document.getElementById("basket");
            let value = parseInt(addCart.innerHTML, 10);
            value += 1;
            document.getElementById("basket").innerHTML = value;
            document.location.hash = `/cart/${request.id}`;
        });
    },

    render: async () =>{
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        if(product.error){
            return `<div>${product.error}</div>`;
        }
        return `
        <div class="product-content">
            <div class="back-to-result">
                <a href="/#/"><i class="bi bi-arrow-bar-left"></i> Back</a>
            </div>
            <div class="details">
                <div class="details-image">
                    <img class="img-fluid" src="${product.image}" alt="${product.name}">
                </div>
                <div class="left">    
                    <div class="details-info">
                        <ul>
                            <li><h1>${product.name}</h1></li>
                            <li>${Rating.render({value: product.rating, text: `${product.numReviews} reviews`})}</li>
                            <li>Price: <strong>$${product.price}</strong></li>
                            <li>Description: 
                                <div>
                                    ${product.description}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="details-action">
                        <ul>
                            <li class="price">Price: <span>$${product.price}</span></li>
                            <li class="stock">Status: ${product.quantityInStock > 0 ? `<span class="success">Available</span>`: `<span class="failure">Unavailable</span>`}</li>
                            <li id="add-button" class="btn btn-secondary">Add to Cart</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;
    },
};

export default ProductScreen;