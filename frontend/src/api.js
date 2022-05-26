import axios from "axios";
import { apiUrl } from "./config";
import { getUserInfo } from "./localStorage";

export const getProduct = async (id) =>{
    try{
        const response = await axios({
            url: `${apiUrl}/api/products/${id}`,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(response.statusText !== "OK"){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};

export const getProducts = async ({searchKeyword = ""}) =>{
    try{
        let queryString = "?";

        if(searchKeyword) queryString += `searchKeyword=${searchKeyword}&`;

        const response = await axios({
            url: `${apiUrl}/api/products${queryString}`,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(response.statusText !== "OK"){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};

export const getProductsFull = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (response.status !== 200) {
        throw new Error(json.message);
      }
      return json;
    } catch (err) {
      console.log("Error in getProducts", err);
      return { error: err.message };
    }
  };

export const createProduct = async() =>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if(response.statusText !== "Created"){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        return {error: err.response.data.message || err.message};
    }
};

export const createReview = async (productId, review) => {
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products/${productId}/reviews`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: review,
        });
        if(response.statusText !== "Created"){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        return {error: err.response.data.message || err.message};
    }   
};


export const deleteProduct = async(productId) =>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products/${productId}`,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if(response.statusText !== "OK"){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        return {error: err.response.data.message || err.message};
    }
};

export const updateProduct = async(product) =>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products/${product._id}`,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: product,
        });
        if(response.statusText !== "OK"){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        return {error: err.response.data.message || err.message};
    }
};


export const uploadProductImage = async (formData) =>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/uploads`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        });
        if(response.statusText !== "Created"){
            throw new Error(response.data.message);
        }else{
            return response.data;
        }
    }catch(err){
        return {error: err.response.data.message || err.message};
    }
};

export const login = async({email, password}) => {
    try{
        const response = await axios({
            url: `${apiUrl}/api/users/login`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email,
                password,
            },
        });
        if(response.statusText !== "OK"){
            throw new Error(response.data.message);
        }
        return response.data;

    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};

export const register = async({name, email, password}) => {
    try{
        const response = await axios({
            url: `${apiUrl}/api/users/register`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                name,
                email,
                password,
            },
        });
        if(response.statusText !== "OK"){
            throw new Error(response.data.message);
        }
        return response.data;

    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};

export const update = async({name, email, password}) => {
    try{
        const {_id, token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/users/${_id}`,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                name,
                email,
                password,
            },
        });
        if(response.statusText !== "OK"){
            throw new Error(response.data.message);
        }
        return response.data;

    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};

// export const getSummary = async () =>{
//     try{
//         const {token} = getUserInfo();
//         const response = await axios({
//             url: `${apiUrl}/api/orders/summary`,
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//         });
//         if(response.statusText !== "OK"){
//             throw new Error(response.data.message);
//         }else{
//             return response.data;
//         }
//     }catch(err){
//         return {error: err.response.data.message || err.message};
//     }
// };