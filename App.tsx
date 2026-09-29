import React, { useState, useEffect, useCallback } from 'react';
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
import MovieCard, { Movie } from './components/MovieCard';

const API_URL = 'https://6abb5c13b2118ed7abb856d1.mockapi.io/movies';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
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

  // Câu 3c
  const handleSelectMovie = useCallback(
    (id: string) => {
      const selected = movies.find((item) => String(item.id) === String(id));
      if (selected) {
        const msg = `Bạn chọn phim: ${selected.title}`;
        if (Platform.OS === 'web') {
          window.alert(msg);
        } else {
          Alert.alert('Thông tin', msg);
        }
      }
    },
    [movies]
  );

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
              // Câu 3 & Câu 4a
              <MovieCard
                movie={item}
                layout="row"
                onSelect={handleSelectMovie}
              />
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
});