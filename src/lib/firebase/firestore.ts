import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import { Activity, CarbonFootprint, User, WeeklyGoal, Badge } from '@/types';

// When Firebase env vars aren't set, `db` will be null. In that case we return
// safe defaults so the app can still render for local/dev work.
const requireDb = () => db;

// User operations
export const createUser = async (user: User) => {
  const currentDb = requireDb();
  if (!currentDb) return;

  const userRef = doc(currentDb, 'users', user.id);
  await setDoc(userRef, {
    ...user,
    createdAt: Timestamp.fromDate(user.createdAt),
  });
};

export const getUser = async (userId: string): Promise<User | null> => {
  const currentDb = requireDb();
  if (!currentDb) return null;

  const userRef = doc(currentDb, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    const data = userSnap.data();
    return {
      ...data,
      createdAt: data.createdAt.toDate(),
    } as User;
  }
  return null;
};

export const updateUser = async (userId: string, updates: Partial<User>) => {
  const currentDb = requireDb();
  if (!currentDb) return;

  const userRef = doc(currentDb, 'users', userId);
  await updateDoc(userRef, updates);
};

// Activity operations
export const saveActivity = async (activity: Omit<Activity, 'id'>) => {
  const currentDb = requireDb();
  if (!currentDb) return;

  const activitiesRef = collection(currentDb, 'activities');
  await addDoc(activitiesRef, {
    ...activity,
    date: Timestamp.fromDate(activity.date),
  });
};

export const getUserActivities = async (userId: string, days: number = 30): Promise<Activity[]> => {
  const currentDb = requireDb();
  if (!currentDb) return [];

  const activitiesRef = collection(currentDb, 'activities');
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const q = query(
    activitiesRef,
    where('userId', '==', userId),
    where('date', '>=', Timestamp.fromDate(startDate)),
    orderBy('date', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date.toDate(),
  })) as Activity[];
};

// Carbon footprint operations
export const saveCarbonFootprint = async (footprint: Omit<CarbonFootprint, 'id'>) => {
  const currentDb = requireDb();
  if (!currentDb) return;

  const footprintsRef = collection(currentDb, 'carbon_footprints');
  await addDoc(footprintsRef, {
    ...footprint,
    date: Timestamp.fromDate(footprint.date),
  });
};

export const getUserFootprints = async (userId: string, days: number = 30): Promise<CarbonFootprint[]> => {
  const currentDb = requireDb();
  if (!currentDb) return [];

  const footprintsRef = collection(currentDb, 'carbon_footprints');
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const q = query(
    footprintsRef,
    where('userId', '==', userId),
    where('date', '>=', Timestamp.fromDate(startDate)),
    orderBy('date', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    date: doc.data().date.toDate(),
  })) as CarbonFootprint[];
};

// Weekly goals operations
export const saveWeeklyGoal = async (goal: Omit<WeeklyGoal, 'id'>) => {
  const currentDb = requireDb();
  if (!currentDb) return;

  const goalsRef = collection(currentDb, 'weekly_goals');
  await addDoc(goalsRef, {
    ...goal,
    startDate: Timestamp.fromDate(goal.startDate),
    endDate: Timestamp.fromDate(goal.endDate),
  });
};

export const getUserCurrentGoal = async (userId: string): Promise<WeeklyGoal | null> => {
  const currentDb = requireDb();
  if (!currentDb) return null;

  const goalsRef = collection(currentDb, 'weekly_goals');
  const now = new Date();
  
  const q = query(
    goalsRef,
    where('userId', '==', userId),
    where('startDate', '<=', Timestamp.fromDate(now)),
    where('endDate', '>=', Timestamp.fromDate(now)),
    limit(1)
  );
  
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  
  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
    startDate: doc.data().startDate.toDate(),
    endDate: doc.data().endDate.toDate(),
  } as WeeklyGoal;
};

// Badge operations
export const getUserBadges = async (userId: string): Promise<Badge[]> => {
  const currentDb = requireDb();
  if (!currentDb) return [];

  const badgesRef = collection(currentDb, 'user_badges');
  const q = query(
    badgesRef,
    where('userId', '==', userId)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    achievedAt: doc.data().achievedAt?.toDate(),
  })) as Badge[];
};

export const awardBadge = async (userId: string, badge: Omit<Badge, 'id' | 'achieved' | 'achievedAt'>) => {
  const currentDb = requireDb();
  if (!currentDb) return;

  const badgesRef = collection(currentDb, 'user_badges');
  await addDoc(badgesRef, {
    ...badge,
    userId,
    achieved: true,
    achievedAt: Timestamp.now(),
  });
};