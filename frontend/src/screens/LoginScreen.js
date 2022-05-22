/* eslint-disable arrow-body-style */
const LoginScreen = {
    after_render: () =>{},
    render: () =>{
        return `
            <div>
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="loginLabel">Login</h5>
                        </div>
                        <div class="modal-body">
                            <form id="signin-form">
                                <div class="mb-3 form-floating" >
                                    <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email" required>
                                    <label for="email" class="form-label">Email</label>
                                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div class="mb-3 form-floating">
                                    <input type="password" class="form-control" name="password" id="password" placeholder="Password" required>
                                    <label for="password" class="form-label">Password</label>
                                </div>
                                <button type="submit" class="btn btn-primary">Login</button>
                                <div class="mt-3">
                                    <p>New User? <a href="/#/register">Create Your Account</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

export default LoginScreen;