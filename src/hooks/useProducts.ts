import { useQuery, useQueryClient } from '@tanstack/react-query';

const ApiURL = process.env.EXPO_PUBLIC_API_BACKEND_URL;

type Product = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

type Listing = {
  stock: number;
  price: number;
  sellerName: string;
};

export type ProductInfo = Product & {
  listings: Listing[];
  lowestPrice: number | null;
};

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${ApiURL}/api/products`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchProductListings = async (productId: string): Promise<Listing[]> => {
  const response = await fetch(`${ApiURL}/api/products/${productId}/listings`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const listings = await response.json();
  return listings.map(({ stock, price, sellerName }: any) => ({ stock, price, sellerName }));
};

const calculateLowestPrice = (listings: Listing[]): number | null => {
  if (listings.length === 0) return null;
  return Math.min(...listings.map(listing => listing.price));
};

export const useProducts = () => {
  return useQuery<ProductInfo[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const products = await fetchProducts();
      const productsWithListings = await Promise.all(
        products.map(async (product) => {
          const listings = await fetchProductListings(product.id);
          const lowestPrice = calculateLowestPrice(listings);
          return { ...product, listings, lowestPrice };
        })
      );
      return productsWithListings;
    },
  });
};

export const useProduct = (productId: string) => {
  const queryClient = useQueryClient();

  return useQuery<ProductInfo, Error>({
    queryKey: ['product', productId],
    queryFn: async () => {
      const product = await fetch(`${ApiURL}/api/products/${productId}`).then(res => res.json());
      const listings = await fetchProductListings(productId);
      const lowestPrice = calculateLowestPrice(listings);
      return { ...product, listings, lowestPrice };
    },
    initialData: () => {
      const products = queryClient.getQueryData<ProductInfo[]>(['products']);
      return products?.find(p => p.id === productId);
    },
  });
};

export const useProductsByCategory = (categoryId: string) => {
  const queryClient = useQueryClient();

  return useQuery<ProductInfo[], Error>({
    queryKey: ['products', 'category', categoryId],
    queryFn: async () => {
      const products = queryClient.getQueryData<ProductInfo[]>(['products']);
      if (products) {
        return products.filter(product => product.categoryId === categoryId);
      }
      const allProducts = await fetchProducts();
      const filteredProducts = allProducts.filter(product => product.categoryId === categoryId);
      const productsWithListings = await Promise.all(
        filteredProducts.map(async (product) => {
          const listings = await fetchProductListings(product.id);
          const lowestPrice = calculateLowestPrice(listings);
          return { ...product, listings, lowestPrice };
        })
      );
      return productsWithListings;
    },
  });
};

