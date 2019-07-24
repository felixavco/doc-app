class Helpers {

    /**
    * Name: setError (static method)
    * Description: Creates a custom error object, {required fields: message: str, status:num}, {optional: field?: str instructions?: str}
    */
	static setError(message, number, instructions ) {
		return { message, status, field, instructions };
	}


    /**
	 * Name: getUTCTime (static method)
	 * Description: Returns date current date in UTC format
	 */
    static getUTCTime() {
        const now = new Date();
        const UTC_Time = Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            now.getUTCHours(),
            now.getUTCMinutes(),
            now.getUTCSeconds()
        );
        return UTC_Time;
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
    * Name: isDomain (static method),
    * Description: Evaluates if a string is valid domain name, returns boolean value
    */
    static isDomain(domain) {
        const domain_regex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
        return domain_regex.test(domain);
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