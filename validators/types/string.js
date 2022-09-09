import { z } from 'zod';

export default new class {
  // eslint-disable-next-line class-methods-use-this
  getMultiStringSchema(rules) {
    let zodSchema = z.string({
      required_error: 'Esse campo é obrigatório',
      invalid_type_error: 'Esse campo deve conter apenas textos',
    }).array({
      required_error: 'Esse campo é obrigatório',
      invalid_type_error: 'Esse campo deve conter apenas textos',
    });

    const rulesSplit = String(rules).split('|');
    rulesSplit.forEach((rule) => {
      if (rule === 'required') {
        zodSchema = zodSchema.nonempty({ message: 'Esse campo é obrigatório' });
      }
    });

    return zodSchema;
  }

  getStringSchema(rules) {
    let zodSchema = z.string({
      required_error: 'Esse campo é obrigatório',
      invalid_type_error: 'Esse campo deve conter apenas textos',
    });
    const rulesSplit = String(rules).split('|');
    rulesSplit.forEach((rule) => {
      if (rule === 'required') {
        zodSchema = zodSchema.nonempty({ message: 'Esse campo é obrigatório' }).refine((val) => val.trim(), 'Esse campo não pode conter apenas espaços');
      } else if (rule === 'email') {
        zodSchema = zodSchema.email({ message: 'Precisa ser um e-mail válido' });
      } else if (rule.indexOf('max:') > -1) {
        const ruleMax = rule.split(':');
        zodSchema = zodSchema.max(ruleMax[1], { message: `Deve ter no máximo ${ruleMax[1]} caracteres` });
      } else if (rule.indexOf('min:') > -1) {
        const ruleMin = rule.split(':');
        zodSchema = zodSchema.min(ruleMin[1], { message: `Deve ter no mínimo ${ruleMin[1]} caracteres` });
      } else if (rule.indexOf('length:') > -1) {
        const ruleLength = rule.split(':');
        zodSchema = zodSchema.length(ruleLength[1], { message: `Deve ter exatamente ${ruleLength[1]} caracteres` });
      } else if (rule === 'url') {
        zodSchema = zodSchema.url();
      } else if (rule === 'cnpj') {
        zodSchema = zodSchema.regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, { message: 'Digite um CNPJ válido' });
      } else if (rule === 'cpf') {
        zodSchema = zodSchema.regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'Digite um CPF válido' });
      } else if (rule.indexOf('againstKey:') > -1) {
        const againstKey = rule.split(':');
        zodSchema = zodSchema.regex(new RegExp(againstKey[1]), { message: 'Digite a contra chave informada no momento do licenciamento' });
      } else if (rule.indexOf('password:') > -1) {
        const password = rule.split(':');
        zodSchema = zodSchema.regex(new RegExp(`^${password[1]}$`), { message: 'Senhas não conferem' });
      } else if (rule.indexOf('subdomain') > -1) {
        zodSchema = zodSchema.regex(/^[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]$/, { message: 'Subdomínio inválido' });
      } else if (rule.indexOf('cep') > -1) {
        zodSchema = zodSchema.regex(/^[0-9]{5}-[0-9]{3}$/, { message: 'CEP inválido' });
      } else if (rule.indexOf('phone') > -1) {
        zodSchema = zodSchema.regex(/^[0-9_.\-\/+ \/(\/)]*$/, { message: 'Celular ou telefone inválido' });
      }
    });

    return zodSchema;
  }
}();
