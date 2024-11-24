const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { plan } = req.body;

  const planDetails = {
    daily: { name: "Daily Plan", price: 99}, 
    monthly: { name: "Monthly Plan", price: 999 }, // 9.99 USD (in cents)
    yearly: { name: "Yearly Plan", price: 9999 }   // 99.99 USD (in cents)
  };

  const chosenPlan = planDetails[plan];

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: chosenPlan.name,
            },
            unit_amount: chosenPlan.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failure`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
