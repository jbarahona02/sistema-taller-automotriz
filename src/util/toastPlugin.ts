import {toast, ToastOptions} from 'react-hot-toast';


export const toastPlugin = () => {
    const duration = 3500;

    const setOptions = (opts: ToastOptions): ToastOptions => {
        let temp: ToastOptions = {
            duration: duration
        };

        if (opts) {
            temp = opts;
            temp.duration = opts.duration ? opts.duration : duration;
        }

        return temp;
    };

    const error = (message: string, opts?: any | ToastOptions) => {
        return toast.error(message, setOptions(opts));
    };

    const success = (message: string, opts?: any | ToastOptions) => {
        return toast.success(message, setOptions(opts));
    };

    return {
        error,
        success
    }
}

