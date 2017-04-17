
export class HomePageController {
  static $inject = ['$rootScope', '$state', '$timeout', 'AuthService', 'Catalog', 'Constants', 'GuidedTourService'];

  public ctrl: any = this;
  private $rootScope: any;
  private $state: any;
  private $timeout: any;
  private authService: any;
  private Catalog: any;
  private GuidedTourService: any;
  private constants: any;
  private tourConfig: any;

  constructor($rootScope: any, $state: any, $timeout: any, AuthService: any, Catalog: any, Constants: any, GuidedTourService: any) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.authService = AuthService;
    this.Catalog = Catalog;
    this.GuidedTourService = GuidedTourService;
    this.constants = Constants;
  };

  public $onInit() {
    this.tourConfig = this.constants.GUIDED_TOURS ? this.constants.GUIDED_TOURS.landing_page_tour : undefined;

    // Assume a development environment for the console. Remove the trailing slash if set.
    let consoleBaseUrl = _.get(window, 'OPENSHIFT_CONSOLE_BASE_URL', 'https://localhost:9000/dev-console').replace(/\/$/, '');
    this.ctrl.baseProjectUrl = consoleBaseUrl + "/project";
    this.ctrl.projectsUrl = consoleBaseUrl + "/projects";
    this.authService.withUser().then(() => {
      this.update();
    });
  };

  public update() {
    this.Catalog.getCatalogItems().then( (catalogServiceItems: any) => {
      this.ctrl.catalogItems = catalogServiceItems;

      if (this.tourConfig && this.tourConfig.auto_launch) {
        // Check if this is the first time this user has visited the home page, if so launch the tour
        var viewedHomePageKey: string = "viewedHomePage/" + this.$rootScope.user.metadata.name;
        if (localStorage.getItem(viewedHomePageKey) !== 'true') {
          this.$timeout(() => {
            localStorage.setItem(viewedHomePageKey, 'true');
            this.startGuidedTour();
          }, 500);
        }
      }
    }, () => {
      this.ctrl.catalogItems = {};
    });

    this.ctrl.saasOfferings = this.constants.SAAS_OFFERINGS;
  };

  public navToProject = (project: any) => {
    this.$state.go('projects/' + project.metadata.name);
  };

  public navToProjects = () => {
    this.$state.go('projects');
  };

  public startGuidedTour = () => {
    if (this.tourConfig && this.tourConfig.enabled && this.tourConfig.steps) {
      this.GuidedTourService.startTour(this.tourConfig.steps);
    }
  };
}
