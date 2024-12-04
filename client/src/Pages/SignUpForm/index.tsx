import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./style.css";
import AuthInput from "../../Components/Input/AuthInput";
import {
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineKey,
  AiOutlineMobile,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosPublic } from "../../ApiServices/Axios";
import { showToast } from "../../ToastServices/ToastServices";
import OTPInput from "../../Components/Input/OTPInput";
import { useEffect, useState } from "react";
import SubmitButton from "../../Components/Button/SubmitButton/SubmitButton";
import Logo from "../../Components/Logo/Logo";

// Yup validation schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .required("Last Name is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must be numeric")
    .min(10, "Mobile number must be at least 10 digits")
    .required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Please confirm your password"),
  code: Yup.string()
    .max(6, "Code must be 6 characters or less")
    .required("Code is required"),
});

export default function SignUpForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Example: Get a specific query parameter (e.g., id)
  const InvitationCode = queryParams.get("referral");

  const navigate = useNavigate();
  const [resendOtp, setResendOtp] = useState(false);
  const [timer, setTimer] = useState(30);
  const [loading, setIsLoading] = useState(false);

  const handleSendOtp = async (values: any) => {
    if (values?.email === "") {
      showToast("Please enter your email first.", "error", 1000);
      return;
    }
    try {
      console.log("Sending OTP...");
      const response = await axiosPublic.post("api/v1/send-mail-register", {
        email: values?.email,
      });
      console.log(response);
      setResendOtp(true);
      setTimer(30);
    } catch (error) {
      console.error("Error sending OTP", error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendOtp(false);
    }
    return () => clearInterval(interval);
  }, [resendOtp, timer]);

  const SignUpAsync = async (values: any, resetForm: any) => {
    setIsLoading(true);
    try {
      const response = await axiosPublic.post("api/v1/register", {
        fname: values.firstName,
        lname: values.lastName,
        username: values.username,
        password: values.password,
        otp: values.code,
        cpassword: values.confirmPassword,
        email: values.email,
        phone: values.mobile,
        referral: values.invitation,
      });
      console.log(response.data);
      resetForm();
      navigate("/login");
      setIsLoading(false);
      showToast("Registration successful", "success", 1000);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      showToast(error?.response?.data?.message, "error", 1000);
      console.error("Error fetching public data", error);
    }
  };

  return (
    <section
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >
      <div className="container mx-auto my-10 md:my-0">
        <div className="flex justify-center">
          <div className="w-full md:max-w-[80%] lg:max-w-[40%]">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-center">
                {/* <img src="/image.jpg" className="w-20 h-20 rounded-full mb-1" /> */}
                <Logo/>
              </div>
              <h2 className="text-lg font-semibold text-center">
                Get Started – Register Your Account Now
              </h2>
              <h3 className="text-gray-600 text-xs mb-2 text-center">
                Enter your details to register
              </h3>

              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  username: "",
                  mobile: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  invitation: InvitationCode ? InvitationCode : "",
                  code: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  SignUpAsync(values, resetForm);
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting, values }) => (
                  <Form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <AuthInput
                          label="First Name"
                          name="firstName"
                          placeholder="Enter your first name"
                          prefix=""
                          icon={<AiOutlineUser />}
                          required
                        />
                      </div>
                      <div>
                        <AuthInput
                          label="Last Name"
                          name="lastName"
                          placeholder="Enter your last name"
                          prefix=""
                          icon={<AiOutlineUser />}
                          required
                        />
                      </div>
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
                        <OTPInput
                          label="OTP Code"
                          name="code"
                          placeholder="Enter code"
                          icon={<AiOutlineKey />}
                          required
                          resendOtp={resendOtp}
                          timer={timer}
                          handleSendOtp={() => handleSendOtp(values)}
                        />
                      </div>
                      <div>
                        <AuthInput
                          label="Username"
                          name="username"
                          placeholder="Enter your username"
                          prefix=""
                          icon={<AiOutlineUser />}
                          required
                        />
                      </div>
                      <div>
                        <AuthInput
                          label="Mobile"
                          name="mobile"
                          placeholder="Enter mobile number"
                          prefix="+91"
                          icon={<AiOutlineMobile />}
                          required
                        />
                      </div>
                      <div>
                        <AuthInput
                          label="Password"
                          isPassword
                          name="password"
                          type="password"
                          placeholder="Enter password"
                          prefix=""
                          icon={<AiOutlineLock />}
                          required
                        />
                      </div>
                      <div>
                        <AuthInput
                          label="Confirm Password"
                          name="confirmPassword"
                          type="password"
                          isPassword
                          placeholder="Enter password again"
                          prefix=""
                          icon={<AiOutlineLock />}
                          required
                        />
                      </div>
                      <div className="grid md:col-span-2">
                        <AuthInput
                          label="Invitation Code"
                          name="invitation"
                          placeholder="Enter invitation"
                          prefix=""
                          icon={<AiOutlineUser />}
                        />
                      </div>
                    </div>
                    <div>
                      <SubmitButton
                        isLoading={loading}
                        disabled={isSubmitting}
                        buttonText="Sign up"
                      />
                      <p className="text-xs mt-2 text-center">
                        Already have an account?{" "}
                        <Link className="text-blue-500" to={"/login"}>
                          Log in
                        </Link>
                      </p>
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
