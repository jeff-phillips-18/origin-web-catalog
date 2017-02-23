"use strict";
exports.__esModule = true;
var angular = require("angular");
var services_view_component_1 = require("./components/services-view/services-view.component");
var order_service_component_1 = require("./components/order-service/order-service.component");
require("./styles/main.less");
exports.webCatalog = 'webCatalog';
angular
    .module(exports.webCatalog, ['patternfly', 'ngAnimate', 'ui.bootstrap'])
    .component('servicesView', services_view_component_1.servicesView)
    .component('orderService', order_service_component_1.orderService);

"use strict";
exports.__esModule = true;
var order_service_controller_1 = require("./order-service.controller");
exports.orderService = {
    bindings: {
        service: '<'
    },
    controller: order_service_controller_1.OrderServiceController,
    template: require('./order-service.html')
};

"use strict";
exports.__esModule = true;
var angular = require("angular");
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

"use strict";
exports.__esModule = true;
var services_view_controller_1 = require("./services-view.controller");
exports.servicesView = {
    bindings: {
        services: '<'
    },
    controller: services_view_controller_1.ServicesViewController,
    template: require('./services-view.html')
};

"use strict";
exports.__esModule = true;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIiwiY29tcG9uZW50cy9vcmRlci1zZXJ2aWNlL29yZGVyLXNlcnZpY2UuY29tcG9uZW50LnRzIiwiY29tcG9uZW50cy9vcmRlci1zZXJ2aWNlL29yZGVyLXNlcnZpY2UuY29udHJvbGxlci50cyIsImNvbXBvbmVudHMvc2VydmljZXMtdmlldy9zZXJ2aWNlcy12aWV3LmNvbXBvbmVudC50cyIsImNvbXBvbmVudHMvc2VydmljZXMtdmlldy9zZXJ2aWNlcy12aWV3LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBbUM7QUFDbkMsOEZBQWdGO0FBQ2hGLDhGQUFnRjtBQUNoRiw4QkFBNEI7QUFFZixRQUFBLFVBQVUsR0FBVyxZQUFZLENBQUM7QUFFL0MsT0FBTztLQUNGLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztLQUMvRCxTQUFTLENBQUMsY0FBYyxFQUFFLHNDQUFZLENBQUM7S0FDdkMsU0FBUyxDQUFDLGNBQWMsRUFBRSxzQ0FBWSxDQUFDLENBQUM7Ozs7QUNWN0MsdUVBQWtFO0FBRXJELFFBQUEsWUFBWSxHQUE4QjtJQUNyRCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsR0FBRztLQUNiO0lBQ0QsVUFBVSxFQUFFLGlEQUFzQjtJQUNsQyxRQUFRLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDO0NBQzFDLENBQUM7Ozs7QUNSRixpQ0FBbUM7QUFFbkM7SUFRRSxnQ0FBWSxlQUFvQixFQUFFLE1BQVc7UUFKdEMsU0FBSSxHQUFRLElBQUksQ0FBQztRQUt0QixJQUFJLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRU0sd0NBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxD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QUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0QsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbEIsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7SUFBQSxDQUFDO0lBRUssNENBQVcsR0FBbEIsVUFBbUIsSUFBUyxFQUFFLENBQU07UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBQUEsQ0FBQztJQUVLLGtEQUFpQixHQUF4QjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO0lBQ3hDLENBQUM7SUFBQSxDQUFDO0lBRUssbURBQWtCLEdBQXpCO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7SUFDekMsQ0FBQztJQUFBLENBQUM7SUFFSywyQ0FBVSxHQUFqQixVQUFrQixZQUFzQztRQUN0RCw0REFBNEQ7SUFDOUQsQ0FBQztJQUVNLHlDQUFRLEdBQWY7UUFDRSwyQkFBMkI7SUFDN0IsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0E5RkEsQUE4RkM7QUE3RlEsOEJBQU8sR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUQ1Qix3REFBc0IiLCJmaWxlIjoib3JpZ2luLXdlYi1jYXRhbG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCB7c2VydmljZXNWaWV3fSBmcm9tICcuL2NvbXBvbmVudHMvc2VydmljZXMtdmlldy9zZXJ2aWNlcy12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQge29yZGVyU2VydmljZX0gZnJvbSAnLi9jb21wb25lbnRzL29yZGVyLXNlcnZpY2Uvb3JkZXItc2VydmljZS5jb21wb25lbnQnO1xuaW1wb3J0ICcuL3N0eWxlcy9tYWluLmxlc3MnO1xuXG5leHBvcnQgY29uc3Qgd2ViQ2F0YWxvZzogc3RyaW5nID0gJ3dlYkNhdGFsb2cnO1xuXG5hbmd1bGFyXG4gICAgLm1vZHVsZSh3ZWJDYXRhbG9nLCBbJ3BhdHRlcm5mbHknLCAnbmdBbmltYXRlJywgJ3VpLmJvb3RzdHJhcCddKVxuICAgIC5jb21wb25lbnQoJ3NlcnZpY2VzVmlldycsIHNlcnZpY2VzVmlldylcbiAgICAuY29tcG9uZW50KCdvcmRlclNlcnZpY2UnLCBvcmRlclNlcnZpY2UpO1xuXG4iLCJpbXBvcnQge09yZGVyU2VydmljZUNvbnRyb2xsZXJ9IGZyb20gJy4vb3JkZXItc2VydmljZS5jb250cm9sbGVyJztcblxuZXhwb3J0IGNvbnN0IG9yZGVyU2VydmljZTogYW5ndWxhci5JQ29tcG9uZW50T3B0aW9ucyA9IHtcbiAgYmluZGluZ3M6IHtcbiAgICBzZXJ2aWNlOiAnPCdcbiAgfSxcbiAgY29udHJvbGxlcjogT3JkZXJTZXJ2aWNlQ29udHJvbGxlcixcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vb3JkZXItc2VydmljZS5odG1sJylcbn07XG4iLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG5leHBvcnQgY2xhc3MgT3JkZXJTZXJ2aWNlQ29udHJvbGxlciBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbnRyb2xsZXIge1xuXG4gIHN0YXRpYyAkaW5qZWN0ID0gWydNb2NrRGF0YVNlcnZpY2UnLCAnJHNjb3BlJ107XG5cbiAgcHVibGljIGN0cmw6IGFueSA9IHRoaXM7XG4gIHB1YmxpYyBtb2NrU2VydmljZTogYW55O1xuICBwdWJsaWMgJHNjb3BlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IobW9ja0RhdGFTZXJ2aWNlOiBhbnksICRzY29wZTogYW55KSB7XG4gICAgdGhpcy5tb2NrU2VydmljZSA9IG1vY2tEYXRhU2VydmljZTtcbiAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgfVxuXG4gIHB1YmxpYyAkb25Jbml0KCkge1xuICAgIHRoaXMuY3RybC5zZXJ2aWNlSWNvbiA9IHRoaXMuY3RybC5zZXJ2aWNlLmljb247XG4gICAgdGhpcy5jdHJsLnNlcnZpY2VOYW1lID0gdGhpcy5jdHJsLnNlcnZpY2UubmFtZTtcblxuICAgIGxldCBkZXRhaWxzID0gdGhpcy5tb2NrU2VydmljZS5nZXRTZXJ2aWNlRGV0YWlscyh0aGlzLmN0cmwuc2VydmljZS5pZCk7XG4gICAgdGhpcy5jdHJsLnZlcnNpb25zID0gZGV0YWlscy52ZXJzaW9ucztcbiAgICB0aGlzLmN0cmwuc2VsZWN0ZWRWZXJzaW9uID0gZGV0YWlscy52ZXJzaW9uc1swXTtcbiAgICB0aGlzLmN0cmwuZGVzY1RpdGxlID0gZGV0YWlscy5kZXNjVGl0bGU7XG4gICAgdGhpcy5jdHJsLmRlc2NyaXB0aW9uID0gZGV0YWlscy5kZXNjcmlwdGlvbjtcblxuICAgIC8vIGxldCBwcmljZXMgPSB0aGlzLm1vY2tTZXJ2aWNlLmdldFNlcnZpY2VQcmljZXModGhpcy5jdHJsLnNlcnZpY2UuaWQpO1xuXG4gICAgdGhpcy5jdHJsLnN0ZXBzID0gWyB7aWQ6IDEsIHNlbGVjdGVkOiB0cnVlfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpZDogMn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7aWQ6IDN9XG4gICAgICAgICAgICAgICAgICAgICAgXTtcbiAgICB0aGlzLmN0cmwuY3VycmVudFN0ZXAgPSB0aGlzLmN0cmwuc3RlcHNbMF07XG5cbiAgICB0aGlzLmN0cmwud2l6YXJkUmVhZHkgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIGdldFN0ZXBzKCkge1xuICAgIHJldHVybiB0aGlzLmN0cmwuc3RlcHM7XG4gIH1cblxuICBwdWJsaWMgc3RlcENsaWNrKHN0ZXA6IGFueSkge1xuICAgIGlmIChzdGVwLnZpc2l0ZWQpIHtcbiAgICAgIHRoaXMuZ290b1N0ZXAoc3RlcCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdvdG9TdGVwKHN0ZXA6IGFueSkge1xuICAgIHRoaXMuY3RybC5zdGVwcy5mb3JFYWNoKChzdGVwKSA9PiBzdGVwLnNlbGVjdGVkID0gZmFsc2UpO1xuICAgIHRoaXMuY3RybC5jdXJyZW50U3RlcC52aXNpdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmN0cmwuY3VycmVudFN0ZXAgPSBzdGVwO1xuICAgIHRoaXMuY3RybC5jdXJyZW50U3RlcC5zZWxlY3RlZCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgY29uZmlndXJlU2VydmljZSAoc2VydmljZUxvbmdEZXNjcmlwdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5jdHJsLnNlcnZpY2VMb25nRGVzY3JpcHRpb24gPSBzZXJ2aWNlTG9uZ0Rlc2NyaXB0aW9uO1xuICAgIHRoaXMuZ290b1N0ZXAodGhpcy5jdHJsLnN0ZXBzWzFdKTtcbiAgfVxuXG4gIHB1YmxpYyBvcmRlclNlcnZpY2UoKSB7XG4gICAgdGhpcy5nb3RvU3RlcCh0aGlzLmN0cmwuc3RlcHNbMl0pO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUFkdk9wcygpIHtcbiAgICBsZXQgYWR2SHJlZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZHYtb3BzLWhyZWYnKTtcbiAgICBsZXQgYWR2T3BzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fkdi1vcHMnKTtcbiAgICBhbmd1bGFyLmVsZW1lbnQoIGFkdkhyZWYgKS50b2dnbGVDbGFzcygnY29sbGFwc2VkJyk7XG4gICAgYW5ndWxhci5lbGVtZW50KCBhZHZPcHMgKS50b2dnbGVDbGFzcygnY29sbGFwc2UnKTtcbiAgfVxuXG4gIHB1YmxpYyAkb25DaGFuZ2VzKG9uQ2hhbmdlc09iajogYW5ndWxhci5JT25DaGFuZ2VzT2JqZWN0KSB7XG4gICAgLy8gY29uc29sZS5sb2coJyRvbkNoYW5nZXMnICsgSlNPTi5zdHJpbmdpZnkob25DaGFuZ2VzT2JqKSk7XG4gIH1cblxuICBwdWJsaWMgJGRvQ2hlY2soKSB7XG4gICAgLy8gY29uc29sZS5sb2coJyRkb0NoZWNrJyk7XG4gIH1cblxuICBwdWJsaWMgY2FuY2VsT3JkZXIoKSB7XG4gICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2NhbmNlbE9yZGVyJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7U2VydmljZXNWaWV3Q29udHJvbGxlcn0gZnJvbSAnLi9zZXJ2aWNlcy12aWV3LmNvbnRyb2xsZXInO1xuXG5leHBvcnQgY29uc3Qgc2VydmljZXNWaWV3OiBhbmd1bGFyLklDb21wb25lbnRPcHRpb25zID0ge1xuICBiaW5kaW5nczoge1xuICAgIHNlcnZpY2VzOiAnPCdcbiAgfSxcbiAgY29udHJvbGxlcjogU2VydmljZXNWaWV3Q29udHJvbGxlcixcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vc2VydmljZXMtdmlldy5odG1sJylcbn07XG4iLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG5leHBvcnQgY2xhc3MgU2VydmljZXNWaWV3Q29udHJvbGxlciBpbXBsZW1lbnRzIGFuZ3VsYXIuSUNvbnRyb2xsZXIge1xuICBzdGF0aWMgJGluamVjdCA9IFsnJGZpbHRlcicsICckc2NvcGUnXTtcblxuICBwdWJsaWMgY3RybDogYW55ID0gdGhpcztcbiAgcHVibGljIGNhcmRWaWV3Q29uZmlnOiBhbnk7XG4gIHByaXZhdGUgJGZpbHRlcjogYW55O1xuICBwcml2YXRlICRzY29wZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCRmaWx0ZXI6IGFueSwgJHNjb3BlOiBhbnkpIHtcbiAgICB0aGlzLmNhcmRWaWV3Q29uZmlnID0ge1xuICAgICAgc2VsZWN0SXRlbXM6IGZhbHNlLFxuICAgICAgc2hvd1NlbGVjdEJveDogZmFsc2UsXG4gICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrXG4gICAgfTtcbiAgICB0aGlzLiRmaWx0ZXIgPSAkZmlsdGVyO1xuICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICB9XG5cbiAgcHVibGljICRvbkluaXQoKSB7XG4gICAgdGhpcy5jdHJsLm9yaWdTZXJ2aWNlcyA9IHRoaXMuY3RybC5zZXJ2aWNlcy5tYXAoYSA9PiBPYmplY3QuYXNzaWduKHt9LCBhLCB7Y3RybDogdGhpc30pKTsgIC8vIGNsb25lXG4gICAgdGhpcy5jdHJsLmFsbFNlcnZpY2VzID0gdGhpcy5jdHJsLm9yaWdTZXJ2aWNlcztcbiAgICB0aGlzLmN0cmwuZmVhdHVyZWRTZXJ2aWNlcyA9IHRoaXMuJGZpbHRlcignZmlsdGVyJykodGhpcy5jdHJsLm9yaWdTZXJ2aWNlcywge2ZlYXR1cmVkOiB0cnVlfSwgZmFsc2UpO1xuICAgIHRoaXMuY3RybC5jdXJyZW50RmlsdGVyID0gJ2FsbCc7XG4gICAgdGhpcy5jdHJsLmN1cnJlbnRTdWJGaWx0ZXIgPSAnYWxsJztcbiAgICB0aGlzLmN0cmwuc2VydmljZUNhdGVnb3JpZXMgPSB0aGlzLmdldFNlcnZpY2VDYXRlZ29yaWVzKCk7XG4gICAgdGhpcy5jdHJsLm9yZGVyaW5nUGFuZWx2aXNpYmxlID0gZmFsc2U7XG5cbiAgICB0aGlzLiRzY29wZS4kb24oJ2NhbmNlbE9yZGVyJywgKCkgPT4ge1xuICAgICAgdGhpcy5jdHJsLmNsb3NlT3JkZXJpbmdQYW5lbCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldFNlcnZpY2VDYXRlZ29yaWVzKCkge1xuICAgIGxldCB1bmlxdWVDYXRlZ29yaWVzID0gW107XG4gICAgbGV0IHVuaXF1ZUNhdGVnb3JpZXNWYWxzID0gdGhpcy5jdHJsLm9yaWdTZXJ2aWNlcy5tYXAoaXRlbSA9PiBpdGVtLmNhdGVnb3J5KVxuICAgICAgICAuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcbiAgICB1bmlxdWVDYXRlZ29yaWVzVmFscy5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHtcbiAgICAgIGxldCBvYmogPSB7J2xhYmVsJzogJycsICd2YWx1ZSc6ICcnfTtcbiAgICAgIG9iai5sYWJlbCA9ICh2YWx1ZSA9PT0gJ2NpY2QnKSA/ICdDSS9DRCcgOiB2YWx1ZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHZhbHVlLnNsaWNlKDEpO1xuICAgICAgb2JqLnZhbHVlID0gdmFsdWU7XG4gICAgICB1bmlxdWVDYXRlZ29yaWVzW2luZGV4XSA9IG9iajtcbiAgICB9KTtcbiAgICByZXR1cm4gdW5pcXVlQ2F0ZWdvcmllcztcbiAgfTtcblxuICBwdWJsaWMgZmlsdGVyQnlDYXRlZ29yeShjYXRlZ29yeTogc3RyaW5nLCBzdWJDYXRlZ29yeTogc3RyaW5nKSB7XG4gICAgaWYgKGNhdGVnb3J5ID09PSAnYWxsJykge1xuICAgICAgdGhpcy5jdHJsLmFsbFNlcnZpY2VzID0gdGhpcy5jdHJsLm9yaWdTZXJ2aWNlcztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHN1YkNhdGVnb3J5ID09PSB1bmRlZmluZWQgfHwgc3ViQ2F0ZWdvcnkgPT09ICdhbGwnKSB7XG4gICAgICAgIHRoaXMuY3RybC5hbGxTZXJ2aWNlcyA9IHRoaXMuJGZpbHRlcignZmlsdGVyJykodGhpcy5jdHJsLm9yaWdTZXJ2aWNlcywge2NhdGVnb3J5OiBjYXRlZ29yeX0sIHRydWUpO1xuICAgICAgICB0aGlzLmN0cmwuc2VydmljZVN1YkNhdGVnb3JpZXMgPSB0aGlzLmdldFNlcnZpY2VTdWJDYXRlZ29yaWVzKGNhdGVnb3J5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3RybC5hbGxTZXJ2aWNlcyA9IHRoaXMuJGZpbHRlcignZmlsdGVyJykodGhpcy5jdHJsLm9yaWdTZXJ2aWNlcywge2NhdGVnb3J5OiBjYXRlZ29yeSwgc3ViQ2F0ZWdvcnk6IHN1YkNhdGVnb3J5fSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY3RybC5mZWF0dXJlZFNlcnZpY2VzID0gdGhpcy4kZmlsdGVyKCdmaWx0ZXInKSh0aGlzLmN0cmwuYWxsU2VydmljZXMsIHtmZWF0dXJlZDogdHJ1ZX0sIHRydWUpO1xuICAgIHRoaXMuY3RybC5jdXJyZW50RmlsdGVyID0gY2F0ZWdvcnk7XG4gICAgdGhpcy5jdHJsLmN1cnJlbnRTdWJGaWx0ZXIgPSAoc3ViQ2F0ZWdvcnkgIT09IHVuZGVmaW5lZCkgPyBzdWJDYXRlZ29yeSA6ICdhbGwnO1xuICB9XG5cbiAgcHVibGljIGdldFNlcnZpY2VTdWJDYXRlZ29yaWVzKGNhdGVnb3J5OiBzdHJpbmcpIHtcbiAgICBsZXQgdW5pcXVlQ2F0ZWdvcmllcyA9IFtdO1xuICAgIGxldCB1bmlxdWVDYXRlZ29yaWVzVmFscyA9IHRoaXMuY3RybC5hbGxTZXJ2aWNlcy5tYXAoaXRlbSA9PiBpdGVtLnN1YkNhdGVnb3J5KVxuICAgICAgICAuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcbiAgICB1bmlxdWVDYXRlZ29yaWVzVmFscy5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHtcbiAgICAgIGxldCBvYmogPSB7J2xhYmVsJzogJycsICd2YWx1ZSc6ICcnfTtcbiAgICAgIG9iai5sYWJlbCA9IHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG4gICAgICBvYmoudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHVuaXF1ZUNhdGVnb3JpZXNbaW5kZXhdID0gb2JqO1xuICAgIH0pO1xuICAgIHJldHVybiB1bmlxdWVDYXRlZ29yaWVzO1xuICB9O1xuXG4gIHB1YmxpYyBoYW5kbGVDbGljayhpdGVtOiBhbnksIGU6IGFueSkge1xuICAgIGl0ZW0uY3RybC5zZXJ2aWNlVG9PcmRlciA9IGl0ZW07XG4gICAgaXRlbS5jdHJsLm9wZW5PcmRlcmluZ1BhbmVsKCk7XG4gIH07XG5cbiAgcHVibGljIG9wZW5PcmRlcmluZ1BhbmVsKCkge1xuICAgIHRoaXMuY3RybC5vcmRlcmluZ1BhbmVsdmlzaWJsZSA9IHRydWU7XG4gIH07XG5cbiAgcHVibGljIGNsb3NlT3JkZXJpbmdQYW5lbCgpIHtcbiAgICB0aGlzLmN0cmwub3JkZXJpbmdQYW5lbHZpc2libGUgPSBmYWxzZTtcbiAgfTtcblxuICBwdWJsaWMgJG9uQ2hhbmdlcyhvbkNoYW5nZXNPYmo6IGFuZ3VsYXIuSU9uQ2hhbmdlc09iamVjdCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCckb25DaGFuZ2VzJyArIEpTT04uc3RyaW5naWZ5KG9uQ2hhbmdlc09iaikpO1xuICB9XG5cbiAgcHVibGljICRkb0NoZWNrKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCckZG9DaGVjaycpO1xuICB9XG59XG4iXX0=
