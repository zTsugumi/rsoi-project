import { Body, Controller, Get, ParseArrayPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('names')
  public async getNames(
    @Body(new ParseArrayPipe({ items: String })) usersUUID: String[],
  ) {
    return await this._userService.getNames(usersUUID);
  }
}
