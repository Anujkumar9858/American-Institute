import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setRole(parsed.role);
    }
  }, []);

  // ✅ Login
  const login = (email, password) => {
    // admin fixed credentials
    if (email === "admin@abc.com" && password === "admin123") {
      const adminUser = { email, role: "admin" };
      setUser(adminUser);
      setRole("admin");
      localStorage.setItem("user", JSON.stringify(adminUser));
      return { success: true };
    }

    // student check
    const users = JSON.parse(localStorage.getItem("students") || "[]");
    const existing = users.find(
      (u) => u.email === email && u.password === password
    );

    if (existing) {
      const studentUser = { email, role: "student" };
      setUser(studentUser);
      setRole("student");
      localStorage.setItem("user", JSON.stringify(studentUser));
      return { success: true };
    }

    return { success: false, message: "Invalid credentials or not registered" };
  };

  // ✅ Register
  const register = (email, password) => {
    const users = JSON.parse(localStorage.getItem("students") || "[]");

    if (users.find((u) => u.email === email)) {
      return { success: false, message: "User already registered" };
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("students", JSON.stringify(users));
    return { success: true };
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ role, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
