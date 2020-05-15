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

    static del(key) {
        return new Promise((resolve, reject) => {
            CacheClient.del(key, function(error) {
                if (error) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
                }
            })
        });
    }

    static set(key, values, timeExpiration = null) {
        return new Promise((resolve, reject) => {
            CacheClient.set(key, JSON.stringify(values), (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (timeExpiration != null) {
                    CacheClient.set(key, timeExpiration);
                }
                resolve();
            });
        });
    }
}

export default Cache;