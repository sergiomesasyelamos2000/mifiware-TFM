import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, SchemaTypes } from 'mongoose';

class Id {
  @Prop({ type: String })
  id: string;

  @Prop({ type: String })
  type: string;

  @Prop({ type: String })
  servicePath: string;
}

@Schema()
class Attr {
  @Prop({ type: MongooseSchema.Types.Mixed })
  value: any;

  @Prop({ type: String })
  type: string;

  @Prop({ type: Number })
  creDate: number;

  @Prop({ type: Number })
  modDate: number;

  @Prop({ type: Map, of: String })
  md: Map<string, any>;

  @Prop([String])
  mdNames: string[];
}

const AttrSchema = SchemaFactory.createForClass(Attr);

//Es necesario especificar el nombre de la colección en la que se almacenarán los datos
//Sino, no realiza bien la conexión con la base de datos y la consulta
@Schema({ collection: 'entities' })
export class LocationUser {
  @Prop({ type: Id })
  _id: Id;

  @Prop([String])
  attrNames: string[];

  @Prop({ type: Map, of: MongooseSchema.Types.Mixed })
  attrs: Map<string, Attr>;

  @Prop()
  creDate: number;

  @Prop()
  modDate: number;

  @Prop()
  lastCorrelator: string;
}

export const LocationUserSchema = SchemaFactory.createForClass(LocationUser);
export type LocationUserDocument = LocationUser & Document;
