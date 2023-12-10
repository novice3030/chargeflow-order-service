import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class PubsubService {
  publish<T>(event: string, payload: T) {}
  subscribe<T>(event: string): Observable<T> {
    return of(null);
  }
}
