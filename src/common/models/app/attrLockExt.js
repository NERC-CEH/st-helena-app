/* eslint-disable no-case-declarations */

/** ****************************************************************************
 * App Model attribute lock functions.
 **************************************************************************** */
import { extendObservable, observe } from 'mobx';
import Occurrence from 'models/occurrence';
import Sample from 'models/sample';
import userModel from 'models/user';
import { coreAttributes } from 'Survey/common/config';

const isDAFOR = val =>
  ['Dominant', 'Abundant', 'Frequent', 'Occasional', 'Rare'].includes(val);

function getFullAttrName(model, attrName) {
  let attrType = model;

  if (typeof model !== 'string') {
    attrType = model instanceof Sample ? `smp` : `occ`;
  }

  return `${attrType}:${attrName}`;
}

function getDefaultComplexSurveyConfig(model, fullAttrName) {
  const isSample = model instanceof Sample;
  const isOccurrenceWithoutParent = !isSample && !model.parent;
  if (isOccurrenceWithoutParent) {
    console.log('Survey lock occurrence without sample parent', 'e');
    return null;
  }

  const surveyConfig = isSample ? model.getSurvey() : model.parent.getSurvey();

  const isCoreAttr = coreAttributes.includes(fullAttrName);
  const surveyName = isCoreAttr ? 'default' : surveyConfig.name;

  return ['complex', `default-${surveyName}`];
}

function getSurveyConfig(model, fullAttrName) {
  let surveyConfig = { name: 'default', complex: false };

  if (typeof model !== 'string') {
    const getTopParent = m => (m.parent ? getTopParent(m.parent) : m);
    const surveyModel = getTopParent(model);

    surveyConfig = surveyModel.getSurvey();
  }

  const isComplex = surveyConfig.name !== 'default';
  if (isComplex) {
    const isDefaultComplex = surveyConfig.name === 'list';
    if (isDefaultComplex) {
      return getDefaultComplexSurveyConfig(model, fullAttrName);
    }

    return ['complex', surveyConfig.name];
  }

  const isCoreAttr = coreAttributes.includes(fullAttrName);
  const surveyName = isCoreAttr
    ? 'default'
    : surveyConfig.taxa || surveyConfig.name;

  return ['default', surveyName];
}

