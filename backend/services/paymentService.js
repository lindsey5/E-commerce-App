
export const getPaymentId = async (payment_intent_id) => {
    try{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              authorization: `Basic ${process.env.PAYMONGO_SECRET}`
            }
          };
          
        const response = await fetch(`https://api.paymongo.com/v1/payment_intents/${payment_intent_id}`, options)
        if(response.ok){
            const result = await response.json();
            return result.data.attributes.payments[0].id
        }
        return null
    }catch(err){
        throw new Error(err)
    }
}

export const refundPayment = async (payment_id, amount) => {
    try{
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: `Basic ${process.env.PAYMONGO_SECRET}`
            },
            body: JSON.stringify({
              data: {
                attributes: {
                  amount,
                  payment_id,
                  reason: 'others'
                }
              }
            })
          };
          const response= await fetch('https://api.paymongo.com/refunds', options)
          if(response.ok){
            const result = await response.json();
            return result;
          }
          return null
    }catch(err){
      console.log(err)
      throw new Error(err)
    }
}