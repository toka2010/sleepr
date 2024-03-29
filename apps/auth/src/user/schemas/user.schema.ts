import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({type:[String],default:[]})
  roles?:string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & AbstractDocument;
