/* eslint-disable import/prefer-default-export */
import defaultSurvey from 'Survey/Default/config';
import listSurvey from 'Survey/List/config';

export const getSurveyConfigs = () => ({
  [defaultSurvey.id]: defaultSurvey,
  [listSurvey.id]: listSurvey,
});
