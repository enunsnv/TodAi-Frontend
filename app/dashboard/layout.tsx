"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href?: string;
}

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: "대시보드",
    items: [{ label: "인원관리", href: "/dashboard/members" }],
  },
  {
    title: "서비스 연계",
    items: [
      { label: "담당명단", href: "/dashboard/roster" },
      { label: "사용자 등록", href: "/dashboard/users/new" },
      { label: "앱 수동설정" },
    ],
  },
  {
    title: "설정",
    items: [{ label: "환경 설정" }],
  },
];

function NavRow({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  const baseClass =
    "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ease-out";
  const stateClass = active
    ? "bg-blue-600 text-white shadow-sm"
    : item.href
      ? "text-slate-300 hover:bg-slate-700/70 hover:text-white hover:translate-x-0.5"
      : "text-slate-400/80 cursor-not-allowed";

  const content = (
    <>
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-r-full bg-white transition-all duration-200 ${
          active ? "h-5 opacity-100" : "h-0 opacity-0"
        }`}
      />
      <span
        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
          active ? "bg-white scale-110" : "bg-current"
        } ${item.href && !active ? "group-hover:scale-125" : ""}`}
      />
      <span>{item.label}</span>
    </>
  );

  if (item.href) {
    return (
      <Link href={item.href} className={`${baseClass} ${stateClass}`}>
        {content}
      </Link>
    );
  }

  return <div className={`${baseClass} ${stateClass}`}>{content}</div>;
}

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
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center transition-transform duration-200 hover:scale-105">
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
          {navSections.map((section) => (
            <div key={section.title} className="mb-5 last:mb-0">
              <p className="text-xs text-slate-400 mb-2 px-3">{section.title}</p>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <NavRow item={item} active={pathname === item.href} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
    </div>
  );
}
