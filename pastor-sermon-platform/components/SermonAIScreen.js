import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export default function SermonAIScreen() {
  const [topic, setTopic] = useState('');
  const [sermonOutline, setSermonOutline] = useState(null);
  const [loading, setLoading] = useState(false);

  const topics = ['Forgiveness', 'Faith in Hard Times', 'God's Love', 'Prayer', 'Grace', 'Salvation'];

  const generateSermon = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSermonOutline(generateSermonContent(topic));
    setLoading(false);
  };

  const generateSermonContent = (topic) => {
    return {
      title: `Finding Hope: The Power of ${topic}`,
      introduction: `Today we explore how ${topic} transforms lives and brings us closer to God's purpose. The scriptures reveal that ${topic.toLowerCase()} is not just a concept but a living reality in our walk with Christ.`,
      points: [
        { letter: 'A', title: 'Understanding God's Promise', scripture: 'Jeremiah 29:11', description: `God's plan for us includes ${topic.toLowerCase()} as a foundation for our spiritual growth.` },
        { letter: 'B', title: 'Walking in Faith', scripture: '2 Corinthians 5:7', description: `We live by faith, not by sight, embracing ${topic.toLowerCase()} in our daily lives.` },
        { letter: 'C', title: 'Living the Truth', scripture: 'John 8:32', description: `The truth of ${topic.toLowerCase()} sets us free to serve others and glorify God.` }
      ],
      conclusion: `As we apply ${topic.toLowerCase()} to our lives, we become beacons of hope. Let us go forth and share this message of transformation with all we meet. Amen.`,
      prayer: `Lord, we thank you for the gift of ${topic.toLowerCase()}. Help us to embody this truth and share your love with others. In Jesus' name, Amen.`
    };
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputSection}>
        <Text style={styles.label}>Sermon Topic</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a sermon topic (e.g., 'Forgiveness', 'Hope')"
          value={topic}
          onChangeText={setTopic}
          multiline
        />
        <TouchableOpacity style={styles.generateButton} onPress={generateSermon}>
          <Text style={styles.buttonText}>✨ Generate Sermon Outline</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Suggested Topics</Text>
      <View style={styles.topicsGrid}>
        {topics.map((t, index) => (
          <TouchableOpacity key={index} style={styles.topicChip} onPress={() => setTopic(t)}>
            <Text style={styles.topicText}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && <ActivityIndicator size="large" color="#7B68EE" style={{ marginTop: 30 }} />}

      {sermonOutline && (
        <View style={styles.outlineContainer}>
          <Text style={styles.sermonTitle}>{sermonOutline.title}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionHeading}>📖 Introduction</Text>
            <Text style={styles.text}>{sermonOutline.introduction}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeading}>📌 Main Points</Text>
            {sermonOutline.points.map((point, idx) => (
              <View key={idx} style={styles.pointCard}>
                <Text style={styles.pointTitle}>{point.letter}. {point.title}</Text>
                <Text style={styles.scripture}>📖 {point.scripture}</Text>
                <Text style={styles.pointDesc}>{point.description}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeading}>🎯 Conclusion</Text>
            <Text style={styles.text}>{sermonOutline.conclusion}</Text>
          </View>

          <View style={styles.prayerCard}>
            <Text style={styles.prayerTitle}>🙏 Closing Prayer</Text>
            <Text style={styles.prayerText}>{sermonOutline.prayer}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 16 },
  inputSection: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 16, fontSize: 16, borderWidth: 1, borderColor: '#e0e0e0', minHeight: 80, textAlignVertical: 'top' },
  generateButton: { backgroundColor: '#7B68EE', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  topicsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  topicChip: { backgroundColor: '#EDE8FF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 25 },
  topicText: { color: '#7B68EE', fontWeight: '500' },
  outlineContainer: { marginTop: 20, marginBottom: 40 },
  sermonTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  section: { marginBottom: 24 },
  sectionHeading: { fontSize: 20, fontWeight: 'bold', color: '#7B68EE', marginBottom: 12 },
  text: { fontSize: 16, lineHeight: 24, color: '#444' },
  pointCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#7B68EE' },
  pointTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 6 },
  scripture: { fontSize: 14, color: '#7B68EE', marginBottom: 8, fontFamily: 'monospace' },
  pointDesc: { fontSize: 14, color: '#666', lineHeight: 20 },
  prayerCard: { backgroundColor: '#EDE8FF', borderRadius: 12, padding: 20, marginTop: 10 },
  prayerTitle: { fontSize: 18, fontWeight: 'bold', color: '#7B68EE', marginBottom: 12 },
  prayerText: { fontSize: 16, fontStyle: 'italic', lineHeight: 24, color: '#444' }
});
