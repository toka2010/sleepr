import { AuthGuard } from "@nestjs/passport";

export  class LocalGard  extends AuthGuard('local'){

}