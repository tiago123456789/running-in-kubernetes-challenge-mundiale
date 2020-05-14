import CacheClient from "../config/Cache";

class Cache {

    static get(key) {
        return new Promise((resolve, reject) => {
            CacheClient.get(key, (error, value) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (value == null) {
                    resolve(null);
                    return;
                }
                
                resolve(JSON.parse(value));
            });
        });
    }

    static set(key, values) {
        return new Promise((resolve, reject) => {
            CacheClient.set(key, JSON.stringify(values), (error) => {
                if (error) {
                    reject(values);
                    return;
                }
                resolve();
            });
        });
    }
}

export default Cache;