import * as angular from 'angular';

export class NavigationController implements angular.IController {
  static $inject = ['$transitions', '$rootScope', '$state', '$timeout', 'Constants', 'GuidedTourService'];

  public ctrl: any = this;
  public navigationItems: any;
  public applicationName: string;
  public navCollapsed: boolean = true;
  private $transitions: any;
  private $rootScope: any;
  private $state: any;
  private $timeout: any;
  private Constants: any;
  private GuidedTourService: any;

  constructor($transitions: any, $rootScope: any, $state: any, $timeout: any, Constants: any, GuidedTourService: any) {
    this.$transitions = $transitions;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.Constants = Constants;
    this.GuidedTourService = GuidedTourService;
  };

  public $onInit() {
    this.ctrl.applicationName = 'OPENSHIFT WEB CATALOGS';
    this.ctrl.navigationItems = [
      {
        title: 'Home',
        iconClass: 'pficon pficon-home',
        uiSref: 'home'
      },
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

    var _ctrl: any = this.ctrl;
    this.$transitions.onSuccess({to: true}, function(state: any) {
      var toState: any = state.$to();
      var stateName: string = toState.name;

      angular.forEach(_ctrl.navigationItems, function(navItem: any) {
        navItem.isActive = stateName.indexOf(navItem.uiSref) === 0;
      });
    });

    this.ctrl.user = this.$rootScope.user;

    this.$rootScope.$watch('user', function(newValue: any) {
      _ctrl.user = newValue;
    });
  };

  public onNavItemClick(navItem: any) {
    this.$state.go(navItem.uiSref, navItem.uiSrefOptions);
    this.ctrl.navCollapsed = true;
  }

  public doLogout() {
    this.$state.go('logout');
 }

  public $onChanges(onChangesObj: angular.IOnChangesObject) {
    return;
  }

  public $doCheck() {
    return;
  }

  public startTour() {
    this.$state.go('home');
    this.$timeout(() => {
      let tourConfig = this.Constants.LANDING_PAGE_TOUR_STEPS;
      if (tourConfig && tourConfig.steps) {
        this.GuidedTourService.startTour(tourConfig);
      }
    }, 500);
  }
}
