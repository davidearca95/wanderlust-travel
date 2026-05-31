import React, { useState } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../App';
import { destinations } from '../data/destinations';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { ImageViewer } from '../components/ImageViewer';

const MONTHS_IT = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

type Props = {
  destinationId: string;
  navigate: (s: Screen) => void;
  goBack: () => void;
};

export const DestinationScreen: React.FC<Props> = ({ destinationId, navigate, goBack }) => {
  const dest = destinations.find((d) => d.id === destinationId)!;
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const isRecommended = (month: number) => dest.bestMonths.includes(month);

  const openGallery = (index: number) => {
    setViewerIndex(index);
    setViewerVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <Image source={{ uri: dest.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <Text style={styles.heroEmoji}>{dest.emoji}</Text>
            <Text style={styles.heroTitle}>{dest.name}</Text>
            <Text style={styles.heroSubtitle}>{dest.country} • {dest.tagline}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💰</Text>
            <Text style={styles.infoLabel}>Budget/giorno</Text>
            <Text style={styles.infoValue}>{dest.budgetPerDay.split('/')[0]}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🌡️</Text>
            <Text style={styles.infoLabel}>Temperatura</Text>
            <Text style={styles.infoValue}>{dest.avgTemp.split(' ')[0]}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>✈️</Text>
            <Text style={styles.infoLabel}>Volo</Text>
            <Text style={styles.infoValue}>{dest.flightFromItaly.split('|')[1]?.trim() || ''}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Quando andare</Text>
          <Text style={styles.sectionSubtitle}>Consigliato: {dest.bestPeriod}</Text>
          <View style={styles.monthsGrid}>
            {MONTHS_IT.map((month, idx) => {
              const monthNum = idx + 1;
              const recommended = isRecommended(monthNum);
              const selected = selectedMonth === monthNum;
              return (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.monthChip,
                    recommended && styles.monthChipRecommended,
                    selected && styles.monthChipSelected,
                  ]}
                  onPress={() => setSelectedMonth(monthNum)}
                >
                  <Text style={[
                    styles.monthChipText,
                    recommended && styles.monthChipTextRecommended,
                    selected && styles.monthChipTextSelected,
                  ]}>{month}</Text>
                  {recommended && <Text style={styles.monthDot}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📸 Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dest.gallery.map((img, idx) => (
              <TouchableOpacity key={idx} onPress={() => openGallery(idx)} activeOpacity={0.8}>
                <Image source={{ uri: img }} style={styles.galleryImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ Precauzioni</Text>
          {dest.precautions.map((p, idx) => (
            <View key={idx} style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <Text style={styles.listText}>{p}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👕 Abbigliamento</Text>
          {dest.clothing.map((c, idx) => (
            <View key={idx} style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <Text style={styles.listText}>{c}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎫 Prenotazioni</Text>
          {dest.bookingsNeeded.map((b, idx) => (
            <View key={idx} style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <Text style={styles.listText}>{b}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.flightCard}>
            <Text style={styles.flightIcon}>✈️</Text>
            <View style={styles.flightInfo}>
              <Text style={styles.flightTitle}>Volo dall'Italia</Text>
              <Text style={styles.flightDetail}>{dest.flightFromItaly}</Text>
            </View>
          </View>
        </View>

        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigate({ name: 'Itinerary', destinationId: dest.id })}
          >
            <Text style={styles.ctaText}>Vedi Itinerario Completo</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={{ height: SPACING.xxl }} />
      </ScrollView>

      <ImageViewer
        images={dest.gallery}
        visible={viewerVisible}
        initialIndex={viewerIndex}
        onClose={() => setViewerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  heroContainer: { height: 320, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  backButton: {
    position: 'absolute', top: 50, left: SPACING.md,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center',
  },
  heroContent: { position: 'absolute', bottom: SPACING.lg, left: SPACING.lg },
  heroEmoji: { fontSize: 36, marginBottom: SPACING.xs },
  heroTitle: { fontSize: 36, fontWeight: '800', color: '#FFF' },
  heroSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  infoRow: { flexDirection: 'row', paddingHorizontal: SPACING.lg, marginTop: -30, gap: SPACING.sm },
  infoCard: {
    flex: 1, backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md, alignItems: 'center', borderWidth: 1, borderColor: COLORS.surfaceLight,
  },
  infoIcon: { fontSize: 20, marginBottom: SPACING.xs },
  infoLabel: { fontSize: 11, color: COLORS.textMuted, marginBottom: 2 },
  infoValue: { fontSize: 13, fontWeight: '700', color: COLORS.text, textAlign: 'center' },
  section: { paddingHorizontal: SPACING.lg, marginTop: SPACING.lg },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  sectionSubtitle: { fontSize: 14, color: COLORS.primary, marginBottom: SPACING.md, fontWeight: '500' },
  monthsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  monthChip: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm, backgroundColor: COLORS.surface,
    borderWidth: 1, borderColor: COLORS.surfaceLight, flexDirection: 'row', alignItems: 'center',
  },
  monthChipRecommended: { borderColor: COLORS.primary, backgroundColor: 'rgba(255,107,53,0.1)' },
  monthChipSelected: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  monthChipText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  monthChipTextRecommended: { color: COLORS.primary },
  monthChipTextSelected: { color: '#FFF' },
  monthDot: { fontSize: 10, marginLeft: 4, color: COLORS.primary },
  galleryImage: { width: 200, height: 140, borderRadius: BORDER_RADIUS.md, marginRight: SPACING.sm },
  listItem: { flexDirection: 'row', marginBottom: SPACING.sm, paddingRight: SPACING.lg },
  listBullet: { color: COLORS.primary, fontSize: 16, marginRight: SPACING.sm, lineHeight: 22 },
  listText: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 22, flex: 1 },
  flightCard: {
    flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md, alignItems: 'center', borderWidth: 1, borderColor: COLORS.surfaceLight,
  },
  flightIcon: { fontSize: 28, marginRight: SPACING.md },
  flightInfo: { flex: 1 },
  flightTitle: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  flightDetail: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4 },
  ctaContainer: { paddingHorizontal: SPACING.lg, marginTop: SPACING.xl },
  ctaButton: {
    backgroundColor: COLORS.primary, borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md + 4, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: SPACING.sm,
  },
  ctaText: { fontSize: 17, fontWeight: '700', color: '#FFF' },
});
