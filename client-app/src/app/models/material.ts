export interface Material {
    id: string
    name: string
    price: number
    description: string
    date: Date | null
    quantity?: number | null;
    weight?: number | null;
    quantityRequired?: number | null;
    weightRequired?: number | null;
    country: string
    factory: string
  }