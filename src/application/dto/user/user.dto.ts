import { UserEntity } from 'src/domain/entities/user.entity';
import {
  IsDateString,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends UserEntity {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsDateString()
  birthday: Date;

  @IsString()
  dd: string;

  @IsString()
  phone: string;
}
