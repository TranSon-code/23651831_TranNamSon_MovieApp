import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Switch,
  Alert,
  RefreshControl,
  SafeAreaView,
  Platform,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MovieCard, { Movie } from './components/MovieCard';

const API_URL = 'https://6abb5c13b2118ed7abb856d1.mockapi.io/movies';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isTile, setIsTile] = useState<boolean>(false);

  // Câu 2
  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      const msg = 'Không thể kết nối đến máy chủ lấy dữ liệu';
      if (Platform.OS === 'web') {
        window.alert(`[Lỗi]: ${msg}`);
      } else {
        Alert.alert('Lỗi', msg);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Câu 6
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMovies();
  }, []);

  // Câu 3c
  const handleSelectMovie = useCallback(
    (id: string) => {
      const selected = movies.find((item) => String(item.id) === String(id));
      if (selected) {
        const message = `Bạn chọn phim: ${selected.title}`;
        if (Platform.OS === 'web') {
          window.alert(message);
        } else {
          Alert.alert('Thông tin', message);
        }
      }
    },
    [movies]
  );

  const numColumns = isTile ? 2 : 1;

  return (
    // Câu 1a
    <SafeAreaProvider>
      {/* Câu 1b */}
      <SafeAreaView style={styles.container}>
        {/* Câu 1c & Câu 5a */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Movie App</Text>
          <View style={styles.switchWrapper}>
            <Text style={styles.switchLabel}>Dạng lưới</Text>
            {/* Câu 5a */}
            <Switch
              value={isTile}
              onValueChange={(val) => setIsTile(val)}
            />
          </View>
        </View>

        {/* Câu 2b */}
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#007bff" />
          </View>
        ) : (
          /* Câu 2a & Câu 5b, 5c, 5d */
          <FlatList
            key={String(numColumns)} // Câu 5c
            data={movies}
            numColumns={numColumns} // Câu 5b
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              // Câu 3 & Câu 4
              <MovieCard
                movie={item}
                layout={isTile ? 'tile' : 'row'} // Câu 5b
                onSelect={handleSelectMovie} // Câu 3c
              />
            )}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={isTile ? styles.columnWrapper : undefined} // Câu 5d
            refreshControl={
              // Câu 6a
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 14,
    marginRight: 6,
    color: '#555555',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});