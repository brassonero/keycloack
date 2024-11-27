import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { TokenResponse, TokenRequestDto } from './auth.types';
import { TotpLoginDto } from './dto/totp-login.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    private readonly baseUrl: string;
    private readonly realm: string;
    private readonly clientId: string;
    private readonly clientSecret: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.baseUrl = this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL', '');
        this.realm = this.configService.get<string>('KEYCLOAK_REALM', '');
        this.clientId = this.configService.get<string>('KEYCLOAK_CLIENT_ID', '');
        this.clientSecret = this.configService.get<string>('KEYCLOAK_CLIENT_SECRET', '');

        if (!this.baseUrl || !this.realm || !this.clientId || !this.clientSecret) {
            throw new Error('Missing required Keycloak configuration');
        }
    }

    async getToken(): Promise<TokenResponse> {
        const tokenData: TokenRequestDto = {
            grant_type: 'client_credentials',
            client_id: this.clientId,
            client_secret: this.clientSecret
        };

        const tokenUrl = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;
        this.logger.debug(`Request token URL: ${tokenUrl}`);

        try {
            const response = await firstValueFrom(
                this.httpService.post<TokenResponse>(
                    tokenUrl,
                    new URLSearchParams(tokenData).toString(),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    }
                )
            );

            return response.data;
        } catch (error) {
            this.logger.error(`Token request failed: ${error.message}`);
            throw error;
        }
    }

    async loginWithTotp(credentials: TotpLoginDto) {
        const tokenUrl = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;
        this.logger.debug(`TOTP login request URL: ${tokenUrl}`);

        try {
            const params = new URLSearchParams({
                grant_type: 'password',
                client_id: this.clientId,
                client_secret: this.clientSecret,
                username: credentials.username,
                password: credentials.password,
                totp: credentials.totp
            });

            const response = await firstValueFrom(
                this.httpService.post(tokenUrl, params.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            );

            return response.data;
        } catch (error) {
            this.logger.error(`TOTP login failed: ${error.message}`);
            throw error;
        }
    }
}