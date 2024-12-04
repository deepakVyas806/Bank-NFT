import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthInput from "../../Components/Input/AuthInput";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosPublic } from "../../ApiServices/Axios";
import { showToast } from "../../ToastServices/ToastServices";
import Cookies from "js-cookie";
import SubmitButton from "../../Components/Button/SubmitButton/SubmitButton"; // Updated import to SubmitButton
import { fetchProfileData } from "../../GlobalFunctions/FetchProfileDetails";
import { useDispatch } from "react-redux";
import Logo from "../../Components/Logo/Logo";

// Yup validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LogInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SignInAsync = async (
    values: any,
    resetForm: any,
    setSubmitting: any
  ) => {
    setIsLoading(true);
    try {
      const response = await axiosPublic.post("api/v1/login", {
        email: values.email,
        login_pass: values.password,
      });

      // Assuming the response contains accessToken and refreshToken
      const { accessToken, logedinUser } = response.data;

      // Set tokens in cookies
      Cookies.set("ACCESS_TOKEN", accessToken, { expires: 7, path: "/" }); // Expires in 7 days
      Cookies.set("REFRESH_TOKEN", logedinUser?.refreshToken?.token, {
        expires: 7,
        path: "/",
      }); // Expires in 7 days
      fetchProfileData(dispatch);
      resetForm();
      setSubmitting(false);
      navigate("/dashboard");
      setIsLoading(false);
      showToast("Login successful", "success", 1000);
    } catch (error: any) {
      setSubmitting(false);
      setIsLoading(false);
      showToast(
        error?.response?.data?.message || "Login failed",
        "error",
        1000
      );
      console.error("Error fetching public data", error);
    }
  };

  return (
    <section
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      // style={{ backgroundImage: "url('/login-bg.jpg')" }} // Update with your image path
    >
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-center">
                {/* <img src="/image.jpg" className="w-20 h-20 rounded-full mb-1" /> */}
                <Logo/>
              </div>
              {/* <h2 className="text-xl font-semibold text-center">Log in to Betting app</h2> */}
              <h2 className="text-lg font-semibold text-center">
                Welcome Back – Log In to Your Account
              </h2>
              <h3 className="text-gray-600 text-xs mb-2 text-center">
                Enter your credentials to access your account
              </h3>

              {/* Formik Form */}
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                  SignInAsync(values, resetForm, setSubmitting);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="space-y-1">
                      <div>
                        <AuthInput
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          prefix=""
                          icon={<AiOutlineUser />}
                          required
                        />
                      </div>

                      <div>
                        <AuthInput
                          label="Password"
                          name="password"
                          type="password"
                          isPassword
                          placeholder="Enter password"
                          icon={<AiOutlineLock />}
                          prefix=""
                          required
                        />
                      </div>

                      <div>
                        {/* Use SubmitButton instead of the original button */}
                        <SubmitButton
                          isLoading={isLoading}
                          disabled={isSubmitting}
                          buttonText={"Log in"}
                        />
                      </div>

                      <div className="flex justify-between">
                        {/* <div className="text-gray-400 mt-2 text-sm font-medium">
                          RETRIEVE PASSWORD
                        </div> */}
                        <p className="text-xs mt-2 text-center">
                          <Link
                            className="text-blue-500"
                            to={"/forgotPassword"}
                          >
                            Forgot password?
                          </Link>
                        </p>
                        {/* <Link
                          to={"/signUp"}
                          className="text-gray-400 mt-2 text-sm font-medium flex items-center"
                        >
                          REGISTER <AiOutlineRight />{" "}
                        </Link> */}
                        <p className="text-xs mt-2 text-center mr-1">
                          don't have an account?{" "}
                          <Link className="text-blue-500" to={"/signUp"}>
                            Sign up
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
