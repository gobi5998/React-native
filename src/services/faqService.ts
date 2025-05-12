import { FAQItem } from '../types/types';

const API_URL = 'https://ea72-103-186-120-4.ngrok-free.app/api';

export const fetchFAQs = async (): Promise<FAQItem[]> => {
  try {
    const response = await fetch(`${API_URL}/faqs`);
    if (!response.ok) {
      throw new Error('Failed to fetch FAQs');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }
}; 