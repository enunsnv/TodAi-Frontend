export type RiskLevel = "긴급" | "주의" | "안정";

export interface BarData {
  isolation: number;
  health: number;
  vitality: number;
  emotion: number;
  cognition: number;
}

export interface ChatMessage {
  speaker: "말동무" | "어르신";
  text: string;
}

export interface WeeklyDay {
  label: string;
  minutes: number;
  score: number;
  isToday?: boolean;
}

export interface WeeklySummaryItem {
  text: string;
  date: string;
  author: string;
  tone: "good" | "warn" | "bad";
}

export interface RadarMetric {
  axis: "사회적 고립" | "건강 불안" | "일상 활력" | "감정 변동" | "인지 부하";
  thisWeek: number;
  lastWeek: number;
}

export interface CaseworkerNote {
  text: string;
  date: string;
  author: string;
  highlight?: boolean;
}

export interface DailyEmotionScore {
  axis: "사회적 고립" | "건강 불안" | "일상 활력" | "감정 변동" | "인지 부하";
  score: number;
  tone: "good" | "warn" | "bad";
}

export interface DailyView {
  dateLabel: string;
  averageScore: number;
  maxScore: number;
  statusLabel: string;
  statusTone: "good" | "warn" | "bad";
  warningLabel: string;
  warningTone: "good" | "warn" | "bad";
  emotionScores: DailyEmotionScore[];
  summary: string;
  totalMessageCount: number;
  hiddenMessageCount: number;
}

export interface WeeklyView {
  rangeLabel: string;
  days: WeeklyDay[];
  totalDuration: string;
  conversationCount: number;
  averageDuration: string;
  averageScore: number;
  maxScore: number;
  statusLabel: string;
  statusTone: "good" | "warn" | "bad";
  warningLabel: string;
  warningTone: "good" | "warn" | "bad";
  aiSummary: {
    emotion: string;
    topics: string;
    notable: string;
    health: string;
  };
  summaryItems: WeeklySummaryItem[];
  radar: RadarMetric[];
  notes: CaseworkerNote[];
}

export interface Member {
  id: number;
  name: string;
  initial: string;
  avatarColor: string;
  age: number;
  lastContact: string;
  lastChatTime: string;
  manager: string;
  tags: { label: string; color: string }[];
  bars: BarData;
  risk: RiskLevel;
  wellbeing: { emotion: number; vitality: number; communication: number; physical: number };
  todayConversations: number;
  totalDuration: string;
  emotionLabel: string;
  aiWarning: string;
  conversationTimeRange: string;
  conversationTimeStart: string;
  conversationDurationMin: number;
  chatLog: ChatMessage[];
  quickMemo: { text: string; date: string };
  daily: DailyView;
  weekly: WeeklyView;
}

const DEFAULT_CHAT: ChatMessage[] = [
  { speaker: "말동무", text: "안녕하세요 순자님! 오늘 기분은 어떠세요?" },
  { speaker: "어르신", text: "응, 오늘은 날씨가 좋아서 기분이 좋아~" },
  { speaker: "말동무", text: "그러셨군요! 혹시 무릎은 좀 어때요?" },
  { speaker: "어르신", text: "무릎이 좀 쑤시긴 한데... 그냥 참고 있어." },
];

const DEFAULT_DAILY: DailyView = {
  dateLabel: "2025년 5월 8일 (화) · 오늘 대화",
  averageScore: 70,
  maxScore: 90,
  statusLabel: "정상",
  statusTone: "good",
  warningLabel: "없음",
  warningTone: "good",
  emotionScores: [
    { axis: "사회적 고립", score: 85, tone: "good" },
    { axis: "건강 불안", score: 70, tone: "warn" },
    { axis: "일상 활력", score: 90, tone: "good" },
    { axis: "감정 변동", score: 60, tone: "warn" },
    { axis: "인지 부하", score: 30, tone: "bad" },
  ],
  summary:
    "오늘 어르신은 전반적으로 밝고 활기찬 모습을 보이셨습니다. 손자 이야기와 점심 메뉴에 대해 즐겁게 대화하셨으며, 무릎 통증을 3회 언급하셨으나 일상생활에는 큰 지장이 없다고 하셨습니다. 혈압약은 정상적으로 복용하셨고, 수면 상태도 양호합니다. 다만 인지 부하 지표가 다소 낮게 측정되어 추가 관찰이 필요합니다.",
  totalMessageCount: 21,
  hiddenMessageCount: 17,
};

