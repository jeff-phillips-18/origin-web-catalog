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
import '../src/index';

export const catalogApp: string = 'catalogApp';

require('../node_modules/angular-patternfly/node_modules/patternfly/dist/js/patternfly');
require('../node_modules/angular-patternfly/dist/angular-patternfly');
require('../node_modules/angular-patternfly/node_modules/angular-ui-bootstrap/ui-bootstrap');
require('../node_modules/angular-patternfly/node_modules/angular-ui-bootstrap/ui-bootstrap-tpls');
require('../node_modules/angular-patternfly/node_modules/angular-sanitize/angular-sanitize');
require('../node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js');
require('../node_modules/angular-animate/angular-animate.min.js');

require('../node_modules/jquery/dist/jquery');
require('../bower_components/js-logger/src/logger');
require('../bower_components/hawtio-core/dist/hawtio-core');
require('../bower_components/hawtio-extension-service/dist/hawtio-extension-service');
require('../bower_components/term.js/src/term');
require('../bower_components/kubernetes-container-terminal/dist/container-terminal');

require('../node_modules/origin-web-common/dist/origin-web-common');

angular
  .module(catalogApp, ['webCatalog', 'ui.router'])
  .config(routesConfig)
  .service('MockDataService', MockDataService)
  .component('servicespage', servicesPage)
  .component('projectspage', projectsPage)
  .component('navigation', navigation);
