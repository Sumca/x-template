export interface Rule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  validator?: (value: any, row: object) => string | undefined;
  message?: string;
}

export function useValidate(value: any, row: any, rules?: Rule[]): string {
  if (!rules) return '';

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    let result = true;

    if (isEmpty(value)) {
      if (rule.required) {
        result = false;
      }
    } else {
      if (rule.min !== undefined || rule.max !== undefined) {
        if (typeof value !== 'string') break;

        if (rule.min !== undefined) {
          if (value.length < rule.min) result = false;
        }

        if (rule.max !== undefined) {
          if (value.length > rule.max) result = false;
        }
      } else if (rule.pattern && !rule.pattern.test(value)) {
        result = false;
      } else if (typeof rule.validator === 'function') {
        rule.message = rule.validator(value, row);
        result = !rule.message;
      }
    }

    if (!result) {
      return rule.message || '';
    }
  }

  return '';
}

export function isEmpty(value: any): boolean {
  if (!value) return true;
  if (Array.isArray(value) && !value.length) return true;
  return false;
}


