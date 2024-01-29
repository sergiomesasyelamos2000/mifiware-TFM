import { Column } from 'typeorm';

export class JwtTokenDto {
  @Column({ type: 'varchar' })
  accessToken: string;

  @Column({ type: 'varchar' })
  refreshToken: string;

  @Column({ type: 'varchar' })
  tokenType: string;

  @Column({ type: 'varchar' })
  userId: string;

  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.tokenType = null;
    this.userId = null;
  }
}
