
import { GoogleGenAI } from "@google/genai";
import { fetchProducts } from "./productService";
import { Product } from "../types";

interface AIResponse {
  text: string;
  productIds: number[];
}

export const getSmartAgentResponse = async (userMessage: string): Promise<{ text: string; products: Product[] }> => {
  try {
    // Initialize inside to avoid process access at module level which can crash the app on load
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
    const ai = new GoogleGenAI({ apiKey });

    // 1. Fetch current product catalog
    const allProducts = await fetchProducts();
    
    // 2. Create context
    const productsContext = allProducts.map(p => 
      `ID:${p.id} | ${p.name} | ${p.price}₪ | ${p.category} | ${p.description}`
    ).join('\n');

    // 3. Define structured system instruction
    const systemInstruction = `
      את "StyleMatch AI", סטייליסטית אישית באתר אופנה.
      
      המטרה: לעזור למשתמשים, להמליץ על מוצרים ולענות קצר ולעניין.
      
      קטלוג מוצרים זמין (השתמשי רק ב-IDs מכאן):
      ${productsContext}
      
      הוראות חשובות לתשובה:
      1. את **חייבת** להחזיר תשובה בפורמט JSON בלבד.
      2. המבנה חייב להיות: { "text": "התשובה המילולית שלך", "productIds": [101, 102] }
      3. אם אין מוצרים להמליץ עליהם, השאירי את המערך ריק: "productIds": []
      4. התשובה המילולית ("text") צריכה להיות בעברית, נחמדה, עם אימוג'יז, וקצרה.
      5. אל תוסיפי סימני Markdown (כגון \`\`\`json). רק את ה-JSON הנקי.
    `;

    // 4. Generate content
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.4, // Lower temperature for more consistent JSON
        responseMimeType: "application/json", // Force JSON mode
      },
    });

    const rawText = response.text || "{}";
    
    // 5. Parse JSON and map IDs to real products
    let parsed: AIResponse;
    try {
      parsed = JSON.parse(rawText);
    } catch (e) {
      console.error("JSON Parse Error", e);
      return { text: rawText, products: [] }; // Fallback if JSON fails
    }

    const recommendedProducts = allProducts.filter(p => parsed.productIds?.includes(p.id));

    return {
      text: parsed.text || "מצטערת, לא הצלחתי להבין בדיוק. תוכל לנסות שוב?",
      products: recommendedProducts
    };

  } catch (error) {
    console.error("AI Error:", error);
    return { 
      text: "יש לי כרגע בעיה בתקשורת עם השרת. נסה שוב מאוחר יותר 😓", 
      products: [] 
    };
  }
};
