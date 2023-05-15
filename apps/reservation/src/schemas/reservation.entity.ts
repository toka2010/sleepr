import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Reservation {
  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: String })
  name:  string;

  @Prop({ type:  Types.ObjectId })
  userId: Types.ObjectId;


  @Prop({ type: String })
  paymentId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
export type ReservationDocument=Reservation& AbstractDocument;

