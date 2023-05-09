import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type } from 'os';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & AbstractDocument;
