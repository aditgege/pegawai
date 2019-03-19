export default function({ $axios, store }) {
   
    $axios.onError(error => {
        if (error.response.status === 422) {
            store.dispatch('validation/setErrors', error.response.data.errors);
        }
        return Promise.reject(error);
    });

    $axios.onRequest(() => {
        // config.headers.common['access-token'] = store.state.user.headers.access_token
        // config.headers.common['token-type'] = store.state.user.headers.token_type
        // config.headers.common['client'] = store.state.user.headers.client
        // config.headers.common['expiry'] = store.state.user.headers.expiry
        // config.headers.common['uid'] = store.state.user.headers.uid
        store.dispatch('validation/clearErrors');
    });
}