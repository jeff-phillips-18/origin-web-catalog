import {MockDataService} from '../../services/mockData.service';

export class ServicesPageController {

  static $inject = ['MockDataService', 'AuthService'];

  public dataService:MockDataService;
  public authService:any;
  public services:any;
  public ctrl:any = this;

  constructor (mockDataService:any, authService:any) {
    this.dataService = mockDataService;
    this.authService = authService;
  }

  public $onInit () {
    this.authService.withUser().then(function () {
      this.ctrl.services = this.dataService.getServices();
    });
  }
}
