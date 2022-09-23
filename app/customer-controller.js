app.controller('customerController', ['$scope', 'customerFactory', function ($scope, customerFactory) {
    $scope.getCustomers = function () {
        customerFactory.getCustomers().then(function (response) {
            $scope.customers = response.data;
            debugger;

            $scope.totalItems = $scope.customers.length;
            $scope.currentPage = 1;
            $scope.numPerPage = 10;

            $scope.paginate = function (value) {
                var begin, end, index;
                begin = ($scope.currentPage - 1) * $scope.numPerPage;
                end = begin + $scope.numPerPage;
                index = $scope.customers.indexOf(value);
                return (begin <= index && index < end);
            };
            $scope.orderByField = "CustomerID";
            $scope.reverseSort = false;
        }, function (error) {
            $scope.status = 'an error occurred loading customers ' + error.message;
            alert($scope.status);
        })
    }
    $scope.getCustomer = function (id) {
        customerFactory.getCustomer(id).then(function (response) {
            $scope.customer = response.data;
        }, function (error) {
            $scope.status = 'an error occurred loading customer ' + error.message;
            alert($scope.status);
        })
    }
    $scope.addCustomer = function (customer) {
        var newCustomer = {
            FirstName: customer.FirstName,
            LastName: customer.LastName,
            Address: customer.Address,
            City: customer.City,
            State: customer.State,
            Zip: customer.Zip,
            Phone: customer.Phone
        }
        customerFactory.addCustomer(newCustomer).then(function () {
            customerFactory.getCustomers().then(function () {
                $scope.status = 'customer added sucessfully';
                alert($scope.status);
                $('#addModal').modal('hide');
                $scope.refresh();
                $scope.customer.Address = '';
                $scope.customer.FirstName = '';
                $scope.customer.LastName = '';
                $scope.customer.City = '';
                $scope.customer.State = '';
                $scope.customer.Zip = '';
                $scope.customer.Phone = '';
                $scope.customer.Region = '';
                $scope.customer.Orders = '';
                $scope.addcustomerform.$setPristine();
                $scope.addcustomerform.$setUntouched();
                $scope.currentRecord = {};
            })

        }, function (error) {
            $scope.status = 'an error occurred adding customer ' + error.message;
            alert($scope.status);
        })
    }
    $scope.updateCustomer = function (id, customer) {
        var updatedCustomer = {
            CustomerId: id,
            FirstName: customer.FirstName,
            LastName: customer.LastName,
            Address: customer.Address,
            City: customer.City,
            State: customer.State,
            Zip: customer.Zip,
            Phone: customer.Phone
        }
        customerFactory.updateCustomer(updatedCustomer).then(function () {
            $scope.customer.Address = '';
            $scope.customer.FirstName = '';
            $scope.customer.LastName = '';
            $scope.customer.City = '';
            $scope.customer.State = '';
            $scope.customer.Zip = '';
            $scope.customer.Phone = '';
            $scope.editcustomerform.$setPristine();
            $scope.editcustomerform.$setUntouched();
            $scope.currentRecord = {};
            $scope.status = 'customer updated successfully';
            alert($scope.status);
            $('#editModal').modal('hide');
            customerFactory.getCustomers().then(function (response) {
                $scope.customers = response.data;
                $scope.refresh();
            })
        }, function (error) {
            $scope.status = 'an error occurred updating customer ' + error.message;
            alert($scope.status);
        })
    }
    $scope.deleteCustomer = function (id) {
        customerFactory.deleteCustomer(id).then(function () {
            $scope.refresh();
            $('#deleteModal').modal('hide');
            $scope.status = 'customer deleted successfully';
            customerFactory.getCustomers().then(function (response) {
                $scope.customers = response.data;
                $scope.refresh();
                $scope.customer.Address = '';
                $scope.customer.FirstName = '';
                $scope.customer.LastName = '';
                $scope.customer.City = '';
                $scope.customer.State = '';
                $scope.customer.Zip = '';
                $scope.customer.Phone = '';
                $scope.editcustomerform.$setPristine();
                $scope.editcustomerform.$setUntouched();
                $scope.currentRecord = {};
            })
            alert($scope.status);
        }, function (error) {
            $scope.status = 'an error occurred deleting customer ' + error.message;
            alert($scope.status);
        })
    }
    $scope.cancelEdit = function () {
        $('#editModal').modal('hide');
        $scope.customer.Address = '';
        $scope.customer.FirstName = '';
        $scope.customer.LastName = '';
        $scope.customer.City = '';
        $scope.customer.State = '';
        $scope.customer.Zip = '';
        $scope.customer.Phone = '';
        $scope.editcustomerform.$setPristine();
        $scope.editcustomerform.$setUntouched();
        $scope.currentRecord = {};
    };
    $scope.cancelAdd = function () {
        $('#addModal').modal('hide');
        $scope.customer.Address = '';
        $scope.customer.FirstName = '';
        $scope.customer.LastName = '';
        $scope.customer.City = '';
        $scope.customer.State = '';
        $scope.customer.Zip = '';
        $scope.customer.Phone = '';
        $scope.addcustomerform.$setPristine();
        $scope.addcustomerform.$setUntouched();
        $scope.currentRecord = {};
    };
    $scope.cancelDelete = function () {
        $('#deleteModal').modal('hide');
        $scope.customer.Address = '';
        $scope.customer.FirstName = '';
        $scope.customer.LastName = '';
        $scope.customer.City = '';
        $scope.customer.State = '';
        $scope.customer.Zip = '';
        $scope.customer.Phone = '';
    };
    $scope.refresh = function () {
        customerFactory.getCustomers().then(function (response) { $scope.customers = response.data; })
    };
    $scope.phoneNumberPattern = (function () {
        var regexp = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
        return {
            test: function (value) {
                if ($scope.requireTel === false) {
                    return true;
                }
                return regexp.test(value);
            }
        };
    })();
}])