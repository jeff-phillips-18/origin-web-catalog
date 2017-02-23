import { MockDataService } from '../../services/mockData.service';
export declare class ServicesPageController {
    static $inject: string[];
    dataService: MockDataService;
    authService: any;
    services: any;
    ctrl: any;
    constructor(mockDataService: any, authService: any);
    $onInit(): void;
}
