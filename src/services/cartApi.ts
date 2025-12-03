import { CartItem } from '@/contexts/CartContext';

// Configure your backend API URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend.com/api';

export const cartApi = {
  async getCart(userId: number): Promise<CartItem[]> {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    
    return response.json();
  },

  async addToCart(userId: number, productId: string, quantity: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ userId, productId, quantity }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }
  },

  async updateQuantity(userId: number, productId: string, quantity: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ userId, productId, quantity }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update quantity');
    }
  },

  async removeFromCart(userId: number, productId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove from cart');
    }
  },

  async clearCart(userId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Failed to clear cart');
    }
  },
};

export interface CreateOrderData {
  userId: number;
  shippingAddress: string;
  phone: string;
  email: string;
  notes?: string;
}

export const orderApi = {
  async createOrder(data: CreateOrderData): Promise<{ orderId: number }> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return response.json();
  },

  async getOrders(userId: number): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/orders/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    
    return response.json();
  },
};
