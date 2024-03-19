import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const formRef = useRef();
  const initialValues = {
    from_name: "",
    from_email: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    from_name: Yup.string().required("Name is required"),
    from_email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const sendEmail = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await emailjs.sendForm(
        "service_qvmpyj2",
        "template_irk77ql",
        formRef.current,
        {
          publicKey: "qSGSbA1ytrQgRbq5l",
        }
      );
      if (response.status === 200) {
        resetForm();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={sendEmail}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form ref={formRef}>
          <h2>Let's Connect</h2>
          {/* <label htmlFor="from_name">Name</label> */}
          <Field
            type="text"
            id="from_name"
            name="from_name"
            placeholder="Enter your name"
            className={errors.from_name && touched.from_name ? "error" : ""}
          />
          <ErrorMessage
            name="from_name"
            component="div"
            className="error-msg"
          />

          {/* <label htmlFor="from_email">Email</label> */}
          <Field
            type="email"
            id="from_email"
            name="from_email"
            placeholder="Enter your email"
            className={errors.from_email && touched.from_email ? "error" : ""}
          />
          <ErrorMessage
            name="from_email"
            component="div"
            className="error-msg"
          />

          {/* <label htmlFor="message">Message</label> */}
          <Field
            as="textarea"
            id="message"
            name="message"
            placeholder="Enter your message"
            className={errors.message && touched.message ? "error" : ""}
          />
          <ErrorMessage name="message" component="div" className="error-msg" />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
