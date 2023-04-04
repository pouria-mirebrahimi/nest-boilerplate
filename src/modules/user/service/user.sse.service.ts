import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { interval, map, Observable } from 'rxjs';
// repository
import { UserRepository } from '../repository/user.repository';
// dto
import { MessageEvent } from '../dto/sse.dto';

@Injectable()
export class UserSseService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository,
  ) {}

  public testSseFunctionality(): Observable<MessageEvent> {
    console.log('here');
    return interval(1000).pipe(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map((_) => ({
        data: { id: 5 },
      })),
    );
  }
}
