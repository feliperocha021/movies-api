import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { BadRequestError, UnauthorizedError } from "../errors/error";
import { UserService } from "./user.service";
import { AccessTokenPayload, RefreshTokenPayload } from "../interfaces/user-payload.interface";
import { RedisService } from "./redis.service";
import { ENV } from "../config/env.validation";

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  async signup(username: string, email: string, password: string) {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt);
    const user = await this.userService.createUser(username, email, hashed);

    const accessToken = generateAccessToken(user._id.toString(), user.username, user.role);
    const { token: refreshToken, jti } = generateRefreshToken(user._id.toString());
    
    await this.redisService.addJti(user._id.toString(), jti, ENV.JWT_REFRESH_TOKEN_EXPIRESIN);

    return { user, accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedError("Email e/ou senha inválido(s)");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedError("Email e/ou senha inválido(s)");

    await this.redisService.cleanupExpiredJtis(user._id.toString());

    const accessToken = generateAccessToken(user._id.toString(), user.username, user.role);
    const { token: refreshToken, jti } = generateRefreshToken(user._id.toString());

    await this.redisService.addJti(user._id.toString(), jti, ENV.JWT_REFRESH_TOKEN_EXPIRESIN);

    return { user, accessToken, refreshToken };
  }

  async refresh(refreshPayload: RefreshTokenPayload) {
    const consumed = await this.redisService.consumeJti(refreshPayload.sub, refreshPayload.jti);
    if (!consumed) throw new UnauthorizedError("Refresh token expirado ou revogado");

    const user = await this.userService.findById(refreshPayload.sub);

    const accessToken = generateAccessToken(refreshPayload.sub, user.username, user.role);
    const { token: refreshToken, jti } = generateRefreshToken(refreshPayload.sub);

    await this.redisService.addJti(user._id.toString(), jti, ENV.JWT_REFRESH_TOKEN_EXPIRESIN);

    return { user, accessToken, refreshToken };
  }

  async logout(payload: RefreshTokenPayload) {
    const { sub, jti } = payload;
    await this.redisService.removeJti(sub, jti);
    return true;
  }

  async logoutAll(payload: AccessTokenPayload) {
    const { sub } = payload;
    await this.redisService.clearAllJtis(sub);
    return true;
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.userService.findById(userId);
    const hashed = await bcrypt.hash(newPassword, 10);
    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) throw new BadRequestError("Senha Atual Inválida");

    user.password = hashed;
    await user.save();

    await this.redisService.clearAllJtis(userId);

    const accessToken = generateAccessToken(user._id.toString(), user.username, user.role);
    const { token: refreshToken, jti } = generateRefreshToken(user._id.toString());
    await this.redisService.addJti(user._id.toString(), jti, ENV.JWT_REFRESH_TOKEN_EXPIRESIN);  

    return { user, accessToken, refreshToken };
  }
}