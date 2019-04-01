import _ from 'lodash';
import HoursConstraintError from './hours-constraint-error';

export default (e, models) => {
  if (e instanceof models.sequelize.ValidationError) {
    return e.errors.map(x => _.pick(x, ['path', 'message']));
  }
  if (e.name === 'HoursConstraintError') {
    return [{ path: e.message.path, message: e.message.message }];
  }
  return [{ path: 'name', message: 'something wrong in format error' }];
};
