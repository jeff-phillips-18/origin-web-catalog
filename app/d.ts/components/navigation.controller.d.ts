/// <reference types="angular" />
import * as angular from 'angular';
export declare class NavigationController implements angular.IController {
    static $inject: string[];
    ctrl: any;
    navigationItems: any;
    applicationName: string;
    private $transitions;
    constructor($transitions: any);
    $onInit(): void;
    $onChanges(onChangesObj: angular.IOnChangesObject): void;
    $doCheck(): void;
}
