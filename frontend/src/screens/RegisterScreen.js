import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

/* eslint-disable arrow-body-style */
const RegisterScreen = {
    after_render: () =>{
        document.getElementById("signin-form").addEventListener("submit", async(e) => {
            e.preventDefault();
            showLoading();
            const data = await register({
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            }else{
                setUserInfo(data);
                redirectUser();
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
        // for the users who signed in just save their data in localStorage 
        // and then if they try again just redirect them to the homepage
        if(getUserInfo().name){
            redirectUser();
        }
        return `
            <div>
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="registerLabel">Create Account</h5>
                        </div>
                        <div class="modal-body">
                            <form id="signin-form">
                                <div class="mb-3 form-floating">
                                    <input type="text" class="form-control" name="name" id="name" placeholder="Name">
                                    <label for="name" class="form-label">Name</label>
                                </div>
                                <div class="mb-3 form-floating" >
                                    <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email" required>
                                    <label for="email" class="form-label">Email</label>
                                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div class="mb-3 form-floating">
                                    <input type="password" minlength="8" class="form-control" name="password" id="password" placeholder="Password" required>
                                    <label for="password" class="form-label">Password</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="FakePSW" id="checkPassword">
                                    <label class="form-check-label" for="checkPassword" onclick="showPassword()">Show Password</label>
                                </div>
                                <button type="submit" class="btn btn-primary mt-3">Register</button>
                                <div class="mt-3">
                                    <p>Already have an account? <a href="/#/login">Login</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

export default RegisterScreen;