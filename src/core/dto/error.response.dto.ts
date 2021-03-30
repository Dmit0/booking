import { ApiResponseProperty } from '@nestjs/swagger';
import { ErrorMessage } from '../enums/errors.enum';

export class ErrorResponseDto {
  @ApiResponseProperty({ type: Number })
  statusCode: number;

  @ApiResponseProperty({ enum: ErrorMessage })
  message: keyof ErrorMessage;

  @ApiResponseProperty({ type: String })
  error: string;
}