import defaultSurvey from 'Survey/Default/config';
import listSurvey from 'Survey/List/config';
import { Survey } from 'Survey/common/config';

// eslint-disable-next-line import/prefer-default-export
export const getSurveyQuery = ({ id }: Survey) => ({
  match: {
    'metadata.survey.id': id,
  },
});

export const matchAppSurveys = {
  bool: {
    should: [defaultSurvey, listSurvey].map(getSurveyQuery),
  },
};
