export type ProductContentAttribute = {
  name: string;
  value: string;
};

export type ProductPageContent = {
  description: string;
  attributes: ProductContentAttribute[];
  care: string;
};
