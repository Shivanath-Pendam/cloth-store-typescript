import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";


import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { PaymentContainer, FormContainer, PaymentButton } from "./payment-form.styles";
import { useState } from "react";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'POST',
            headers: {
                contentType: 'application/json',
            },
            body: JSON.stringify({
                amount: amount * 100,
            }),
        }).then(res => res.json());

        const { paymentIntent: { client_secret } } = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : "Guest",
                },
            },
        })

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful');
            }
        }
    }
    return (
        <PaymentContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Cart Payment: </h2>
                <CardElement />
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay Now </PaymentButton>
            </FormContainer>
        </PaymentContainer>
    )
}

export default PaymentForm;