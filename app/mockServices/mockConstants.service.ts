import * as _ from 'lodash';
import {setupMockConstants} from '../mockServices/mockData/constants';

export class ConstantsService {
  public constants: any;
  constructor () {
    let win: any = window;
    setupMockConstants();
    return _.clone(win.OPENSHIFT_CONSTANTS || {});
  }
}
