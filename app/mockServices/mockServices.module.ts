import * as angular from 'angular';
import {AuthService} from './mockAuth.service';
import {LoggerService} from './mockLogger.service';
import {APIService} from './mockAPI.service';
import {ConstantsService} from './mockConstants.service';
import {DataService} from './mockData.service';
import {ProjectsService} from './mockProjects.service';
import {AlertMessageService} from './mockAlertMessage.service';

export class MockServicesModule {

  static $inject = ['$window'];

  public moduleName: string = 'mockServices';
  private $window: any;

  constructor($window: any) {
    this.$window = $window;

    angular
      .module(this.moduleName, [])
      .factory('Constants', ConstantsService)
      .service('AuthService', AuthService)
      .service('APIService', APIService)
      .service('ProjectsService', ProjectsService)
      .service('AlertMessageService', AlertMessageService)
      .service('Logger', LoggerService)
      .service('DataService', DataService);
  }

  public useMockServices() {
    return this.$window.MOCK_ORIGIN_SERVICES;
  }
}


