
import { getProducts } from "../api";
import DashboardMenu from "../components/DashboardMenu";

/* eslint-disable arrow-body-style */
const ProductListScreen = {
    after_render: () => {},
    render: async () =>{
        const products = await getProducts();
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
                                        <td>${product._id}</td>
                                        <td>${product.name}</td>
                                        <td>$${product.price}</td>
                                        <td>${product.category}</td>
                                        <td class="tr-action">
                                            <button id="${product._id}" class="btn btn-info">Edit</button>
                                            <button id="${product._id}" class="btn btn-danger">Delete</button>
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