"use client";

import { useState } from "react";

type FilterType = "전체" | "대화 필요" | "주의" | "정상";

interface Member {
  id: number;
  name: string;
  initial: string;
  color: string;
  age: number;
  gender: string;
  lastChat: string;
  chatCount: number;
  weeklyStatus: string;
  weeklyStatusColor: string;
  todayStatus: string;
  todayStatusColor: string;
  riskLevel: string;
  riskLevelColor: string;
  memo: string;
}

const members: Member[] = [
  {
    id: 1,
    name: "김순자",
    initial: "김",
    color: "bg-blue-500",
    age: 78,
    gender: "여",
    lastChat: "오늘 10:32",
    chatCount: 5,
    weeklyStatus: "정상",
    weeklyStatusColor: "text-green-600 bg-green-50 border-green-200",
    todayStatus: "정상",
    todayStatusColor: "text-green-600 bg-green-50 border-green-200",
    riskLevel: "정상",
    riskLevelColor: "text-green-600 bg-green-50 border-green-200",
    memo: "혈압약 복용 확인 필요",
  },
  {
    id: 2,
    name: "박영수",
    initial: "박",
    color: "bg-blue-500",
    age: 82,
    gender: "남",
    lastChat: "오늘 09:15",
    chatCount: 4,
    weeklyStatus: "정상",
    weeklyStatusColor: "text-green-600 bg-green-50 border-green-200",
    todayStatus: "정상",
    todayStatusColor: "text-green-600 bg-green-50 border-green-200",
    riskLevel: "정상",
    riskLevelColor: "text-green-600 bg-green-50 border-green-200",
    memo: "손자 방문 예정 (토요일)",
  },
  {
    id: 3,
    name: "이복순",
    initial: "이",
    color: "bg-amber-500",
    age: 75,
    gender: "여",
    lastChat: "어제 14:20",
    chatCount: 2,
    weeklyStatus: "주의",
    weeklyStatusColor: "text-amber-600 bg-amber-50 border-amber-200",
    todayStatus: "주의",
    todayStatusColor: "text-amber-600 bg-amber-50 border-amber-200",
    riskLevel: "주의",
    riskLevelColor: "text-amber-600 bg-amber-50 border-amber-200",
    memo: "식사량 감소 - 체크 필요",
  },
  {
    id: 4,
    name: "최기수",
    initial: "최",
    color: "bg-amber-500",
    age: 86,
    gender: "남",
    lastChat: "3일 전",
    chatCount: 1,
    weeklyStatus: "대화 필요",
    weeklyStatusColor: "text-amber-600 bg-amber-50 border-amber-200",
    todayStatus: "위험",
    todayStatusColor: "text-red-600 bg-red-50 border-red-200",
    riskLevel: "위험",
    riskLevelColor: "text-red-600 bg-red-50 border-red-200",
    memo: "낙상 이력 있음, 방문 예정",
  },
  {
    id: 5,
    name: "정말순",
    initial: "정",
    color: "bg-green-500",
    age: 79,
    gender: "여",
    lastChat: "오늘 11:05",
    chatCount: 6,
    weeklyStatus: "정상",
    weeklyStatusColor: "text-green-600 bg-green-50 border-green-200",
    todayStatus: "정상",
    todayStatusColor: "text-green-600 bg-green-50 border-green-200",
    riskLevel: "정상",
    riskLevelColor: "text-green-600 bg-green-50 border-green-200",
    memo: "이상 무",
  },
  {
    id: 6,
    name: "한동수",
    initial: "한",
    color: "bg-amber-500",
    age: 83,
    gender: "남",
    lastChat: "어제 16:40",
    chatCount: 3,
    weeklyStatus: "주의",
    weeklyStatusColor: "text-amber-600 bg-amber-50 border-amber-200",
    todayStatus: "주의",
    todayStatusColor: "text-amber-600 bg-amber-50 border-amber-200",
    riskLevel: "주의",
    riskLevelColor: "text-amber-600 bg-amber-50 border-amber-200",
    memo: "우울감 호소 - 상담 예약",
  },
  {
    id: 7,
    name: "오영희",
    initial: "오",
    color: "bg-green-500",
    age: 71,
    gender: "여",
    lastChat: "오늘 08:55",
    chatCount: 7,
    weeklyStatus: "정상",
    weeklyStatusColor: "text-green-600 bg-green-50 border-green-200",
    todayStatus: "정상",
    todayStatusColor: "text-green-600 bg-green-50 border-green-200",
    riskLevel: "정상",
    riskLevelColor: "text-green-600 bg-green-50 border-green-200",
    memo: "이상 무",
  },
  {
    id: 8,
    name: "신철수",
    initial: "신",
    color: "bg-red-500",
    age: 88,
    gender: "남",
    lastChat: "5일 전",
    chatCount: 0,
    weeklyStatus: "대화 필요",
    weeklyStatusColor: "text-amber-600 bg-amber-50 border-amber-200",
    todayStatus: "위험",
    todayStatusColor: "text-red-600 bg-red-50 border-red-200",
    riskLevel: "위험",
    riskLevelColor: "text-red-600 bg-red-50 border-red-200",
    memo: "연락 두절 - 긴급 방문 필요",
  },
];

