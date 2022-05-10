import { Module } from '@nestjs/common';

@Module({
  imports: [OAuthConfigModule, PassportModule],
  providers: [JwtStrategy, Auth0Strategy],
  controllers: [Auth0Controller],
  exports: [PassportModule, JwtStrategy, Auth0Strategy],
})
export class AuthModule {}
