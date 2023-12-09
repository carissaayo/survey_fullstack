import React from "react";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  style: object;
  className: string;
}
export default function DashboardCard({
  title,
  children,
  style = {},
  className = "",
}: DashboardCardProps) {
  return (
    <div
      className={
        "bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down " +
        className
      }
      style={style}
    >
      {title && <h3 className="text-2xl font-semibold">{title}</h3>}
      {children}
    </div>
  );
}
