export interface TokenResponse {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    'not-before-policy': number;
    scope: string;
}

export interface TokenRequestDto {
    grant_type: string;
    client_id: string;
    client_secret: string;
    [key: string]: string; // Add index signature
}