export default {
  attrLocksExtensionInit() {
    const activity = this.getAttrLock('smp', 'activity');
    if (activity) {
      if (userModel.hasActivityExpired(activity)) {
        console.log(
          'AppModel:AttrLocks: currently locked activity has expired.'
        );
        this.unsetAttrLock('smp', 'activity');
      }
    }

    function onLogout(change) {
      if (change.newValue === false) {
        console.log('AppModel:AttrLocks: removing currently locked activity.');
        this.unsetAttrLock('smp', 'activity');
      }
    }

    observe(userModel.attrs, 'isLoggedIn', onLogout.bind(this));
  },

  getAllLocks(model, fullAttrName = '') {
    const [surveyType, surveyName] = getSurveyConfig(model, fullAttrName);

    const { attrLocks } = this.attrs;
    if (!attrLocks[surveyType] || !attrLocks[surveyType][surveyName]) {
      return {};
    }

    return attrLocks[surveyType][surveyName];
  },

  async setAttrLock(model, attr, value, skipConfig) {
    const survey = model.getSurvey?.();
    if (!skipConfig && survey && survey.attrs?.[attr]?.menuProps?.setLock) {
      survey.attrs?.[attr]?.menuProps?.setLock(model, attr, value);
      return;
    }

    const fullAttrName = getFullAttrName(model, attr);
    const [surveyType, surveyName] = getSurveyConfig(model, fullAttrName);
    const { attrLocks } = this.attrs;

    if (!attrLocks[surveyType]) {
      extendObservable(attrLocks, {
        [surveyType]: {},
      });
    }

    if (!attrLocks[surveyType][surveyName]) {
      extendObservable(attrLocks[surveyType], {
        [surveyName]: {},
      });
    }

    this.attrs.attrLocks = attrLocks;

    const val = JSON.parse(JSON.stringify(value));
    this.attrs.attrLocks[surveyType][surveyName][fullAttrName] = val;

    await this.save();
  },

  async unsetAttrLock(model, attr, skipConfig) {
    const survey = model.getSurvey?.();
    if (!skipConfig && survey && survey.attrs?.[attr]?.menuProps?.unsetLock) {
      survey.attrs?.[attr]?.menuProps?.unsetLock(model, attr);
      return;
    }

    const fullAttrName = getFullAttrName(model, attr);
    const locks = this.getAllLocks(model, fullAttrName);

    delete locks[fullAttrName];
    await this.save();
  },

  getAttrLock(model, attr) {
    const fullAttrName = getFullAttrName(model, attr);
    const locks = this.getAllLocks(model, fullAttrName);

    return locks[fullAttrName];
  },

  isAttrLocked(model, attr, skipConfig) {
    const survey = model.getSurvey?.();
    if (!skipConfig && survey && survey.attrs?.[attr]?.menuProps?.isLocked) {
      return survey.attrs[attr].menuProps.isLocked(model);
    }

    const fullAttrName = getFullAttrName(model, attr);

    let value;
    const lockedVal = this.getAttrLock(model, attr);
    if (!lockedVal) return false;

    // TODO: clean this mess by splitting and moving to surveys attrs
    switch (fullAttrName) {
      case 'smp:activity':
        value = model.attrs[attr] || {};
        return lockedVal.id === value.id;
      case 'smp:location':
        if (!lockedVal) return false;

        value = model.attrs[attr];
        // map or gridref
        return (
          lockedVal.latitude === value.latitude &&
          lockedVal.longitude === value.longitude
        );
      case 'smp:locationName':
        if (!lockedVal) return false;
        value = model.attrs.location;
        return lockedVal === value.name;

      default:
        value = model.attrs[attr];
        return JSON.stringify(value) === JSON.stringify(lockedVal);
    }
  },

  appendAttrLocks(model, locks = {}, skipLocation) {
    const isOccurrenceOnly = model instanceof Occurrence;

    function selectModel(attrType) {
      const isSampleAttr = attrType === 'smp';
      if (isSampleAttr && isOccurrenceOnly) {
        throw new Error('Invalid attibute lock configuration');
      }

      if (isSampleAttr) {
        return model;
      }

      return isOccurrenceOnly ? model : model.occurrences[0];
    }

    Object.keys(locks).forEach(attr => {
      const value = locks[attr];
      // false or undefined or temp 'true' flag
      if (!value || value === true) {
        return;
      }

      const attrParts = attr.split(':');
      const attrType = attrParts[0];
      const attrName = attrParts[1];

      const selectedModel = selectModel(attrType);

      const val = JSON.parse(JSON.stringify(value));
      switch (attr) {
        case 'smp:activity':
          if (!userModel.hasActivityExpired(val)) {
            console.log(
              'SampleModel:AttrLocks: appending activity to the sample.'
            );
            // eslint-disable-next-line no-param-reassign
            model.attrs.activity = val;
          } else {
            // unset the activity as it's now expired
            console.log('SampleModel:AttrLocks: activity has expired.');
            this.unsetAttrLock('smp', 'activity');
          }
          break;
        case 'smp:location':
          if (skipLocation) {
            break;
          }
          let { location } = selectedModel.attrs;
          val.name = location.name; // don't overwrite old name
          selectedModel.attrs.location = val;
          break;
        case 'smp:locationName':
          if (skipLocation) {
            break;
          }
          location = selectedModel.attrs.location;
          location.name = val;
          selectedModel.attrs.location = location;
          break;
        case 'occ:number':
          const isValidNumber = !Number.isNaN(Number(val));

          if (!isValidNumber && isDAFOR(val)) {
            selectedModel.attrs.numberDAFOR = val;
            break;
          }
          const numberAttrName = isValidNumber ? 'number' : 'number-ranges';
          selectedModel.attrs[numberAttrName] = val;
          break;
        default:
          selectedModel.attrs[attrName] = val;
      }
    });
  },
};
