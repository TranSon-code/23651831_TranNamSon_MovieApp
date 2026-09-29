import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Khai báo kiểu dữ liệu Movie theo đúng yêu cầu đề bài
export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

// Khai báo kiểu props truyền vào MovieCard
export interface MovieCardProps {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, layout = 'row', onSelect }) => {
  const isTile = layout === 'tile';

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(movie.id)}
      activeOpacity={0.7}
    >
      <View style={[styles.posterWrapper, isTile && styles.posterWrapperTile]}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, isTile && styles.posterTile]}
          resizeMode="cover"
        />
        {/* layout="tile": nhãn ⭐ đè lên góc poster */}
        {isTile && (
          <View style={styles.badgeTile}>
            <Text style={styles.badgeText}>⭐ {movie.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>

      <View style={[styles.info, isTile && styles.infoTile]}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={isTile ? 1 : 2}>
            {movie.title}
          </Text>
          <Text style={styles.status}>{movie.isShowing ? '✅' : '❌'}</Text>
        </View>

        {/* layout="row": hiển thị đầy đủ thể loại và năm */}
        {!isTile && (
          <>
            <Text style={styles.genreYear}>
              {movie.genre} • {movie.year}
            </Text>
            <Text style={styles.rating}>⭐ {movie.rating.toFixed(1)}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardTile: {
    flexDirection: 'column',
    flex: 1,
    padding: 8,
    marginHorizontal: 4,
    alignItems: 'stretch',
  },
  posterWrapper: {
    position: 'relative',
  },
  posterWrapperTile: {
    width: '100%',
  },
  poster: {
    width: 70,
    height: 100,
    borderRadius: 6,
    backgroundColor: '#e1e4e8',
  },
  posterTile: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  badgeTile: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  infoTile: {
    marginLeft: 0,
    marginTop: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 6,
  },
  status: {
    fontSize: 14,
  },
  genreYear: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
    color: '#e67e22',
  },
});

// Bắt buộc bọc React.memo theo barem câu 3d
export default React.memo(MovieCard);