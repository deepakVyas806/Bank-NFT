// import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';  // Import Yup
import './style.css';

// Yup validation schema
const validationSchema = Yup.object({
    firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('First name is required'),
    lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Last name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

export default function SignUpForm() {
    return (
        <div>
            <section className="bg-light d-flex justify-content-center align-items-center min-vh-100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                            <div className="card border border-light-subtle rounded-4">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mb-5 text-center">
                                                <h2 className="h4">Registration</h2>
                                                <h3 className="fs-6 fw-normal text-secondary">Enter your details to register</h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Formik Form */}
                                    <Formik
                                        initialValues={{
                                            firstName: '',
                                            lastName: '',
                                            email: '',
                                            password: '',
                                        }}
                                        validationSchema={validationSchema}  // Use Yup schema
                                        onSubmit={(values, { setSubmitting, resetForm }) => {
                                            //   alert(JSON.stringify(values, null, 2));
                                            console.log(values)
                                            resetForm()
                                            setSubmitting(false);
                                        }}
                                    >
                                        {({ isSubmitting }) => (
                                            <Form>
                                                <div className="row gy-2 overflow-hidden">
                                                    <div className="col-12">
                                                        <div className="form-floating mb-3">
                                                            <Field
                                                                type="text"
                                                                className="form-control"
                                                                name="firstName"
                                                                id="firstName"
                                                                placeholder="First Name"
                                                            />
                                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                                            <ErrorMessage name="firstName" component="div" className="text-danger" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-floating mb-3">
                                                            <Field
                                                                type="text"
                                                                className="form-control"
                                                                name="lastName"
                                                                id="lastName"
                                                                placeholder="Last Name"
                                                            />
                                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                                            <ErrorMessage name="lastName" component="div" className="text-danger" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-floating mb-3">
                                                            <Field
                                                                type="email"
                                                                className="form-control"
                                                                name="email"
                                                                id="email"
                                                                placeholder="name@example.com"
                                                            />
                                                            <label htmlFor="email" className="form-label">Email</label>
                                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="form-floating mb-3">
                                                            <Field
                                                                type="password"
                                                                className="form-control"
                                                                name="password"
                                                                id="password"
                                                                placeholder="Password"
                                                            />
                                                            <label htmlFor="password" className="form-label">Password</label>
                                                            <ErrorMessage name="password" component="div" className="text-danger" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="d-grid">
                                                            <button
                                                                className="btn btn-primary"
                                                                type="submit"
                                                                disabled={isSubmitting}
                                                            >
                                                                Sign up
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
