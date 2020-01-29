window.user = {
    logged: false
};
url = new URLSearchParams(window.location.search);
var host = 'http://andreafinazzi.com:5000';
defaultHeaders = {
    content: {

        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': "*",
        'Authorization': 'Bearer ' + window.user.token,
    },
    refresh: () => {
        window.user.token = localStorage.getItem('token');
        defaultHeaders.content['Authorization'] = 'Bearer ' + window.user.token;
        return defaultHeaders;
    }
}

api = {
    auth: {
        check: () => {
            defaultHeaders.refresh();
            return fetch(host + '/auth/check', {
                mode: 'cors',
                headers: defaultHeaders.content,
            })
                .then(res => {
                    if (res) {
                        if (res.status == 200) {
                            // User logged
                            window.user.logged = true;
                            window.user.email = res.email;

                            window.dispatchEvent(new Event('user-logged'));
                            return true
                        }
                    } else if (res.status >= 400) {
                        // User not logged
                        window.user.logged = false;
                    }
                    else if (res.status == 500) {
                        // Server error
                        window.user.logged = false;
                        window.user.error = true;
                    }
                    return false;
                })
        },
        login: (email, password) => {
            delete defaultHeaders.content.Authorization;
            return fetch(host + '/auth/login', {
                method: 'POST',
                mode: "cors",
                body: JSON.stringify({ email: email, password: password }),
                connection: 'keep-alive',
                headers: defaultHeaders.content,
            })
                .then(res => {
                    if (res.ok && res.status >= 200) {
                        return res.json();
                    } else
                        return Promise.reject("?type=login&success=false");
                })
                .then(data => {
                    localStorage.setItem('token', data.access_token);
                    return true;
                })
        },
        signup: (formData) => {
            delete defaultHeaders.content.Authorization;
            return fetch(host + '/users/signon', {
                method: 'POST',
                mode: "cors",
                body: JSON.stringify(Object.fromEntries(formData)),
                connection: 'keep-alive',
                headers: defaultHeaders.content,
            })
                .then(res => {
                    if (res.ok && res.status >= 200) {
                        return res.json();
                    } else
                        return Promise.reject("?type=signup&success=false");
                })
        }
    },
    opes: (payload) => {
        defaultHeaders.refresh();
        return fetch(host + '/venti-venti/opes', {
            method: 'POST',
            mode: "cors",
            body: payload,
            headers: defaultHeaders.content,
        })
    },
    opes_mp: (formData) => {
        defaultHeaders.refresh();
        delete defaultHeaders.content['Content-Type']
        return fetch(host + '/venti-venti/opes-mp', {
            method: 'POST',
            mode: "cors",
            body: formData,
            headers: defaultHeaders.content,
        })
    },
    purchase_ski: (formData) => {
        defaultHeaders.refresh();
        delete defaultHeaders.content['Content-Type']
        return fetch(host + '/venti-venti/purchase-ski', {
            method: 'POST',
            mode: "cors",
            body: formData,
            headers: defaultHeaders.content,
        })
    },
    paypalOnApprove: (data) => {
        defaultHeaders.refresh();
        return fetch(host + '/venti-venti/paypal-transaction-complete', {
            method: 'post',
            headers: defaultHeaders.content,
            body: JSON.stringify({
                orderID: data.orderID
            })
        })
    }
}