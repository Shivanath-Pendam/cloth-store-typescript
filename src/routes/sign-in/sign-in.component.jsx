// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';


import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import {
    // auth,
    signInWithGooglePopup,
    createUserDoucmentFromAuth,
    // signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils';


const SignIn = () => {

    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);
    //     console.log(response);

    //     if (response) {
    //         const userDocRef = await createUserDoucmentFromAuth(response.user);
    //     }
    // }, []);
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();

        const userDocRef = await createUserDoucmentFromAuth(user);
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup</button>
            {/* <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect</button> */}
            <SignUpForm />
        </div>
    )
}

export default SignIn;