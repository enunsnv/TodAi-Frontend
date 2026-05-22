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
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-sm">•••</span>
          </div>
          <div>
            <p className="font-semibold text-sm">서비스명</p>
            <p className="text-xs text-slate-400">사회복지사 관리 시스템</p>
          </div>
        </div>

        <div className="px-4 pb-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            김
          </div>
          <div>
            <p className="text-sm font-semibold">김복지</p>
            <p className="text-xs text-slate-400">사회복지사</p>
          </div>
        </div>

        <nav className="flex-1 px-4 pb-4 text-sm">
          <p className="text-xs text-slate-400 mb-2">대시보드</p>
          <ul className="space-y-1 mb-5">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium ${pathname === "/dashboard" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                전체현황
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/members"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium ${pathname === "/dashboard/members" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
              >
                <span className="text-xs">›</span>
                인원관리
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/members/analysis"
                className={`flex items-center gap-2 rounded-lg pl-8 pr-3 py-1.5 ${pathname === "/dashboard/members/analysis" ? "text-blue-400 font-medium" : "text-slate-300 hover:text-white"}`}
              >
                <span className="w-1 h-1 rounded-full bg-current"></span>
                상세분석
              </Link>
            </li>
            <li className="flex items-center gap-2 pl-3 pr-3 py-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              방문 일정
            </li>
          </ul>

          <p className="text-xs text-slate-400 mb-2">서비스 연계</p>
          <ul className="space-y-1 mb-5">
            <li>
              <Link
                href="/dashboard/roster"
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 font-medium ${pathname === "/dashboard/roster" ? "text-blue-400" : "text-slate-300 hover:text-white"}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                담당명단
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/users/new"
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 font-medium ${pathname === "/dashboard/users/new" ? "text-blue-400" : "text-slate-300 hover:text-white"}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                사용자 등록
              </Link>
            </li>
            <li className="flex items-center gap-2 px-3 py-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              앱 수동설정
            </li>
          </ul>

          <p className="text-xs text-slate-400 mb-2">설정</p>
          <ul className="space-y-1">
            <li className="flex items-center gap-2 px-3 py-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              환경 설정
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
    </div>
  );
}
