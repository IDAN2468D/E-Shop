import React from 'react';
import { Bell, Moon, Globe, ChevronLeft } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-6 pt-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">הגדרות</h1>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                        <Bell className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-gray-800">התראות</span>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-rose-500">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                </div>
            </div>

            <div className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-500">
                        <Moon className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-gray-800">מצב לילה</span>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                </div>
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                        <Globe className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-gray-800">שפה</span>
                </div>
                <span className="text-gray-400 text-sm flex items-center gap-1">
                    עברית <ChevronLeft className="h-4 w-4" />
                </span>
            </div>
        </div>

        <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">גרסה 1.0.0</p>
        </div>
      </div>
    </div>
  );
};