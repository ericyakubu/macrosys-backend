export class ProductBaseDto {
  id: string;
  name: string;
  barcode: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  macros: MacrosDto;
  photo: string;
}

export class MacrosDto {
  id: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  protein: number;
  fiber: number;
  sugar: number;
}
