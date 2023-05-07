import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type } from 'os';

@Schema({ timestamps: true, versionKey: false })
export class Reservation {
  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ type: Date })
  userId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
export type ReservationDocument=Reservation& AbstractDocument;

