import { Email } from "@/types/email";
import Card from "../ui/Card";
import CategoryBadge from "./CategoryBadge";

interface EmailCardProps {
  email: Email;
  onClick?: () => void;
}

export default function EmailCard({ email, onClick }: EmailCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Card
      className="p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm truncate">{email.from}</h3>
            {email.category && <CategoryBadge category={email.category} />}
          </div>
          <p className="font-medium text-gray-900 mb-1 truncate">
            {email.subject || "(No subject)"}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">{email.snippet}</p>
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {formatDate(email.date)}
        </span>
      </div>
    </Card>
  );
}
