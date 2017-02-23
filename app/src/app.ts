/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />


import * as angular from 'angular';
import {servicesPage} from './pages/services/servicesPage';
import {projectsPage} from './pages/projects/projectsPage';
import {MockDataService} from './services/mockData.service';
import {navigation} from './components/navigation.component';

import 'angular-ui-router';
import routesConfig from './routes';

import './app.less';
import '../../src/index';

export const catalogApp: string = 'catalogApp';

import '../node_modules/angular-patternfly/node_modules/patternfly/dist/js/patternfly';
import '../node_modules/angular-patternfly/dist/angular-patternfly';
import '../node_modules/angular-patternfly/node_modules/angular-ui-bootstrap/ui-bootstrap';
import '../node_modules/angular-patternfly/node_modules/angular-ui-bootstrap/ui-bootstrap-tpls';
import '../node_modules/angular-patternfly/node_modules/angular-sanitize/angular-sanitize';
import '../node_modules/lodash/lodash';
import '../node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min';

import '../node_modules/jquery/dist/jquery';
import '../bower_components/js-logger/src/logger';
import '../bower_components/hawtio-core/dist/hawtio-core';
import '../bower_components/hawtio-extension-service/dist/hawtio-extension-service';
import '../bower_components/term.js/src/term';
import '../bower_components/kubernetes-container-terminal/dist/container-terminal';

import '../node_modules/origin-web-common/dist/origin-web-common';

console.log("Hello");
angular
  .module(catalogApp, ['webCatalog', 'openshiftCommon', 'kubernetesUI', 'ui.router'])
  .config(routesConfig)
  .service('MockDataService', MockDataService)
  .component('servicespage', servicesPage)
  .component('projectspage', projectsPage)
  .component('navigation', navigation);
