import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDSO8B5VcrkN7JiSjHvgBst7gOvsXH0Nn4",
    authDomain: "sgva-jcstudio.firebaseapp.com",
    projectId: "sgva-jcstudio",
    storageBucket: "sgva-jcstudio.firebasestorage.app",
    messagingSenderId: "813313128633",
    appId: "1:813313128633:web:ec3cdae10a665e6d5bc368",
    measurementId: "G-QTPTQYJ66L"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app, "https://sgva-jcstudio-default-rtdb.firebaseio.com");

export { db };