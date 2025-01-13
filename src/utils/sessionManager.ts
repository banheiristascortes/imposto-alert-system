import { storage } from './storage';
import { User } from '@/types/user';

const SESSION_KEY = 'user_session';
const LAST_ACTIVITY_KEY = 'last_activity';
const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hora em millisegundos
const SESSION_TIMEOUT = 6 * 60 * 60 * 1000; // 6 horas em millisegundos

export const sessionManager = {
  startSession: (user: User) => {
    const session = {
      user,
      startTime: Date.now(),
    };
    storage.set(SESSION_KEY, session);
    storage.set(LAST_ACTIVITY_KEY, Date.now());
    console.log('Session started:', session);
  },

  updateLastActivity: () => {
    storage.set(LAST_ACTIVITY_KEY, Date.now());
    console.log('Activity updated:', new Date().toISOString());
  },

  checkSession: () => {
    const session = storage.get(SESSION_KEY);
    const lastActivity = storage.get(LAST_ACTIVITY_KEY);

    if (!session || !lastActivity) {
      console.log('No active session found');
      return false;
    }

    const now = Date.now();
    const sessionAge = now - session.startTime;
    const inactivityTime = now - lastActivity;

    console.log('Session age (hours):', sessionAge / (1000 * 60 * 60));
    console.log('Inactivity time (minutes):', inactivityTime / (1000 * 60));

    if (sessionAge > SESSION_TIMEOUT) {
      console.log('Session timeout reached');
      sessionManager.endSession();
      return false;
    }

    if (inactivityTime > INACTIVITY_TIMEOUT) {
      console.log('Inactivity timeout reached');
      sessionManager.endSession();
      return false;
    }

    return true;
  },

  getUser: () => {
    const session = storage.get(SESSION_KEY);
    return session?.user || null;
  },

  endSession: () => {
    storage.remove(SESSION_KEY);
    storage.remove(LAST_ACTIVITY_KEY);
    console.log('Session ended');
  },
};