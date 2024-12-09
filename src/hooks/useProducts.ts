import { useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  isFavorite: boolean;
};

const getToken = async () => {
  const token = await AsyncStorage.getItem('@token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return token;
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

const fetchFavorites = async (): Promise<string[]> => {
  const token = await getToken();
  const response = await fetch(`${ApiURL}/api/favorites`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch favorites');
  }
  const favorites = await response.json();
  return favorites.map((fav: ProductInfo) => fav.id);
};

const calculateLowestPrice = (listings: Listing[]): number | null => {
  if (listings.length === 0) return null;
  return Math.min(...listings.map(listing => listing.price));
};

export const useProducts = () => {
  return useQuery<ProductInfo[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const [products, favorites] = await Promise.all([fetchProducts(), fetchFavorites()]);
      const productsWithListings = await Promise.all(
        products.map(async (product) => {
          const listings = await fetchProductListings(product.id);
          const lowestPrice = calculateLowestPrice(listings);
          return { 
            ...product, 
            listings, 
            lowestPrice, 
            isFavorite: favorites.includes(product.id)
          };
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
      const [product, listings, favorites] = await Promise.all([
        fetch(`${ApiURL}/api/products/${productId}`).then(res => res.json()),
        fetchProductListings(productId),
        fetchFavorites(),
      ]);
      const lowestPrice = calculateLowestPrice(listings);
      return { 
        ...product, 
        listings, 
        lowestPrice, 
        isFavorite: favorites.includes(productId)
      };
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
      const [allProducts, favorites] = await Promise.all([fetchProducts(), fetchFavorites()]);
      const filteredProducts = allProducts.filter(product => product.categoryId === categoryId);
      const productsWithListings = await Promise.all(
        filteredProducts.map(async (product) => {
          const listings = await fetchProductListings(product.id);
          const lowestPrice = calculateLowestPrice(listings);
          return { 
            ...product, 
            listings, 
            lowestPrice, 
            isFavorite: favorites.includes(product.id)
          };
        })
      );
      return productsWithListings;
    },
  });
};

