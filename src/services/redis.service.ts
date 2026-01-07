import { redisClient } from "../config/redis.js";

export class RedisService {
  private static readonly JTI_KEY_PREFIX = "jti";
  private static readonly USER_JTIS_KEY_PREFIX = "user_jtis";

  // Adiciona um novo JTI e associa ao usuário
  async addJti(userId: string, jti: string, ttlSeconds: number): Promise<void> {
    await redisClient.setex(this.buildJtiKey(jti), ttlSeconds, userId);
    await redisClient.sadd(this.buildUserJtisKey(userId), jti);
    await redisClient.expire(this.buildUserJtisKey(userId), ttlSeconds);
  }

  // Verifica se o JTI está válido
  async isValidJti(userId: string, jti: string): Promise<boolean> {
    const storedUserId = await redisClient.get(this.buildJtiKey(jti));
    return storedUserId === userId;
  }

  // Consome um JTI de forma atômica (check + remove) 
  async consumeJti(userId: string, jti: string): Promise<boolean> { 
    const key = this.buildJtiKey(jti); 
    const storedUserId = await redisClient.getdel(key);  // pega e remove em uma única operação 
    if (storedUserId !== userId) return false; // remove também do set de JTIs do usuário 
    await redisClient.srem(this.buildUserJtisKey(userId), jti); return true; 
  }

  // Remove um JTI específico
  async removeJti(userId: string, jti: string): Promise<void> {
    const pipeline = redisClient.pipeline();
    pipeline.del(this.buildJtiKey(jti));
    pipeline.srem(this.buildUserJtisKey(userId), jti);
    await pipeline.exec();
  }

  // Remove JTIs expirados do set do usuário
  async cleanupExpiredJtis(userId: string): Promise<void> {
    const jtis = await redisClient.smembers(this.buildUserJtisKey(userId));
    if (!jtis.length) return;

    const pipeline = redisClient.pipeline();
    jtis.forEach((jti) => pipeline.exists(this.buildJtiKey(jti)));
    const results = await pipeline.exec();

    const expiredJtis = jtis.filter((_, i) => results?.[i]?.[1] === 0);
    if (expiredJtis.length) {
      await redisClient.srem(this.buildUserJtisKey(userId), ...expiredJtis);
    }
  }

  // Remove todos os JTIs de um usuário (logout global)
  async clearAllJtis(userId: string): Promise<void> {
    const jtis = await redisClient.smembers(this.buildUserJtisKey(userId));
    if (!jtis.length) return;

    const pipeline = redisClient.pipeline();
    jtis.forEach((jti) => pipeline.del(this.buildJtiKey(jti)));
    pipeline.del(this.buildUserJtisKey(userId));
    await pipeline.exec();
  }

  // Helpers
  private buildJtiKey(jti: string): string {
    return `${RedisService.JTI_KEY_PREFIX}:${jti}`;
  }

  private buildUserJtisKey(userId: string): string {
    return `${RedisService.USER_JTIS_KEY_PREFIX}:${userId}`;
  }
}
