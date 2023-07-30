import React, { ReactNode } from 'react';

interface TabItemProps {
  title: string;
  children: ReactNode;
}

const TabItem: React.FC<TabItemProps> = ({ children }) => {
  return (
    <div className="tab-content">
      {children}
    </div>
  );
};

interface TabsProps {
  children: React.ReactElement<TabItemProps>[];
  activeTab?: number;
  setActiveTabIndex: any;
  activeTabIndex: any;
}

const Tabs: React.FC<TabsProps> = ({ children, setActiveTabIndex, activeTabIndex = 0 }: any) => {
  return (
    <div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
        <ul className="flex flex-wrap">
          {React.Children.map(children, (child, index) => {
            const isActive = index === activeTabIndex;
            return (
              <li className="mr-2">
                <button
                  className={`inline-block p-4 ${isActive
                    ? 'text-slate-900 border-b-2 border-slate-500 dark:text-slate-200 dark:border-slate-400 bg-slate-100 dark:bg-slate-700'
                    : 'border-b-2 border-transparent hover:text-gray-600 hover:border-slate-400 dark:hover:text-gray-300'
                    }`}
                  onClick={() => setActiveTabIndex(index)}
                >
                  {child.props.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {children[activeTabIndex]}
    </div>
  );
};

export { Tabs, TabItem };
