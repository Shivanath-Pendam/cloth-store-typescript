import { useState } from "react";

import {
    signInAuthUserwithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
    SignInContainer,
    ButtonsContainer
} from './sign-in-form.styles';


const deafultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(deafultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(deafultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserwithEmailAndPassword(
                email,
                password
            );

            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break;

                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;

                default:
                    console.log('error occured while sign in', error.message);
                    break;
            }

            // if (error.code === 'auth/wrong-password') {
            //     alert('incorrect password for email')
            // }
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <SignInContainer>
            <h2>Already have an account ?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

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

                <ButtonsContainer>
                    <Button type="submit" > Sign In
                    </Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} > Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}

export default SignInForm;