export const validateEmailPass = (email, name, password) =>{
    const emailCheck = /^[A-Za-z\s.'-]+$/.test(email);
    const nameCheck = /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(name);
    const passCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(password);

    if(!emailCheck) return "Invalid Email Id.";
    if(!nameCheck) return "Invalid Name.";
    if(!passCheck) return "Invalid Password Field.";

    return null;
}