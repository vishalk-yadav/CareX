import React, { useState } from 'react';
import { useCareX } from '../../context/useCareX';
import type { NotificationCategory } from '../../types';
import {
  Bell,
  CheckCheck,
  Trash2,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Shield,
  Heart,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const {
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    setActiveTab
  } = useCareX();

  const [activeFilter, setActiveFilter] = useState<'all' | NotificationCategory>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'safety') return n.category === 'safety' || n.category === 'emergency';
    return n.category === activeFilter;
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />;
    }
  };

  const getSeverityBg = (severity: string, isRead: boolean) => {
    if (isRead) {
      return 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-90';
    }
    switch (severity) {
      case 'critical':
        return 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50';
      case 'warning':
        return 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50';
      case 'success':
        return 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50';
      default:
        return 'bg-sky-50/70 dark:bg-sky-950/20 border-sky-200 dark:border-sky-900/50';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'emergency':
        return 'Critical Safety';
      case 'safety':
        return 'Safety Protocol';
      case 'health':
        return 'Health Insight';
      case 'system':
        return 'System & Sensors';
      default:
        return 'Notification';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/50 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Notifications & Safety Logs
                {unreadNotificationCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60">
                    {unreadNotificationCount} unread
                  </span>
                )}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Live chronological updates on safety triggers, vitals alerts, and sensor telemetry.
              </p>
            </div>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2">
          {unreadNotificationCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <CheckCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors cursor-pointer"
              title="Clear all notifications"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm scrollbar-none">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl font-medium transition-colors shrink-0 cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setActiveFilter('safety')}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-medium transition-colors shrink-0 cursor-pointer ${
            activeFilter === 'safety'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-rose-500" />
          Safety & Emergency
        </button>
        <button
          onClick={() => setActiveFilter('health')}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-medium transition-colors shrink-0 cursor-pointer ${
            activeFilter === 'health'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          <Heart className="w-3.5 h-3.5 text-sky-500" />
          Health Insights
        </button>
        <button
          onClick={() => setActiveFilter('system')}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-medium transition-colors shrink-0 cursor-pointer ${
            activeFilter === 'system'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          System Telemetry
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">All Clear</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
              There are no active alerts or unread notifications in this category. CareX sensors and emergency systems are monitoring normally.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 relative ${getSeverityBg(
                notif.severity,
                notif.isRead
              )}`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="mt-0.5">{getSeverityIcon(notif.severity)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {getCategoryLabel(notif.category)}
                      </span>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" title="Unread" />
                      )}
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                      {notif.timestamp}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-1">
                    {notif.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {notif.message}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/60">
                    <div>
                      {notif.actionTab && (
                        <button
                          onClick={() => {
                            if (!notif.isRead) markNotificationAsRead(notif.id);
                            if (notif.actionTab) setActiveTab(notif.actionTab);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 group cursor-pointer"
                        >
                          <span>Open related view</span>
                          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      )}
                    </div>

                    {!notif.isRead && (
                      <button
                        onClick={() => markNotificationAsRead(notif.id)}
                        className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
