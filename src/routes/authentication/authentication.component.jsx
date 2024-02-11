// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';


import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authencation.styles.scss';


const Authentication = () => {

    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);
    //     console.log(response);

    //     if (response) {
    //         const userDocRef = await createUserDoucmentFromAuth(response.user);
    //     }
    // }, []);

    return (
        <div className='authencation-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;