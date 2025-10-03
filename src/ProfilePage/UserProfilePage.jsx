// // src/Component/ProfilePage.jsx
// import React, { useEffect, useState } from "react";
// import { FaSignOutAlt, FaEdit } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";
// import "./UserProfilePage.css";

// export default function UserProfilePage() {
//   const { user, logout, setUser } = useAuth(); // ✅ setUser ko context se lenge
//   const [activeTab, setActiveTab] = useState("Profile");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     country: "",
//     city: "",
//     zip: "",
//     phone: "",
//   });

//   // ✅ Prefill user info
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         country: user.country || "",
//         city: user.city || "",
//         zip: user.zip || "",
//         phone: user.phone || "",
//       });
//     }
//   }, [user]);

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Save Changes -> Update Context + localStorage
//   const handleSave = (e) => {
//     e.preventDefault();

//     const updatedUser = { ...user, ...formData };

//     // Update context
//     setUser(updatedUser);

//     // Update localStorage
//     localStorage.setItem("user", JSON.stringify(updatedUser));

//     alert("✅ Profile updated successfully!");
//   };

//   return (
//     <div className="profile-container">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <button className="logout-btn" onClick={logout}>
//           <FaSignOutAlt /> Logout
//         </button>
//         <ul>
//           <li
//             className={activeTab === "Profile" ? "active" : ""}
//             onClick={() => setActiveTab("Profile")}
//           >
//             Profile
//           </li>
//           <li
//             className={activeTab === "Enrolled" ? "active" : ""}
//             onClick={() => setActiveTab("Enrolled")}
//           >
//             Enrolled Course
//           </li>
//           <li
//             className={activeTab === "Payment" ? "active" : ""}
//             onClick={() => setActiveTab("Payment")}
//           >
//             Payment History
//           </li>
//           <li
//             className={activeTab === "Certificate" ? "active" : ""}
//             onClick={() => setActiveTab("Certificate")}
//           >
//             Certificate
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="profile-main">
//         <h2>Your Information</h2>

//         <div className="profile-header">
//           <img
//             src="https://i.pravatar.cc/100"
//             alt="profile"
//             className="profile-avatar"
//           />
//           <FaEdit className="edit-icon" />
//         </div>

//         <form className="profile-form" onSubmit={handleSave}>
//           <div className="field">
//             <label>Full name</label>
//             <div className="input-wrap">
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//               <FaEdit className="inline-edit" />
//             </div>
//           </div>

//           <div className="field">
//             <label>Email</label>
//             <div className="input-wrap">
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               <FaEdit className="inline-edit" />
//             </div>
//           </div>

//           <div className="row">
//             <div className="field">
//               <label>Country</label>
//               <input
//                 type="text"
//                 name="country"
//                 value={formData.country}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="field">
//               <label>City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row">
//             <div className="field">
//               <label>Zip code</label>
//               <input
//                 type="text"
//                 name="zip"
//                 value={formData.zip}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="field">
//               <label>Phone number</label>
//               <div className="input-wrap">
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//                 <FaEdit className="inline-edit" />
//               </div>
//             </div>
//           </div>

//           <button type="submit" className="save-btn">
//             Save Changes
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// }
