import React from "react"
import { withFormik, Form as formikForm, Field }  from "formik";
import * as Yup from "yup";
import axios from "axios";

const Form = ( {values, handleChange }) => {


    return (

        <div className="userForm">
            <form>
                <input
                type="text"
                name="name"
                placeholder="name"
                value={values.name}
                onChange={handleChange}/>
                <button>Submit</button>
            </form>
        </div>
    );
}

const FormikUserForm = withFormik({
    mapPropsToValues({name}) {
        return {
            name: name || ""
        };
    }
})(Form);


export default FormikUserForm;
console.log("This is the HOC", FormikUserForm);