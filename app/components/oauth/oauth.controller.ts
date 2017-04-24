
import * as angular from 'angular';

let URI = require('urijs');

export class OAuthController implements angular.IController {
  static $inject = ['$location', '$q', 'RedirectLoginService', 'DataService', 'AuthService', 'Logger', '$timeout', 'Constants', 'GuidedTourService'];

  public ctrl: any = this;

  private $location: any;
  private $q: any;
  private RedirectLoginService: any;
  private DataService: any;
  private AuthService: any;
  private Logger: any;
  private $timeout: any;
  private Constants: any;
  private GuidedTourService: any;

  private doCompleteLogin: any;
  private authLogger: any;

  constructor($location: any, $q: any, RedirectLoginService: any, DataService: any, AuthService: any, Logger: any, $timeout: any, Constants: any, GuidedTourService: any) {
    this.$location = $location;
    this.$q = $q;
    this.RedirectLoginService = RedirectLoginService;
    this.DataService = DataService;
    this.AuthService = AuthService;
    this.Logger = Logger;
    this.$timeout = $timeout;
    this.Constants = Constants;
    this.GuidedTourService = GuidedTourService;

    // initialize to a no-op function.
    this.doCompleteLogin = function() {
      return;
    };
  }

  public $onInit() {
    var _this: any = this;
    this.authLogger = this.Logger.get('auth');

    this.RedirectLoginService.finish()
      .then(function(data: any) {
        var token = data.token;
        var then = data.then;
        var verified = data.verified;
        var ttl = data.ttl;

        // try to fetch the user
        var opts = {errorNotification: false, http: {auth: {token: token, triggerLogin: false}}};
        _this.authLogger.log('OAuthController, got token, fetching user', opts);

        _this.DataService.get('users', '~', {}, opts)
          .then(function(user: any) {
            // set the new user and token in the auth service
            _this.authLogger.log('OAuthController, got user', user);

            _this.doCompleteLogin = function() {
              // persist the user
              _this.AuthService.setUser(user, token, ttl);

              // Check if this is the first time this user has logged in, if so launch the tour
              var loggedInKey: string = "hasLoggedIn/" + user.metadata.name;
              var hasLoggedIn: boolean = localStorage.getItem(loggedInKey) === 'true';

              if (hasLoggedIn) {
                // redirect to original destination (or default to './')
                var destination = then || './';
                if (URI(destination).is('absolute')) {
                  _this.authLogger.log('OAuthController, invalid absolute redirect', destination);
                  destination = './';
                }
                _this.authLogger.log('OAuthController, redirecting', destination);
                _this.$location.replace();
                _this.$location.url(destination);
              } else {
                localStorage.setItem(loggedInKey, 'true');
                _this.$location.replace();
                _this.$location.url('./');
                this.$timeout(function() {
                  let tourConfig = _this.Constants.LANDING_PAGE_TOUR_STEPS;
                  if (tourConfig && tourConfig.steps) {
                    _this.GuidedTourService.startTour(tourConfig);
                  }
                }, 500);
              }
            };

            if (verified) {
              // automatically complete
              _this.completeLogin();
            } else {
              // require the UI to prompt
              _this.confirmUser = user;

              // additionally, give the UI info about the user being overridden
              var currentUser = _this.AuthService.UserStore().getUser();
              if (currentUser && currentUser.metadata.name !== user.metadata.name) {
                _this.overriddenUser = currentUser;
              }
            }
          })
          .catch(function(rejection: any) {
            // handle an API error response fetching the user
            var redirect = URI('error').query({error: 'user_fetch_failed'}).toString();
            _this.authLogger.error('OAuthController, error fetching user', rejection, 'redirecting', redirect);
            _this.$location.replace();
            _this.$location.url(redirect);
          });

      })
      .catch(function(rejection: any) {
        var redirect = URI('error').query({
          error: rejection.error || '',
          error_description: rejection.error_description || '',
          error_uri: rejection.error_uri || ''
        }).toString();
        _this.authLogger.error('OAuthController, error', rejection, 'redirecting', redirect);
        _this.$location.replace();
        _this.$location.url(redirect);
      });
  }

  public completeLogin() {
    console.log("Logged in");
    this.doCompleteLogin();
  }

  public cancelLogin() {
    this.$location.replace();
    this.$location.url('./');
  }
}
