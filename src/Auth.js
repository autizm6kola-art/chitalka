// src/Auth.js
import React, { useState } from "react";
import { supabase } from "./supabaseClient";

function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setError("Ошибка при отправке письма");
    } else {
      setSent(true);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      {sent ? (
        <p>📧 Письмо со ссылкой отправлено! Проверь почту.</p>
      ) : (
        <form onSubmit={handleLogin}>
          <h2>Вход</h2>
          <input
            type="email"
            placeholder="Твой email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button type="submit">Войти по почте</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default Auth;
