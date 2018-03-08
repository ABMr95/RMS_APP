export default class DB {
    constructor(url) {
        this.url = url;
    }
    findAll = async (action) => {
        try {
            var response = await fetch(this.url);
            var data = await response.json();
            // console.log(data);
            // take an action with the data
            action(data)
        } 
        catch (e) {
            console.log("Error", e)
        }
    }
    find = async (action, parameters) => {
        let urlParameters = ''
        if(parameters) {
            urlParameters = '?' + Object.keys(parameters).map(i => i + '=' + parameters[i]).join('&')
        }
        console.log(urlParameters)
        try {
            const TOKEN = sessionStorage.getItem('token')
            var headers = {};
            if (TOKEN) {
                headers.Authorization = 'Bearer' + TOKEN;
            }
            var response = await fetch(
                this.url + urlParameters,
                {
                    headers: headers
                }
            );
            var data = await response.json();
            console.log(data);
            // take an action with the data
            action(data)
        } catch (e) {
            console.log("Error", e)
        }
    }
    findOne = async (id, action) => {
        try {
            var response = await fetch(this.url + '/' + id);
            var data = await response.json();
            console.log(data);
            // take an action with the data
            action(data)
        } catch (e) {
            console.log("Error", e)
        }
    }
    create = async (json) => {
        try {
            var response = await fetch(this.url,
                {
                    method: 'POST',
                    body: JSON.stringify(json),
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            )
            var data = await response.json();
            console.log(data);
            // take an action with the data
            // action(data)
        } catch (e) {
            console.log("Error", e)
        }
    }
    destroy = async (id, action) => {
        try {
            var response = await fetch(this.url + '/' + id,
                {
                    method: 'DELETE'
                }
            );
            var data = await response.json();
            console.log(data);
            // take an action with the data
            action()
        } catch (e) {
            console.log("Error", e)
        }
    }
    update = async (id, json, action) => {
        try {
            var response = await fetch(this.url + '/' + id,
                {
                    method: 'PUT',
                    body: JSON.stringify(json),
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            )
            if (action) {
                action()
            }
        } catch (e) {
            console.log("Error", e)
        }
    }
}