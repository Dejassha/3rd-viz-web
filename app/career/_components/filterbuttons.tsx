'use client';

interface FilterButtonsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { label: 'All Roles', value: 'all' },
  { label: 'Developer', value: 'developer' },
  { label: 'Design', value: 'design' },
  { label: 'Sales & Marketing', value: 'sales' },
  { label: 'Testing', value: 'testing' },
  { label: 'Operations', value: 'operations' },
];

export default function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === filter.value
              ? 'text-[#0D0F17]'
              : 'text-[#C2C6D6] border border-[#32353C] bg-transparent hover:border-[#ADC6FF]/50 hover:text-white'
          }`}
          style={
            activeFilter === filter.value
              ? { background: 'linear-gradient(to right, #ADC6FF, #4D8EFF)' }
              : {}
          }
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}