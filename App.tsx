import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const API_URL = 'https://6abb5c13b2118ed7abb856d1.mockapi.io/movies';

interface MovieItem {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

export default function App() {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Câu 2
  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      const msg = 'Không thể kết nối máy chủ';
      if (Platform.OS === 'web') {
        window.alert(msg);
      } else {
        Alert.alert('Lỗi', msg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    // Câu 1a
    <SafeAreaProvider>
      {/* Câu 1b */}
      <SafeAreaView style={styles.container}>
        {/* Câu 1c */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Movie App</Text>
        </View>

        {/* Câu 2b */}
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#007bff" />
          </View>
        ) : (
          /* Câu 2a */
          <FlatList
            data={movies}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSub}>⭐ {Number(item.rating).toFixed(1)}</Text>
                </View>
                <Text style={styles.itemStatus}>{item.isShowing ? '✅' : '❌'}</Text>
              </View>
            )}
            contentContainerStyle={styles.listContent}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 14,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },
  itemSub: {
    fontSize: 13,
    color: '#e67e22',
    marginTop: 4,
    fontWeight: '600',
  },
  itemStatus: {
    fontSize: 16,
  },
});