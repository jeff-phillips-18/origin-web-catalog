/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
"use strict";
exports.__esModule = true;
var angular = require("angular");
var servicesPage_1 = require("./pages/services/servicesPage");
var projectsPage_1 = require("./pages/projects/projectsPage");
var mockData_service_1 = require("./services/mockData.service");
var navigation_component_1 = require("./components/navigation.component");
require("angular-ui-router");
var routes_1 = require("./routes");
require("./app.less");
require("../../src/index");
exports.catalogApp = 'catalogApp';
require("../node_modules/angular-patternfly/node_modules/patternfly/dist/js/patternfly");
require("../node_modules/angular-patternfly/dist/angular-patternfly");
require("../node_modules/angular-patternfly/node_modules/angular-ui-bootstrap/ui-bootstrap");
require("../node_modules/angular-patternfly/node_modules/angular-ui-bootstrap/ui-bootstrap-tpls");
require("../node_modules/angular-patternfly/node_modules/angular-sanitize/angular-sanitize");
require("../node_modules/lodash/lodash");
require("../node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min");
require("../node_modules/jquery/dist/jquery");
require("../bower_components/js-logger/src/logger");
require("../bower_components/hawtio-core/dist/hawtio-core");
require("../bower_components/hawtio-extension-service/dist/hawtio-extension-service");
require("../bower_components/term.js/src/term");
require("../bower_components/kubernetes-container-terminal/dist/container-terminal");
require("../node_modules/origin-web-common/dist/origin-web-common");
console.log("Hello");
angular
    .module(exports.catalogApp, ['webCatalog', 'openshiftCommon', 'kubernetesUI', 'ui.router'])
    .config(routes_1["default"])
    .service('MockDataService', mockData_service_1.MockDataService)
    .component('servicespage', servicesPage_1.servicesPage)
    .component('projectspage', projectsPage_1.projectsPage)
    .component('navigation', navigation_component_1.navigation);

"use strict";
exports.__esModule = true;
exports["default"] = routesConfig;
/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/services');
    $stateProvider
        .state('services', {
        url: '/services',
        component: 'servicespage'
    })
        .state('projects', {
        url: '/projects',
        component: 'projectspage'
    });
}

"use strict";
exports.__esModule = true;
var navigation_controller_1 = require("./navigation.controller");
exports.navigation = {
    controller: navigation_controller_1.NavigationController,
    template: require('./navigation.html')
};

"use strict";
exports.__esModule = true;
var angular = require("angular");
var NavigationController = (function () {
    function NavigationController($transitions) {
        this.ctrl = this;
        this.$transitions = $transitions;
        console.dir($transitions);
    }
    ;
    NavigationController.prototype.$onInit = function () {
        this.ctrl.applicationName = 'OPENSHIFT WEB CATALOGS';
        this.ctrl.navigationItems = [
            {
                title: 'Services',
                iconClass: 'pficon pficon-service',
                uiSref: 'services'
            },
            {
                title: 'Projects',
                iconClass: 'pficon pficon-project',
                uiSref: 'projects'
            }
        ];
        var _ctrl = this.ctrl;
        this.$transitions.onSuccess({ to: true }, function (state) {
            var toState = state.$to();
            var stateName = toState.name;
            angular.forEach(_ctrl.navigationItems, function (navItem) {
                navItem.isActive = stateName.indexOf(navItem.uiSref) === 0;
            });
        });
    };
    ;
    NavigationController.prototype.$onChanges = function (onChangesObj) {
        // console.log('$onChanges' + JSON.stringify(onChangesObj));
    };
    NavigationController.prototype.$doCheck = function () {
        // console.log('$doCheck');
    };
    return NavigationController;
}());
NavigationController.$inject = ['$transitions'];
exports.NavigationController = NavigationController;

