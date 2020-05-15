import CacheClient from "../config/Cache";

class Cache {

    static sadd(key, values, timeExpiration) {
        return new Promise((resolve, reject) => {
            values = values.map(item => CacheClient.sadd(key, JSON.stringify(item)));
            if (timeExpiration != null) {
                CacheClient.expire(key, timeExpiration);
            }

            resolve();
        });
    }

    static smembers(key) {
        return new Promise((resolve, reject) => {
            CacheClient.smembers(key, (error, values) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(values);
            });
        });
    }

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

                resolve(value);
            });
        });
    }

    static set(key, values, timeExpiration = null) {
        return new Promise((resolve, reject) => {
            CacheClient.set(key, JSON.stringify(values), (error) => {
                if (error) {
                    reject(values);
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