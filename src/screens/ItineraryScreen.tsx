import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Image, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { destinations } from '../data/destinations';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

type Props = {
  destinationId: string;
  goBack: () => void;
};

export const ItineraryScreen: React.FC<Props> = ({ destinationId, goBack }) => {
  const dest = destinations.find((d) => d.id === destinationId)!;
  const [activeDay, setActiveDay] = useState(0);
  const currentDay = dest.itinerary[activeDay];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{dest.emoji} {dest.name}</Text>
          <Text style={styles.headerSubtitle}>
            Itinerario {dest.itinerary.length} giorni
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>


      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        style={styles.dayTabs} contentContainerStyle={styles.dayTabsContent}>
        {dest.itinerary.map((day, idx) => (
          <TouchableOpacity key={idx}
            style={[styles.dayTab, activeDay === idx && styles.dayTabActive]}
            onPress={() => setActiveDay(idx)}>
            <Text style={[styles.dayTabNumber, activeDay === idx && styles.dayTabNumberActive]}>
              {day.day}
            </Text>
            <Text style={[styles.dayTabLabel, activeDay === idx && styles.dayTabLabelActive]}>
              Giorno
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.dayTitle}>{currentDay.title}</Text>


        {currentDay.activities.map((activity, idx) => (
          <View key={idx} style={styles.timelineItem}>
            <View style={styles.timelineLine}>
              <View style={styles.timelineDot} />
              {idx < currentDay.activities.length - 1 && (
                <View style={styles.timelineConnector} />
              )}
            </View>
            <View style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityIcon}>{activity.icon}</Text>
                <View style={styles.activityHeaderText}>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                </View>
                {activity.cost && (
                  <View style={styles.costBadge}>
                    <Text style={styles.costText}>{activity.cost}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.activityDesc}>{activity.description}</Text>
            </View>
          </View>
        ))}


        <View style={styles.dailySummary}>
          <Text style={styles.summaryTitle}>💰 Costo stimato giornata</Text>
          <Text style={styles.summaryValue}>{dest.budgetPerDay}</Text>
        </View>

        <View style={styles.gallerySection}>
          <Text style={styles.gallerySectionTitle}>📸 Foto</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dest.gallery.map((img, idx) => (
              <Image key={idx} source={{ uri: img }} style={styles.galleryImg} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.quickInfoSection}>
          <Text style={styles.quickInfoTitle}>ℹ️ Info rapide</Text>
          <View style={styles.quickInfoItem}>
            <Text style={styles.qiEmoji}>💱</Text>
            <Text style={styles.qiLabel}>Valuta</Text>
            <Text style={styles.qiValue}>{dest.currency}</Text>
          </View>
          <View style={styles.quickInfoItem}>
            <Text style={styles.qiEmoji}>🗣️</Text>
            <Text style={styles.qiLabel}>Lingua</Text>
            <Text style={styles.qiValue}>{dest.language}</Text>
          </View>
          <View style={styles.quickInfoItem}>
            <Text style={styles.qiEmoji}>🌡️</Text>
            <Text style={styles.qiLabel}>Clima</Text>
            <Text style={styles.qiValue}>{dest.avgTemp}</Text>
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 56, paddingHorizontal: SPACING.md, paddingBottom: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.surfaceLight,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.surface,
  },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  headerSubtitle: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  dayTabs: { maxHeight: 80, borderBottomWidth: 1, borderBottomColor: COLORS.surfaceLight },
  dayTabsContent: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, gap: SPACING.sm },
  dayTab: {
    width: 56, height: 56, borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.surfaceLight,
  },
  dayTabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  dayTabNumber: { fontSize: 18, fontWeight: '700', color: COLORS.textSecondary },
  dayTabNumberActive: { color: '#FFF' },
  dayTabLabel: { fontSize: 10, color: COLORS.textMuted, marginTop: 1 },
  dayTabLabelActive: { color: 'rgba(255,255,255,0.8)' },
  content: { flex: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg },
  dayTitle: { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.lg },


  timelineItem: { flexDirection: 'row', marginBottom: SPACING.md },
  timelineLine: { width: 24, alignItems: 'center' },
  timelineDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary, marginTop: 6 },
  timelineConnector: { width: 2, flex: 1, backgroundColor: COLORS.surfaceLight, marginTop: 4 },
  activityCard: {
    flex: 1, marginLeft: SPACING.sm, backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md, padding: SPACING.md,
    borderWidth: 1, borderColor: COLORS.surfaceLight,
  },
  activityHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  activityIcon: { fontSize: 22, marginRight: SPACING.sm },
  activityHeaderText: { flex: 1 },
  activityTime: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
  activityTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginTop: 2 },
  costBadge: {
    backgroundColor: 'rgba(76,175,80,0.15)', paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.sm,
  },
  costText: { fontSize: 11, color: COLORS.success, fontWeight: '600' },
  activityDesc: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20 },
  dailySummary: {
    backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg, marginTop: SPACING.lg, alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.surfaceLight,
  },
  summaryTitle: { fontSize: 14, color: COLORS.textSecondary, marginBottom: SPACING.xs },
  summaryValue: { fontSize: 18, fontWeight: '700', color: COLORS.accent },
  gallerySection: { marginTop: SPACING.xl },
  gallerySectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },
  galleryImg: { width: 180, height: 120, borderRadius: BORDER_RADIUS.md, marginRight: SPACING.sm },
  quickInfoSection: { marginTop: SPACING.xl, gap: SPACING.sm },
  quickInfoTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  quickInfoItem: {
    backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md, flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.surfaceLight,
  },
  qiEmoji: { fontSize: 22, marginRight: SPACING.md },
  qiLabel: { fontSize: 12, color: COLORS.textMuted, width: 60 },
  qiValue: { fontSize: 13, color: COLORS.text, flex: 1, fontWeight: '500' },
});
