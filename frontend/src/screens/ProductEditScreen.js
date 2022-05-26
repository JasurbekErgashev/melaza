// import { request } from "express";
import {hideLoading, parseRequestUrl, showLoading, showMessage} from "../utils";
import { getProduct, updateProduct, uploadProductImage } from "../api";

const ProductEditScreen = {
    after_render: () =>{
        const request = parseRequestUrl();
        document.getElementById("edit-product-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            showLoading();
            const data = await updateProduct({
                _id: request.id,
                name: document.getElementById("name").value,
                price: document.getElementById("price").value,
                image: document.getElementById("image").value,
                quantityInStock: document.getElementById("quantityInStock").value,
                category: document.getElementById("category").value,
                description: document.getElementById("description").value,
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            }else{
                document.location.hash = "/productlist";
            }
        });
        document.getElementById("image-file").addEventListener("change", async(e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("image", file);
            showLoading();
            const data = await uploadProductImage(formData);
            hideLoading();
            if(data.error){
                showMessage(data.error);
            }else{
                showMessage("Image uploaded successfully!");
                document.getElementById("image").value = data.image;
            }
        });
    },
    render: async() =>{
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        return `
        <div class="content">
        <a href="/#/productlist">Back to products</a>
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginLabel">Edit Product: ${product._id.substring(0, 8)}</h5>
                </div>
                <div class="modal-body">
                    <form id="edit-product-form">
                        <div class="mb-3 form-floating">
                            <input type="text" class="form-control" name="name" id="name" value="${product.name}" placeholder="Name">
                            <label for="name" class="form-label">Name</label>
                        </div>
                        <div class="mb-3 form-floating">
                            <input type="text" class="form-control" name="price" id="price" value="${product.price}" placeholder="Price">
                            <label for="price" class="form-label">Price</label>
                        </div>
                        <div class="mb-3 form-floating">
                            <input type="text" class="form-control" name="image" id="image" value="${product.image}" placeholder="Image">
                            <label for="image" class="form-label">Image (500 x 500)</label>
                            <input type="file" class="form-control" name="image-file" id="image-file">
                        </div>
                        <div class="mb-3 form-floating">
                            <input type="text" class="form-control" name="quantityInStock" id="quantityInStock" value="${product.quantityInStock}" placeholder="Quantity In Stock">
                            <label for="quantityInStock" class="form-label">Quantity In Stock</label>
                        </div>
                        <div class="mb-3 form-floating">
                            <input type="text" class="form-control" name="category" id="category" value="${product.category}" placeholder="Category">
                            <label for="category" class="form-label">Category</label>
                        </div>
                        <div class="mb-3 form-floating">
                            <input type="text" class="form-control" name="description" id="description" value="${product.description}" placeholder="Category">
                            <label for="description" class="form-label">Description</label>
                        </div>
                        
                        <button type="submit" class="btn btn-primary mt-3">Update</button>
        
                    </form>
                </div>
            </div>
        </div>
    </div>
        `;
    },
};

export default ProductEditScreen;