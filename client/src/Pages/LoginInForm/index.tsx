import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./style.css";
import AuthInput from "../../Components/Input/AuthInput";
import { AiOutlineLock, AiOutlineRight, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

// Yup validation schema
const validationSchema = Yup.object({
  // mobile: Yup.string()
  //   .matches(/^[0-9]+$/, "Mobile number must be numeric")
  //   .min(10, "Mobile number must be at least 10 digits")
  //   .required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LogInForm() {
  return (
    <section className="bg-white flex justify-center items-center min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="p-6">
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
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  console.log(values);
                  resetForm();
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="space-y-1">
                      {/* <div>
                        <AuthInput
                          label="Mobile"
                          name="mobile"
                          placeholder="Enter mobile number"
                          prefix="+91"
                          icon={<AiOutlineMobile />}
                          required
                        />
                      </div> */}

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
                        <button
                          className="w-full mt-6 bg-blue-500 text-white text-sm font-semibold py-1.5 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Sign in
                        </button>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-gray-400 mt-2 text-sm font-medium">
                          RETRIEVE PASSWORD
                        </div>
                        <Link
                          to={"/"}
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
