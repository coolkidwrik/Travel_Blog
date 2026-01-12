'use client';

type TabsProps = {
  activeTab: string;
  onTabChangeAction: (tab: string) => void;
};

const tabs = [
  { id: 'trip', label: 'Trip Details' },
  { id: 'gallery', label: 'Gallery' },
];

export default function Tabs({ activeTab, onTabChangeAction }: TabsProps) {
  return (
    <div className="flex gap-4 border-b border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChangeAction(tab.id)}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === tab.id
              ? 'text-white border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}