import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber } from 'class-validator';

export class ApiParams {
  @IsBoolean()
  @Transform(
    ({ value }) => value === 'true' || value === true || value === undefined,
  )
  paginate = true;
  @IsNumber()
  @Type(() => Number)
  limit = 10;
  @IsNumber()
  @Type(() => Number)
  page = 0;
}
