webpackJsonp([0],{

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var services_view_controller_1 = __webpack_require__(40);
exports.servicesView = {
    bindings: {
        services: '<'
    },
    controller: services_view_controller_1.ServicesViewController,
    template: __webpack_require__(38)
};


/***/ },

/***/ 37:
/***/ function(module, exports) {

module.exports = "<span class=\"order-service\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-5 order-service-details\">\n        <div class=\"order-service-deails-top\">\n          <div class=\"service-title\">\n            <span class=\"icon {{$ctrl.serviceIcon}}\"></span>\n            <span class=\"name\">{{$ctrl.serviceName}}</span>\n            <span class=\"version\" ng-if=\"$ctrl.currentStep.id != 1\">{{$ctrl.selectedVersion}}</span>\n          </div>\n          <span ng-if=\"$ctrl.currentStep.id === 1\">\n            <div ng-include=\"'components/order-service/order-service-details.html'\"></div>\n          </span>\n           <span ng-if=\"$ctrl.currentStep.id === 2 || $ctrl.currentStep.id === 3\">\n            <div class=\"long-description\">\n              {{$ctrl.serviceLongDescription}}\n            </div>\n          </span>\n        </div>\n        <div class=\"order-service-deails-bottom\">\n          <ul class=\"wizard-pf-steps-indicator\" ng-class=\"{'invisible': !$ctrl.wizardReady}\">\n            <li class=\"wizard-pf-step\" ng-class=\"{active: step.selected, visited: step.visited && !step.selected}\" ng-repeat=\"step in $ctrl.getSteps()\" data-tabgroup=\"{{$index}}\">\n              <a ng-click=\"$ctrl.stepClick(step)\"><span class=\"wizard-pf-step-number\">{{$index + 1}}</span></a>\n            </li>\n          </ul>\n        </div>\n      </div>\n      <div class=\"col-md-7 order-service-config\">\n        <div ng-if=\"$ctrl.currentStep.id === 1\" style=\"height: 100%\"\n             ng-include=\"'components/order-service/order-service-pricing.html'\"></div>\n        <div ng-if=\"$ctrl.currentStep.id === 2\" style=\"height: 100%\"\n             ng-include=\"'components/order-service/order-service-configure.html'\"></div>\n        <div ng-if=\"$ctrl.currentStep.id === 3\" style=\"height: 100%\"\n             ng-include=\"'components/order-service/order-service-review.html'\"></div>\n      </div>\n    </div>\n  </div>\n</span>\n";

/***/ },

/***/ 38:
/***/ function(module, exports) {

module.exports = "<span class=\"services-view\">\n\n  <div ng-if=\"$ctrl.orderingPanelvisible\" class=\"service-ordering-container\">\n    <a ng-click=\"$ctrl.closeOrderingPanel()\"><span class=\"ordering-panel-close pficon pficon-close\"></span></a>\n    <order-service service=\"$ctrl.serviceToOrder\"></order-service>\n  </div>\n\n  <div class=\"services-view-container\">\n    <div class=\"title\">Services</div>\n\n    <div class=\"services-categories\">\n      <a ng-class=\"{'current-filter': $ctrl.currentFilter === 'all'}\" ng-click=\"$ctrl.filterByCategory('all')\">All</a> |\n      <span ng-repeat=\"category in $ctrl.serviceCategories\">\n        <a ng-class=\"{'current-filter': $ctrl.currentFilter === category.value}\"\n           ng-click=\"$ctrl.filterByCategory(category.value)\">{{category.label}}</a>\n           {{$ctrl.serviceCategories.length !== ($index+1) ? ' | ' : ''}}\n      </span>\n    </div>\n\n    <div class=\"services-sub-categories\" ng-if=\"$ctrl.currentFilter !== 'all'\">\n      <a ng-class=\"{'current-filter': $ctrl.currentSubFilter === 'all'}\" ng-click=\"$ctrl.filterByCategory($ctrl.currentFilter, 'all')\">All</a> |\n      <span ng-repeat=\"subCategory in $ctrl.serviceSubCategories\">\n        <a ng-class=\"{'current-filter': $ctrl.currentSubFilter === subCategory.value}\"\n           ng-click=\"$ctrl.filterByCategory($ctrl.currentFilter, subCategory.value)\">{{subCategory.label}}</a>\n           {{$ctrl.serviceSubCategories.length !== ($index+1) ? ' | ' : ''}}\n      </span>\n    </div>\n\n    <div class=\"sub-title\">Featured Services</div>\n\n    <div pf-card-view config=\"$ctrl.cardViewConfig\" items=\"$ctrl.featuredServices\">\n      <div class=\"card-container\">\n        <div class=\"card-icon {{item.icon}}\"></div>\n        <div class=\"card-name\">{{item.name}}</div>\n      </div>\n    </div>\n\n    <div class=\"sub-title\">All Services</div>\n\n    <div pf-card-view config=\"$ctrl.cardViewConfig\" items=\"$ctrl.allServices\">\n      <div class=\"card-container\">\n        <div class=\"card-icon {{item.icon}}\"></div>\n        <div class=\"card-name\">{{item.name}}</div>\n      </div>\n    </div>\n  </div>\n</span>\n";

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var angular = __webpack_require__(1);
var OrderServiceController = (function () {
    function OrderServiceController(mockDataService, $scope) {
        this.ctrl = this;
        this.mockService = mockDataService;
        this.$scope = $scope;
    }
    OrderServiceController.prototype.$onInit = function () {
        this.ctrl.serviceIcon = this.ctrl.service.icon;
        this.ctrl.serviceName = this.ctrl.service.name;
        var details = this.mockService.getServiceDetails(this.ctrl.service.id);
        this.ctrl.versions = details.versions;
        this.ctrl.selectedVersion = details.versions[0];
        this.ctrl.descTitle = details.descTitle;
        this.ctrl.description = details.description;
        // let prices = this.mockService.getServicePrices(this.ctrl.service.id);
        this.ctrl.steps = [{ id: 1, selected: true },
            { id: 2 },
            { id: 3 }
        ];
        this.ctrl.currentStep = this.ctrl.steps[0];
        this.ctrl.wizardReady = true;
    };
    OrderServiceController.prototype.getSteps = function () {
        return this.ctrl.steps;
    };
    OrderServiceController.prototype.stepClick = function (step) {
        if (step.visited) {
            this.gotoStep(step);
        }
    };
    OrderServiceController.prototype.gotoStep = function (step) {
        this.ctrl.steps.forEach(function (step) { return step.selected = false; });
        this.ctrl.currentStep.visited = true;
        this.ctrl.currentStep = step;
        this.ctrl.currentStep.selected = true;
    };
    OrderServiceController.prototype.configureService = function (serviceLongDescription) {
        this.ctrl.serviceLongDescription = serviceLongDescription;
        this.gotoStep(this.ctrl.steps[1]);
    };
    OrderServiceController.prototype.orderService = function () {
        this.gotoStep(this.ctrl.steps[2]);
    };
    OrderServiceController.prototype.toggleAdvOps = function () {
        var advHref = document.querySelector('#adv-ops-href');
        var advOps = document.querySelector('#adv-ops');
        angular.element(advHref).toggleClass('collapsed');
        angular.element(advOps).toggleClass('collapse');
    };
    OrderServiceController.prototype.$onChanges = function (onChangesObj) {
        // console.log('$onChanges' + JSON.stringify(onChangesObj));
    };
    OrderServiceController.prototype.$doCheck = function () {
        // console.log('$doCheck');
    };
    OrderServiceController.prototype.cancelOrder = function () {
        this.$scope.$emit('cancelOrder');
    };
    return OrderServiceController;
}());
OrderServiceController.$inject = ['MockDataService', '$scope'];
exports.OrderServiceController = OrderServiceController;


/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var ServicesViewController = (function () {
    function ServicesViewController($filter, $scope) {
        this.ctrl = this;
        this.cardViewConfig = {
            selectItems: false,
            showSelectBox: false,
            onClick: this.handleClick
        };
        this.$filter = $filter;
        this.$scope = $scope;
    }
    ServicesViewController.prototype.$onInit = function () {
        var _this = this;
        this.ctrl.origServices = this.ctrl.services.map(function (a) { return Object.assign({}, a, { ctrl: _this }); }); // clone
        this.ctrl.allServices = this.ctrl.origServices;
        this.ctrl.featuredServices = this.$filter('filter')(this.ctrl.origServices, { featured: true }, false);
        this.ctrl.currentFilter = 'all';
        this.ctrl.currentSubFilter = 'all';
        this.ctrl.serviceCategories = this.getServiceCategories();
        this.ctrl.orderingPanelvisible = false;
        this.$scope.$on('cancelOrder', function () {
            _this.ctrl.closeOrderingPanel();
        });
    };
    ServicesViewController.prototype.getServiceCategories = function () {
        var uniqueCategories = [];
        var uniqueCategoriesVals = this.ctrl.origServices.map(function (item) { return item.category; })
            .filter(function (value, index, self) { return self.indexOf(value) === index; });
        uniqueCategoriesVals.forEach(function (value, index, self) {
            var obj = { 'label': '', 'value': '' };
            obj.label = (value === 'cicd') ? 'CI/CD' : value.charAt(0).toUpperCase() + value.slice(1);
            obj.value = value;
            uniqueCategories[index] = obj;
        });
        return uniqueCategories;
    };
    ;
    ServicesViewController.prototype.filterByCategory = function (category, subCategory) {
        if (category === 'all') {
            this.ctrl.allServices = this.ctrl.origServices;
        }
        else {
            if (subCategory === undefined || subCategory === 'all') {
                this.ctrl.allServices = this.$filter('filter')(this.ctrl.origServices, { category: category }, true);
                this.ctrl.serviceSubCategories = this.getServiceSubCategories(category);
            }
            else {
                this.ctrl.allServices = this.$filter('filter')(this.ctrl.origServices, { category: category, subCategory: subCategory }, true);
            }
        }
        this.ctrl.featuredServices = this.$filter('filter')(this.ctrl.allServices, { featured: true }, true);
        this.ctrl.currentFilter = category;
        this.ctrl.currentSubFilter = (subCategory !== undefined) ? subCategory : 'all';
    };
    ServicesViewController.prototype.getServiceSubCategories = function (category) {
        var uniqueCategories = [];
        var uniqueCategoriesVals = this.ctrl.allServices.map(function (item) { return item.subCategory; })
            .filter(function (value, index, self) { return self.indexOf(value) === index; });
        uniqueCategoriesVals.forEach(function (value, index, self) {
            var obj = { 'label': '', 'value': '' };
            obj.label = value.charAt(0).toUpperCase() + value.slice(1);
            obj.value = value;
            uniqueCategories[index] = obj;
        });
        return uniqueCategories;
    };
    ;
    ServicesViewController.prototype.handleClick = function (item, e) {
        item.ctrl.serviceToOrder = item;
        item.ctrl.openOrderingPanel();
    };
    ;
    ServicesViewController.prototype.openOrderingPanel = function () {
        this.ctrl.orderingPanelvisible = true;
    };
    ;
    ServicesViewController.prototype.closeOrderingPanel = function () {
        this.ctrl.orderingPanelvisible = false;
    };
    ;
    ServicesViewController.prototype.$onChanges = function (onChangesObj) {
        // console.log('$onChanges' + JSON.stringify(onChangesObj));
    };
    ServicesViewController.prototype.$doCheck = function () {
        // console.log('$doCheck');
    };
    return ServicesViewController;
}());
ServicesViewController.$inject = ['$filter', '$scope'];
exports.ServicesViewController = ServicesViewController;


/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var angular = __webpack_require__(1);
var services_view_component_1 = __webpack_require__(10);
var order_service_component_1 = __webpack_require__(9);
__webpack_require__(8);
exports.webCatalog = 'webCatalog';
angular
    .module(exports.webCatalog, ['patternfly', 'ngAnimate', 'ui.bootstrap'])
    .component('servicesView', services_view_component_1.servicesView)
    .component('orderService', order_service_component_1.orderService);


/***/ },

/***/ 8:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

"use strict";

var order_service_controller_1 = __webpack_require__(39);
exports.orderService = {
    bindings: {
        service: '<'
    },
    controller: order_service_controller_1.OrderServiceController,
    template: __webpack_require__(37)
};


/***/ }

},[41]);
//# sourceMappingURL=origin-web-catalogs.js.map