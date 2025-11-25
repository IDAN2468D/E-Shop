
import { Product } from '../types';

const API_BASE_URL = 'http://localhost:3000/api'; 

export const CATEGORIES = [
  { id: 'all', label: 'הכל', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=150&q=80' },
  { id: 'ביגוד', label: 'ביגוד', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=150&q=80' },
  { id: 'הנעלה', label: 'הנעלה', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=150&q=80' },
  { id: 'אקססוריז', label: 'אקססוריז', image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&w=150&q=80' },
  { id: 'אלקטרוניקה', label: 'אלקטרוניקה', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&w=150&q=80' },
  { id: 'עיצוב לבית', label: 'עיצוב לבית', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=150&q=80' },
];

// Fallback data in case the server is not running
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 101,
    name: "מעיל חורף אלגנטי",
    price: 249.90,
    oldPrice: 350.00,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    description: "מעיל צמר איכותי, מושלם לימים קרים. גזרה מחמיאה ונוחה.",
    category: "ביגוד",
    rating: 4.8,
    reviews: 120
  },
  {
    id: 102,
    name: "סריג אקרילי ורוד",
    price: 129.90,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    description: "סריג נעים ורך למגע בצבע ורוד עתיק. מתאים ליום יום ולערב.",
    category: "ביגוד",
    rating: 4.5,
    reviews: 85
  },
  {
    id: 103,
    name: "ג'קט ג'ינס קלאסי",
    price: 189.90,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
    description: "ג'קט ג'ינס על-זמני בגזרה ישרה. פריט חובה בכל ארון.",
    category: "ביגוד",
    rating: 4.7,
    reviews: 230
  },
  {
    id: 105,
    name: "חליפת עסקים בז'",
    price: 499.00,
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80",
    description: "חליפת שני חלקים אלגנטית ומקצועית בגוון בז'.",
    category: "ביגוד",
    rating: 4.6,
    reviews: 42
  },
  {
    id: 106,
    name: "צעיף קשמיר רך",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80",
    description: "צעיף רך ומחמם, תוספת מושלמת לכל הופעה.",
    category: "אקססוריז",
    rating: 4.4,
    reviews: 15
  },
  {
    id: 201,
    name: "אוזניות אלחוטיות Pro",
    price: 899.00,
    oldPrice: 1100.00,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "אוזניות Over-ear עם ביטול רעשים אקטיבי וסאונד עשיר.",
    category: "אלקטרוניקה",
    rating: 4.9,
    reviews: 340
  },
  {
    id: 302,
    name: "עציץ סוקולנט קרמיקה",
    price: 69.90,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
    description: "עציץ מלאכותי ריאליסטי בכלי קרמיקה לבן.",
    category: "עיצוב לבית",
    rating: 4.9,
    reviews: 210
  }
];

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Server error');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Failed to fetch from server (it might be offline). Using fallback data.", error);
    // Mimic network delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(FALLBACK_PRODUCTS), 600);
    });
  }
};
