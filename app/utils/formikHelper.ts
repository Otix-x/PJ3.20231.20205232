export const filterFormikErrors = <T extends object>(
    errors: T, 
    touched: {[key:string]: boolean}, 
    values: T
) => {
    // Get all the keys that have been touched
    const touchedKeys = Object.entries(touched).map(([key,value]) => {
        if (value) return key; 
    });

    const finalErrors: string[] = [];

    Object.entries(errors).forEach(([key,value]) => {
        if(touchedKeys.includes(key) && value) finalErrors.push(value)
    });

    return finalErrors;
}