export const COLORS = {
  primary: '#FF6B35',
  primaryDark: '#E55A2B',
  secondary: '#004E89',
  accent: '#FCBF49',
  background: '#0F0F1A',
  surface: '#1A1A2E',
  surfaceLight: '#25253A',
  card: '#16213E',
  text: '#FFFFFF',
  textSecondary: '#A0A0B8',
  textMuted: '#6B6B80',
  success: '#4CAF50',
  warning: '#FF9800',
  danger: '#F44336',
  gradient: ['#667eea', '#764ba2'],
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONTS = {
  regular: { fontSize: 14, color: COLORS.text },
  medium: { fontSize: 16, color: COLORS.text, fontWeight: '500' as const },
  large: { fontSize: 20, color: COLORS.text, fontWeight: '600' as const },
  title: { fontSize: 28, color: COLORS.text, fontWeight: '700' as const },
  hero: { fontSize: 36, color: COLORS.text, fontWeight: '800' as const },
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};
