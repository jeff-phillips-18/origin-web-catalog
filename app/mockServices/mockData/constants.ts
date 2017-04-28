import * as _ from 'lodash';

export function setupMockConstants () {
  var saasOfferings: any = [
    {id: 1, title:  'OpenShift.io', image: 'styles/assets/code.svg', url: 'openshift.io', description: 'Collaborate at any scale across the development lifecycle, powered by Red Hat OpenShift.'},
    {id: 2, title:  'OpenShift Dedicated',  image: 'styles/assets/dedicated.svg', url: 'https://www.openshift.com/dedicated/', description: 'Develop and manage powerful containerized applications with your own OpenShift cluster, operated by Red Hat.'}
  ];
  _.set(window, 'OPENSHIFT_CONSTANTS.SAAS_OFFERINGS', saasOfferings);
}
