window.user.loaded = false

orderButton = (element) => {
    let productsList = '';
    element.products.map(product => productsList += `<li>${product.product_id.title}</li>`)
    return `<div class="card" style="min-width: 20em;">
                <div class="card-body text-left">
                    <h5 class="card-title text-center">${element.flow.title}</h5>
                    <ul>
                        ${productsList}
                    </ul>
                    <div class="text-center">
                        <a href="/${element.flow.name}-order.html"><span><i class="fas fa-edit"></i> Modifica</span></a>
                    </div>
                </div>
                <div class="card-footer">
                    <button id="${element.reference_id}" class="btn btn-block btn-primary">Vai al pagamento</button>
                </div>
            </div>`
}

$(function () {
    $('.header').addClass('sticky_header');
    $('.navbar-toggler').prop('disabled', false);

    window.addEventListener('user-logged', event => {
        if (!window.user.loaded) {
            window.user.loaded = true;
            initPayment();
        }
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
            if (data && data.length)
                renderChoices(data);
            else window.location = "/grazie.html?type=payment&success=false"
        })
        .catch(err => window.location = "/sorryforthat.html?type=payment&success=false")
}

function renderChoices(data) {
    data.forEach(element => {
        // console.log(data);
        let totalAmount = 0;
        element.products.forEach(product => totalAmount += (product.quantity * product.product_id.price));
        let purchase_unit = {
            reference_id: element.reference_id,
            amount: {
                currency_code: 'EUR',
                value: (totalAmount + 0.54).toString() ,
                breakdown: {
                    item_total: {
                        currency_code: 'EUR',
                        value: totalAmount.toString()
                    },
                    tax_total: {
                        currency_code: 'EUR',
                        value: '0.54'
                    }
                },
            },
            payee: {
                email_address: 'cityinvadersmilano@gmail.com'
            },
            description: '',
            items: element.products.map(product => {
                return {
                    name: product.product_id.title,
                    unit_amount: {
                        currency_code: 'EUR',
                        value: product.product_id.price.toString()
                    },
                    quantity: product.quantity.toString(),
                    category: 'DIGITAL_GOODS'
                }
            })
        }

        $('#flow-button-container').append(orderButton(element))
        $('#' + element.reference_id).on('click', e => {
            generateButton(purchase_unit)
            $('#purchaseBox').fadeToggle(250, element => {
                $('#paymentBox').fadeToggle(250);
            })
        })
    });
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
            $('.loader').delay(50).fadeIn('slow');
            data.reference_id = purchase_unit.reference_id;
            // This function captures the funds from the transaction.
            return actions.order.capture()
                .then(function (details) {
                    data.details = details;
                    // Call your server to save the transaction
                    return api.paypalOnApprove(data)
                        .then(result => {
                            window.location = '/grazie.html?type=payment&success=true';
                        })
                });
        }
    }).render('#paypal-button-container');
}

function goBack() {
    $('#paymentBox').fadeToggle(250, element => {
        $('#purchaseBox').fadeToggle(250);
        $('#paypal-button-container').html('');
    })

}