function ChatDots({ count }: { count: number }) {
  if (count === 0) return <span className="text-xs text-gray-400">0회</span>;

  const maxDots = 5;
  const displayDots = Math.min(count, maxDots);
  const hasMore = count > maxDots;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: displayDots }).map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-blue-500" />
        ))}
        {hasMore && <span className="text-blue-500 text-xs ml-0.5">+</span>}
      </div>
      <span className="text-xs text-gray-400 mt-0.5">{count}회</span>
    </div>
  );
}

export default function MembersPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filters: FilterType[] = ["전체", "대화 필요", "주의", "정상"];

  const filteredMembers = members.filter((m) => {
    if (activeFilter === "전체") return true;
    if (activeFilter === "대화 필요") return m.weeklyStatus === "대화 필요";
    if (activeFilter === "주의") return m.riskLevel === "주의";
    if (activeFilter === "정상") return m.riskLevel === "정상";
    return true;
  }).filter((m) => {
    if (!searchQuery) return true;
    return m.name.includes(searchQuery);
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">인원관리</h1>
        <p className="text-sm text-gray-500 mt-1">총 15명 관리 중 · 오늘 대화 완료 8명</p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="이름으로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm w-52 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium border-r border-gray-200 last:border-r-0 ${
                  activeFilter === filter
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <button className="text-sm text-gray-500 flex items-center gap-1">
          최근 대화순 <span className="text-xs">▼</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">이름</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">나이 / 성별</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">마지막 대화(주간)</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">이번 주 대화 횟수</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">오늘 상태</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">위험 단계</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">메모</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 ${member.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                      {member.initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {member.age} / {member.gender}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{member.lastChat}</td>
                <td className="py-4 px-4">
                  <ChatDots count={member.chatCount} />
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border ${member.weeklyStatusColor}`}>
                    {member.weeklyStatus}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border ${member.riskLevelColor}`}>
                    {member.riskLevel}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600 max-w-48">{member.memo}</td>
                <td className="py-4 px-4">
                  <button className="text-sm text-blue-500 border border-blue-200 rounded-lg px-4 py-1.5 hover:bg-blue-50 font-medium">
                    상세보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-4 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">전체 15개 중 1-8 표시</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 text-sm text-gray-400 rounded">이전</button>
            <button
              className={`w-8 h-8 rounded text-sm font-medium ${currentPage === 1 ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button
              className={`w-8 h-8 rounded text-sm font-medium ${currentPage === 2 ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 rounded hover:bg-gray-100">다음</button>
          </div>
        </div>
      </div>
    </div>
  );
}
