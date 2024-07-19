import React, { useState } from 'react';
import { categoryData } from './categoryData';
import './homeCategories.css';

interface TabElement {
    title: string;
    img: string;
}
  
interface Tab {
    active_tab: string;
    title: string;
    tabElements: TabElement[];
}

export const HomeCategories = () => {
    const [activeTab, setActiveTab] = useState<string>('housing');
    const [tabs, setTabs] = useState<Tab[]>(categoryData);

    const handleTabTitleClick = (tab: Tab) => {
        if (activeTab !== tab.active_tab) {
          setActiveTab(tab.active_tab);
        }
      };

    return (
        <div className='main-container'>
        <div className="buttons-list">
          {tabs.map(tab => (
            <button
              key={tab.active_tab}
              className={`category-btn ${activeTab === tab.active_tab ? 'active' : ''}`}
              onClick={() => handleTabTitleClick(tab)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="tab-elements-row">
          {tabs.map(tab => (
            <div
              key={tab.active_tab}
              className={`tab-elements ${activeTab === tab.active_tab ? 'act' : ''}`}
            >
              {activeTab === tab.active_tab && (
                <div className='elements-list'>
                  {tab.tabElements.map(element => (
                    <div className="element-item" key={element.title}>
                      <img src={element.img} alt={element.title} />
                      <span>{element.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
}
