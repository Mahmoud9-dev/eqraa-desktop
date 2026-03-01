import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconButtonProps {
  to?: string;
  href?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  'aria-label'?: string;
}

const IconButton = ({
  to,
  href,
  icon: Icon,
  iconBgColor = 'bg-primary/10 dark:bg-primary/20',
  iconColor = 'text-primary',
  label,
  onClick,
  disabled = false,
  loading = false,
  className,
  'aria-label': ariaLabel,
}: IconButtonProps) => {
  const baseClasses =
    'group relative flex flex-col items-center justify-center p-4 sm:p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 min-h-[120px] sm:min-h-[140px] w-full';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const loadingClasses = loading ? 'opacity-75 cursor-wait' : '';

  const content = (
    <div
      className={cn(baseClasses, disabledClasses, loadingClasses, className)}
    >
      <div
        className={cn(
          'mb-3 sm:mb-4 h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-105',
          iconBgColor
        )}
      >
        {loading ? (
          <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        ) : (
          <Icon
            className={cn(
              'w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300',
              iconColor
            )}
          />
        )}
      </div>

      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-foreground text-center group-hover:text-primary transition-colors duration-300">
        {label}
      </h3>
    </div>
  );

  if (to || href) {
    const linkTo = to || href || '/';

    if (disabled) {
      return (
        <span aria-disabled="true" aria-label={ariaLabel || label}>
          {content}
        </span>
      );
    }

    return (
      <Link
        to={linkTo}
        aria-label={ariaLabel || label}
        aria-busy={loading}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel || label}
      aria-busy={loading}
      aria-disabled={disabled}
      className={cn(
        'border-none bg-transparent cursor-pointer',
        disabled && 'cursor-not-allowed'
      )}
    >
      {content}
    </button>
  );
};

export default IconButton;
