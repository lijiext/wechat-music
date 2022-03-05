const BASEURL = 'http://123.207.32.32:9001';

class NETWORK_CONFIG {
    request(url, method, params) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: BASEURL + url,
                method: method,
                data: params,
                success: function (res) {
                    resolve(res.data);
                },
                fail: function (err) {
                    reject(err);
                }
            })
        })
    };
    get(url, params) {
        return this.request(url, 'GET', params);
    };
    post(url, data) {
        return this.request(url, 'POST', data);
    };
};
const NETWORK = new NETWORK_CONFIG();
export default NETWORK;