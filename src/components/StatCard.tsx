
import { memo } from "react";
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  label: string;
  value: string | number;
  loading?: boolean;
  className?: string;
}

const StatCard = memo(({
  icon: Icon,
  iconBgColor,
  iconColor,
  label,
  value,
  loading = false,
  className,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        'bg-card rounded-xl p-4 sm:p-5 shadow-[var(--shadow-soft)] border border-border flex items-center gap-3 sm:gap-4 transition-all duration-300 hover:shadow-[var(--shadow-hover)]',
        className
      )}
    >
      <div
        className={cn(
          'p-2.5 sm:p-3 rounded-lg flex items-center justify-center',
          iconBgColor
        )}
      >
        <Icon className={cn('w-5 h-5 sm:w-6 sm:h-6', iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm text-muted-foreground truncate">
          {label}
        </p>
        {loading ? (
          <div className="h-6 sm:h-7 w-16 bg-muted animate-pulse rounded mt-0.5" />
        ) : (
          <p className="text-lg sm:text-xl font-bold text-foreground">
            {value}
          </p>
        )}
      </div>
    </div>
  );
});

StatCard.displayName = "StatCard";

export default StatCard;
