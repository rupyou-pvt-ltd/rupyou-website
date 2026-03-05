import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
let db: admin.firestore.Firestore;
let auth: admin.auth.Auth;

async function initFirebaseAdmin() {
  if (!admin.apps.length) {
    try {
      const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
      if (serviceAccountJson) {
        const serviceAccount = JSON.parse(serviceAccountJson);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: "rupyou-4bbf5"
        });
        console.log("Firebase Admin initialized with service account");
      } else {
        admin.initializeApp({
          projectId: "rupyou-4bbf5"
        });
        console.log("Firebase Admin initialized with project ID only");
      }
    } catch (error) {
      console.error("Error initializing Firebase Admin:", error);
      // Fallback initialization if the above fails
      if (!admin.apps.length) {
        admin.initializeApp({ projectId: "rupyou-4bbf5" });
      }
    }
  }
  db = admin.firestore();
  auth = admin.auth();
}

async function startServer() {
  await initFirebaseAdmin();
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());
  app.use(
    helmet({
      contentSecurityPolicy: false, // Disable for development to allow Vite
    })
  );
  app.use(morgan("dev"));

  // --- API Routes ---

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Seed Data Endpoint
  app.post("/api/seed", async (req, res) => {
    try {
      const users = [
        {
          email: "admin@rupyou.in",
          password: "123456",
          displayName: "Admin User",
          role: "admin"
        },
        {
          email: "connector@rupyou.in",
          password: "123456",
          displayName: "Connector User",
          role: "connector"
        }
      ];

      const results = [];

      for (const userData of users) {
        try {
          let userRecord;
          try {
            userRecord = await auth.getUserByEmail(userData.email);
            results.push({ email: userData.email, status: "exists" });
          } catch (e) {
            userRecord = await auth.createUser({
              email: userData.email,
              password: userData.password,
              displayName: userData.displayName,
            });
            results.push({ email: userData.email, status: "created" });
          }

          // Set custom claims for roles
          await auth.setCustomUserClaims(userRecord.uid, { role: userData.role });
          
          // Create user document in Firestore
          await db.collection("users").doc(userRecord.uid).set({
            email: userData.email,
            name: userData.displayName,
            role: userData.role,
            status: "active",
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          }, { merge: true });

        } catch (err: any) {
          results.push({ email: userData.email, status: "error", error: err.message });
        }
      }

      res.json({ success: true, results });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Auth Middleware
  const authMiddleware = (roles: string[]) => async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const idToken = authHeader.split("Bearer ")[1];
    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      req.user = decodedToken;
      
      if (roles.length > 0 && !roles.includes(decodedToken.role)) {
        return res.status(403).json({ error: "Unauthorized role" });
      }
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // Applications API
  app.get("/api/applications", authMiddleware(["admin", "connector", "user"]), (req, res) => {
    // Mock data for initial build
    res.json([
      { id: "1", userId: "u1", product: "Personal Loan", amount: 500000, status: "Pending", createdAt: new Date() }
    ]);
  });

  // Commission Engine Simulation
  app.get("/api/commissions", authMiddleware(["admin", "connector"]), (req, res) => {
    res.json({
      total: 125000,
      connectorShare: 31250,
      rupyouShare: 93750
    });
  });

  // Lender API Simulation
  app.post("/api/lender/underwrite", authMiddleware(["admin", "user"]), (req, res) => {
    const { loanAmount, creditScore } = req.body;
    // Simple logic for simulation
    const approved = (loanAmount < 1000000);
    res.json({
      status: approved ? "Approved" : "Rejected",
      lender: "Institutional Partner A",
      interestRate: "10.5%",
      tenure: "60 months"
    });
  });

  // --- Vite Integration ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Rupyou Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
