import { getCartItems } from "./localStorage";

/* eslint-disable import/prefer-default-export */
export const parseRequestUrl = () => {
    
    const address = document.location.hash.slice(1).split("?")[0];


    const queryString = document.location.hash.slice(1).split("?").length === 2 
    ? document.location.hash.slice(1).split("?")[1] : "";

    const url = address.toLowerCase();
    const r = url.split("/");
    const q = queryString.split("=");
    return {
        resource: r[1],
        id: r[2],
        verb: r[3],
        name: q[0],
        value: q[1],
    };
};

export const rerender = async(component) => {
    document.getElementById("main-container").innerHTML = await component.render();
    await component.after_render();
};

export const showLoading = () =>{
    document.getElementById("loading-overlay").classList.add("active");
};

export const hideLoading = () =>{
    document.getElementById("loading-overlay").classList.remove("active");
};

export const showMessage = (message, callback) =>{
    document.getElementById("message-overlay").innerHTML = `
    <div class="card m-5">
        <div id="message-overlay-content" class="card-body font-weight-bold">${message}</div>
        <a id="message-overlay-close-button" class="btn btn-primary">OK</a>
    </div>
    `;
    document.getElementById("message-overlay").classList.add("active");
    document.getElementById("message-overlay-close-button").addEventListener("click", () =>{
        document.getElementById("message-overlay").classList.remove("active");
        if(callback){
            callback();
        }
    });
};

export const showEndJournay = (callback) =>{
    document.getElementById("message-overlay").innerHTML = `
    <div class="card m-5">
        <div id="message-overlay-content" class="card-body font-weight-bold">
            <h6>Sorry, This is the end of a journay for now :(</h6>
            <p>- Melaza team</p>
        </div>
        <a id="message-overlay-close-button" class="btn btn-primary">OK</a>
    </div>
    `;
    document.getElementById("message-overlay").classList.add("active");
    document.getElementById("message-overlay-close-button").addEventListener("click", () =>{
        document.getElementById("message-overlay").classList.remove("active");
        if(callback){
            callback();
        }
    });
};

export const redirectUser = () =>{
    if(getCartItems().length !== 0){
        document.location.hash = "/address";
    }else{
        document.location.hash = "/";
    }
};