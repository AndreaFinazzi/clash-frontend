

$('document').ready(function () {
    $('.header').addClass('sticky_header');
    $('.navbar-toggler').prop('disabled', false);

    window.addEventListener('user-logged', event => {
        
        initPayment();
    })
});

function initPayment() {
    api.getNotPaidItems()
        .then(res => {
            if (res.ok && res.status >= 200) {
                return res.json();
            } else
                return Promise.reject("?type=payment&success=false");
        })
        .then(data => {
            // console.log(data);
            let totalAmount = 0;
            data.products.forEach(product => totalAmount+=(product.quantity*product.product_id.price));
            return Promise.resolve(generateButton({
                reference_id: data.reference_id,
                amount: {
                    currency_code: 'EUR',
                    value: totalAmount.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: totalAmount.toString()
                        }
                    }
                },
                payee: {
                    email_address: 'cityinvadersmilano@gmail.com'
                },
                description: '',
                items: data.products.map(product => {
                    return {
                        name: product.product_id.title,
                        unit_amount: {
                            currency_code: 'EUR',
                            value: product.product_id.price.toString()
                        },
                        quantity: product.quantity.toString()
                    }
                })
            }))
        })
        .catch(err => window.location = "/sorryforthat.html?type=payment")
}

function generateButton(purchase_unit) {
    paypal.Buttons({
        createOrder: function (data, actions) {
            // This function sets up the details of the transaction, including the amount and line item details.
            return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [purchase_unit]
            });
        },
        onApprove: function (data, actions) {
            // This function captures the funds from the transaction.
            return actions.order.capture()
                .then(function (details) {
                    // This function shows a transaction success message to your buyer.
                    alert('Transazione completata per ' + details.payer.name.given_name );
                    // Call your server to save the transaction
                    return api.paypalOnApprove(data)
                    .then(result => {
                        window.location = '/grazie.html';
                    })
                });
        }
    }).render('#paypal-button-container');
}