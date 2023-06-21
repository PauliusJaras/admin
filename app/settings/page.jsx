"use client";

import axios from "axios";
import { useState } from "react";

export default function Settings() {

 const [email, setEmail] = useState('');

 async function saveAdmin(){
    const data = {email};
    const response = await axios.post('/api/admins', data); 
    console.log(response);
    setEmail('');
 }

  return (
    <>
      <h1>Settings</h1>
      <label>Add New Administrator</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"/>
      <button onClick={saveAdmin} className="btn-primary">Save</button>
    </>
  );
}
