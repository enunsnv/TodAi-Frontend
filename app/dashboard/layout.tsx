"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      <aside className="w-60 bg-slate-800 text-slate-200 flex flex-col shrink-0">
        <div className="p-4 flex items-center gap-3 border-b border-slate-700">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">•••</span>
          </div>
          <div>
            <p className="font-semibold text-sm">서비스명</p>
            <p className="text-xs text-slate-400">사회복지사 관리 시스템</p>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3 border-b border-slate-700">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            김
          </div>
          <div>
            <p className="text-sm font-medium">김복지</p>
            <p className="text-xs text-slate-400">사회복지사</p>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <p className="text-xs text-slate-400 mb-2">대시보드</p>
          <ul className="space-y-1 mb-4">
            <li>
              <Link
                href="/dashboard"
                className={`block rounded px-3 py-2 text-sm font-medium ${pathname === "/dashboard" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
              >
                • 전체현황
              </Link>
            </li>
          </ul>

          <div className="space-y-1 mb-4">
            <Link
              href="/dashboard/members"
              className={`flex items-center gap-2 rounded px-3 py-2 text-sm font-medium ${pathname === "/dashboard/members" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
            >
              <span>▸</span> 인원관리
            </Link>
            <ul className="ml-4 space-y-1 text-sm">
              <li>
                <Link
                  href="/dashboard/members/analysis"
                  className={`block py-1 ${pathname === "/dashboard/members/analysis" ? "text-blue-400 font-medium" : "text-slate-300 hover:text-white"}`}
                >
                  • 상세분석
                </Link>
              </li>
              <li className="py-1 text-slate-300">• 방문 일정</li>
            </ul>
          </div>

          <p className="text-xs text-slate-400 mb-2">서비스 연계</p>
          <ul className="ml-4 space-y-1 text-sm text-slate-300 mb-4">
            <li className="py-1">• 담당명단</li>
            <li className="py-1">• 사용자 등록</li>
            <li className="py-1">• 앱 수동설정</li>
          </ul>

          <p className="text-xs text-slate-400 mb-2">설정</p>
          <ul className="ml-4 space-y-1 text-sm text-slate-300">
            <li className="py-1">• 환경 설정</li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}