"use strict";
exports.__esModule = true;
var MockDataService = (function () {
    function MockDataService() {
    }
    MockDataService.prototype.getServices = function () {
        return [
            { id: 1, name: '*WildFly', icon: 'font-icon icon-wildfly', category: 'languages', subCategory: 'java', featured: true },
            { id: 2, name: 'Oracle Java', icon: 'font-icon icon-openjdk', category: 'languages', subCategory: 'java' },
            { id: 3, name: '*Node.js', icon: 'font-icon icon-js', category: 'languages', subCategory: 'javascript', featured: true },
            { id: 4, name: 'Node.js + MongoDB (Ephemeral)', icon: 'font-icon icon-js', category: 'languages', subCategory: 'javascript' },
            { id: 5, name: '*Perl', icon: 'font-icon icon-perl', category: 'languages', subCategory: 'perl', featured: true },
            { id: 6, name: 'Dancer + MySQL (Ephemeral)', icon: 'font-icon icon-perl', category: 'languages', subCategory: 'perl' },
            { id: 7, name: '*Ruby', icon: 'font-icon icon-ruby', category: 'languages', subCategory: 'ruby', featured: true },
            { id: 8, name: 'Rails + PostgreSQL (Ephemeral)', icon: 'font-icon icon-ruby', category: 'languages', subCategory: 'ruby' },
            { id: 9, name: '*PHP', icon: 'font-icon icon-php', category: 'languages', subCategory: 'php', featured: true },
            { id: 10, name: 'CakePHP + MySQL (Ephemeral)', icon: 'font-icon icon-php', category: 'languages', subCategory: 'php' },
            { id: 11, name: '*Python', icon: 'font-icon icon-python', category: 'languages', subCategory: 'python', featured: true },
            { id: 12, name: 'Django + PostgreSQL (Ephemeral)', icon: 'font-icon icon-python', category: 'languages', subCategory: 'python' },
            { id: 13, name: '*Mongo  (Ephemeral)', icon: 'font-icon icon-mongodb', category: 'databases', subCategory: 'mongo', featured: true },
            { id: 14, name: '*mySQL  (Ephemeral)', icon: 'font-icon icon-mysql-database', category: 'databases', subCategory: 'mysql', featured: true },
            { id: 15, name: 'Postgres (Ephemeral)', icon: 'font-icon icon-postgresql', category: 'databases', subCategory: 'postgres' },
            { id: 16, name: 'MariaDB (Ephemeral)', icon: 'font-icon icon-mariadb', category: 'databases', subCategory: 'mariadb' },
            { id: 17, name: '*Red Hat JBoss EAP', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'jboss', featured: true },
            { id: 18, name: 'JBoss EAP Client', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'jboss' },
            { id: 19, name: '*Fuse', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'fuse', featured: true },
            { id: 20, name: '*Red Hat JBoss A-MQ', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'amq', featured: true },
            { id: 21, name: 'JBoss A-MQ Client', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'amq' },
            { id: 22, name: '*Red Hat JBoss BPM Suite', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'bpm', featured: true },
            { id: 23, name: 'Red Hat JBoss BRMS', icon: 'font-icon icon-openjdk', category: 'middleware', subCategory: 'bpm' },
            { id: 24, name: '*Jenkins', icon: 'font-icon icon-openjdk', category: 'cicd', subCategory: 'jenkins', featured: true },
            { id: 25, name: 'Jenkins Client', icon: 'font-icon icon-jenkins', category: 'cicd', subCategory: 'jenkins' },
            { id: 26, name: '*Pipeline', icon: 'fa fa-clone', category: 'cicd', subCategory: 'pipelines', featured: true },
            { id: 27, name: 'Pipeline Client', icon: 'fa fa-clone', category: 'cicd', subCategory: 'pipelines' },
        ];
    };
    MockDataService.prototype.getServiceDetails = function (serviceId) {
        var details = {};
        switch (serviceId) {
            case 1:
                details = { descTitle: 'BUILDS SOURCE CODE',
                    description: 'Build and run WildFly 10.1 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/mast…',
                    versions: ['10.1 -- latest', '10.0', '9.0', '8.1'] };
                break;
        }
        return details;
    };
    MockDataService.prototype.getServicePrices = function (serviceId) {
        var prices = [];
        switch (serviceId) {
            case 1:
                prices = [
                    { managed: 'Red Hat', infrastructure: 'Dedicated', infraDetail: 'Topic', infraPrice: '$.65 / 1 Million messages' },
                    { managed: 'Red Hat', infrastructure: 'Dedicated', infraDetail: 'Queue', infraPrice: '$.65 / 1 Million messages' },
                    { managed: 'Red Hat', infrastructure: 'Shared', infraDetail: 'Topic', infraPrice: '$.60 / 1 Million messages' },
                    { managed: 'Red Hat', infrastructure: 'Shared', infraDetail: 'Queue', infraPrice: '$.60 / 1 Million messages' },
                    { managed: 'Self', infrastructure: 'Dedicated', infraDetail: 'Topic', infraPrice: '$12 / instance' },
                    { managed: 'Self', infrastructure: 'Dedicated', infraDetail: 'Queue', infraPrice: '$12 / instance' }
                ];
                break;
        }
        return prices;
    };
    return MockDataService;
}());
exports.MockDataService = MockDataService;

"use strict";
exports.__esModule = true;
var projectsPageController_1 = require("./projectsPageController");
exports.projectsPage = {
    controller: projectsPageController_1.ProjectsPageController,
    template: require('./projects-page.html')
};

"use strict";
exports.__esModule = true;
var ProjectsPageController = (function () {
    function ProjectsPageController() {
        this.ctrl = this;
    }
    return ProjectsPageController;
}());
exports.ProjectsPageController = ProjectsPageController;
;

"use strict";
exports.__esModule = true;
var servicesPageController_1 = require("./servicesPageController");
exports.servicesPage = {
    controller: servicesPageController_1.ServicesPageController,
    template: require('./services-page.html')
};

