import { Tabs } from "@/components/ui/Tabs";
import type { TemplateCategory } from "@/types";

type Value = TemplateCategory | "all";

interface CategoryFilterProps {
  value: Value;
  counts: Record<Value, number>;
  onChange: (v: Value) => void;
}

export function CategoryFilter({ value, counts, onChange }: CategoryFilterProps) {
  return (
    <Tabs<Value>
      variant="pill"
      value={value}
      onChange={onChange}
      items={[
        { value: "all", label: "All", count: counts.all },
        { value: "lead_gen", label: "Lead Gen", count: counts.lead_gen },
        { value: "ecommerce", label: "Ecommerce", count: counts.ecommerce },
        { value: "affiliate", label: "Affiliate", count: counts.affiliate },
        { value: "high_ticket", label: "High Ticket", count: counts.high_ticket },
      ]}
    />
  );
}
