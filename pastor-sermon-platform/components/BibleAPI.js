import axios from 'axios';

const API_BIBLE_ID = 'de4e12af7f28f599-02'; // Free Bible API version

export const searchBible = async (query) => {
  try {
    const response = await axios.get(
      `https://api.scripture.api.bible/v1/bibles/${API_BIBLE_ID}/search?query=${encodeURIComponent(query)}`,
      { headers: { 'api-key': 'YOUR_API_KEY_HERE' } }
    );
    return response.data.data;
  } catch (error) {
    console.error('Bible API Error:', error);
    return fallbackSearch(query);
  }
};

export const getVerseOfTheDay = async () => {
  try {
    const response = await axios.get(
      `https://beta.ourmanna.com/api/v1/get?format=json`,
      { timeout: 5000 }
    );
    return {
      verse: response.data.verse.details.text,
      reference: response.data.verse.details.reference
    };
  } catch (error) {
    return {
      verse: "For God so loved the world that he gave his one and only Son",
      reference: "John 3:16"
    };
  }
};

export const getRandomVerse = async () => {
  const verses = [
    { text: "The Lord is my shepherd; I shall not want.", reference: "Psalm 23:1" },
    { text: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13" },
    { text: "Faith is the assurance of things hoped for, the conviction of things not seen.", reference: "Hebrews 11:1" }
  ];
  return verses[Math.floor(Math.random() * verses.length)];
};

const fallbackSearch = (query) => {
  const results = [
    { text: `"${query}" - Trust in the Lord with all your heart`, reference: "Proverbs 3:5-6" },
    { text: `"${query}" - For nothing will be impossible with God`, reference: "Luke 1:37" }
  ];
  return results;
};
