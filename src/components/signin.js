import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useToken } from "./createContext";
// import { emails } from "../utils/constant";

const SignIn = () => {
    const { setToken } = useToken();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordInputField, setShowPasswordInputField] = useState(false);
    const [error, setError] = useState(null);
    //   const [idToken, setIdToken] = useState(null);
    const navigate = useNavigate();
    const commonURL = process.env.REACT_APP_COMMON_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // if (name === "email") {
        //   setShowPasswordInputField(emails.includes(value.trim()));
        // }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // const result = await axios.get(
            //   `${commonURL}login?email=${formData.email}&password=${formData.password}`,
            //   {
            //     headers: {
            //       "x-api-key": process.env.REACT_APP_X_API_KEY,
            //       "Content-Type": "application/json",
            //     },
            //   }
            // );

            const result = await axios.post(
                `${commonURL}/login`,
                {
                    email: formData?.email,
                    password: formData?.password,
                }
                // {
                //   headers: {
                //     "x-api-key": process.env.REACT_APP_X_API_KEY,
                //     "Content-Type": "application/json",
                //   },
                // }
            );

            if (result?.data || result?.data?.success) {
                setToken(result?.data?.token);
                console.log("idToken console in signpage : - ", result?.data?.token);
                console.log("idToken console in signpage : - ", result?.data);

                // navigate("/dashboard", { token : result?.data?.token }); // Redirect to admin page
                // <Dashboard userId={"688a724f70c48d26338d1ed2"} />;

                navigate("/dashboard", {userId:"688a724f70c48d26338d1ed2"} ); // Redirect to admin page

            } else {
                setError("Invalid email or password.");
            }
            setFormData({ email: "", password: "" });
        } catch (error) {
            console.error("Error logging in:", error);
            setError("An error occurred during login. Please try again.");
        }
    };


    const handleRegistration = (e) => {

        navigate("/register"); // Redirect to admin page

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-green-400 to-indigo-900">
            <div class="h-full  w-full py-16 px-4">
                <div class="flex flex-col items-center justify-center">
                    <h1 className="text-white font-lg text-4xl md:text-6xl lg:text-7xl font-serif font-bold">
                        Hi... Please SignIn
                    </h1>

                    <div class="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
                        <p
                            tabindex="0"
                            class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
                        >
                            Sign in to your account
                        </p>
                        <p
                            tabindex="0"
                            class="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
                        >
                            Enter your credentials to access your account.
                        </p>
                        <form onSubmit={handleLogin}>
                            <div>
                                <label
                                    id="email"
                                    className="text-sm font-medium leading-none text-gray-800"
                                >
                                    Email
                                </label>
                                <input
                                    aria-labelledby="email"
                                    type="email"
                                    name="email"
                                    className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* {showPasswordInputField && ( */}
                                <div className="mt-6 w-full">
                                    <label
                                        htmlFor="pass"
                                        className="text-sm font-medium leading-none text-gray-800"
                                    >
                                        Password
                                    </label>

                                    <div className="relative flex items-center justify-center">
                                        <input
                                            aria-labelledby="pass"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                                            placeholder="Enter password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <div
                                            className="absolute right-3 mt-2 cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </div>
                                    </div>
                                </div>
                            {/* )} */}

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 text-sm font-semibold leading-none text-white focus:outline-none bg-gray-900 border rounded hover:bg-gray-800 py-4 w-full"
                                >
                                    Sign In
                                </button>
                            </div>
                            {error && <p className="text-red-500 mt-4">{error}</p>}

                            {/* <div className="mt-8">
                                <label>if you are registered then signin</label>
                                <button
                                    onClick={handleSignin}
                                    className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 text-sm font-semibold leading-none text-white focus:outline-none bg-gray-900 border rounded hover:bg-gray-800 py-4 w-full"
                                >
                                    Sign In
                                </button>
                            </div> */}

                            <div className="mt-8">
                                <label>if you are not registered then do registration</label>

                                <button
                                    // type="submit"
                                    onClick={handleRegistration}
                                    className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 text-sm font-semibold leading-none text-white focus:outline-none bg-gray-900 border rounded hover:bg-gray-800 py-4 w-full"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
