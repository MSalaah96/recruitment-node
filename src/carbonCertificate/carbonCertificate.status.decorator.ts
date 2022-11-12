import { Transform } from 'class-transformer';

export const ToStatus = Transform(
  ({ value }) => {
    if (typeof value !== 'string') return undefined;
    return value.split(',');
  },
  { toClassOnly: true },
);
