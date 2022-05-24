import CheckoutSteps from "../components/CheckoutSteps";
import { getUserInfo, getAddress, setAddress } from "../localStorage";

/* eslint-disable arrow-body-style */
const AddressScreen = {
    after_render: () =>{
        
        document.getElementById("address-form").addEventListener("submit", async(e) => {
            // stops the brauzer from refreshing 
            e.preventDefault();
            setAddress({
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                postalCode: document.getElementById("postalCode").value,
                country: document.getElementById("country").value,
            });
            document.location.hash = "/payment";
        });
    },
    render: () =>{
        const {name} = getUserInfo();
        if(!name){
            document.location.hash = "/";
        }
        const {address, city, postalCode, country} = getAddress();
        return `
            ${CheckoutSteps.render({step1: true, step2: true})}
            <div>
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="registerLabel">Address</h5>
                        </div>
                        <div class="modal-body">
                            <form id="address-form">
                                <div class="mb-3 form-floating">
                                    <input type="text" class="form-control" name="address" id="address" placeholder="Address" value="${address}">
                                    <label for="address" class="form-label">Address</label>
                                </div>

                                <div class="mb-3 form-floating">
                                    <input type="text" class="form-control" name="city" id="city" placeholder="City" value="${city}">
                                    <label for="city" class="form-label">City</label>
                                </div>

                                <div class="mb-3 form-floating">
                                    <input type="text" class="form-control" name="postalCode" id="postalCode" placeholder="postalCode" value="${postalCode}">
                                    <label for="postalCode" class="form-label">Postal Code</label>
                                </div>

                                <div class="mb-3 form-floating">
                                    <input type="text" class="form-control" name="country" id="country" placeholder="Country" value="${country}">
                                    <label for="country" class="form-label">Country</label>
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

export default AddressScreen;