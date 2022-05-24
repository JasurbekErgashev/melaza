import CheckoutSteps from "../components/CheckoutSteps";
import { getUserInfo, setPayment } from "../localStorage";

/* eslint-disable arrow-body-style */
const PaymentScreen = {
    after_render: () =>{
        
        document.getElementById("payment-form").addEventListener("submit", async(e) => {
            // stops the brauzer from refreshing 
            e.preventDefault();
            const paymentMethod = document.querySelector("input[name=\"payment-method\"]:checked").value;
            setPayment({ paymentMethod });
            document.location.hash = "/order";
        });
    },
    render: () =>{
        const {name} = getUserInfo();
        if(!name){
            document.location.hash = "/";
        }
        return `
            ${CheckoutSteps.render({step1: true, step2: true, step3: true})}
            <div>
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="registerLabel">Payment</h5>
                        </div>
                        <div class="modal-body">
                            <form id="payment-form">
                                <div class="mb-3 form-check">
                                    <input class="form-check-input" type="radio" name="payment-method" id="payme" value="PayMe" checked>
                                    <label class="form-check-label" for="payme">PayMe</label>
                                </div>
                                <div class="mb-3 form-check">
                                    <input class="form-check-input" type="radio" name="payment-method" id="click" value="Click">
                                    <label class="form-check-label" for="click">Click</label>
                                </div>
                                
                                <button type="submit" class="btn btn-primary mt-3">Continue</button>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

export default PaymentScreen;