const DEFAULT_WEEKLY: WeeklyView = {
  rangeLabel: "2026년 5월 1일 - 5월 8일",
  days: [
    { label: "월", minutes: 18, score: 85 },
    { label: "화", minutes: 8, score: 32 },
    { label: "수", minutes: 22, score: 68 },
    { label: "목", minutes: 14, score: 40 },
    { label: "금", minutes: 28, score: 80 },
    { label: "토", minutes: 26, score: 80 },
    { label: "일", minutes: 19, score: 70, isToday: true },
  ],
  totalDuration: "1시간 34분",
  conversationCount: 5,
  averageDuration: "18분",
  averageScore: 65,
  maxScore: 80,
  statusLabel: "정상",
  statusTone: "good",
  warningLabel: "없음",
  warningTone: "good",
  summaryItems: [
    {
      text: "우울감 감지 → 방문 일정 조율 필요",
      date: "2025.05.01",
      author: "AI 자동 감지",
      tone: "bad",
    },
    {
      text: "무릎 통증 2회 언급 → 의료지원 필요",
      date: "2025.05.08",
      author: "AI 자동 감지",
      tone: "bad",
    },
  ],
  aiSummary: {
    emotion: "밝고 활기차 보이셨어요",
    topics: "손자 이야기, 날씨, 점심 메뉴",
    notable: "무릎 통증 언급 (3회 반복)",
    health: "혈압약 복용 완료",
  },
  radar: [
    { axis: "사회적 고립", thisWeek: 71, lastWeek: 78 },
    { axis: "건강 불안", thisWeek: 65, lastWeek: 60 },
    { axis: "일상 활력", thisWeek: 80, lastWeek: 80 },
    { axis: "감정 변동", thisWeek: 67, lastWeek: 57 },
    { axis: "인지 부하", thisWeek: 83, lastWeek: 82 },
  ],
  notes: [
    {
      text: "혈압약 복용 확인 필요",
      date: "2025.04.07",
      author: "김복지",
    },
    {
      text: "무릎 통증 반복 언급 — 정형외과 연계 검토",
      date: "2025.04.08",
      author: "AI 감지",
      highlight: true,
    },
  ],
};

