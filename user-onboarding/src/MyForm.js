import React, { useState, useEffect } from "react"
import { withFormik, Form, Field }  from "formik";
import * as Yup from "yup";
import axios from "axios";

// values appears to be an object representing the user input as key value pairs
const MyForm = ( {values, errors, touched, status, handleChange }) => {

    const [users, setUsers] = useState([])
    console.log("this is touched", touched);
    // updating local copy of users after axios post request
    useEffect(() => {
        if(status) {
            setUsers([...users, status])
        }
    },[status])

    return (

        <div className="userForm">
            <Form>
                <Field
                    type="text"
                    name="name"
                    placeholder="name"/>
                {/* if the user clicked into the name field, made an error when filling it out
                print out an error message */}
                {
                    touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                    )
                }
                <Field
                    type="text"
                    name="email"
                    placeholder="email"/>
                {
                    touched.email && errors.email && (
                        <p className="error">{errors.email}</p>
                        )
                }
                <Field
                    type="text"
                    name="password"
                    placeholder="password"/>
                {
                    touched.password && errors.password && (
                        <p className="error">{errors.password}</p>
                        )
                }
                <label>
                    <Field
                        type="checkbox"
                        name="hasReadTermsOfService"
                        checked={values.hasReadTermsOfService} />
                    {
                        touched.hasReadTermsOfService && errors.hasReadTermsOfService && (
                            <p className="error">{errors.hasReadTermsOfService}</p>
                            )
                    }
                    Has read terms of service

                </label>
                
                <button>Submit</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                    <li>Name: {String(user.hasReadTermsOfService)}</li>


                </ul>

            ))}
        </div>
    );
}

const FormikUserForm = withFormik({
    // user filling out form
    mapPropsToValues({name, email, password, hasReadTermsOfService}) {
        // holding the state of the form
        // each field can have a default "0" value or whatever the user types
        // in
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            hasReadTermsOfService: hasReadTermsOfService || false
        };
    },
    // validating what the user typed in
    validationSchema: Yup.object().shape({
        name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required("a name is required"),
        email: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required("an email is required"),
        password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required("a password is required"),
        hasReadTermsOfService: Yup.boolean().required("It's our way or the highway to hell!")

    }),
    // send the user data to the server
    // same values as above
    handleSubmit(values, { setStatus, resetForm}) {
        axios   .post('https://reqres.in/api/users/', values)
                .then(res => {
                    console.log("recieved", res.data);
                    setStatus(res.data)
                    resetForm({});
                })
                .catch(err => console.log(err.response));
    }
})(MyForm);


export default FormikUserForm;
console.log("This is the HOC", FormikUserForm);