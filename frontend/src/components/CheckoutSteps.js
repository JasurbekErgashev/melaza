/* eslint-disable arrow-body-style */
const CheckoutSteps = {
    render: (props) => {
        return `
        <div class="checkout-steps container-sm">
            <div class="${props.step1 ? "active" : ""}">Login</div>
            <div class="${props.step2 ? "active" : ""}">Address</div>
            <div class="${props.step3 ? "active" : ""}">Payment</div>
            <div class="${props.step4 ? "active" : ""}">Order</div>
        </div>
        `;
    },
};

export default CheckoutSteps;