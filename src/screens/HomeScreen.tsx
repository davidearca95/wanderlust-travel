import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../App';
import { destinations } from '../data/destinations';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { FeaturedCard } from '../components/FeaturedCard';

const { width } = Dimensions.get('window');
const TILE_WIDTH = (width - SPACING.lg * 3) / 2;

type Props = {
  navigate: (s: Screen) => void;
};

export const HomeScreen: React.FC<Props> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = useMemo(() => {
    if (!searchQuery.trim()) return destinations;
    const q = searchQuery.toLowerCase();
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Ciao, viaggiatore! ✈️</Text>
          <Text style={styles.title}>Dove vuoi andare?</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cerca una destinazione..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {!searchQuery && (
          <View style={styles.featuredContainer}>
            <FeaturedCard
              destination={destinations[0]}
              onPress={() => navigate({ name: 'Destination', destinationId: destinations[0].id })}
            />
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? '🔍 Risultati' : '🌍 Tutte le destinazioni'}
          </Text>
          <Text style={styles.sectionCount}>{filteredDestinations.length} mete</Text>
        </View>

        <View style={styles.grid}>
          {filteredDestinations.map((dest) => (
            <TouchableOpacity
              key={dest.id}
              style={styles.tile}
              activeOpacity={0.85}
              onPress={() => navigate({ name: 'Destination', destinationId: dest.id })}
            >
              <Image source={{ uri: dest.image }} style={styles.tileImage} />
              <View style={styles.tileOverlay} />
              <View style={styles.tileContent}>
                <Text style={styles.tileEmoji}>{dest.emoji}</Text>
                <Text style={styles.tileName}>{dest.name}</Text>
                <Text style={styles.tileCountry}>{dest.country}</Text>
              </View>
              <View style={styles.tileBadge}>
                <Text style={styles.tileBadgeText}>{dest.budgetPerDay.split('/')[0]}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredDestinations.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>Nessuna destinazione trovata</Text>
            <Text style={styles.emptySubtext}>Prova con un altro termine</Text>
          </View>
        )}

        <View style={{ height: SPACING.xxl }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 60, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.md },
  greeting: { fontSize: 16, color: COLORS.textSecondary, marginBottom: SPACING.xs },
  title: { fontSize: 32, fontWeight: '800', color: COLORS.text },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg, marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm + 4,
    borderRadius: BORDER_RADIUS.lg, borderWidth: 1, borderColor: COLORS.surfaceLight,
  },
  searchInput: { flex: 1, marginLeft: SPACING.sm, fontSize: 16, color: COLORS.text },
  featuredContainer: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.sm },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.lg, marginBottom: SPACING.md,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  sectionCount: { fontSize: 13, color: COLORS.textMuted },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SPACING.lg, gap: SPACING.md },
  tile: {
    width: TILE_WIDTH, height: TILE_WIDTH * 1.4,
    borderRadius: BORDER_RADIUS.lg, overflow: 'hidden', position: 'relative',
  },
  tileImage: { width: '100%', height: '100%', position: 'absolute' },
  tileOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)' },
  tileContent: { position: 'absolute', bottom: SPACING.md, left: SPACING.md, right: SPACING.md },
  tileEmoji: { fontSize: 24, marginBottom: SPACING.xs },
  tileName: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  tileCountry: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  tileBadge: {
    position: 'absolute', top: SPACING.sm, right: SPACING.sm,
    backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.sm,
  },
  tileBadgeText: { fontSize: 11, color: COLORS.accent, fontWeight: '600' },
  emptyState: { alignItems: 'center', paddingVertical: SPACING.xxl * 2 },
  emptyEmoji: { fontSize: 48, marginBottom: SPACING.md },
  emptyText: { fontSize: 18, fontWeight: '600', color: COLORS.text },
  emptySubtext: { fontSize: 14, color: COLORS.textSecondary, marginTop: SPACING.xs },
});
