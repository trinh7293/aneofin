export const quantityRules = [
  (v: number) => !!v || 'Quantity is required',
  (v: number) => (v && v >= 0 && v < 50000000) ||
      'Quantity must be between 0 and 50000000'
]
