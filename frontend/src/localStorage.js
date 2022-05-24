export const getCartItems = () =>{
    const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
    return cartItems;
};

export const setCartItems = (cartItems) =>{
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const setUserInfo = ({
    _id = "",
    name = "",
    email = "",
    password = "",
    token = "",
    isAdmin = false,
}) =>{
    localStorage.setItem("userInfo", JSON.stringify({
        _id,
        name,
        email,
        password,
        token,
        isAdmin,
      })
    );
};

// clearing the User info from the local storage
export const clearUser = () =>{
    localStorage.removeItem("userInfo");
};


// eslint-disable-next-line arrow-body-style
export const getUserInfo = () =>{
    return localStorage.getItem("userInfo") ? 
    JSON.parse(localStorage.getItem("userInfo")) : 
    {name: "", email: "", password: ""};
};

// for getting the data of input and saving it into the local Storage

export const getAddress = () =>{
    const address = localStorage.getItem("address") ? JSON.parse(localStorage.getItem("address")) :
    {
        address: "",
        city: "",
        postalCode: "",
        country: "",
    };
    return address;
};

export const setAddress = ({
    address = "",
    city = "",
    postalCode = "",
    country = "",
}) => {
    localStorage.setItem("address", JSON.stringify({address, city, postalCode, country}));
};

// for payment

export const getPayment = () =>{
    const payment = localStorage.getItem("payment") ? JSON.parse(localStorage.getItem("payment")) :
    {
        paymentMethod: "payme",
    };
    return payment;
};

export const setPayment = ({ paymentMethod = "payme" }) => {
    localStorage.setItem("payment", JSON.stringify({paymentMethod}));
};