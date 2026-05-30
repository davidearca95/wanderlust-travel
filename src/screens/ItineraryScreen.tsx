import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { destinations, DayItinerary } from '../data/destinations';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

const { width } = Dimensions.get('window');

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Itinerary'>;
  route: RouteProp<RootStackParamList, 'Itinerary'>;
};

export const ItineraryScreen: React.FC<Props> = ({ navigation, route }) => {
  const dest = destinations.find((d) => d.id === route.params.destinationId)!;
  const [activeDay, setActiveDay] = useState(0);

  const currentDay = dest.itinerary[activeDay];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{dest.emoji} {dest.name}</Text>
          <Text style={styles.headerSubtitle}>Itinerario {dest.itinerary.length} giorni</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>


      {/* Day Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dayTabs}
        contentContainerStyle={styles.dayTabsContent}
      >
        {dest.itinerary.map((day, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.dayTab, activeDay === idx && styles.dayTabActive]}
            onPress={() => setActiveDay(idx)}
          >
            <Text style={[styles.dayTabNumber, activeDay === idx && styles.dayTabNumberActive]}>
              {day.day}
            </Text>
            <Text style={[styles.dayTabLabel, activeDay === idx && styles.dayTabLabelActive]}>
              Giorno
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Day Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.dayTitle}>{currentDay.title}</Text>

        {/* Timeline */}
        {currentDay.activities.map((activity, idx) => (
          <View key={idx} style={styles.timelineItem}>
            {/* Timeline line */}
            <View style={styles.timelineLine}>
              <View style={styles.timelineDot} />
              {idx < currentDay.activities.length - 1 && <View style={styles.timelineConnector} />}
            </View>

            {/* Activity Card */}
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
              <Text style={styles.activityDescription}>{activity.description}</Text>
              {activity.tip && (
                <View style={styles.tipContainer}>
                  <Text style={styles.tipIcon}>💡</Text>
                  <Text style={styles.tipText}>{activity.tip}</Text>
                </View>
              )}
            </View>
          </View>
        ))}

        {/* Daily Summary */}
        <View style={styles.dailySummary}>
          <Text style={styles.summaryTitle}>💰 Costo stimato giornata</Text>
          <Text style={styles.summaryValue}>
            {dest.budgetPerDay}
          </Text>
        </View>


        {/* Gallery Section */}
        <View style={styles.gallerySection}>
          <Text style={styles.gallerySectionTitle}>📸 Foto della destinazione</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dest.gallery.map((img, idx) => (
              <Image key={idx} source={{ uri: img }} style={styles.galleryImg} />
            ))}
          </ScrollView>
        </View>

        {/* Quick Info */}
        <View style={styles.quickInfoSection}>
          <Text style={styles.quickInfoTitle}>ℹ️ Info rapide</Text>
          <View style={styles.quickInfoGrid}>
            <View style={styles.quickInfoItem}>
              <Text style={styles.quickInfoEmoji}>💱</Text>
              <Text style={styles.quickInfoLabel}>Valuta</Text>
              <Text style={styles.quickInfoValue}>{dest.currency}</Text>
            </View>
            <View style={styles.quickInfoItem}>
              <Text style={styles.quickInfoEmoji}>🗣️</Text>
              <Text style={styles.quickInfoLabel}>Lingua</Text>
              <Text style={styles.quickInfoValue}>{dest.language}</Text>
            </View>
            <View style={styles.quickInfoItem}>
              <Text style={styles.quickInfoEmoji}>🌡️</Text>
              <Text style={styles.quickInfoLabel}>Clima</Text>
              <Text style={styles.quickInfoValue}>{dest.avgTemp}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: SPACING.xxl * 2 }} />
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
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.surface,
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
  timelineDot: {
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: COLORS.primary, marginTop: 6,
  },
  timelineConnector: {
    width: 2, flex: 1, backgroundColor: COLORS.surfaceLight, marginTop: 4,
  },
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
  activityDescription: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20 },
  tipContainer: {
    flexDirection: 'row', marginTop: SPACING.sm, backgroundColor: 'rgba(252,191,73,0.1)',
    padding: SPACING.sm, borderRadius: BORDER_RADIUS.sm, alignItems: 'flex-start',
  },
  tipIcon: { fontSize: 14, marginRight: SPACING.xs },
  tipText: { fontSize: 12, color: COLORS.accent, flex: 1, lineHeight: 18 },
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
  quickInfoSection: { marginTop: SPACING.xl },
  quickInfoTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },
  quickInfoGrid: { gap: SPACING.sm },
  quickInfoItem: {
    backgroundColor: COLORS.surface, borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md, flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.surfaceLight,
  },
  quickInfoEmoji: { fontSize: 22, marginRight: SPACING.md },
  quickInfoLabel: { fontSize: 12, color: COLORS.textMuted, width: 60 },
  quickInfoValue: { fontSize: 13, color: COLORS.text, flex: 1, fontWeight: '500' },
});
