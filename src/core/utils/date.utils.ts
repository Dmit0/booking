import * as moment from 'moment';
import { DateRangeDto } from '../dto';

export const countRangeDates = (dateRange: DateRangeDto): number => {
  const start = moment(dateRange.from)
  const end = moment(dateRange.to)
  return Math.abs(start.diff(end, 'days'))
}