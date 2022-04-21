import { REG_EXP_EMAIL } from './constant';

export const validateEmailOptional = (email?: string) =>
  email && !REG_EXP_EMAIL.test(email) && 'Invalid email format';
