import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./style.css";
import AuthInput from "../../Components/Input/AuthInput";
import { AiOutlineLock, AiOutlineRight, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosPublic } from "../../ApiServices/Axios";
import { showToast } from "../../ToastServices/ToastServices";
import Cookies from "js-cookie";
import SubmitButton from "../../Components/Button/SubmitButton/SubmitButton"; // Updated import to SubmitButton

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

  const SignInAsync = async (values: any, resetForm: any) => {
    setIsLoading(true);
    try {
      const response = await axiosPublic.post("api/v1/login", {
        email: values.email,
        login_pass: values.password,
      });
  
      // Assuming the response contains accessToken and refreshToken
      const { accessToken, logedinUser } = response.data;
  
      // Set tokens in cookies
      Cookies.set('ACCESS_TOKEN', accessToken, { expires: 7, path: '/' }); // Expires in 7 days
      Cookies.set('REFRESH_TOKEN', logedinUser?.refreshToken?.token, { expires: 7, path: '/' }); // Expires in 7 days
  
      resetForm();
      navigate("/profile");
      setIsLoading(false);
      showToast("Login successful", "success", 1000);
    } catch (error: any) {
      setIsLoading(false);
      showToast(error?.response?.data?.message || 'Login failed', "error", 1000);
      console.error("Error fetching public data", error);
    }
  };

  return (
    <section className="bg-white flex justify-center items-center min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-center"><img src="/image.jpg" className="w-20 h-20 rounded-full mb-1"/></div>
              <h2 className="text-xl font-semibold text-left">Welcome</h2>
              <h3 className="text-gray-600 text-sm mb-5 text-left">
                Enter your credentials to access your account
              </h3>

              {/* Formik Form */}
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  SignInAsync(values, resetForm);
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
                          placeholder="Enter password"
                          icon={<AiOutlineLock />}
                          prefix=""
                          required
                        />
                      </div>

                      <div>
                        {/* Use SubmitButton instead of the original button */}
                        <SubmitButton isLoading={isLoading} disabled={isSubmitting} buttonText={'Sign in'}/>
                      </div>

                      <div className="flex justify-between">
                        <div className="text-gray-400 mt-2 text-sm font-medium">
                          RETRIEVE PASSWORD
                        </div>
                        <Link
                          to={"/signUp"}
                          className="text-gray-400 mt-2 text-sm font-medium flex items-center"
                        >
                          REGISTER <AiOutlineRight />{" "}
                        </Link>
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
