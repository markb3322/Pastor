import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { getVerseOfTheDay, getRandomVerse } from './BibleAPI';

export default function HomeScreen({ navigation }) {
  const [verse, setVerse] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    loadVerse();
    setGreeting(getGreeting());
  }, []);

  const loadVerse = async () => {
    const verseData = await getVerseOfTheDay();
    setVerse(verseData);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const tools = [
    { title: 'Bible Study', icon: '📖', color: '#4A90E2', screen: 'Bible Study' },
    { title: 'Sermon AI', icon: '🤖', color: '#7B68EE', screen: 'Sermon AI' },
    { title: 'Prayer Guide', icon: '🙏', color: '#50C878', screen: 'Bible Study' },
    { title: 'Devotional', icon: '💭', color: '#FF6B6B', screen: 'Bible Study' }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{greeting}, Pastor!</Text>
        <Text style={styles.subtitle}>Welcome to your sermon platform</Text>
      </View>

      {verse && (
        <View style={styles.verseCard}>
          <Text style={styles.verseTitle}>Verse of the Day</Text>
          <Text style={styles.verseText}>"{verse.verse}"</Text>
          <Text style={styles.verseRef}>— {verse.reference}</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Ministry Tools</Text>
      <View style={styles.toolsGrid}>
        {tools.map((tool, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.toolCard, { backgroundColor: tool.color + '15' }]}
            onPress={() => navigation.navigate(tool.screen)}
          >
            <Text style={styles.toolIcon}>{tool.icon}</Text>
            <Text style={styles.toolTitle}>{tool.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.resourceCard}>
        <Text style={styles.resourceTitle}>📌 Quick Sermon Ideas</Text>
        <Text style={styles.resourceText}>• The Power of Forgiveness</Text>
        <Text style={styles.resourceText}>• Walking by Faith, Not by Sight</Text>
        <Text style={styles.resourceText}>• Love in Action: 1 Corinthians 13</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: { padding: 24, paddingTop: 40, backgroundColor: '#4A90E2' },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 16, color: '#fff', opacity: 0.9, marginTop: 5 },
  verseCard: { margin: 20, padding: 20, backgroundColor: '#fff', borderRadius: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 },
  verseTitle: { fontSize: 14, color: '#4A90E2', fontWeight: '600', textTransform: 'uppercase' },
  verseText: { fontSize: 18, fontStyle: 'italic', marginTop: 10, lineHeight: 26, color: '#333' },
  verseRef: { fontSize: 14, color: '#666', marginTop: 10, textAlign: 'right' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginHorizontal: 20, marginTop: 10, marginBottom: 15, color: '#333' },
  toolsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15 },
  toolCard: { width: '45%', margin: '2.5%', padding: 20, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0' },
  toolIcon: { fontSize: 40 },
  toolTitle: { fontSize: 16, fontWeight: '600', marginTop: 10, color: '#333' },
  resourceCard: { margin: 20, padding: 20, backgroundColor: '#E8F5E9', borderRadius: 12 },
  resourceTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#2E7D32' },
  resourceText: { fontSize: 14, color: '#555', marginVertical: 5 }
});
