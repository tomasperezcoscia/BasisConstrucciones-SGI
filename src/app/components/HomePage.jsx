import React, { useState } from 'react';
import './Login.css';  // Import the CSS for styling

function HomePage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username, 'Password:', password);
    };

    return (
        <div className="login-page">
            <div className="login-header">
                Basis Construcciones
            </div>
            <div className="login-card">
                <div className="login-avatar"></div>
                <div className="login-title">
                    Ingresa a tu cuenta de Basis Construcciones
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Username/Email"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button className="login-button" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default HomePage;
