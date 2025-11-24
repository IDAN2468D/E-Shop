
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
  recommendedProducts?: Product[]; // Array of full product objects
}

interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
}

const initialState: ChatState = {
  isOpen: false,
  messages: [
    {
      id: 'welcome',
      text: 'היי! אני הסטייליסטית האישית שלך ✨\nאני יכולה להמליץ לך על לוקים, למצוא מתנות או סתם לעזור לך לבחור. במה נתחיל?',
      sender: 'bot',
      timestamp: Date.now(),
    },
  ],
  isTyping: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    addMessage: (state, action: PayloadAction<Omit<ChatMessage, 'id' | 'timestamp'>>) => {
      state.messages.push({
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      });
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    clearChat: (state) => {
      state.messages = [initialState.messages[0]];
    }
  },
});

export const { toggleChat, addMessage, setTyping, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
