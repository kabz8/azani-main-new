import product1 from "@assets/WhatsApp Image 2025-09-07 at 17.46.13 (1)_1759747471086.jpeg";
import product2 from "@assets/WhatsApp Image 2025-09-06 at 23.36.41 (1)_1759747484277.jpeg";
import product3 from "@assets/WhatsApp Image 2025-09-06 at 17.39.24 (2)_1759747493649.jpeg";
import product4 from "@assets/WhatsApp Image 2025-09-07 at 00.46.40 (1)_1759747514296.jpeg";

export const productImages: Record<string, string> = {
  product1,
  product2,
  product3,
  product4,
};

export function getProductImage(imageId: string): string {
  return productImages[imageId] || "";
}