export const members: Member[] = [
  {
    id: 1,
    name: "김말복",
    initial: "김",
    avatarColor: "bg-blue-100 text-blue-700",
    age: 78,
    lastContact: "3일 전",
    lastChatTime: "오늘 10:32",
    manager: "김복지",
    tags: [
      { label: "⚠ 고립감 경고", color: "text-red-500 bg-red-50 border-red-200" },
      { label: "📉 활력 저하", color: "text-orange-500 bg-orange-50 border-orange-200" },
    ],
    bars: { isolation: 3, health: 4, vitality: 2, emotion: 4, cognition: 4 },
    risk: "긴급",
    wellbeing: { emotion: 55, vitality: 40, communication: 45, physical: 60 },
    todayConversations: 1,
    totalDuration: "19분",
    emotionLabel: "😊 밝음",
    aiWarning: "있음",
    conversationTimeRange: "10:32 - 10:51",
    conversationTimeStart: "10:32",
    conversationDurationMin: 19,
    chatLog: DEFAULT_CHAT,
    quickMemo: { text: "고립감 신호 확인 → 방문 일정 조율 필요", date: "2025.04.08" },
    daily: DEFAULT_DAILY,
    weekly: DEFAULT_WEEKLY,
  },
  {
    id: 2,
    name: "이순자",
    initial: "이",
    avatarColor: "bg-green-100 text-green-700",
    age: 82,
    lastContact: "2일 전",
    lastChatTime: "오늘 09:45",
    manager: "김복지",
    tags: [{ label: "🩺 건강 불안", color: "text-orange-500 bg-orange-50 border-orange-200" }],
    bars: { isolation: 3, health: 2, vitality: 3, emotion: 3, cognition: 5 },
    risk: "긴급",
    wellbeing: { emotion: 70, vitality: 55, communication: 80, physical: 45 },
    todayConversations: 1,
    totalDuration: "22분",
    emotionLabel: "😐 보통",
    aiWarning: "있음",
    conversationTimeRange: "09:45 - 10:07",
    conversationTimeStart: "09:45",
    conversationDurationMin: 22,
    chatLog: DEFAULT_CHAT,
    quickMemo: { text: "건강 불안 호소 → 방문 진료 필요", date: "2025.04.08" },
    daily: DEFAULT_DAILY,
    weekly: DEFAULT_WEEKLY,
  },
  {
    id: 3,
    name: "박창식",
    initial: "박",
    avatarColor: "bg-green-100 text-green-700",
    age: 75,
    lastContact: "어제",
    lastChatTime: "어제 15:20",
    manager: "김복지",
    tags: [{ label: "⚡ 감정 변동", color: "text-orange-500 bg-orange-50 border-orange-200" }],
    bars: { isolation: 3, health: 3, vitality: 4, emotion: 4, cognition: 5 },
    risk: "주의",
    wellbeing: { emotion: 75, vitality: 70, communication: 80, physical: 70 },
    todayConversations: 0,
    totalDuration: "-",
    emotionLabel: "😊 밝음",
    aiWarning: "없음",
    conversationTimeRange: "-",
    conversationTimeStart: "15:20",
    conversationDurationMin: 18,
    chatLog: DEFAULT_CHAT,
    quickMemo: { text: "감정 기복 관찰 필요", date: "2025.04.07" },
    daily: DEFAULT_DAILY,
    weekly: DEFAULT_WEEKLY,
  },
  {
    id: 4,
    name: "최영옥",
    initial: "최",
    avatarColor: "bg-amber-100 text-amber-700",
    age: 80,
    lastContact: "어제",
    lastChatTime: "어제 13:11",
    manager: "김복지",
    tags: [{ label: "🧠 인지 부하", color: "text-pink-500 bg-pink-50 border-pink-200" }],
    bars: { isolation: 3, health: 3, vitality: 4, emotion: 4, cognition: 1 },
    risk: "주의",
    wellbeing: { emotion: 70, vitality: 70, communication: 50, physical: 75 },
    todayConversations: 0,
    totalDuration: "-",
    emotionLabel: "😐 보통",
    aiWarning: "있음",
    conversationTimeRange: "-",
    conversationTimeStart: "13:11",
    conversationDurationMin: 15,
    chatLog: DEFAULT_CHAT,
    quickMemo: { text: "인지 검사 결과 재확인", date: "2025.04.07" },
    daily: DEFAULT_DAILY,
    weekly: DEFAULT_WEEKLY,
  },
  {
    id: 5,
    name: "정태수",
    initial: "정",
    avatarColor: "bg-green-100 text-green-700",
    age: 71,
    lastContact: "오늘",
    lastChatTime: "오늘 10:32",
    manager: "김복지",
    tags: [{ label: "✅ 특이사항 없음", color: "text-green-600 bg-green-50 border-green-200" }],
    bars: { isolation: 5, health: 4, vitality: 5, emotion: 4, cognition: 4 },
    risk: "안정",
    wellbeing: { emotion: 85, vitality: 70, communication: 90, physical: 60 },
    todayConversations: 1,
    totalDuration: "19분",
    emotionLabel: "😊 밝음",
    aiWarning: "없음",
    conversationTimeRange: "10:32 - 10:51",
    conversationTimeStart: "10:32",
    conversationDurationMin: 19,
    chatLog: DEFAULT_CHAT,
    quickMemo: { text: "무릎 통증 2회 언급 → 방문 일정 조율 필요", date: "2025.04.08" },
    daily: DEFAULT_DAILY,
    weekly: DEFAULT_WEEKLY,
  },
  {
    id: 6,
    name: "한동수",
    initial: "한",
    avatarColor: "bg-amber-100 text-amber-700",
    age: 83,
    lastContact: "어제",
    lastChatTime: "어제 16:40",
    manager: "김복지",
    tags: [{ label: "⚡ 감정 변동", color: "text-orange-500 bg-orange-50 border-orange-200" }],
    bars: { isolation: 2, health: 3, vitality: 4, emotion: 2, cognition: 4 },
    risk: "주의",
    wellbeing: { emotion: 60, vitality: 55, communication: 65, physical: 70 },
    todayConversations: 0,
    totalDuration: "-",
    emotionLabel: "😐 보통",
    aiWarning: "있음",
    conversationTimeRange: "-",
    conversationTimeStart: "16:40",
    conversationDurationMin: 14,
    chatLog: DEFAULT_CHAT,
    quickMemo: { text: "우울감 호소 - 상담 예약", date: "2025.04.07" },
    daily: DEFAULT_DAILY,
    weekly: DEFAULT_WEEKLY,
  },
  {
    id: 7,
    name: "오영희",
    initial: "오",
    avatarColor: "bg-green-100 text-green-700",
    age: 71,
    lastContact: "오늘",
    lastChatTime: "오늘 08:55",
    manager: "김복지",
    tags: [{ label: "✅ 특이사항 없음", color: "text-green-600 bg-green-50 border-green-200" }],
    bars: { isolation: 4, health: 4, vitality: 4, emotion: 4, cognition: 4 },
    risk: "안정",
    wellbeing: { emotion: 90, vitality: 80, communication: 88, physical: 75 },
    todayConversations: 1,
    totalDuration: "21분",
    emotionLabel: "😊 밝음",
    aiWarning: "없음",
    conversationTimeRange: "08:55 - 09:16",
    conversationTimeStart: "08:55",
    conversationDurationMin: 21,
    chatLog: DEFAULT_CHAT,
    quickMemo: { text: "이상 무", date: "2025.04.08" },
    daily: DEFAULT_DAILY,
    weekly: DEFAULT_WEEKLY,
  },
  {
    id: 8,
    name: "신철수",
    initial: "신",
    avatarColor: "bg-red-100 text-red-700",
    age: 88,
    lastContact: "5일 전",
    lastChatTime: "5일 전",
    manager: "김복지",
    tags: [{ label: "🩺 건강 불안", color: "text-red-500 bg-red-50 border-red-200" }],
    bars: { isolation: 1, health: 1, vitality: 4, emotion: 2, cognition: 2 },
    risk: "긴급",
    wellbeing: { emotion: 30, vitality: 25, communication: 20, physical: 35 },
    todayConversations: 0,
    totalDuration: "-",
    emotionLabel: "😢 우울",
    aiWarning: "있음",
    conversationTimeRange: "-",
    conversationTimeStart: "10:00",
    conversationDurationMin: 0,
    chatLog: DEFAULT_CHAT,
    quickMemo: { text: "연락 두절 - 긴급 방문 필요", date: "2025.04.08" },
    daily: {
      ...DEFAULT_DAILY,
      averageScore: 35,
      maxScore: 50,
      statusLabel: "위험",
      statusTone: "bad",
      warningLabel: "있음",
      warningTone: "bad",
      emotionScores: [
        { axis: "사회적 고립", score: 20, tone: "bad" },
        { axis: "건강 불안", score: 25, tone: "bad" },
        { axis: "일상 활력", score: 30, tone: "bad" },
        { axis: "감정 변동", score: 40, tone: "warn" },
        { axis: "인지 부하", score: 35, tone: "bad" },
      ],
      summary:
        "어르신과 5일째 연락이 닿지 않고 있습니다. 마지막 대화 내용을 분석한 결과 우울감과 외로움을 호소하셨고, 식사를 거르신다는 언급이 있었습니다. 긴급 방문 및 보호자 연락이 필요합니다.",
      totalMessageCount: 0,
      hiddenMessageCount: 0,
    },
    weekly: DEFAULT_WEEKLY,
  },
];
