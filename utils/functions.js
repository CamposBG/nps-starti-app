
export default class Functions {
    context = null;

    constructor(context) {
        this.context = context;
    }

    debounce(func, timeout = 300){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
}