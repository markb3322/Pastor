import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { searchBible, getRandomVerse } from './BibleAPI';

export default function BibleStudyScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [randomVerse, setRandomVerse] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    const results = await searchBible(searchQuery);
    setSearchResults(results);
    setLoading(false);
  };

  const handleRandomVerse = async () => {
    const verse = await getRandomVerse();
    setRandomVerse(verse);
  };

  const books = ['Genesis', 'Psalms', 'Proverbs', 'Matthew', 'John', 'Romans', 'Ephesians', 'Philippians'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Bible (e.g., 'love', 'faith', 'John 3:16')"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.randomButton} onPress={handleRandomVerse}>
        <Text style={styles.buttonText}>🎲 Random Verse</Text>
      </TouchableOpacity>

      {randomVerse && (
        <View style={styles.randomVerseCard}>
          <Text style={styles.verseText}>"{randomVerse.text}"</Text>
          <Text style={styles.verseRef}>— {randomVerse.reference}</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Popular Books</Text>
      <View style={styles.booksGrid}>
        {books.map((book, index) => (
          <TouchableOpacity key={index} style={styles.bookChip} onPress={() => setSearchQuery(book)}>
            <Text style={styles.bookText}>{book}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && <ActivityIndicator size="large" color="#4A90E2" style={{ marginTop: 20 }} />}

      {searchResults.length > 0 && (
        <View style={styles.resultsSection}>
          <Text style={styles.resultsTitle}>Search Results</Text>
          {searchResults.map((result, index) => (
            <View key={index} style={styles.resultCard}>
              <Text style={styles.resultReference}>{result.reference}</Text>
              <Text style={styles.resultText}>{result.text}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 16 },
  searchSection: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  searchInput: { flex: 1, backgroundColor: '#fff', borderRadius: 10, padding: 14, fontSize: 16, borderWidth: 1, borderColor: '#e0e0e0' },
  searchButton: { backgroundColor: '#4A90E2', borderRadius: 10, paddingHorizontal: 20, justifyContent: 'center' },
  randomButton: { backgroundColor: '#7B68EE', borderRadius: 10, padding: 14, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  randomVerseCard: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 20, elevation: 2 },
  verseText: { fontSize: 18, fontStyle: 'italic', lineHeight: 26, color: '#333' },
  verseRef: { fontSize: 14, color: '#666', marginTop: 10, textAlign: 'right' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  booksGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  bookChip: { backgroundColor: '#E8F0FE', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  bookText: { color: '#4A90E2', fontWeight: '500' },
  resultsSection: { marginTop: 10 },
  resultsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  resultCard: { backgroundColor: '#fff', borderRadius: 10, padding: 16, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#4A90E2' },
  resultReference: { fontWeight: 'bold', color: '#4A90E2', marginBottom: 8 },
  resultText: { fontSize: 14, color: '#555', lineHeight: 22 }
});
