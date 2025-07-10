import { randomBytes } from 'crypto';
import { BASE_62 } from 'src/modules/link/constants/link-code-base62';

export const generateLinkShortCode = (length = 6): string => {
  const bytes = randomBytes(length);
  let code = '';
  for (let i = 0; i < length; i++) {
    code += BASE_62[bytes[i] % BASE_62.length];
  }
  return code;
};
