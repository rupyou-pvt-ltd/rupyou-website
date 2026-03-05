import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where, 
  addDoc,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { User, Application, CommissionRecord } from "../types";

export const userService = {
  async getUser(uid: string): Promise<User | null> {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } as User : null;
  },

  async getAllConnectors(): Promise<User[]> {
    const q = query(collection(db, "users"), where("role", "==", "connector"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
  },

  async updateConnectorStatus(uid: string, status: "active" | "suspended" | "pending"): Promise<void> {
    await updateDoc(doc(db, "users", uid), { status });
  }
};

export const applicationService = {
  async createApplication(application: Omit<Application, "id" | "createdAt">): Promise<string> {
    const docRef = await addDoc(collection(db, "applications"), {
      ...application,
      createdAt: new Date().toISOString(),
      status: "submitted"
    });
    return docRef.id;
  },

  async getApplicationsByUserId(userId: string): Promise<Application[]> {
    const q = query(collection(db, "applications"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Application));
  },

  async getApplicationsByConnectorId(connectorId: string): Promise<Application[]> {
    const q = query(collection(db, "applications"), where("connectorId", "==", connectorId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Application));
  },

  async getAllApplications(): Promise<Application[]> {
    const querySnapshot = await getDocs(collection(db, "applications"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Application));
  },

  async updateApplicationStatus(id: string, status: Application["status"]): Promise<void> {
    await updateDoc(doc(db, "applications", id), { 
      status,
      updatedAt: new Date().toISOString()
    });
  }
};

export const commissionService = {
  async getCommissionsByConnectorId(connectorId: string): Promise<CommissionRecord[]> {
    const q = query(collection(db, "commissions"), where("connectorId", "==", connectorId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CommissionRecord));
  },

  async createCommission(commission: Omit<CommissionRecord, "id" | "createdAt">): Promise<string> {
    const docRef = await addDoc(collection(db, "commissions"), {
      ...commission,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  }
};
