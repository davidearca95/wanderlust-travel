import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity, StyleSheet,
  TextInput, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, AppContext } from '../../App';
import { destinations } from '../data/destinations';
import { dishes } from '../data/dishes';
import { getChecklistForDestination } from '../data/checklists';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { ImageViewer } from '../components/ImageViewer';

const { width } = Dimensions.get('window');
const MONTHS_IT = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

type Props = {
  destinationId: string;
  navigate: (s: Screen) => void;
  goBack: () => void;
  ctx: AppContext;
};

export const DestinationScreen: React.FC<Props> = ({ destinationId, navigate, goBack, ctx }) => {
  const dest = destinations.find((d) => d.id === destinationId)!;
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDays, setSelectedDays] = useState(dest.itinerary.length);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [noteText, setNoteText] = useState(ctx.notes[destinationId] || '');
  const [showNoteInput, setShowNoteInput] = useState(false);

  const isRecommended = (month: number) => dest.bestMonths.includes(month);
  const maxDays = dest.itinerary.length;
  const destDishes = dishes[destinationId] || [];
  const checklistItems = getChecklistForDestination(destinationId);

  // Initialize checklist
  useEffect(() => {
    ctx.initChecklist(destinationId, checklistItems.length);
  }, [destinationId]);

  const checkedItems = ctx.checklists[destinationId] || [];
  const checkedCount = checkedItems.filter(Boolean).length;

  const openGallery = (index: number) => {
    setViewerIndex(index);
    setViewerVisible(true);
  };

  const saveNote = () => {
    ctx.setNote(destinationId, noteText);
    setShowNoteInput(false);
  };

  // Budget calculator
  const extractBudget = () => {
    const match = dest.budgetPerDay.match(/€(\d+)-(\d+)/);
    if (match) return { min: parseInt(match[1]), max: parseInt(match[2]) };
    return { min: 80, max: 150 };
  };
  const budget = extractBudget();
  const flightMatch = dest.flightFromItaly.match(/€(\d+)-(\d+)/);
  const flightCost = flightMatch ? { min: parseInt(flightMatch[1]), max: parseInt(flightMatch[2]) } : { min: 200, max: 500 };

  const totalMin = (budget.min * selectedDays) + flightCost.min;
  const totalMax = (budget.max * selectedDays) + flightCost.max;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: dest.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          {/* Favorite Button */}
          <TouchableOpacity style={styles.favButton} onPress={() => ctx.toggleFavorite(dest.id)}>
            <Ionicons name={ctx.isFavorite(dest.id) ? 'heart' : 'heart-outline'}
              size={24} color={ctx.isFavorite(dest.id) ? '#FF4444' : '#FFF'} />
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <Text style={styles.heroEmoji}>{dest.emoji}</Text>
            <Text style={styles.heroTitle}>{dest.name}</Text>
            <Text style={styles.heroSubtitle}>{dest.country} • {dest.tagline}</Text>
          </View>
        </View>


        {/* Quick Info Cards */}
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

        {/* 💰 Budget Calculator */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Calcolatore Budget</Text>
          <View style={styles.budgetCard}>
            <View style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>Soggiorno ({selectedDays} giorni)</Text>
              <Text style={styles.budgetValue}>€{budget.min * selectedDays} - €{budget.max * selectedDays}</Text>
            </View>
            <View style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>Volo A/R dall'Italia</Text>
              <Text style={styles.budgetValue}>€{flightCost.min} - €{flightCost.max}</Text>
            </View>
            <View style={styles.budgetDivider} />
            <View style={styles.budgetRow}>
              <Text style={styles.budgetTotalLabel}>TOTALE STIMATO</Text>
              <Text style={styles.budgetTotalValue}>€{totalMin} - €{totalMax}</Text>
            </View>
          </View>
        </View>

        {/* 📅 When to go */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Quando andare</Text>
          <Text style={styles.sectionSubtitle}>Consigliato: {dest.bestPeriod}</Text>
          <View style={styles.monthsGrid}>
            {MONTHS_IT.map((month, idx) => {
              const monthNum = idx + 1;
              const recommended = isRecommended(monthNum);
              const selected = selectedMonth === monthNum;
              return (
                <TouchableOpacity key={month}
                  style={[styles.monthChip, recommended && styles.monthChipRecommended, selected && styles.monthChipSelected]}
                  onPress={() => setSelectedMonth(monthNum)}>
                  <Text style={[styles.monthChipText, recommended && styles.monthChipTextRecommended, selected && styles.monthChipTextSelected]}>{month}</Text>
                  {recommended && <Text style={styles.monthDot}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 📸 Gallery */}
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

        {/* 🍽️ Piatti Tipici */}
        {destDishes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🍽️ Piatti Tipici</Text>
            {destDishes.map((dish, idx) => (
              <View key={idx} style={styles.dishCard}>
                <View style={styles.dishHeader}>
                  <Text style={styles.dishEmoji}>{dish.emoji}</Text>
                  <View style={styles.dishInfo}>
                    <View style={styles.dishNameRow}>
                      <Text style={styles.dishName}>{dish.name}</Text>
                      {dish.mustTry && <View style={styles.mustTryBadge}><Text style={styles.mustTryText}>MUST TRY</Text></View>}
                    </View>
                    <Text style={styles.dishDesc}>{dish.description}</Text>
                  </View>
                  <Text style={styles.dishPrice}>{dish.price}</Text>
                </View>
              </View>
            ))}
          </View>
        )}


        {/* ✅ Checklist Pre-Partenza */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Checklist ({checkedCount}/{checklistItems.length})</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(checkedCount / checklistItems.length) * 100}%` }]} />
          </View>
          {checklistItems.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.checkItem} onPress={() => ctx.toggleCheckItem(destinationId, idx)}>
              <Ionicons name={checkedItems[idx] ? 'checkbox' : 'square-outline'}
                size={22} color={checkedItems[idx] ? COLORS.success : COLORS.textMuted} />
              <Text style={[styles.checkText, checkedItems[idx] && styles.checkTextDone]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ⚠️ Precautions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ Precauzioni</Text>
          {dest.precautions.map((p, idx) => (
            <View key={idx} style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <Text style={styles.listText}>{p}</Text>
            </View>
          ))}
        </View>

        {/* 👕 Clothing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👕 Abbigliamento</Text>
          {dest.clothing.map((c, idx) => (
            <View key={idx} style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <Text style={styles.listText}>{c}</Text>
            </View>
          ))}
        </View>

        {/* 🎫 Bookings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎫 Prenotazioni</Text>
          {dest.bookingsNeeded.map((b, idx) => (
            <View key={idx} style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <Text style={styles.listText}>{b}</Text>
            </View>
          ))}
        </View>

        {/* ✈️ Flight */}
        <View style={styles.section}>
          <View style={styles.flightCard}>
            <Text style={styles.flightIcon}>✈️</Text>
            <View style={styles.flightInfo}>
              <Text style={styles.flightTitle}>Volo dall'Italia</Text>
              <Text style={styles.flightDetail}>{dest.flightFromItaly}</Text>
            </View>
          </View>
        </View>

        {/* 📝 Note Personali */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Le mie note</Text>
          {!showNoteInput ? (
            <TouchableOpacity style={styles.notePreview} onPress={() => setShowNoteInput(true)}>
              <Text style={styles.notePreviewText}>
                {noteText || 'Tocca per aggiungere note personali...'}
              </Text>
              <Ionicons name="create-outline" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          ) : (
            <View style={styles.noteInputContainer}>
              <TextInput
                style={styles.noteInput}
                multiline
                placeholder="Scrivi le tue note qui..."
                placeholderTextColor={COLORS.textMuted}
                value={noteText}
                onChangeText={setNoteText}
                autoFocus
              />
              <TouchableOpacity style={styles.noteSaveBtn} onPress={saveNote}>
                <Text style={styles.noteSaveBtnText}>Salva</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* 🗓️ Day selector + CTA */}
        <View style={styles.ctaContainer}>
          <Text style={styles.daySelectorTitle}>🗓️ Quanti giorni resti?</Text>
          <View style={styles.daySelectorRow}>
            {Array.from({ length: maxDays }, (_, i) => i + 1).map((num) => (
              <TouchableOpacity key={num}
                style={[styles.dayChip, selectedDays === num && styles.dayChipActive]}
                onPress={() => setSelectedDays(num)}>
                <Text style={[styles.dayChipText, selectedDays === num && styles.dayChipTextActive]}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.ctaButton}
            onPress={() => navigate({ name: 'Itinerary', destinationId: dest.id, days: selectedDays })}>
            <Text style={styles.ctaText}>Vedi Itinerario {selectedDays} Giorni</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={{ height: SPACING.xxl }} />
      </ScrollView>

      <ImageViewer images={dest.gallery} visible={viewerVisible}
        initialIndex={viewerIndex} onClose={() => setViewerVisible(false)} />
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
  favButton: {
    position: 'absolute', top: 50, right: SPACING.md,
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
  // Budget
  budgetCard: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, borderWidth: 1, borderColor: COLORS.surfaceLight },
  budgetRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACING.xs },
  budgetLabel: { fontSize: 14, color: COLORS.textSecondary },
  budgetValue: { fontSize: 14, color: COLORS.text, fontWeight: '600' },
  budgetDivider: { height: 1, backgroundColor: COLORS.surfaceLight, marginVertical: SPACING.sm },
  budgetTotalLabel: { fontSize: 14, color: COLORS.accent, fontWeight: '700' },
  budgetTotalValue: { fontSize: 16, color: COLORS.accent, fontWeight: '800' },
  // Months
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
  // Gallery
  galleryImage: { width: 200, height: 140, borderRadius: BORDER_RADIUS.md, marginRight: SPACING.sm },
  // Dishes
  dishCard: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.surfaceLight },
  dishHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  dishEmoji: { fontSize: 28, marginRight: SPACING.sm },
  dishInfo: { flex: 1 },
  dishNameRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: 4 },
  dishName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  mustTryBadge: { backgroundColor: 'rgba(255,107,53,0.2)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  mustTryText: { fontSize: 9, fontWeight: '800', color: COLORS.primary },
  dishDesc: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 18 },
  dishPrice: { fontSize: 12, color: COLORS.success, fontWeight: '600', marginLeft: SPACING.sm },
  // Checklist
  progressBar: { height: 6, backgroundColor: COLORS.surfaceLight, borderRadius: 3, marginBottom: SPACING.md, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.success, borderRadius: 3 },
  checkItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.sm, gap: SPACING.sm },
  checkText: { fontSize: 14, color: COLORS.textSecondary, flex: 1 },
  checkTextDone: { textDecorationLine: 'line-through', color: COLORS.textMuted },
  // Lists
  listItem: { flexDirection: 'row', marginBottom: SPACING.sm, paddingRight: SPACING.lg },
  listBullet: { color: COLORS.primary, fontSize: 16, marginRight: SPACING.sm, lineHeight: 22 },
  listText: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 22, flex: 1 },
  // Flight
  flightCard: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, alignItems: 'center', borderWidth: 1, borderColor: COLORS.surfaceLight },
  flightIcon: { fontSize: 28, marginRight: SPACING.md },
  flightInfo: { flex: 1 },
  flightTitle: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  flightDetail: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4 },
  // Notes
  notePreview: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, borderWidth: 1, borderColor: COLORS.surfaceLight },
  notePreviewText: { fontSize: 14, color: COLORS.textMuted, flex: 1 },
  noteInputContainer: { backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, borderWidth: 1, borderColor: COLORS.primary },
  noteInput: { fontSize: 14, color: COLORS.text, minHeight: 80, textAlignVertical: 'top' },
  noteSaveBtn: { alignSelf: 'flex-end', backgroundColor: COLORS.primary, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.sm, marginTop: SPACING.sm },
  noteSaveBtnText: { fontSize: 14, fontWeight: '700', color: '#FFF' },
  // Day selector + CTA
  ctaContainer: { paddingHorizontal: SPACING.lg, marginTop: SPACING.xl },
  daySelectorTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },
  daySelectorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.lg },
  dayChip: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.surfaceLight },
  dayChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  dayChipText: { fontSize: 16, fontWeight: '700', color: COLORS.textSecondary },
  dayChipTextActive: { color: '#FFF' },
  ctaButton: { backgroundColor: COLORS.primary, borderRadius: BORDER_RADIUS.lg, paddingVertical: SPACING.md + 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm },
  ctaText: { fontSize: 17, fontWeight: '700', color: '#FFF' },
});
