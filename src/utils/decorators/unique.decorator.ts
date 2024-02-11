import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityTarget } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@ValidatorConstraint({ name: 'uniqueConstraint', async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(
        @InjectDataSource()
        private dataSource: DataSource,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    const repository = this.dataSource.getRepository(args.constraints[0]);
    const row = await repository.findOneBy({
      [args.property]: value,
    });
    return row === null;
  }
}

export function Unique(entity: EntityTarget<any>, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target  : object.constructor,
      propertyName,
      options : validationOptions ?? {
        message: 'This $property already used.',
      },
      constraints : [entity],
      validator   : UniqueConstraint,
    });
  };
}
