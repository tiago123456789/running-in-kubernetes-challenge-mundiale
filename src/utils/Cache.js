import cacheClient from "../config/Cache";

class Cache {

    sadd(key, values, timeExpiration) {
        values = values.map(value => JSON.stringify(value));
        return new Promise((resolve, reject) => {
            cacheClient.sadd(key, values, async (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                await Cache.setExpirationTimeInKey(key, timeExpiration);
                resolve(values);
            });
        });
    }

    smembers(key) {
        return new Promise((resolve, reject) => {
            cacheClient.smembers(key, (error, values) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (values == null) {
                    resolve(null);
                    return;
                }

                values = values.map(value => JSON.parse(value));
                resolve(values);
            });
        });
    }

    get(key) {
        return new Promise((resolve, reject) => {
            cacheClient.get(key, (error, values) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(values);
            });
        });
    }

    setExpirationTimeInKey(key, timeExpiration) {
        return new Promise((resolve, reject) => {
            cacheClient.expire(key, timeExpiration, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    }

    set(key, values, timeExpiration = 10) {
        return new Promise((resolve, reject) => {
            cacheClient.set(key, values, async (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                await this.setExpirationTimeInKey(key, timeExpiration);
                resolve(values);
            });
        });
    }

}

const cache = new Cache;

export default cache;