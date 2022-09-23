app.factory('customerFactory', ['customerService', function (customerService) {
    var customerFactory = [];

    customerFactory.getCustomers = function () {
        return customerService.getCustomers();
    }
    customerFactory.getCustomer = function (id) {
        return customerService.getCustomer(id);
    }
    customerFactory.addCustomer = function (customer) {
        return customerService.addCustomer(customer);
    }
    customerFactory.updateCustomer = function (customer) {
        return customerService.updateCustomer(customer);
    }
    customerFactory.deleteCustomer = function (id) {
        return customerService.deleteCustomer(id);
    }
    return customerFactory;
}])