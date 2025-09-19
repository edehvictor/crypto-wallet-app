import { cn } from "@/lib/utils";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

interface ProfileFieldProps {
  label: string;
  content: React.ReactNode;
  className?: string;
}

// Section component for grouping profile information
export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden shadow-sm bg-[#212121]",
        className
      )}
    >
      {title && (
        <h3 className="text-base sm:text-lg font-semibold font-jakarta text-gray-200 bg-[#303030] p-5 ">
          {title}
        </h3>
      )}
      <div className="px-3 py-4 text-slate-200 ">{children}</div>
    </div>
  );
};

export const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  content,
  className = "",
}) => {
  return (
    <div className={`font-jakarta ${className}`}>
      <p className="text-xs sm:text-sm font-medium text-gray-300 mb-3">
        {label}
      </p>
      <div>{content}</div>
    </div>
  );
};
