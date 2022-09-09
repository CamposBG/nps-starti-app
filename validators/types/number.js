import { z } from 'zod';

export default new class {
  // eslint-disable-next-line class-methods-use-this
  getNumberSchema(rules) {
    let zodSchema = z.number({
      required_error: 'Esse campo é obrigatório',
      invalid_type_error: 'Esse campo precisa ser um número',
      invalid: 'Esse campo precisa ser um número',
    });
    const rulesSplit = String(rules).split('|');
    rulesSplit.forEach((rule) => {
      if (rule.indexOf('gte:') > -1) {
        const ruleGte = rule.split(':');
        zodSchema = zodSchema.gte(ruleGte[1], { message: `O valor deve ser maior ou igual a ${ruleGte[1]}` });
      } else if (rule.indexOf('lte:') > -1) {
        const ruleLte = rule.split(':');
        zodSchema = zodSchema.lte(ruleLte[1], { message: `O valor deve ser menor ou igual a ${ruleLte[1]}` });
      } else if (rule.indexOf('gt:') > -1) {
        const ruleGt = rule.split(':');
        zodSchema = zodSchema.gt(ruleGt[1], { message: `O valor deve ser maior que ${ruleGt[1]}` });
      } else if (rule.indexOf('lt:') > -1) {
        const ruleLt = rule.split(':');
        zodSchema = zodSchema.lt(ruleLt[1], { message: `O valor deve ser menor que ${ruleLt[1]}` });
      } else if (rule === 'positive') {
        zodSchema = zodSchema.positive();
      } else if (rule === 'nonnegative') {
        zodSchema = zodSchema.nonnegative();
      } else if (rule === 'negative') {
        zodSchema = zodSchema.negative();
      } else if (rule === 'nonpositive') {
        zodSchema = zodSchema.nonpositive();
      }
    });

    return zodSchema;
  }
}();