"use strict";
exports.__esModule = true;
var ServicesPageController = (function () {
    function ServicesPageController(mockDataService, authService) {
        this.ctrl = this;
        this.dataService = mockDataService;
        this.authService = authService;
    }
    ServicesPageController.prototype.$onInit = function () {
        this.authService.withUser().then(function () {
            this.ctrl.services = this.dataService.getServices();
        });
    };
    return ServicesPageController;
}());
ServicesPageController.$inject = ['MockDataService', 'AuthService'];
exports.ServicesPageController = ServicesPageController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyIsInJvdXRlcy50cyIsImNvbXBvbmVudHMvbmF2aWdhdGlvbi5jb21wb25lbnQudHMiLCJjb21wb25lbnRzL25hdmlnYXRpb24uY29udHJvbGxlci50cyIsInNlcnZpY2VzL21vY2tEYXRhLnNlcnZpY2UudHMiLCJwYWdlcy9wcm9qZWN0cy9wcm9qZWN0c1BhZ2UudHMiLCJwYWdlcy9wcm9qZWN0cy9wcm9qZWN0c1BhZ2VDb250cm9sbGVyLnRzIiwicGFnZXMvc2VydmljZXMvc2VydmljZXNQYWdlLnRzIiwicGFnZXMvc2VydmljZXMvc2VydmljZXNQYWdlQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxrRUFBa0U7QUFDbEUsNEVBQTRFOzs7QUFHNUUsaUNBQW1DO0FBQ25DLDhEQUEyRDtBQUMzRCw4REFBMkQ7QUFDM0QsZ0VBQTREO0FBQzVELDBFQUE2RDtBQUU3RCw2QkFBMkI7QUFDM0IsbUNBQW9DO0FBRXBDLHNCQUFvQjtBQUNwQiwyQkFBeUI7QUFFWixRQUFBLFVBQVUsR0FBVyxZQUFZLENBQUM7QUFFL0MseUZBQXVGO0FBQ3ZGLHNFQUFvRTtBQUNwRSw2RkFBMkY7QUFDM0Ysa0dBQWdHO0FBQ2hHLDZGQUEyRjtBQUMzRix5Q0FBdUM7QUFDdkMsdUZBQXFGO0FBRXJGLDhDQUE0QztBQUM1QyxvREFBa0Q7QUFDbEQsNERBQTBEO0FBQzFELHNGQUFvRjtBQUNwRixnREFBOEM7QUFDOUMscUZBQW1GO0FBRW5GLG9FQUFrRTtBQUVsRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3JCLE9BQU87S0FDSixNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDbEYsTUFBTSxDQUFDLG1CQUFZLENBQUM7S0FDcEIsT0FBTyxDQUFDLGlCQUFpQixFQUFFLGtDQUFlLENBQUM7S0FDM0MsU0FBUyxDQUFDLGNBQWMs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SUFDMUIsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FGQSxBQUVDLElBQUE7QUFGWSx3REFBc0I7QUFFbEMsQ0FBQzs7OztBQ0hGLG1FQUFnRTtBQUVuRCxRQUFBLFlBQVksR0FBOEI7SUFDckQsVUFBVSxFQUFFLCtDQUFzQjtJQUNsQyxRQUFRLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDO0NBQzFDLENBQUM7Ozs7QUNIRjtJQVNFLGdDQUFhLGVBQW1CLEVBQUUsV0FBZTtRQUYxQyxTQUFJLEdBQU8sSUFBSSxDQUFDO1FBR3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFTSx3Q0FBTyxHQUFkO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCw2QkFBQztBQUFELENBbkJBLEFBbUJDO0FBakJRLDhCQUFPLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUZ6Qyx3REFBc0IiLCJmaWxlIjoiY2F0YWxvZ0FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvQHR5cGVzL2FuZ3VsYXIvaW5kZXguZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL0B0eXBlcy9hbmd1bGFyLXVpLXJvdXRlci9pbmRleC5kLnRzXCIgLz5cblxuXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IHtzZXJ2aWNlc1BhZ2V9IGZyb20gJy4vcGFnZXMvc2VydmljZXMvc2VydmljZXNQYWdlJztcbmltcG9ydCB7cHJvamVjdHNQYWdlfSBmcm9tICcuL3BhZ2VzL3Byb2plY3RzL3Byb2plY3RzUGFnZSc7XG5pbXBvcnQge01vY2tEYXRhU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlcy9tb2NrRGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7bmF2aWdhdGlvbn0gZnJvbSAnLi9jb21wb25lbnRzL25hdmlnYXRpb24uY29tcG9uZW50JztcblxuaW1wb3J0ICdhbmd1bGFyLXVpLXJvdXRlcic7XG5pbXBvcnQgcm91dGVzQ29uZmlnIGZyb20gJy4vcm91dGVzJztcblxuaW1wb3J0ICcuL2FwcC5sZXNzJztcbmltcG9ydCAnLi4vLi4vc3JjL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IGNhdGFsb2dBcHA6IHN0cmluZyA9ICdjYXRhbG9nQXBwJztcblxuaW1wb3J0ICcuLi9ub2RlX21vZHVsZXMvYW5ndWxhci1wYXR0ZXJuZmx5L25vZGVfbW9kdWxlcy9wYXR0ZXJuZmx5L2Rpc3QvanMvcGF0dGVybmZseSc7XG5pbXBvcnQgJy4uL25vZGVfbW9kdWxlcy9hbmd1bGFyLXBhdHRlcm5mbHkvZGlzdC9hbmd1bGFyLXBhdHRlcm5mbHknO1xuaW1wb3J0ICcuLi9ub2RlX21vZHVsZXMvYW5ndWxhci1wYXR0ZXJuZmx5L25vZGVfbW9kdWxlcy9hbmd1bGFyLXVpLWJvb3RzdHJhcC91aS1ib290c3RyYXAnO1xuaW1wb3J0ICcuLi9ub2RlX21vZHVsZXMvYW5ndWxhci1wYXR0ZXJuZmx5L25vZGVfbW9kdWxlcy9hbmd1bGFyLXVpLWJvb3RzdHJhcC91aS1ib290c3RyYXAtdHBscyc7XG5pbXBvcnQgJy4uL25vZGVfbW9kdWxlcy9hbmd1bGFyLXBhdHRlcm5mbHkvbm9kZV9tb2R1bGVzL2FuZ3VsYXItc2FuaXRpemUvYW5ndWxhci1zYW5pdGl6ZSc7XG5pbXBvcnQgJy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gvbG9kYXNoJztcbmltcG9ydCAnLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItZHJhZy1hbmQtZHJvcC1saXN0cy9hbmd1bGFyLWRyYWctYW5kLWRyb3AtbGlzdHMubWluJztcblxuaW1wb3J0ICcuLi9ub2RlX21vZHVsZXMvanF1ZXJ5L2Rpc3QvanF1ZXJ5JztcbmltcG9ydCAnLi4vYm93ZXJfY29tcG9uZW50cy9qcy1sb2dnZXIvc3JjL2xvZ2dlcic7XG5pbXBvcnQgJy4uL2Jvd2VyX2NvbXBvbmVudHMvaGF3dGlvLWNvcmUvZGlzdC9oYXd0aW8tY29yZSc7XG5pbXBvcnQgJy4uL2Jvd2VyX2NvbXBvbmVudHMvaGF3dGlvLWV4dGVuc2lvbi1zZXJ2aWNlL2Rpc3QvaGF3dGlvLWV4dGVuc2lvbi1zZXJ2aWNlJztcbmltcG9ydCAnLi4vYm93ZXJfY29tcG9uZW50cy90ZXJtLmpzL3NyYy90ZXJtJztcbmltcG9ydCAnLi4vYm93ZXJfY29tcG9uZW50cy9rdWJlcm5ldGVzLWNvbnRhaW5lci10ZXJtaW5hbC9kaXN0L2NvbnRhaW5lci10ZXJtaW5hbCc7XG5cbmltcG9ydCAnLi4vbm9kZV9tb2R1bGVzL29yaWdpbi13ZWItY29tbW9uL2Rpc3Qvb3JpZ2luLXdlYi1jb21tb24nO1xuXG5jb25zb2xlLmxvZyhcIkhlbGxvXCIpO1xuYW5ndWxhclxuICAubW9kdWxlKGNhdGFsb2dBcHAsIFsnd2ViQ2F0YWxvZycsICdvcGVuc2hpZnRDb21tb24nLCAna3ViZXJuZXRlc1VJJywgJ3VpLnJvdXRlciddKVxuICAuY29uZmlnKHJvdXRlc0NvbmZpZylcbiAgLnNlcnZpY2UoJ01vY2tEYXRhU2VydmljZScsIE1vY2tEYXRhU2VydmljZSlcbiAgLmNvbXBvbmVudCgnc2VydmljZXNwYWdlJywgc2VydmljZXNQYWdlKVxuICAuY29tcG9uZW50KCdwcm9qZWN0c3BhZ2UnLCBwcm9qZWN0c1BhZ2UpXG4gIC5jb21wb25lbnQoJ25hdmlnYXRpb24nLCBuYXZpZ2F0aW9uKTtcbiIsImV4cG9ydCBkZWZhdWx0IHJvdXRlc0NvbmZpZztcblxuLyoqIEBuZ0luamVjdCAqL1xuZnVuY3Rpb24gcm91dGVzQ29uZmlnKCRzdGF0ZVByb3ZpZGVyOiBhbmd1bGFyLnVpLklTdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXI6IGFuZ3VsYXIudWkuSVVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcjogYW5ndWxhci5JTG9jYXRpb25Qcm92aWRlcikge1xuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSkuaGFzaFByZWZpeCgnIScpO1xuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvc2VydmljZXMnKTtcblxuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnc2VydmljZXMnLCB7XG4gICAgICB1cmw6ICcvc2VydmljZXMnLFxuICAgICAgY29tcG9uZW50OiAnc2VydmljZXNwYWdlJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdwcm9qZWN0cycsIHtcbiAgICAgIHVybDogJy9wcm9qZWN0cycsXG4gICAgICBjb21wb25lbnQ6ICdwcm9qZWN0c3BhZ2UnXG4gICAgfSk7XG59XG4iLCJpbXBvcnQge05hdmlnYXRpb25Db250cm9sbGVyfSBmcm9tICcuL25hdmlnYXRpb24uY29udHJvbGxlcic7XG5cbmV4cG9ydCBjb25zdCBuYXZpZ2F0aW9uOiBhbmd1bGFyLklDb21wb25lbnRPcHRpb25zID0ge1xuICBjb250cm9sbGVyOiBOYXZpZ2F0aW9uQ29udHJvbGxlcixcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbmF2aWdhdGlvbi5odG1sJylcbn07XG4iLCJpbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkNvbnRyb2xsZXIgaW1wbGVtZW50cyBhbmd1bGFyLklDb250cm9sbGVyIHtcbiAgc3RhdGljICRpbmplY3QgPSBbJyR0cmFuc2l0aW9ucyddO1xuXG4gIHB1YmxpYyBjdHJsOiBhbnkgPSB0aGlzO1xuICBwdWJsaWMgbmF2aWdhdGlvbkl0ZW1zOiBhbnk7XG4gIHB1YmxpYyBhcHBsaWNhdGlvbk5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSAkdHJhbnNpdGlvbnM6IGFueTtcblxuXG4gIGNvbnN0cnVjdG9yKCR0cmFuc2l0aW9uczogYW55KSB7XG4gICAgdGhpcy4kdHJhbnNpdGlvbnMgPSAkdHJhbnNpdGlvbnM7XG4gICAgY29uc29sZS5kaXIoJHRyYW5zaXRpb25zKTtcbiAgfTtcblxuICBwdWJsaWMgJG9uSW5pdCgpIHtcbiAgICB0aGlzLmN0cmwuYXBwbGljYXRpb25OYW1lID0gJ09QRU5TSElGVCBXRUIgQ0FUQUxPR1MnO1xuICAgIHRoaXMuY3RybC5uYXZpZ2F0aW9uSXRlbXMgPSBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnU2VydmljZXMnLFxuICAgICAgICBpY29uQ2xhc3M6ICdwZmljb24gcGZpY29uLXNlcnZpY2UnLFxuICAgICAgICB1aVNyZWY6ICdzZXJ2aWNlcydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnUHJvamVjdHMnLFxuICAgICAgICBpY29uQ2xhc3M6ICdwZmljb24gcGZpY29uLXByb2plY3QnLFxuICAgICAgICB1aVNyZWY6ICdwcm9qZWN0cydcbiAgICAgIH1cbiAgICBdO1xuXG4gICAgdmFyIF9jdHJsOiBhbnkgPSB0aGlzLmN0cmw7XG4gICAgdGhpcy4kdHJhbnNpdGlvbnMub25TdWNjZXNzKHt0bzogdHJ1ZX0sIGZ1bmN0aW9uKHN0YXRlOiBhbnkpIHtcbiAgICAgIHZhciB0b1N0YXRlOiBhbnkgPSBzdGF0ZS4kdG8oKTtcbiAgICAgIHZhciBzdGF0ZU5hbWU6IHN0cmluZyA9IHRvU3RhdGUubmFtZTtcblxuICAgICAgYW5ndWxhci5mb3JFYWNoKF9jdHJsLm5hdmlnYXRpb25JdGVtcywgZnVuY3Rpb24obmF2SXRlbTogYW55KSB7XG4gICAgICAgIG5hdkl0ZW0uaXNBY3RpdmUgPSBzdGF0ZU5hbWUuaW5kZXhPZihuYXZJdGVtLnVpU3JlZikgPT09IDA7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBwdWJsaWMgJG9uQ2hhbmdlcyhvbkNoYW5nZXNPYmo6IGFuZ3VsYXIuSU9uQ2hhbmdlc09iamVjdCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCckb25DaGFuZ2VzJyArIEpTT04uc3RyaW5naWZ5KG9uQ2hhbmdlc09iaikpO1xuICB9XG5cbiAgcHVibGljICRkb0NoZWNrKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCckZG9DaGVjaycpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgTW9ja0RhdGFTZXJ2aWNlIHtcbiAgcHVibGljIGdldFNlcnZpY2VzKCk6IGFueSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHtpZDogMSwgbmFtZTogJypXaWxkRmx5JywgaWNvbjogJ2ZvbnQtaWNvbiBpY29uLXdpbGRmbHknLCBjYXRlZ29yeTogJ2xhbmd1YWdlcycsIHN1YkNhdGVnb3J5OiAnamF2YScsIGZlYXR1cmVkOiB0cnVlfSxcbiAgICAgIHtpZDogMiwgbmFtZTogJ09yYWNsZSBKYXZhJywgaWNvbjogJ2ZvbnQtaWNvbiBpY29uLW9wZW5qZGsnLCBjYXRlZ29yeTogJ2xhbmd1YWdlcycsIHN1YkNhdGVnb3J5OiAnamF2YSd9LFxuICAgICAge2lkOiAzLCBuYW1lOiAnKk5vZGUuanMnLCBpY29uOiAnZm9udC1pY29uIGljb24tanMnLCBjYXRlZ29yeTogJ2xhbmd1YWdlcycsIHN1YkNhdGVnb3J5OiAnamF2YXNjcmlwdCcsIGZlYXR1cmVkOiB0cnVlfSxcbiAgICAgIHtpZDogNCwgbmFtZTogJ05vZGUuanMgKyBNb25nb0RCIChFcGhlbWVyYWwpJywgaWNvbjogJ2ZvbnQtaWNvbiBpY29uLWpzJywgY2F0ZWdvcnk6ICdsYW5ndWFnZXMnLCBzdWJDYXRlZ29yeTogJ2phdmFzY3JpcHQnfSxcbiAgICAgIHtpZDogNSwgbmFtZTogJypQZXJsJywgaWNvbjogJ2ZvbnQtaWNvbiBpY29uLXBlcmwnLCBjYXRlZ29yeTogJ2xhbmd1YWdlcycsIHN1YkNhdGVnb3J5OiAncGVybCcsIGZlYXR1cmVkOiB0cnVlfSxcbiAgICAgIHtpZDogNiwgbmFtZTogJ0RhbmNlciArIE15U1FMIChFcGhlbWVyYWwpJywgaWNvbjogJ2ZvbnQtaWNvbiBpY29uLXBlcmwnLCBjYXRlZ29yeTogJ2xhbmd1YWdlcycsIHN1YkNhdGVnb3J5OiAncGVybCd9LFxuICAgICAge2lkOiA3LCBuYW1lOiAnKlJ1YnknLCBpY29uOiAnZm9udC1pY29uIGljb24tcnVieScsIGNhdGVnb3J5OiAnbGFuZ3VhZ2VzJywgc3ViQ2F0ZWdvcnk6ICdydWJ5JywgZmVhdHVyZWQ6IHRydWV9LFxuICAgICAge2lkOiA4LCBuYW1lOiAnUmFpbHMgKyBQb3N0Z3JlU1FMIChFcGhlbWVyYWwpJywgaWNvbjogJ2ZvbnQtaWNvbiBpY29uLXJ1YnknLCBjYXRlZ29yeTogJ2xhbmd1YWdlcycsIHN1YkNhdGVnb3J5OiAncnVieSd9LFxuICAgICAge2lkOiA5LCBuYW1lOiAnKlBIUCcsIGljb246ICdmb250LWljb24gaWNvbi1waHAnLCBjYXRlZ29yeTogJ2xhbmd1YWdlcycsIHN1YkNhdGVnb3J5OiAncGhwJywgZmVhdHVyZWQ6IHRydWV9LFxuICAgICAge2lkOiAxMCwgbmFtZTogJ0Nha2VQSFAgKyBNeVNRTCAoRXBoZW1lcmFsKScsIGljb246ICdmb250LWljb24gaWNvbi1waHAnLCBjYXRlZ29yeTogJ2xhbmd1YWdlcycsIHN1YkNhdGVnb3J5OiAncGhwJ30sXG4gICAgICB7aWQ6IDExLCBuYW1lOiAnKlB5dGhvbicsIGljb246ICdmb250LWljb24gaWNvbi1weXRob24nLCBjYXRlZ29yeTogJ2xhbmd1YWdlcycsIHN1YkNhdGVnb3J5OiAncHl0aG9uJywgZmVhdHVyZWQ6IHRydWV9LFxuICAgICAge2lkOiAxMiwgbmFtZTogJ0RqYW5nbyArIFBvc3RncmVTUUwgKEVwaGVtZXJhbCknLCBpY29uOiAnZm9udC1pY29uIGljb24tcHl0aG9uJywgY2F0ZWdvcnk6ICdsYW5ndWFnZXMnLCBzdWJDYXRlZ29yeTogJ3B5dGhvbid9LFxuICAgICAge2lkOiAxMywgbmFtZTogJypNb25nbyAgKEVwaGVtZXJhbCknLCBpY29uOiAnZm9udC1pY29uIGljb24tbW9uZ29kYicsIGNhdGVnb3J5OiAnZGF0YWJhc2VzJywgc3ViQ2F0ZWdvcnk6ICdtb25nbycsIGZlYXR1cmVkOiB0cnVlfSxcbiAgICAgIHtpZDogMTQsIG5hbWU6ICcqbXlTUUwgIChFcGhlbWVyYWwpJywgaWNvbjogJ2ZvbnQtaWNvbiBpY29uLW15c3FsLWRhdGFiYXNlJywgY2F0ZWdvcnk6ICdkYXRhYmFzZXMnLCBzdWJDYXRlZ29yeTogJ215c3FsJywgZmVhdHVyZWQ6IHRydWV9LFxuICAgICAge2lkOiAxNSwgbmFtZTogJ1Bvc3RncmVzIChFcGhlbWVyYWwpJywgaWNvbjogJ2ZvbnQtaWNvbiBpY29uLXBvc3RncmVzcWwnLCBjYXRlZ29yeTogJ2RhdGFiYXNlcycsIHN1YkNhdGVnb3J5OiAncG9zdGdyZXMnfSxcbiAgICAgIHtpZDogMTYsIG5hbWU6ICdNYXJpYURCIChFcGhlbWVyYWwpJywgaWNvbjogJ2ZvbnQtaWNvbiBpY29uLW1hcmlhZGInLCBjYXRlZ29yeTogJ2RhdGFiYXNlcycsIHN1YkNhdGVnb3J5OiAnbWFyaWFkYid9LFxuICAgICAge2lkOiAxNywgbmFtZTogJypSZWQgSGF0IEpCb3NzIEVBUCcsIGljb246ICdmb250LWljb24gaWNvbi1vcGVuamRrJywgY2F0ZWdvcnk6ICdtaWRkbGV3YXJlJywgc3ViQ2F0ZWdvcnk6ICdqYm9zcycsIGZlYXR1cmVkOiB0cnVlfSxcbiAgICAgIHtpZDogMTgsIG5hbWU6ICdKQm9zcyBFQVAgQ2xpZW50JywgaWNvbjogJ2ZvbnQtaWNvbiBpY29uLW9wZW5qZGsnLCBjYXRlZ29yeTogJ21pZGRsZXdhcmUnLCBzdWJDYXRlZ29yeTogJ2pib3NzJ30sXG4gICAgICB7aWQ6IDE5LCBuYW1lOiAnKkZ1c2UnLCBpY29uOiAnZm9udC1pY29uIGljb24tb3BlbmpkaycsIGNhdGVnb3J5OiAnbWlkZGxld2FyZScsIHN1YkNhdGVnb3J5OiAnZnVzZScsIGZlYXR1cmVkOiB0cnVlfSxcbiAgICAgIHtpZDogMjAsIG5hbWU6ICcqUmVkIEhhdCBKQm9zcyBBLU1RJywgaWNvbjogJ2ZvbnQtaWNvbiBpY29uLW9wZW5qZGsnLCBjYXRlZ29yeTogJ21pZGRsZXdhcmUnLCBzdWJDYXRlZ29yeTogJ2FtcScsIGZlYXR1cmVkOiB0cnVlfSxcbiAgICAgIHtpZDogMjEsIG5hbWU6ICdKQm9zcyBBLU1RIENsaWVudCcsIGljb246ICdmb250LWljb24gaWNvbi1vcGVuamRrJywgY2F0ZWdvcnk6ICdtaWRkbGV3YXJlJywgc3ViQ2F0ZWdvcnk6ICdhbXEnfSxcbiAgICAgIHtpZDogMjIsIG5hbWU6ICcqUmVkIEhhdCBKQm9zcyBCUE0gU3VpdGUnLCBpY29uOiAnZm9udC1pY29uIGljb24tb3BlbmpkaycsIGNhdGVnb3J5OiAnbWlkZGxld2FyZScsIHN1YkNhdGVnb3J5OiAnYnBtJywgZmVhdHVyZWQ6IHRydWV9LFxuICAgICAge2lkOiAyMywgbmFtZTogICdSZWQgSGF0IEpCb3NzIEJSTVMnLCBpY29uOiAnZm9udC1pY29uIGljb24tb3BlbmpkaycsIGNhdGVnb3J5OiAnbWlkZGxld2FyZScsIHN1YkNhdGVnb3J5OiAnYnBtJ30sXG4gICAgICB7aWQ6IDI0LCBuYW1lOiAnKkplbmtpbnMnLCBpY29uOiAnZm9udC1pY29uIGljb24tb3BlbmpkaycsIGNhdGVnb3J5OiAnY2ljZCcsIHN1YkNhdGVnb3J5OiAnamVua2lucycsIGZlYXR1cmVkOiB0cnVlfSxcbiAgICAgIHtpZDogMjUsIG5hbWU6ICdKZW5raW5zIENsaWVudCcsIGljb246ICdmb250LWljb24gaWNvbi1qZW5raW5zJywgY2F0ZWdvcnk6ICdjaWNkJywgc3ViQ2F0ZWdvcnk6ICdqZW5raW5zJ30sXG4gICAgICB7aWQ6IDI2LCBuYW1lOiAnKlBpcGVsaW5lJywgaWNvbjogJ2ZhIGZhLWNsb25lJywgY2F0ZWdvcnk6ICdjaWNkJywgc3ViQ2F0ZWdvcnk6ICdwaXBlbGluZXMnLCBmZWF0dXJlZDogdHJ1ZX0sXG4gICAgICB7aWQ6IDI3LCBuYW1lOiAnUGlwZWxpbmUgQ2xpZW50JywgaWNvbjogJ2ZhIGZhLWNsb25lJywgY2F0ZWdvcnk6ICdjaWNkJywgc3ViQ2F0ZWdvcnk6ICdwaXBlbGluZXMnfSxcbiAgICBdO1xuICB9XG5cbiAgcHVibGljIGdldFNlcnZpY2VEZXRhaWxzKHNlcnZpY2VJZDogbnVtYmVyKTogYW55IHtcbiAgICBsZXQgZGV0YWlscyA9IHt9O1xuXG4gICAgc3dpdGNoIChzZXJ2aWNlSWQpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgZGV0YWlscyA9IHsgZGVzY1RpdGxlOiAnQlVJTERTIFNPVVJDRSBDT0RFJyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCdWlsZCBhbmQgcnVuIFdpbGRGbHkgMTAuMSBhcHBsaWNhdGlvbnMgb24gQ2VudE9TIDcuIEZvciBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHVzaW5nIHRoaXMgYnVpbGRlciBpbWFnZSwgaW5jbHVkaW5nIE9wZW5TaGlmdCBjb25zaWRlcmF0aW9ucywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVuc2hpZnQtczJpL3MyaS13aWxkZmx5L2Jsb2IvbWFzdOKApicsXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb25zOiBbJzEwLjEgLS0gbGF0ZXN0JywgJzEwLjAnLCAnOS4wJywgJzguMSddfTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2VydmljZVByaWNlcyhzZXJ2aWNlSWQ6IG51bWJlcik6IGFueSB7XG4gICAgbGV0IHByaWNlcyA9IFtdO1xuXG4gICAgc3dpdGNoIChzZXJ2aWNlSWQpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcHJpY2VzID0gW1xuICAgICAgICAgICAge21hbmFnZWQ6ICdSZWQgSGF0JywgaW5mcmFzdHJ1Y3R1cmU6ICdEZWRpY2F0ZWQnLCBpbmZyYURldGFpbDogJ1RvcGljJywgaW5mcmFQcmljZTogJyQuNjUgLyAxIE1pbGxpb24gbWVzc2FnZXMnfSxcbiAgICAgICAgICAgIHttYW5hZ2VkOiAnUmVkIEhhdCcsIGluZnJhc3RydWN0dXJlOiAnRGVkaWNhdGVkJywgaW5mcmFEZXRhaWw6ICdRdWV1ZScsIGluZnJhUHJpY2U6ICckLjY1IC8gMSBNaWxsaW9uIG1lc3NhZ2VzJ30sXG4gICAgICAgICAgICB7bWFuYWdlZDogJ1JlZCBIYXQnLCBpbmZyYXN0cnVjdHVyZTogJ1NoYXJlZCcsICAgIGluZnJhRGV0YWlsOiAnVG9waWMnLCBpbmZyYVByaWNlOiAnJC42MCAvIDEgTWlsbGlvbiBtZXNzYWdlcyd9LFxuICAgICAgICAgICAge21hbmFnZWQ6ICdSZWQgSGF0JywgaW5mcmFzdHJ1Y3R1cmU6ICdTaGFyZWQnLCAgICBpbmZyYURldGFpbDogJ1F1ZXVlJywgaW5mcmFQcmljZTogJyQuNjAgLyAxIE1pbGxpb24gbWVzc2FnZXMnfSxcbiAgICAgICAgICAgIHttYW5hZ2VkOiAnU2VsZicsICAgIGluZnJhc3RydWN0dXJlOiAnRGVkaWNhdGVkJywgaW5mcmFEZXRhaWw6ICdUb3BpYycsIGluZnJhUHJpY2U6ICckMTIgLyBpbnN0YW5jZSd9LFxuICAgICAgICAgICAge21hbmFnZWQ6ICdTZWxmJywgICAgaW5mcmFzdHJ1Y3R1cmU6ICdEZWRpY2F0ZWQnLCBpbmZyYURldGFpbDogJ1F1ZXVlJywgaW5mcmFQcmljZTogJyQxMiAvIGluc3RhbmNlJ31cbiAgICAgICAgXTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByaWNlcztcbiAgfVxufVxuIiwiaW1wb3J0IHtQcm9qZWN0c1BhZ2VDb250cm9sbGVyfSBmcm9tICcuL3Byb2plY3RzUGFnZUNvbnRyb2xsZXInO1xuXG5leHBvcnQgY29uc3QgcHJvamVjdHNQYWdlOiBhbmd1bGFyLklDb21wb25lbnRPcHRpb25zID0ge1xuICBjb250cm9sbGVyOiBQcm9qZWN0c1BhZ2VDb250cm9sbGVyLFxuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9wcm9qZWN0cy1wYWdlLmh0bWwnKVxufTtcbiIsIlxuZXhwb3J0IGNsYXNzIFByb2plY3RzUGFnZUNvbnRyb2xsZXIge1xuICBwdWJsaWMgY3RybDogYW55ID0gdGhpcztcbn07XG4iLCJpbXBvcnQge1NlcnZpY2VzUGFnZUNvbnRyb2xsZXJ9IGZyb20gJy4vc2VydmljZXNQYWdlQ29udHJvbGxlcic7XG5cbmV4cG9ydCBjb25zdCBzZXJ2aWNlc1BhZ2U6IGFuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnMgPSB7XG4gIGNvbnRyb2xsZXI6IFNlcnZpY2VzUGFnZUNvbnRyb2xsZXIsXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3NlcnZpY2VzLXBhZ2UuaHRtbCcpXG59O1xuIiwiaW1wb3J0IHtNb2NrRGF0YVNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21vY2tEYXRhLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgU2VydmljZXNQYWdlQ29udHJvbGxlciB7XG5cbiAgc3RhdGljICRpbmplY3QgPSBbJ01vY2tEYXRhU2VydmljZScsICdBdXRoU2VydmljZSddO1xuXG4gIHB1YmxpYyBkYXRhU2VydmljZTpNb2NrRGF0YVNlcnZpY2U7XG4gIHB1YmxpYyBhdXRoU2VydmljZTphbnk7XG4gIHB1YmxpYyBzZXJ2aWNlczphbnk7XG4gIHB1YmxpYyBjdHJsOmFueSA9IHRoaXM7XG5cbiAgY29uc3RydWN0b3IgKG1vY2tEYXRhU2VydmljZTphbnksIGF1dGhTZXJ2aWNlOmFueSkge1xuICAgIHRoaXMuZGF0YVNlcnZpY2UgPSBtb2NrRGF0YVNlcnZpY2U7XG4gICAgdGhpcy5hdXRoU2VydmljZSA9IGF1dGhTZXJ2aWNlO1xuICB9XG5cbiAgcHVibGljICRvbkluaXQgKCkge1xuICAgIHRoaXMuYXV0aFNlcnZpY2Uud2l0aFVzZXIoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY3RybC5zZXJ2aWNlcyA9IHRoaXMuZGF0YVNlcnZpY2UuZ2V0U2VydmljZXMoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19
