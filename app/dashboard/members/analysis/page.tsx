"use client";

import Link from "next/link";
import { members, type BarData, type RiskLevel } from "./_data";

function BarChart({ bars }: { bars: BarData }) {
  const categories = [
    { key: "isolation", label: "고립" },
    { key: "health", label: "건강" },
    { key: "vitality", label: "활력" },
    { key: "emotion", label: "감정" },
    { key: "cognition", label: "인지" },
  ] as const;

  const getBarColor = (value: number) => {
    if (value >= 4) return "bg-emerald-400";
    if (value >= 3) return "bg-amber-400";
    if (value >= 2) return "bg-orange-400";
    return "bg-red-400";
  };

  return (
    <div className="flex items-end gap-1.5">
      {categories.map((cat) => {
        const value = bars[cat.key];
        return (
          <div key={cat.key} className="flex flex-col items-center gap-1">
            <div className="flex flex-col-reverse">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3 ${i < value ? getBarColor(value) : "bg-gray-200"} ${i === 0 ? "rounded-b-sm" : ""} ${i === 4 ? "rounded-t-sm" : ""}`}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-400">{cat.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function RiskBadge({ level }: { level: RiskLevel }) {
  const config = {
    긴급: { dot: "bg-red-500", text: "text-red-500" },
    주의: { dot: "bg-amber-400", text: "text-amber-500" },
    안정: { dot: "bg-green-500", text: "text-green-500" },
  };

  const { dot, text } = config[level];

  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3 h-3 rounded-full ${dot}`} />
      <span className={`text-sm font-semibold ${text}`}>{level}</span>
    </div>
  );
}

function getBorderColor(risk: RiskLevel) {
  switch (risk) {
    case "긴급":
      return "border-l-red-500";
    case "주의":
      return "border-l-amber-400";
    case "안정":
      return "border-l-green-500";
  }
}

export default function AnalysisPage() {
  const urgentCount = members.filter((m) => m.risk === "긴급").length;
  const cautionCount = members.filter((m) => m.risk === "주의").length;
  const stableCount = members.filter((m) => m.risk === "안정").length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">상세분석 목록</h1>
          <p className="text-sm text-gray-500 mt-1">담당 어르신 15명의 실시간 정서 상태</p>
        </div>
        <p className="text-sm text-gray-400">2026.04.03 금요일</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-baseline gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            <span className="text-3xl font-bold text-red-500 ml-1">{urgentCount}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">긴급 관찰</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-baseline gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            <span className="text-3xl font-bold text-amber-500 ml-1">{cautionCount}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">주의 관찰</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-baseline gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            <span className="text-3xl font-bold text-green-600 ml-1">{stableCount}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">안정</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-baseline gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-800 inline-block" />
            <span className="text-3xl font-bold text-gray-800 ml-1">15</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">전체 인원</p>
        </div>
      </div>

      {/* List Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-900">상세분석 목록</h2>
        <span className="text-sm text-blue-500">긴급 순으로 정렬됨</span>
      </div>

      {/* Member List */}
      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member.id}
            className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${getBorderColor(member.risk)} flex items-center gap-6`}
          >
            <div
              className={`w-14 h-14 rounded-full ${member.avatarColor} flex items-center justify-center text-xl font-bold shrink-0`}
            >
              {member.initial}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-gray-900">
                {member.name} ({member.age}세)
              </p>
              <p className="text-sm text-gray-400 mt-0.5">마지막 연락: {member.lastContact}</p>
              <div className="flex gap-2 mt-2">
                {member.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0">
              <BarChart bars={member.bars} />
            </div>

            <div className="shrink-0 w-16 flex justify-center">
              <RiskBadge level={member.risk} />
            </div>

            <Link
              href={`/dashboard/members/analysis/${member.id}`}
              className="shrink-0 bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-slate-700 flex items-center gap-1.5"
            >
              📋 리포트
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
