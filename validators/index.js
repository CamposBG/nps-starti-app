import ValidatorString from './types/string';
import ValidatorNumber from './types/number';
import ValidatorDate from './types/date';

export default new (class {
  getSchema(rules, type) {
    let schema = null;

    if (type === 'text' || type === 'password') {
      schema = ValidatorString.getStringSchema(rules);
    } else if (type === 'multitext') {
      schema = ValidatorString.getMultiStringSchema(rules);
    } else if (type === 'number') {
      schema = ValidatorNumber.getNumberSchema(rules);
    } else if (type === 'date') {
      schema = ValidatorDate.getDateSchema(rules);
    } else if (type === 'date-range') {
      schema = ValidatorDate.getDateRangeSchema(rules);
    } 

    return schema;
  }
})();