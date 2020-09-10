import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const PaypalButton = (props) => {
  const [sdkReady, setSdkReady] = useState(false);

  const addPaypalSdk = async () => {
    const res = await axios.get('/api/config/paypal');
    const clientId = res.data;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    }
    document.body.appendChild(script);
  }

  const createOrder = (data, actions) => actions.order.create({
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: props.amount
        }
      }
    ]
  })


  const onApprove = (data, actions) => actions.order
    .capture()
    .then(details => props.onSuccess(data, details))
    .catch(e => console.log(e))


  useEffect(() => {
    if (!window.paypal) {
      addPaypalSdk();
    }
  }, [])

  if (!sdkReady) {
    return <div>Loading...</div>
  }

  const Button = window.paypal.Buttons.driver('react', {React, ReactDOM});

  return <Button {...props} createOrder={(data, actions) => createOrder(data, actions)}
                 onApprove={(data, actions) => onApprove(data, actions)}/>
}

export default PaypalButton;