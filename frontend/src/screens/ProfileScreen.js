import { update } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

/* eslint-disable arrow-body-style */
const ProfileScreen = {
    after_render: () =>{
        document.getElementById("profile-form").addEventListener("submit", async(e) => {
            e.preventDefault();
            showLoading();
            const data = await update({
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            }else{
                setUserInfo(data);
                document.location.hash = "/";
            }
        });
        // pasword is visible or hidden according to the click of the checkbox
        const passwordCheck = document.getElementById("password");
        document.getElementById("checkPassword").addEventListener("click", () => {
            if(passwordCheck.type === "password"){
                passwordCheck.type = "text";
            }else{
                passwordCheck.type = "password";
            }
        });
    },
    render: () =>{
        const {name, email} = getUserInfo();
        if(!name){
            document.location.hash = "/";
        }
        return `
            <div>
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="registerLabel">${name}'s profile</h5>
                        </div>
                        <div class="modal-body">
                            <form id="profile-form">
                                <div class="mb-3 form-floating">
                                    <input type="text" class="form-control" name="name" id="name" placeholder="Name" value="${name}">
                                    <label for="name" class="form-label">Name</label>
                                </div>
                                <div class="mb-3 form-floating" >
                                    <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email" value="${email}">
                                    <label for="email" class="form-label">Email</label>
                                </div>
                                <div class="mb-3 form-floating">
                                    <input type="password" minlength="8" class="form-control" name="password" id="password" placeholder="Password">
                                    <label for="password" class="form-label">Password</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="FakePSW" id="checkPassword">
                                    <label class="form-check-label" for="checkPassword" onclick="showPassword()">Show Password</label>
                                </div>
                                <button type="submit" class="btn btn-success mt-3">Update</button>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

export default ProfileScreen;