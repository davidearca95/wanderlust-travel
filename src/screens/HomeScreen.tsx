import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity,
  Image, StyleSheet, Dimensions, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, AppContext } from '../../App';
import { destinations } from '../data/destinations';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { FeaturedCard } from '../components/FeaturedCard';

const { width } = Dimensions.get('window');
const TILE_WIDTH = (width - SPACING.lg * 3) / 2;

type Props = { navigate: (s: Screen) => void; ctx: AppContext };

export const HomeScreen: React.FC<Props> = ({ navigate, ctx }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterContinent, setFilterContinent] = useState<string | null>(null);
  const [filterBudget, setFilterBudget] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  const CONTINENTS = [
    { id: 'europe', label: '🌍 Europa' },
    { id: 'asia', label: '🌏 Asia' },
    { id: 'americas', label: '🌎 Americhe' },
    { id: 'africa', label: '🌍 Africa/M.O.' },
    { id: 'islands', label: '🏝️ Isole' },
  ];

  const BUDGETS = [
    { id: 'low', label: '💸 Budget', max: 80 },
    { id: 'mid', label: '💰 Medio', max: 150 },
    { id: 'high', label: '💎 Alto', max: 999 },
  ];

  const TYPES = [
    { id: 'beach', label: '🏖️ Mare' },
    { id: 'culture', label: '🏛️ Cultura' },
    { id: 'nature', label: '🌿 Natura' },
    { id: 'adventure', label: '⛰️ Avventura' },
    { id: 'food', label: '🍜 Cibo' },
    { id: 'city', label: '🏙️ Città' },
  ];

  const continentMap: Record<string, string[]> = {
    europe: ['london', 'paris', 'barcelona', 'amsterdam', 'prague', 'lisbon', 'santorini', 'vienna', 'dubrovnik'],
    asia: ['tokyo', 'bali', 'bangkok'],
    americas: ['newyork', 'mexico', 'peru'],
    africa: ['marrakech', 'capetown', 'jordan', 'dubai', 'zanzibar', 'tanzania'],
    islands: ['iceland', 'maldives', 'santorini', 'bali', 'zanzibar'],
  };

  const typeMap: Record<string, string[]> = {
    beach: ['bali', 'santorini', 'maldives', 'zanzibar', 'dubrovnik', 'capetown'],
    culture: ['tokyo', 'paris', 'london', 'vienna', 'prague', 'marrakech', 'jordan', 'peru'],
    nature: ['iceland', 'tanzania', 'peru', 'capetown', 'bali'],
    adventure: ['iceland', 'tanzania', 'jordan', 'peru', 'zanzibar'],
    food: ['tokyo', 'paris', 'barcelona', 'bangkok', 'marrakech', 'mexico'],
    city: ['newyork', 'london', 'paris', 'tokyo', 'barcelona', 'amsterdam', 'dubai'],
  };

  const filteredDestinations = useMemo(() => {
    let list = destinations;
    if (showFavoritesOnly) {
      list = list.filter((d) => ctx.isFavorite(d.id));
    }
    if (filterContinent) {
      const ids = continentMap[filterContinent] || [];
      list = list.filter((d) => ids.includes(d.id));
    }
    if (filterBudget) {
      const budgetDef = BUDGETS.find((b) => b.id === filterBudget);
      if (budgetDef) {
        list = list.filter((d) => {
          const match = d.budgetPerDay.match(/€(\d+)/);
          const minBudget = match ? parseInt(match[1]) : 100;
          if (filterBudget === 'low') return minBudget <= 60;
          if (filterBudget === 'mid') return minBudget > 60 && minBudget <= 120;
          return minBudget > 120;
        });
      }
    }
    if (filterType) {
      const ids = typeMap[filterType] || [];
      list = list.filter((d) => ids.includes(d.id));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) => d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.tagline.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchQuery, showFavoritesOnly, ctx.favorites, filterContinent, filterBudget, filterType]);

  const handleSurprise = () => {
    const pool = destinations.filter((d) => d.itinerary.length >= 2);
    const random = pool[Math.floor(Math.random() * pool.length)];
    navigate({ name: 'Destination', destinationId: random.id });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Ciao, Davide! ✈️</Text>
          <Text style={styles.title}>Dove vuoi andare?</Text>
        </View>

        {/* Search Bar */}
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

        {/* Action Buttons Row */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, showFavoritesOnly && styles.actionBtnActive]}
            onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            <Ionicons name={showFavoritesOnly ? 'heart' : 'heart-outline'} size={18}
              color={showFavoritesOnly ? '#FFF' : COLORS.primary} />
            <Text style={[styles.actionBtnText, showFavoritesOnly && styles.actionBtnTextActive]}>
              Preferiti {ctx.favorites.length > 0 ? `(${ctx.favorites.length})` : ''}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, showFilters && styles.actionBtnActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="options-outline" size={18}
              color={showFilters ? '#FFF' : COLORS.primary} />
            <Text style={[styles.actionBtnText, showFilters && styles.actionBtnTextActive]}>
              Filtri {(filterContinent || filterBudget || filterType) ? '•' : ''}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.surpriseBtn} onPress={handleSurprise}>
            <Text style={styles.surpriseBtnEmoji}>🎲</Text>
            <Text style={styles.surpriseBtnText}>Sorprendimi!</Text>
          </TouchableOpacity>
        </View>

        {/* Collapsible Filters */}
        {showFilters && (
          <View style={styles.filtersContainer}>
            <Text style={styles.filterLabel}>🌍 Continente</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {CONTINENTS.map((c) => (
                <TouchableOpacity key={c.id}
                  style={[styles.filterChip, filterContinent === c.id && styles.filterChipActive]}
                  onPress={() => setFilterContinent(filterContinent === c.id ? null : c.id)}>
                  <Text style={[styles.filterChipText, filterContinent === c.id && styles.filterChipTextActive]}>{c.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.filterLabel}>💰 Budget</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {BUDGETS.map((b) => (
                <TouchableOpacity key={b.id}
                  style={[styles.filterChip, filterBudget === b.id && styles.filterChipActive]}
                  onPress={() => setFilterBudget(filterBudget === b.id ? null : b.id)}>
                  <Text style={[styles.filterChipText, filterBudget === b.id && styles.filterChipTextActive]}>{b.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.filterLabel}>✨ Tipo di viaggio</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {TYPES.map((t) => (
                <TouchableOpacity key={t.id}
                  style={[styles.filterChip, filterType === t.id && styles.filterChipActive]}
                  onPress={() => setFilterType(filterType === t.id ? null : t.id)}>
                  <Text style={[styles.filterChipText, filterType === t.id && styles.filterChipTextActive]}>{t.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {(filterContinent || filterBudget || filterType) && (
              <TouchableOpacity style={styles.clearFiltersBtn}
                onPress={() => { setFilterContinent(null); setFilterBudget(null); setFilterType(null); }}>
                <Text style={styles.clearFiltersBtnText}>✕ Rimuovi filtri</Text>
              </TouchableOpacity>
            )}
          </View>
        )}


        {/* Featured */}
        {!searchQuery && !showFavoritesOnly && (
          <View style={styles.featuredContainer}>
            <FeaturedCard
              destination={destinations[0]}
              onPress={() => navigate({ name: 'Destination', destinationId: destinations[0].id })}
            />
          </View>
        )}

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {showFavoritesOnly ? '❤️ I tuoi preferiti' : searchQuery ? '🔍 Risultati' : '🌍 Tutte le destinazioni'}
          </Text>
          <Text style={styles.sectionCount}>{filteredDestinations.length} mete</Text>
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          {filteredDestinations.map((dest) => (
            <TouchableOpacity
              key={dest.id} style={styles.tile} activeOpacity={0.85}
              onPress={() => navigate({ name: 'Destination', destinationId: dest.id })}
            >
              <Image source={{ uri: dest.image }} style={styles.tileImage} />
              <View style={styles.tileOverlay} />
              <View style={styles.tileContent}>
                <Text style={styles.tileEmoji}>{dest.emoji}</Text>
                <Text style={styles.tileName}>{dest.name}</Text>
                <Text style={styles.tileCountry}>{dest.country}</Text>
              </View>
              {ctx.isFavorite(dest.id) && (
                <View style={styles.tileFav}>
                  <Ionicons name="heart" size={14} color="#FF4444" />
                </View>
              )}
              <View style={styles.tileBadge}>
                <Text style={styles.tileBadgeText}>{dest.budgetPerDay.split('/')[0]}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredDestinations.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>{showFavoritesOnly ? '💔' : '🔍'}</Text>
            <Text style={styles.emptyText}>
              {showFavoritesOnly ? 'Nessun preferito ancora' : 'Nessuna destinazione trovata'}
            </Text>
            <Text style={styles.emptySubtext}>
              {showFavoritesOnly ? 'Tocca il ❤️ su una destinazione per salvarla' : 'Prova con un altro termine'}
            </Text>
          </View>
        )}

        {/* Easter Egg */}
        <TouchableOpacity style={styles.easterEgg} activeOpacity={0.6}>
          <Text style={styles.easterEggText}>App by Arca</Text>
        </TouchableOpacity>

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
    marginHorizontal: SPACING.lg, marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm + 4,
    borderRadius: BORDER_RADIUS.lg, borderWidth: 1, borderColor: COLORS.surfaceLight,
  },
  searchInput: { flex: 1, marginLeft: SPACING.sm, fontSize: 16, color: COLORS.text },
  actionsRow: {
    flexDirection: 'row', paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg, gap: SPACING.sm,
  },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.round, backgroundColor: COLORS.surface,
    borderWidth: 1, borderColor: COLORS.surfaceLight,
  },
  actionBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  actionBtnText: { fontSize: 13, fontWeight: '600', color: COLORS.primary },
  actionBtnTextActive: { color: '#FFF' },
  surpriseBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.round, backgroundColor: COLORS.accent,
  },
  surpriseBtnEmoji: { fontSize: 16 },
  surpriseBtnText: { fontSize: 13, fontWeight: '700', color: COLORS.background },
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
  tileFav: {
    position: 'absolute', top: SPACING.sm, left: SPACING.sm,
    backgroundColor: 'rgba(0,0,0,0.5)', width: 26, height: 26,
    borderRadius: 13, alignItems: 'center', justifyContent: 'center',
  },
  tileBadge: {
    position: 'absolute', top: SPACING.sm, right: SPACING.sm,
    backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.sm,
  },
  tileBadgeText: { fontSize: 11, color: COLORS.accent, fontWeight: '600' },
  emptyState: { alignItems: 'center', paddingVertical: SPACING.xxl * 2 },
  emptyEmoji: { fontSize: 48, marginBottom: SPACING.md },
  emptyText: { fontSize: 18, fontWeight: '600', color: COLORS.text },
  emptySubtext: { fontSize: 14, color: COLORS.textSecondary, marginTop: SPACING.xs, textAlign: 'center', paddingHorizontal: SPACING.xl },
  easterEgg: { alignItems: 'center', paddingVertical: SPACING.xl, marginTop: SPACING.lg },
  easterEggText: { fontSize: 11, color: COLORS.textMuted, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.5 },
  // Filters
  filtersContainer: {
    marginHorizontal: SPACING.lg, marginBottom: SPACING.lg,
    backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md, borderWidth: 1, borderColor: COLORS.surfaceLight,
  },
  filterLabel: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary, marginBottom: SPACING.xs, marginTop: SPACING.sm },
  filterScroll: { marginBottom: SPACING.xs },
  filterChip: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round, backgroundColor: COLORS.surfaceLight,
    marginRight: SPACING.sm, borderWidth: 1, borderColor: 'transparent',
  },
  filterChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterChipText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  filterChipTextActive: { color: '#FFF' },
  clearFiltersBtn: { alignSelf: 'center', marginTop: SPACING.md, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.lg },
  clearFiltersBtnText: { fontSize: 13, color: COLORS.textMuted, fontWeight: '500' },
});
