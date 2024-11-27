import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "../auth.service";
import {TotpLoginDto} from "../dto/totp-login.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
/*
    @Post('login')
    async login(@Body() credentials: TotpLoginDto) {
        return this.authService.loginWithTotp(credentials);
    }

 */
}
