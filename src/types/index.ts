export type Property = {
  id: string;
  title: string;
  location: string;
  price: string;
  imageUrl: any; // Using 'any' for image source
  tags: string[];
  isFavorite: boolean;
  developer?: string;
  status?: string;
};