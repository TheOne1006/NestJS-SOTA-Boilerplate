import { Module } from '@nestjs/common';
import { TicketStatusController } from './ticket-status.controller';
import { TicketStatusService } from './ticket-status.server';
import { ProjectService } from '../projects/projects.server';
@Module({
  imports: [],
  controllers: [TicketStatusController],
  providers: [TicketStatusService, ProjectService],
  exports: [TicketStatusService],
})
export class TicketStatusModule {}
