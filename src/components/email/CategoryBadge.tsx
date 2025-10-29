import { EmailCategory } from "@/types/email";
import Badge from "../ui/Badge";

interface CategoryBadgeProps {
  category: EmailCategory;
}

const categoryConfig: Record<
  EmailCategory,
  {
    variant: "default" | "success" | "warning" | "danger" | "info";
    label: string;
  }
> = {
  Important: { variant: "danger", label: "Important" },
  Promotional: { variant: "warning", label: "Promotional" },
  Social: { variant: "info", label: "Social" },
  Marketing: { variant: "default", label: "Marketing" },
  Spam: { variant: "danger", label: "Spam" },
  General: { variant: "default", label: "General" },
};

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const config = categoryConfig[category];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
