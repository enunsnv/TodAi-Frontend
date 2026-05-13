"use client";

import { useState } from "react";

const caseList = [
  {
    id: "C-2024-041",
    name: "박○○ 어르신",
    initial: "박",
    color: "bg-purple-500",
    status: "위기",
    statusColor: "text-red-500",
    lastVisit: "2일 전",
    nextVisit: "오늘 오후 2시",
    risk: 88,
    service: "방문요양",
  },
  {
    id: "C-2024-028",
    name: "김○○ 어르신",
    initial: "김",
    color: "bg-blue-500",
    status: "주의",
    statusColor: "text-amber-500",
    lastVisit: "5일 전",
    nextVisit: "내일 오전 10시",
    risk: 62,
    service: "식사배달",
  },
  {
    id: "C-2024-015",
    name: "이○○ 어르신",
    initial: "이",
    color: "bg-green-500",
    status: "안정",
    statusColor: "text-green-500",
    lastVisit: "3일 전",
    nextVisit: "다음주 월요일",
    risk: 28,
    service: "의료지원",
  },
  {
    id: "C-2024-033",
    name: "최○○ 어르신",
    initial: "최",
    color: "bg-orange-500",
    status: "주의",
    statusColor: "text-amber-500",
    lastVisit: "오늘 오전",
    nextVisit: "3일 후",
    risk: 55,
    service: "정서지원",
  },
];

function RiskBar({ value }: { value: number }) {
  const getColor = () => {
    if (value >= 70) return "bg-red-500";
    if (value >= 50) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${getColor()}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={`text-sm font-medium ${value >= 70 ? "text-red-500" : value >= 50 ? "text-amber-500" : "text-green-500"}`}>
        {value}
      </span>
    </div>
  );
}

function CircularProgress({ percent, label, count }: { percent: number; label: string; count: string }) {
  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" stroke="#e5e7eb" strokeWidth="4" fill="none" />
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#3b82f6"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
          {percent}%
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{count}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-900">케이스 현황 대시보드</h1>
          <p className="text-sm text-gray-500">2026년 5월 2일 금요일</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">34</span>
              <span className="text-xs text-blue-500 font-medium">+2 신규</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">담당 사례 수</p>
            <p className="text-xs text-green-600 mt-1">↑ 지난주 대비 6.3% 증가</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">13/15</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">목표 87%</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">이번 주 방문 완료</p>
            <p className="text-xs text-green-600 mt-1">↑ 지난주 대비 8.3% 증가</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">3</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">즉시 대응</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">위기 사례</p>
            <p className="text-xs text-red-600 mt-1">↓ 지난주 대비 1건 증가</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">21</span>
              <span className="text-xs text-blue-500 font-medium">+5 이번 주</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">서비스 연계 건수</p>
            <p className="text-xs text-green-600 mt-1">↑ 지난주 대비 31% 증가</p>
          </div>
        </div>

        {/* Weekly Goals & Notices */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-bold text-gray-900">주간 목표 달성</h2>
                <p className="text-xs text-gray-500">이번 주 업무 목표</p>
              </div>
              <button className="text-xs text-blue-500 border border-blue-200 rounded-full px-3 py-1">조정</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <CircularProgress percent={87} label="방문 완료" count="13/15건" />
                <span className="text-2xl font-bold text-blue-500">13</span>
              </div>
              <div className="flex items-center justify-between">
                <CircularProgress percent={60} label="상담 진행" count="18/30건" />
                <span className="text-2xl font-bold text-blue-500">18</span>
              </div>
              <div className="flex items-center justify-between">
                <CircularProgress percent={70} label="서비스 연계" count="21/30건" />
                <span className="text-2xl font-bold text-blue-500">21</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-bold text-gray-900">특이사항</h2>
                <p className="text-xs text-gray-500">이번 주 업무 목표</p>
              </div>
              <button className="text-xs text-blue-500 border border-blue-200 rounded-full px-3 py-1">조정</button>
            </div>
            <div className="border-2 border-red-200 bg-red-50 rounded-lg p-4 inline-block">
              <p className="text-red-600 font-medium text-sm flex items-center gap-2">
                <span className="w-5 h-5 bg-red-500 rounded text-white flex items-center justify-center text-xs">!</span>
                신철수 어르신 연락 필요
              </p>
            </div>
          </div>
        </div>

        {/* Middle Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-3xl font-bold text-blue-500">18건</p>
                <p className="text-sm text-gray-500">이번 주 상담</p>
              </div>
              <span className="text-xs text-blue-500 font-medium">+3건</span>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600">기록 보기</button>
              <button className="flex-1 bg-blue-500 text-white rounded-lg py-2 text-sm font-medium">상담 등록</button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-3xl font-bold text-red-500">3건</p>
                <p className="text-sm text-gray-500">위기 사례</p>
              </div>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">즉시 대응</span>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600">사례 보기</button>
              <button className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm font-medium">긴급 연락</button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-3xl font-bold text-blue-500">86.7%</p>
                <p className="text-sm text-gray-500">방문 완료율</p>
              </div>
              <span className="text-xs text-green-500 font-medium">+4.2%</span>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600">미완료 보기</button>
              <button className="flex-1 bg-blue-500 text-white rounded-lg py-2 text-sm font-medium">방문 등록</button>
            </div>
          </div>
        </div>

        {/* Case Table */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-bold text-gray-900">담당 목록</h2>
              <p className="text-xs text-gray-500">최근 활동 기준 정렬</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="사례 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-44 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm font-medium">
                + 새 사례
              </button>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 text-sm font-medium text-gray-500">이름</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">상태</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">마지막 방문</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">다음 방문 예정</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">위험도</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">담당 서비스</th>
                <th className="py-3"></th>
              </tr>
            </thead>
            <tbody>
              {caseList.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                        {item.initial}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400">#{item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`text-sm font-medium ${item.statusColor}`}>
                      • {item.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-600">{item.lastVisit}</td>
                  <td className="py-3 text-sm text-gray-600">{item.nextVisit}</td>
                  <td className="py-3">
                    <RiskBar value={item.risk} />
                  </td>
                  <td className="py-3">
                    <span className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600">
                      {item.service}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-xs border border-gray-200 rounded px-3 py-1 text-gray-600 hover:bg-gray-100">
                      상세
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">전체 15개 중 1-4 표시</p>
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
              <button
                className={`w-8 h-8 rounded text-sm font-medium ${currentPage === 3 ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 rounded hover:bg-gray-100">다음</button>
            </div>
          </div>
        </div>
    </div>
  );
}
