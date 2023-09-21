import { PartialType } from '@nestjs/swagger';
import { CreateMedicineTakenDto } from './create-medicine-taken.dto';

export class UpdateMedicineTakenDto extends PartialType(CreateMedicineTakenDto) {}
