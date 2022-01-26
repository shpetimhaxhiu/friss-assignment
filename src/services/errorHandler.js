import axios from 'axios'
import 'izitoast/dist/css/iziToast.css'
import iZtoast from 'izitoast'

function errorResponseHandler(err) {
    // check for errorHandle config
    if (err.config.errorHandle === false) {
        return Promise.reject(err);
    }

    // if has response show the error
    if (err.response) {
        iZtoast.error({
            titleSize: '18',
            messageSize: '18',
            title: 'Operation failed',
            message: `Error Code: ${err.response.status}`,
            position: 'center',
            // message: `Error Code: ${err.response.status}`
        });

        // console.log("Problem with response ", err.response.status);
        // alert("Problem with response ", err.response.status);
    } else if (err.request) {
        iZtoast.error({
            titleSize: '18',
            messageSize: '18',
            title: 'Operation failed',
            message: `Problem with the request`,
            position: 'center',
            // message: `Error Code: ${err.response.status}`
        });
    } else {
        // console.log("Error", err.message);
        iZtoast.error({
            titleSize: '18',
            messageSize: '18',
            title: 'Operation failed',
            message: `${err.message}`,
            position: 'center',
            // message: `Error Code: ${err.response.status}`
        });
        // alert("Error", err.message);
    }
}

// apply interceptor on response
axios.interceptors.response.use(
    response => response,
    errorResponseHandler
);

export default errorResponseHandler;