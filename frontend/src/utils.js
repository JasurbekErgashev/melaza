/* eslint-disable import/prefer-default-export */
export const parseRequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split("/");
    return {
        resource: request[1],
        id: request[2],
        action: request[3],
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