import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the Task Tracker API! Go to /tasks to see your data.';
  }
}
