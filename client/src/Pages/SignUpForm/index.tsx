import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./style.css";
import AuthInput from "../../Components/Input/AuthInput";
import {
  AiOutlineMobile,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineKey,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../../ApiServices/Axios";
import { showToast } from "../../ToastServices/ToastServices";
import OTPInput from "../../Components/Input/OTPInput";
import { useEffect, useState } from "react";
// import Loader from "../../Components/Loader/Loader";
import SubmitButton from "../../Components/Button/SubmitButton/SubmitButton";

// Yup validation schema
const validationSchema = Yup.object({
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
  invitation: Yup.string()
    .max(10, "Invitation code must be 10 characters or less")
    .required("Invitation code is required"),
  code: Yup.string()
    .max(6, "Code must be 6 characters or less")
    .required("Code is required"),
});

export default function SignUpForm() {
  const navigate = useNavigate();

  const [resendOtp, setResendOtp] = useState(false);
  const [timer, setTimer] = useState(30);
  const [loading, setIsLoading] = useState(false);

  const handleSendOtp = async (values: any) => {
    if (values?.email == "") {
      showToast("Please enter your email first.", "error", 1000);
      return;
    }
    try {
      console.log("Sending OTP...");
      // Example: API call logic to send OTP
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
    // console.log(values);
    setIsLoading(true);
    try {
      const response = await axiosPublic.post("api/v1/register", {
        username: values.username,
        password: values.password,
        otp: values.code, // Assuming code is OTP
        cpassword: values.confirmPassword,
        email: values.email,
        phone: values.mobile,
        referral: values.invitation, // Assuming invitation is referral
        // fname: "aditya", // Assuming these are hardcoded for now
        // lname: "parashar",
      });
      console.log(response.data);
      resetForm();
      navigate("/login");
      setIsLoading(false);
      showToast("Registration successfull", "success", 1000);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      showToast(error?.response?.data?.message, "error", 1000);
      console.error("Error fetching public data", error);
    }
  };

  return (
    <section className="bg-white flex justify-center items-center min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="p-6">
            {/* <img src="/logo.png" className="w-20 h-20 rounded-md mb-1"/> */}
              <h2 className="text-xl font-semibold text-left">Sign Up</h2>
              <h3 className="text-gray-600 text-sm mb-5 text-left">
                Enter your details to register
              </h3>

              {/* Formik Form */}
              <Formik
                initialValues={{
                  username: "",
                  mobile: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  invitation: "",
                  code: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  // showToast('This is a warning!', 'warning', 4000);
                  SignUpAsync(values, resetForm);
                  // resetForm();
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting, values }) => (
                  <Form>
                    <div className="space-y-1">
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
                          placeholder="Enter password again"
                          prefix=""
                          icon={<AiOutlineLock />}
                          required
                        />
                      </div>

                      <div>
                        <AuthInput
                          label="Invitation Code"
                          name="invitation"
                          placeholder="Enter invitation"
                          prefix=""
                          icon={<AiOutlineUser />}
                        />
                      </div>

                      <div>
                      <SubmitButton
                          isLoading={loading} 
                          disabled={isSubmitting} 
                          buttonText="Sign up" 
                        />
                        <SubmitButton
                          isLoading={false} 
                          disabled={false} 
                          buttonText="Sign in" 
                          onClick={() => navigate("/")}
                          buttonColor="bg-green-500"
                        />
                        {/* <button
                          onClick={() => navigate("/")}
                          className="w-full mt-4 bg-green-500 text-white text-sm font-semibold py-1.5 rounded-full shadow-md hover:bg-green-600 transition duration-200"
                          type="button"
                        >
                          Sign in
                        </button> */}
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
