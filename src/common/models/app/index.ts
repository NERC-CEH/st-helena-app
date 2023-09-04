import { Model, ModelAttrs } from '@flumens';
import { genericStore } from 'models/store';
import AttributeLockExtension from './attrLockExt';
import PastLocationsExtension from './pastLocExt';

export type Attrs = ModelAttrs & {
  showWelcome: boolean;
  language: string;

  locations: any[];
  attrLocks: any;
  autosync: boolean;
  useTraining: boolean;

  useExperiments: boolean;
  useGridNotifications: boolean;
  gridSquareUnit: 'monad';
  speciesListSortedByTime: boolean;
  geolocateSurveyEntries: boolean;

  showSurveysDeleteTip: boolean;
  shownLongPressTip: boolean;
  shownLockingSwipeTip: boolean;
  feedbackGiven: boolean;
  taxonGroupFilters: any[];
  searchNamesOnly: '' | 'scientific' | 'common';
  sendAnalytics: boolean;
  appSession: number;

  useSpeciesImageClassifier: boolean;

  showVerifiedRecordsNotification: boolean;
  verifiedRecordsTimestamp: null | number;
};

export const defaults: Attrs = {
  showWelcome: true,
  language: 'EN',

  locations: [],
  attrLocks: { default: {}, complex: {} },
  autosync: true,
  useTraining: false,

  useExperiments: false,
  useGridNotifications: false,
  gridSquareUnit: 'monad',
  speciesListSortedByTime: true,
  geolocateSurveyEntries: true,

  showSurveysDeleteTip: true,
  shownLongPressTip: false,
  shownLockingSwipeTip: false,
  feedbackGiven: false,
  taxonGroupFilters: [],
  searchNamesOnly: '',
  sendAnalytics: true,
  appSession: 0,

  useSpeciesImageClassifier: true,

  showVerifiedRecordsNotification: true,
  verifiedRecordsTimestamp: null,
};

export class AppModel extends Model {
  attrs: Attrs = Model.extendAttrs(this.attrs, defaults);

  isAttrLocked: any; // from extension

  getAttrLock: any; // from extension

  setAttrLock: any; // from extension

  unsetAttrLock: any; // from extension

  appendAttrLocks: any; // from extension

  getAllLocks: any; // from extension

  setLocation: any; // from extension

  removeLocation: any; // from extension

  printLocation: any; // from extension

  constructor(options: any) {
    super(options);

    Object.assign(this, PastLocationsExtension);
    Object.assign(this, AttributeLockExtension);
  }

  toggleTaxonFilter(filter: any) {
    const { taxonGroupFilters } = this.attrs;
    const index = taxonGroupFilters.indexOf(filter);
    if (index >= 0) {
      taxonGroupFilters.splice(index, 1);
    } else {
      taxonGroupFilters.push(filter);
    }

    this.save();
  }

  resetDefaults() {
    return super.resetDefaults(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: genericStore });
export default appModel;
