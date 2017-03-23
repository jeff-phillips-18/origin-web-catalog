require('patternfly/dist/js/patternfly');
require('angular-patternfly/dist/angular-patternfly');
require('angular-ui-bootstrap/ui-bootstrap');
require('angular-ui-bootstrap/ui-bootstrap-tpls');
require('angular-sanitize/angular-sanitize');
require('angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js');
require('angular-animate/angular-animate.min.js');

require('jquery/dist/jquery.min.js');
require('lodash/index.js');

require('imports-loader?define=>false!js-logger/src/logger');
require('urijs');
require('urijs/src/URITemplate.js');
require('angular-utf8-base64');
require('origin-web-common/dist/origin-web-common-ui.js');

import '../../src/index';

import {MockServicesModule} from '../../app/mockServices/mockServices.module';

export class TestHelpers {

  public initTests(): void {
    new MockServicesModule(window);
  }
}
