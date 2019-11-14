import React, { useState, useEffect } from "react"
import { withFormik, Form, Field }  from "formik";
import * as Yup from "yup";
import axios from "axios";

const MyForm = ( {values, errors, touched, status, handleChange }) => {

    const [users, setUsers] = useState([])
    console.log("this is touched", touched);
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
                <Field
                    type="checkbox"
                    name="hasReadTermsOfService"
                    checked={values.hasReadTermsOfService} />
                {
                    touched.hasReadTermsOfService && errors.hasReadTermsOfService && (
                        <p className="error">{errors.hasReadTermsOfService}</p>
                        )
                }
                <button>Submit</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                </ul>

            ))}
        </div>
    );
}

const FormikUserForm = withFormik({
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
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        hasReadTermsOfService: Yup.bool().required()
    }),
    // same values as before
    handleSubmit(values, { setStatus, resetForm}) {
        axios   .post('https://reqres.in/api/users/', values)
                .then(res => {
                    console.log(res.data);
                    setStatus(res.data)
                    resetForm({});
                })
                .catch(err => console.log(err.response));
    }
})(MyForm);


export default FormikUserForm;
console.log("This is the HOC", FormikUserForm);