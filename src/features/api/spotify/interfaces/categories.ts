export interface ICategories {
  categories: CategoriesClass;
}

interface CategoriesClass {
  href: string;
  items: Item[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

interface Item {
  href: string;
  icons: Icon[];
  id: string;
  name: string;
}

interface Icon {
  height: number | null;
  url: string;
  width: number | null;
}
