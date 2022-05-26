
// import { createOrder, getOrders, deleteOrder } from "../api";
import DashboardMenu from "../components/DashboardMenu";
// import {showLoading, hideLoading, showMessage, rerender, } from "../utils";

/* eslint-disable arrow-body-style */
const OrderListScreen = {
    after_render: () => {
        // document.getElementById("create-order-button").addEventListener("click", async () => {
        //     const data = await createOrder();
        //     document.location.hash = `/order/${data.order._id}/edit`;
        // });
        // const editButtons = document.getElementsByClassName("edit-button");
        // Array.from(editButtons).forEach(editButton =>{
        //     editButton.addEventListener("click", () => {
        //         document.location.hash = `/order/${editButton.id}/edit`;
        //     });
        // });
        // const deleteButtons = document.getElementsByClassName("delete-button");
        // Array.from(deleteButtons).forEach(deleteButton =>{
        //     deleteButton.addEventListener("click", async() =>{
        //         if(confirm("Are you sure to delete this order?")){
        //             showLoading();
        //             const data = await deleteOrder(deleteButton.id);
        //             if(data.error){
        //                 showMessage(data.error);
        //             }else{
        //                 rerender(OrderListScreen);
        //             }
        //             hideLoading();
        //         }
        //     });
        // });
    },
    render: async () =>{
        // const orders = await getOrders();
        return `
        <div class="dashboard">
                ${DashboardMenu.render({selected:"orders"})}
                <div class="dashboard-content">
                    <h1>Orders</h1>
                    <p>This part will be implemented later after completing Payment Gateway and storing order details.</>
                </div>
            </div>
        `;
    },
};

export default OrderListScreen;