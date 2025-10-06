import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthLoginResponse } from "./response/auth-login.response";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { JwtAuthGuard } from "./guards/logged-in.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
 
    @Post('login')
    async login(@Body() request: AuthLoginDto): Promise<AuthLoginResponse> {
        return await this.authService.login(request);
    }

    @Post('register')
    async register(
        @Body() request: AuthRegisterDto
    ): Promise<AuthLoginResponse> {
        return await this.authService.register(request);
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    async getProfile(@Req() req: Request & { user?: any }) {
        const userId = req.user?.id; // ambil dari payload JWT
        return this.authService.getCurrentUser(userId);
    }
}