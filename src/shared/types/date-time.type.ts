export type DateTimeFormatOptions =
  // 📅 Date only
  | 'DD.MM.YYYY'
  | 'DD.MM.YY'
  | 'MM/DD/YYYY'
  | 'MM/DD/YY'
  | 'YYYY-MM-DD'
  | 'YYYY-MM'
  | 'DD Month YYYY'
  | 'Month DD, YYYY'
  | 'weekday, DD Month YYYY'
  | 'week, DD Month YYYY'
  | 'YYYY'

  // ⏰ Time only
  | 'hh:mm'
  | 'hh:mm:ss'
  | 'hh:mm AM/PM'
  | 'hh:mm:ss AM/PM'

  // 📅 + ⏰ Date + Time
  | 'DD.MM.YYYY hh:mm'
  | 'DD.MM.YYYY hh:mm:ss'
  | 'YYYY-MM-DD hh:mm'
  | 'YYYY-MM-DD hh:mm:ss'
  | 'MM/DD/YYYY hh:mm AM/PM'
  | 'Month DD, YYYY hh:mm'

  // 🧑‍💻 Human-friendly
  | 'date month, weekday'
  | 'date month, week'
  | 'weekday, hh:mm'
  | 'week, hh:mm'
  | 'relative';
