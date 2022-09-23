app.service('customerService', ['$http', function ($http) {
    var baseUrl = '/home/GetCustomers';

    this.getCustomers = function () {
        return $http.get(baseUrl + '/GetCustomers');
    }
    this.getCustomer = function (id) {
        return $http.get(baseUrl + '/GetCustomer/' + id);
    }
    this.addCustomer = function (customer) {
        return $http.post(baseUrl + '/PostCustomer/', customer);
    }
    this.updateCustomer = function (customer) {
        return $http.put(baseUrl + '/PutCustomer/' + customer.CustomerId, customer);
    }
    this.deleteCustomer = function (id) {
        return $http.delete(baseUrl + '/DeleteCustomer/' + id);
    }
}])