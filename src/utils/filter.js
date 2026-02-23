import {FilterType} from '../const.js';
import {isDateFuture, isDatePast, isDatePresent} from './functions.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,

  [FilterType.FUTURE]: (points) => points.filter((point) =>
    point.startDate && isDateFuture(point.startDate)
  ),

  [FilterType.PRESENT]: (points) => points.filter((point) =>
    point.startDate && point.endDate && isDatePresent(point.startDate, point.endDate)
  ),

  [FilterType.PAST]: (points) => points.filter((point) =>
    point.endDate && isDatePast(point.endDate)
  )
};
