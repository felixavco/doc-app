class Helpers {

    /**
    * Name: setError
    * Description: Creates a custom error object, {required fields: message: str, status:num}, {optional: field?: str instructions?: str}
    */
    setResponse(msgSpa, msgEng) {
        return { msgSpa, msgEng }
    }

    /**
    * Name: setError (static method)
    * Description: Creates a custom error object, {required fields: message: str, status:num}, {optional: field?: str instructions?: str}
    */
    static setResponse(msgSpa, msgEng) {
        return { msgSpa, msgEng }
    }

    /**
    * Name: is_Empty,
    * Description: Evaluates if an element is empty, returns boolean value
    */
    isEmpty(value) {
        return (
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        );
    }

    /**
    * Name: is_Empty (static method),
    * Description: Evaluates if an element is empty, returns boolean value
    */
    static isEmpty(value) {
        return (
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        );
    }

    /**
    * Name: isDomain,
    * Description: Evaluates if a string is valid domain name, returns boolean value
    */
    isDomain(domain) {
        const domain_regex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
        return domain_regex.test(domain);
    }

    /**
    * Name: isDomain (static method),
    * Description: Evaluates if a string is valid domain name, returns boolean value
    */
    static isDomain(domain) {
        const domain_regex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
        return domain_regex.test(domain);
    }

    /**
    * Name: isUserName,
    * Description: Evaluates if a string is a user name slug no spaces only alpha numeric, hyphen and underscore are allowed
    */
    isUserName(userName) {
        const _regex = /^[a-zA-Z0-9-._]+$/;
        return _regex.test(userName)
    }

     /**
    * Name: isUserName (static method),
    * Description: Evaluates if a string is a user name slug no spaces only alpha numeric, hyphen and underscore are allowed
    */
    static isUserName(userName) {
        const _regex = /^[a-zA-Z0-9-._]+$/;
        return _regex.test(userName)
    }

    /**
    * Name: isSlug,
    * Description: Evaluates if a string is a valid slug no spaces only alpha numeric and dashes are allowed, returns boolean value
    */
    isSlug(url) {
        const url_regex = /^[a-zA-Z0-9-]+$/;
        return url_regex.test(url);
    }

    /**
    * Name: isSlug (static method),
    * Description: Evaluates if a string is a valid slug no spaces only alpha numeric and dashes are allowed, returns boolean value
    */
    static isSlug(url) {
        const url_regex = /^[a-zA-Z0-9-_]+$/;
        return url_regex.test(url);
    }
}

export default Helpers;