angular
  .module('outChem')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(false);
  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/app/login/login.html',
      controller: 'LoginController as lg'
    })
    
    .state('enquiry', {
      url: '/enquiry',
      templateUrl: '/app/enquiry-form/enquiry-form.html',
      controller: 'EnquiryFormController as ef'
    })
    .state('queue-manager', {
      url: '/queue-manager',
      templateUrl: '/app/queue-manager/queue-manager.html',
      controller: 'QueueManagerController as qm'
    })
    .state('measurement', {
      url: '/:enquiryId/measurement',
      templateUrl: '/app/measurement/measurement.html',
      controller: 'MeasurementController as m',
      resolve: {
        enquiryId : function($stateParams) {
          return $stateParams.enquiryId;
        }
      }
    })
    .state('quote-create', {
      url: '/:enquiryId/quote-create',
      templateUrl: '/app/draft-quotation/creation/creation.html',
      controller: 'QuotationCreationController as qc',
      resolve: {
        enquiryId : function($stateParams) {
          return $stateParams.enquiryId;
        }
      }
    })
    .state('quote-approve',{
      url: '/:enquiryId/quote-approve',
      templateUrl: '/app/draft-quotation/approval/approval.html',
      controller: 'QuotationApprovalController as qa',
      resolve: {
        enquiryId : function($stateParams) {
          return $stateParams.enquiryId;
        }
      }
    })
    .state('quote-approve-final',{
      url: '/:enquiryId/quote-approve-final',
      templateUrl: 'app/draft-quotation/final-approval/final-approval.html',
      controller: 'QuotationApprovalFinalController as qaf',
      resolve: {
        enquiryId : function($stateParams) {
          return $stateParams.enquiryId;
        }
      }
    })
    .state('quote-delivery',{
      url: '/:enquiryId/quote-delivery',
      templateUrl: 'app/quotation-delivery/quotation-delivery.html',
      controller: 'QuotationDeliveryController as qd',
      resolve: {
        enquiryId : function($stateParams) {
          return $stateParams.enquiryId;
        }
      }
    })
    .state('quote-presentation-meet',{
      url: '/:enquiryId/quote-presentation-meet',
      templateUrl: 'app/presentation-meet/presentation-meet.html',
      controller: 'QuotationPresentationController as qpm',
      resolve: {
        enquiryId : function($stateParams) {
          return $stateParams.enquiryId;
        }
      }
    });

   $httpProvider.interceptors.push('InterceptorFactory');
}
