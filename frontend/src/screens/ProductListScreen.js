
import { createProduct, deleteProduct, getProductsFull } from "../api";
import DashboardMenu from "../components/DashboardMenu";
import {showLoading, hideLoading, showMessage, rerender, } from "../utils";


const ProductListScreen = {
    after_render: () => {
        document.getElementById("create-product-button").addEventListener("click", async () => {
            const data = await createProduct();
            document.location.hash = `/product/${data.product._id}/edit`;
        });
        const editButtons = document.getElementsByClassName("edit-button");
        Array.from(editButtons).forEach(editButton =>{
            editButton.addEventListener("click", () => {
                document.location.hash = `/product/${editButton.id}/edit`;
            });
        });
        const deleteButtons = document.getElementsByClassName("delete-button");
        Array.from(deleteButtons).forEach(deleteButton =>{
            deleteButton.addEventListener("click", async() =>{
                if(confirm("Are you sure to delete this product?")){
                    showLoading();
                    const data = await deleteProduct(deleteButton.id);
                    if(data.error){
                        showMessage(data.error);
                    }else{
                        rerender(ProductListScreen);
                    }
                    hideLoading();
                }
            });
        });
    },
    render: async () =>{
        const products = await getProductsFull();
        return `
        <div class="dashboard">
                ${DashboardMenu.render({selected:"products"})}
                <div class="dashboard-content">
                    <h1>Products</h1>
                    <button class="btn btn-success" id="create-product-button">Create Product</button>
                    <div class="product-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${products.map(product => `
                                    <tr>
                                        <td>${product._id.substring(0, 5)}...</td>
                                        <td>${product.name}</td>
                                        <td>$${product.price}</td>
                                        <td>${product.category}</td>
                                        <td class="tr-action">
                                            <button id="${product._id}" class="btn btn-info edit-button">Edit</button>
                                            <button id="${product._id}" class="btn btn-danger delete-button">Delete</button>
                                        </td>
                                    </tr>
                                `).join("\n")}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },
};

export default ProductListScreen;