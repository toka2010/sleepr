import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable, catchError, map, of, tap } from "rxjs";
import { AUTH_SERVIE } from "../constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { UserDto } from "../dto";
import { Reflector } from "@nestjs/core";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVIE) private readonly _clientProxy: ClientProxy,
    private  reflector: Reflector
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt =
      (context.switchToHttp().getRequest() as any).cookies.Authentication ||
      (context.switchToHttp().getRequest() as any).headers?.authentication;
    console.log(
      "🚀 ~ file: jwt.auth.guard.ts:22 ~ JwtAuthGuard ~ jwtlalalallalal:",
      jwt
    );

    // console.log(
    //   (context.switchToHttp().getRequest() as any).cookies.Authentication,
    // );
    if (!jwt) {
      return false;
    }

    const roles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    console.log(
      "🚀 ~ file: jwt.auth.guard.ts:39 ~ JwtAuthGuard ~ roles:",
      roles
    );

    return this._clientProxy
      .send<UserDto>("authintecate", {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          if (roles) {
            for (const role of roles) {
              if (!res.roles?.includes(role)) {
                throw new UnauthorizedException();
              }
            }
          }
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }
}
