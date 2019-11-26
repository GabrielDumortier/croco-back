// check if the color has the hexadecimal format
export const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v);

//check if the email if spelled right (abc@abc.abc)
export const emailValidator = (v) => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v);
