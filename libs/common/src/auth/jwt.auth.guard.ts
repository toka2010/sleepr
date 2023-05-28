import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AUTH_SERVIE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '../dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVIE) private readonly _clientProxy: ClientProxy,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = (context.switchToHttp().getRequest() as any).cookies
      .Authentication  || (context.switchToHttp().getRequest() as any).headers?.authentication
    console.log("🚀 ~ file: jwt.auth.guard.ts:22 ~ JwtAuthGuard ~ jwtlalalallalal:", jwt)
;

    // console.log(
    //   (context.switchToHttp().getRequest() as any).cookies.Authentication,
    // );
    if (!jwt) {
      return false;
    }

    return this._clientProxy
      .send<UserDto>('authintecate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError(()=>of(false)),
      );
  }
}
