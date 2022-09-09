import { z } from 'zod';

export default new class {
  // eslint-disable-next-line class-methods-use-this
  getDateSchema(rules) {
    const zodSchema = z.date({
      required_error: 'Esse campo é obrigatório',
      invalid_type_error: 'Esse campo deve conter apenas datas',
      invalid: 'Esse campo precisa ser uma data',
    });

    return zodSchema;
  }

  // eslint-disable-next-line class-methods-use-this
  getDateRangeSchema(rules) {
    const zodSchema = z.object({
      start: z.date(),
      end: z.date(),
    }, {
      required_error: 'Esse campo é obrigatório',
      invalid_type_error: 'Esse campo deve conter apenas datas',
      invalid: 'Esse campo precisa ser uma data',
    });

    return zodSchema;
  }
}();
