"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import {
  members,
  type DailyEmotionScore,
  type Member,
  type MonthlyDay,
  type MonthlyView,
  type RadarMetric,
  type WeeklyView,
} from "../_data";

type ReportTab = "일간" | "주간" | "월간";

function WellbeingBar({
  label,
  percent,
  color,
}: {
  label: string;
  percent: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-gray-700">{label}</span>
        <span className={`text-sm font-bold ${color.replace("bg-", "text-")}`}>{percent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function ConversationSliderTrack({ member }: { member: Member }) {
  const startHour = 6;
  const endHour = 22;
  const totalHours = endHour - startHour;
  const [hh, mm] = member.conversationTimeStart.split(":").map(Number);
  const handlePercent = Math.max(
    0,
    Math.min(100, ((hh - startHour + (mm || 0) / 60) / totalHours) * 100),
  );

  return (
    <div>
      <div className="relative h-2 bg-gray-100 rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-blue-400 rounded-full"
          style={{ width: `${handlePercent}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-md border-2 border-blue-500"
          style={{ left: `${handlePercent}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 mt-2">
        {["6:00", "10:00", "14:00", "18:00", "22:00"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}

const TONE_BAR: Record<DailyEmotionScore["tone"], string> = {
  good: "bg-green-500",
  warn: "bg-orange-400",
  bad: "bg-red-500",
};

const TONE_TEXT: Record<DailyEmotionScore["tone"], string> = {
  good: "text-green-500",
  warn: "text-orange-500",
  bad: "text-red-500",
};

function EmotionScoreBar({ item }: { item: DailyEmotionScore }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-700">{item.axis}</span>
        <span className={`text-sm font-bold ${TONE_TEXT[item.tone]}`}>{item.score}점</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${TONE_BAR[item.tone]}`}
          style={{ width: `${item.score}%` }}
        />
      </div>
    </div>
  );
}

function DailyView({ member }: { member: Member }) {
  const d = member.daily;
  const visibleChat = member.chatLog;
  const statusColor =
    d.statusTone === "good"
      ? "text-blue-500"
      : d.statusTone === "warn"
        ? "text-orange-500"
        : "text-red-500";
  const warningColor =
    d.warningTone === "good"
      ? "text-gray-500"
      : d.warningTone === "warn"
        ? "text-orange-500"
        : "text-red-500";

  return (
    <div className="grid grid-cols-2 gap-5">
      {/* Top-left: conversation card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6">
          <p className="text-xs text-white/80">{d.dateLabel}</p>
          <div className="flex items-end gap-3 mt-3">
            <span className="text-3xl font-bold">{member.conversationTimeRange}</span>
            {member.conversationDurationMin > 0 && (
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-1.5">
                {member.conversationDurationMin}분 대화
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          <p className="text-xs text-gray-500 mb-3">시간대별 대화 현황</p>
          <ConversationSliderTrack member={member} />

          <div className="grid grid-cols-4 gap-3 mt-6 pt-5 border-t border-gray-100">
            <div>
              <p className="text-[11px] text-gray-400">평균 감정지수</p>
              <p className="text-lg font-bold text-blue-500 mt-1">{d.averageScore}점</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400">최고 감정지수</p>
              <p className="text-lg font-bold text-green-500 mt-1">{d.maxScore}점</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400">감정 상태</p>
              <p className={`text-lg font-bold mt-1 ${statusColor}`}>{d.statusLabel}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400">AI 경고</p>
              <p className={`text-lg font-bold mt-1 ${warningColor}`}>{d.warningLabel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top-right: emotion scores */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900">일간 감정지수</h3>
          <span className="text-xs text-gray-400">AI 자동 분석</span>
        </div>
        <div className="space-y-4 mt-5">
          {d.emotionScores.map((item) => (
            <EmotionScoreBar key={item.axis} item={item} />
          ))}
        </div>
      </div>

      {/* Bottom-left: chat record */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">대화 기록</h3>
          <span className="text-xs text-gray-400">{d.totalMessageCount}개의 메세지</span>
        </div>

        <div className="space-y-4">
          {visibleChat.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.speaker === "어르신" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[75%]">
                {msg.speaker === "말동무" && (
                  <p className="text-[11px] font-semibold text-blue-500 mb-1">말벗 AI</p>
                )}
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm ${
                    msg.speaker === "어르신"
                      ? "bg-gray-100 text-gray-800 rounded-tr-sm"
                      : "bg-blue-50 text-gray-800 rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {d.hiddenMessageCount > 0 && (
          <button className="w-full mt-5 py-3 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center gap-1.5">
            전체보기 ({d.hiddenMessageCount}개) <span className="text-xs">▼</span>
          </button>
        )}
      </div>

      {/* Bottom-right: AI summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">일간 대화 내용 요약</h3>
          <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            AI 분석
          </span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{d.summary}</p>
      </div>
    </div>
  );
}

type WeeklyMode = "score" | "time";

function WeeklyBarChart({ days, mode }: { days: WeeklyView["days"]; mode: WeeklyMode }) {
  const isScore = mode === "score";
  const ticks = isScore ? [0, 25, 50, 100] : [0, 15, 30, 60];
  const max = ticks[ticks.length - 1];
  const unit = isScore ? "점" : "분";
  const chartHeight = 220;
  const valueOf = (d: WeeklyView["days"][number]) => (isScore ? d.score : d.minutes);

  return (
    <div className="relative pl-10" style={{ height: chartHeight + 40 }}>
      {/* Y axis ticks */}
      <div className="absolute left-0 top-0 bottom-10 w-10">
        {ticks.map((t) => (
          <div
            key={t}
            className="absolute right-2 text-[10px] text-gray-400"
            style={{ top: `${(1 - t / max) * 100}%`, transform: "translateY(-50%)" }}
          >
            {t}
            {unit}
          </div>
        ))}
      </div>

      {/* Grid lines */}
      <div className="absolute left-10 right-0 top-0 bottom-10">
        {ticks.map((t) => (
          <div
            key={t}
            className="absolute left-0 right-0 border-t border-dashed border-gray-100"
            style={{ top: `${(1 - t / max) * 100}%` }}
          />
        ))}
      </div>

      {/* Bars */}
      <div className="absolute left-10 right-0 top-0 bottom-10 flex items-end justify-around gap-3">
        {days.map((d) => {
          const value = valueOf(d);
          const heightPct = max ? (value / max) * 100 : 0;
          return (
            <div
              key={d.label}
              className="flex-1 flex flex-col items-center justify-end relative h-full"
            >
              {value > 0 && (
                <span
                  className={`absolute text-xs font-semibold ${d.isToday ? "text-blue-500" : "text-gray-500"}`}
                  style={{ bottom: `calc(${heightPct}% + 4px)` }}
                >
                  {value}
                  {unit}
                </span>
              )}
              <div
                className={`w-full rounded-t-md ${d.isToday ? "bg-blue-500" : "bg-blue-100"}`}
                style={{ height: `${heightPct}%`, minHeight: value > 0 ? 6 : 2 }}
              />
            </div>
          );
        })}
      </div>

      {/* X axis labels */}
      <div className="absolute left-10 right-0 bottom-0 h-10 flex items-start justify-around gap-3 pt-2">
        {days.map((d) => (
          <div key={d.label} className="flex-1 flex flex-col items-center">
            <span
              className={`text-sm font-medium ${d.isToday ? "text-blue-500 font-bold" : "text-gray-600"}`}
            >
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadarChart({ metrics }: { metrics: RadarMetric[] }) {
  const size = 360;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 130;
  const max = 100;
  const n = metrics.length;
  const angle = (i: number) => -Math.PI / 2 + (2 * Math.PI * i) / n;

  const point = (i: number, value: number) => {
    const r = (value / max) * radius;
    return [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))];
  };

  const polygon = (values: number[]) =>
    values
      .map((v, i) => {
        const [x, y] = point(i, v);
        return `${x},${y}`;
      })
      .join(" ");

  const labelPos = (i: number) => {
    const r = radius + 22;
    return [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))];
  };

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[360px]">
        {/* Grid pentagons */}
        {gridLevels.map((lvl) => (
          <polygon
            key={lvl}
            points={Array.from({ length: n })
              .map((_, i) => {
                const [x, y] = point(i, lvl * max);
                return `${x},${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={1}
          />
        ))}

        {/* Spokes */}
        {Array.from({ length: n }).map((_, i) => {
          const [x, y] = point(i, max);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          );
        })}

        {/* Last week */}
        <polygon
          points={polygon(metrics.map((m) => m.lastWeek))}
          fill="rgba(147,197,253,0.25)"
          stroke="rgb(147,197,253)"
          strokeWidth={1.5}
        />

        {/* This week */}
        <polygon
          points={polygon(metrics.map((m) => m.thisWeek))}
          fill="rgba(59,130,246,0.18)"
          stroke="rgb(59,130,246)"
          strokeWidth={2}
        />
        {metrics.map((m, i) => {
          const [x, y] = point(i, m.thisWeek);
          return <circle key={i} cx={x} cy={y} r={4} fill="rgb(59,130,246)" />;
        })}

        {/* Labels */}
        {metrics.map((m, i) => {
          const [x, y] = labelPos(i);
          return (
            <text
              key={m.axis}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-600 text-[12px] font-medium"
            >
              {m.axis}
            </text>
          );
        })}
      </svg>

      <div className="flex items-center gap-6 mt-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-gray-600">이번주</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-200" />
          <span className="text-gray-600">지난주</span>
        </div>
      </div>
    </div>
  );
}

function WeeklyStatusBadge({
  tone,
  children,
}: {
  tone: "good" | "warn" | "bad";
  children: React.ReactNode;
}) {
  const color =
    tone === "good" ? "text-green-500" : tone === "warn" ? "text-orange-500" : "text-red-500";
  return <span className={`font-bold ${color}`}>{children}</span>;
}

function WeeklyView({ member }: { member: Member }) {
  const w = member.weekly;
  const [mode, setMode] = useState<WeeklyMode>("score");

  return (
    <div className="grid grid-cols-2 gap-5">
      {/* Left col */}
      <div className="space-y-5">
        {/* Weekly score summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-gray-900">주간 감정지수 점수 요약</h3>
              <p className="text-xs text-gray-500 mt-0.5">{w.rangeLabel}</p>
            </div>
            <div className="bg-gray-100 rounded-full p-1 flex">
              <button
                onClick={() => setMode("score")}
                className={`px-4 py-1 text-xs font-semibold rounded-full ${
                  mode === "score" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                점수
              </button>
              <button
                onClick={() => setMode("time")}
                className={`px-4 py-1 text-xs font-semibold rounded-full ${
                  mode === "time" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                시간
              </button>
            </div>
          </div>

          <div className="mt-5">
            <WeeklyBarChart days={w.days} mode={mode} />
          </div>

          <div className="grid grid-cols-4 gap-3 mt-6">
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-[11px] text-gray-400">평균 감정지수</p>
              <p className="text-lg font-bold text-orange-500 mt-1">{w.averageScore}점</p>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-[11px] text-gray-400">최고 감정지수</p>
              <p className="text-lg font-bold text-green-500 mt-1">{w.maxScore}점</p>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-[11px] text-gray-400">감정 상태</p>
              <p className="text-lg mt-1">
                <WeeklyStatusBadge tone={w.statusTone}>{w.statusLabel}</WeeklyStatusBadge>
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-[11px] text-gray-400">AI 경고</p>
              <p className="text-lg mt-1">
                <WeeklyStatusBadge tone={w.warningTone}>{w.warningLabel}</WeeklyStatusBadge>
              </p>
            </div>
          </div>
        </div>

        {/* Weekly summary list */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">주간 대화 내용 요약</h3>
            <span className="text-[11px] font-semibold text-white bg-blue-500 px-3 py-1.5 rounded-full">
              AI 분석
            </span>
          </div>
          <div className="space-y-4">
            {w.summaryItems.map((item, i) => {
              const color =
                item.tone === "bad"
                  ? "text-red-500"
                  : item.tone === "warn"
                    ? "text-orange-500"
                    : "text-gray-800";
              return (
                <div key={i} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
                  <p className={`text-sm font-semibold ${color}`}>{item.text}</p>
                  <p className="text-xs text-gray-400 mt-1.5">
                    {item.date} · {item.author}
                  </p>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-3 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl flex items-center justify-center gap-1.5">
            더보기 <span className="text-xs">↓</span>
          </button>
        </div>
      </div>

      {/* Right col */}
      <div className="space-y-5">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="font-bold text-gray-900">주간 감정지수 균형 레이더</h3>
              <p className="text-xs text-gray-500 mt-0.5">{w.rangeLabel}</p>
            </div>
            <span className="text-[11px] text-gray-400 mt-1">100점 만점 (낮을수록 위험)</span>
          </div>

          <div className="mt-2">
            <RadarChart metrics={w.radar} />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            {w.radar.map((m) => {
              const diff = m.thisWeek - m.lastWeek;
              const arrow = diff > 0 ? "▲" : diff < 0 ? "▼" : "-";
              const valueColor =
                m.thisWeek >= 80
                  ? "text-green-500"
                  : m.thisWeek >= 60
                    ? "text-orange-500"
                    : "text-red-500";
              return (
                <div key={m.axis} className="bg-gray-50 rounded-xl px-3 py-3">
                  <p className="text-xs text-gray-400">{m.axis}</p>
                  <p className={`text-2xl font-bold mt-1 ${valueColor}`}>{m.thisWeek}점</p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    지난주 대비 {diff === 0 ? "-" : `${arrow}${Math.abs(diff)}점`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MonthlyCalendarCell({ day }: { day: MonthlyView["days"][number] }) {
  if (day.isToday) {
    return (
      <div className="aspect-square rounded-lg bg-white border-2 border-blue-400 flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-blue-500">{day.day}</span>
        <span className="text-[10px] font-medium text-blue-500">오늘</span>
      </div>
    );
  }

  if (day.score === null) {
    return (
      <div className="aspect-square rounded-lg bg-gray-50 flex items-center justify-center">
        <span className="text-sm text-gray-400">{day.day}</span>
      </div>
    );
  }

  let bg = "bg-red-500";
  if (day.score >= 70) bg = "bg-green-500";
  else if (day.score >= 40) bg = "bg-amber-400";

  return (
    <div className={`aspect-square rounded-lg ${bg} flex flex-col items-center justify-center`}>
      <span className="text-sm font-bold text-white">{day.day}</span>
      <span className="text-[10px] font-medium text-white">{day.score}점</span>
    </div>
  );
}

function MonthlyEmptyCell({ day }: { day: number }) {
  return (
    <div className="aspect-square rounded-lg border border-dashed border-gray-200 flex flex-col items-center justify-center">
      <span className="text-sm text-gray-300">{day}</span>
      <span className="text-[10px] text-gray-300">대화 없음</span>
    </div>
  );
}

function MonthlyCalendar({ monthly }: { monthly: MonthlyView }) {
  const weekdayLabels = ["월", "화", "수", "목", "금", "토", "일"];

  // startWeekday: 0=Sun..6=Sat → convert to Mon-first index (0=Mon..6=Sun)
  const monStart = (monthly.startWeekday + 6) % 7;

  const cells: (MonthlyDay | null)[] = [];
  for (let i = 0; i < monStart; i++) cells.push(null);
  for (const d of monthly.days) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  // For day 6 in image it shows "대화 없음" with dashed border - treat score:null with day<=20 as "no chat" cell
  return (
    <div>
      <div className="grid grid-cols-7 gap-2 mb-3">
        {weekdayLabels.map((w) => (
          <div key={w} className="text-center text-xs text-gray-400 font-medium">
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((d, i) => {
          if (d === null) return <div key={`empty-${i}`} className="aspect-square" />;
          if (d.score === null && !d.isToday && d.day === 6)
            return <MonthlyEmptyCell key={d.day} day={d.day} />;
          return <MonthlyCalendarCell key={d.day} day={d} />;
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 text-[11px] text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-green-500" />
          <span>70-100점</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-amber-400" />
          <span>40-69점</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-red-500" />
          <span>0-39점</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border border-dashed border-gray-300" />
          <span>대화 없음</span>
        </div>
      </div>
    </div>
  );
}

function MonthlyTrendChart({ trend }: { trend: MonthlyView["weekTrend"] }) {
  const width = 420;
  const height = 240;
  const padTop = 30;
  const padBottom = 50;
  const padLeft = 44;
  const padRight = 20;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;
  const ticks = [0, 25, 50, 75, 100];
  const max = 100;

  const x = (i: number) => padLeft + (innerW * i) / Math.max(1, trend.length - 1);
  const y = (v: number) => padTop + innerH * (1 - v / max);

  const path = trend
    .map((t, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(t.score)}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={padLeft}
            x2={width - padRight}
            y1={y(t)}
            y2={y(t)}
            stroke="#f3f4f6"
            strokeWidth={1}
          />
          <text
            x={padLeft - 8}
            y={y(t)}
            textAnchor="end"
            dominantBaseline="middle"
            className="fill-gray-400 text-[10px]"
          >
            {t}점
          </text>
        </g>
      ))}

      <path d={path} fill="none" stroke="rgb(59,130,246)" strokeWidth={2} />

      {trend.map((t, i) => (
        <g key={t.label}>
          <circle cx={x(i)} cy={y(t.score)} r={4} fill="rgb(59,130,246)" />
          <text
            x={x(i)}
            y={y(t.score) - 10}
            textAnchor="middle"
            className="fill-blue-500 text-[11px] font-bold"
          >
            {t.score}점
          </text>
          <text
            x={x(i)}
            y={height - padBottom + 18}
            textAnchor="middle"
            className="fill-gray-600 text-[11px] font-medium"
          >
            {t.label}
          </text>
          <text
            x={x(i)}
            y={height - padBottom + 32}
            textAnchor="middle"
            className="fill-gray-400 text-[10px]"
          >
            {t.range}
          </text>
        </g>
      ))}
    </svg>
  );
}

const MONTHLY_TAG_TONE: Record<MonthlyView["tags"][number]["tone"], string> = {
  danger: "bg-red-50 text-red-600 border border-red-100",
  info: "bg-blue-50 text-blue-600 border border-blue-100",
  success: "bg-green-50 text-green-600 border border-green-100",
};

function MonthlyViewSection({ member }: { member: Member }) {
  const m = member.monthly;
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        {/* Calendar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900">{m.title}</h3>
          <p className="text-xs text-gray-500 mt-0.5 mb-5">{m.subtitle}</p>
          <MonthlyCalendar monthly={m} />
        </div>

        {/* Trend chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900">월간 감정지수 추이</h3>
          <p className="text-xs text-gray-500 mt-0.5">최근 4주 감정지수</p>

          <div className="mt-4">
            <MonthlyTrendChart trend={m.weekTrend} />
          </div>

          <div className="grid grid-cols-4 gap-3 mt-4 pt-5 border-t border-gray-100">
            <div>
              <p className="text-[11px] text-gray-400">최근 4주 평균 점수</p>
              <p className="mt-1">
                <span className="text-2xl font-bold text-blue-500">{m.averageScore}</span>
                <span className="text-sm text-blue-500 ml-0.5">점</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400">대화 일수</p>
              <p className="mt-1">
                <span className="text-2xl font-bold text-blue-500">{m.conversationDays}</span>
                <span className="text-sm text-blue-500 ml-0.5">점</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400">최고 점수</p>
              <p className="mt-1">
                <span className="text-2xl font-bold text-green-500">{m.maxScore}</span>
                <span className="text-sm text-green-500 ml-0.5">점</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400">최저 점수</p>
              <p className="mt-1">
                <span className="text-2xl font-bold text-red-500">{m.minScore}</span>
                <span className="text-sm text-red-500 ml-0.5">점</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Report */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900">{m.reportTitle}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{m.reportSubtitle}</p>

        <div className="border-t border-gray-100 mt-4 pt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {m.tags.map((t) => (
              <span
                key={t.text}
                className={`text-xs font-medium px-3 py-1.5 rounded-md ${MONTHLY_TAG_TONE[t.tone]}`}
              >
                {t.icon} {t.text}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {m.reportText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const member = members.find((m) => String(m.id) === id);
  if (!member) notFound();

  const [tab, setTab] = useState<ReportTab>("일간");

  const riskLabel = member.risk === "안정" ? "정상" : member.risk;
  const riskBadgeColor =
    member.risk === "안정"
      ? "bg-green-100 text-green-600"
      : member.risk === "주의"
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-600";

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <Link
            href="/dashboard/members"
            className="inline-flex items-center gap-1 text-sm text-blue-500 font-medium hover:underline mb-1"
          >
            <span aria-hidden>←</span>
            <span>인원관리로 돌아가기</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {member.name}님 {tab} 상세 분석
            </h1>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${riskBadgeColor}`}>
              {riskLabel}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-7">
          <button className="flex items-center gap-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-full px-4 py-1.5 hover:bg-gray-50">
            <span>📅</span>
            <span className="font-medium">2026. 05. 30</span>
            <span className="text-xs text-gray-400">▼</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-5">
        <div className="flex items-center gap-8 border-b border-gray-200">
          {(["일간", "주간", "월간"] as ReportTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative pb-3 text-sm font-semibold transition-colors ${
                tab === t ? "text-blue-500" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {tab === "일간" && <DailyView member={member} />}
      {tab === "주간" && <WeeklyView member={member} />}
      {tab === "월간" && <MonthlyViewSection member={member} />}
    </div>
  );
}
