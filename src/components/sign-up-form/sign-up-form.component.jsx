import { useState } from "react";

import {
    createAuthUserWithEmailAndPassword,
    createUserDoucmentFromAuth
} from "../../utils/firebase/firebase.utils";

import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const deafultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(deafultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(deafultFormFields);
    }

    const handleSubmit = async (event) => {
        event?.preventDefault();

        if (password !== confirmPassword) {
            alert('pasword does not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            await createUserDoucmentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('cannot create user, email already in use');
            } else {
                console.log('user sign Failed', error);
            }
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have account ?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                />

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    label="Passwod"
                    type="passowrd"
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />

                <Button type="submit" > Sign Up
                </Button>
            </form>
        </div>
    );
}

export default SignUpForm;