import { Exclude } from 'class-transformer';
export class TicketStatusQueryWhereDto {
  projectTitle?: string;

  date?: string;

  status?: string;

  @Exclude()
  _end?: string;

  @Exclude()
  _sort?: string;

  @Exclude()
  _order?: string;

  @Exclude()
  _start?: string;
}

class TicketStatusUpdateItemDto {
  date?: string;

  status?: string;
}

export class TicketStatusUpdateDto {
  projectTitle?: string;
  items: TicketStatusUpdateItemDto[];
}
