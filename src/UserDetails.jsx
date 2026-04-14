import React, { useState } from 'react';
import axios from 'axios';

const UserDetails = () => {
    const [userId, setUserId] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchUserDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://9yoywh6519.execute-api.us-east-1.amazonaws.com/dev/getuser/?username=${userId}`); 
            
            if (response.data.user) {
                setUserDetails(response.data.user);
                setError('');
            } else {
                setUserDetails(null);
                setError('User not found');
            }
        } catch (err) {
            console.error('Error fetching user:', err);
            setError('Failed to fetch data. Please check connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-results {
                    animation: fadeIn 0.4s ease-out forwards;
                }
                `}
            </style>
            
            <div style={styles.userCard}>
                <header style={styles.cardHeader}>
                    <div style={styles.accentBar}></div>
                    <h2 style={styles.headerTitle}>User Intelligence</h2>
                </header>

                <div style={styles.searchSection}>
                    <input 
                        type="text"
                        placeholder="Enter Username or ID..."
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        style={styles.searchInput}
                    />
                    <button 
                        onClick={fetchUserDetails}
                        disabled={loading}
                        style={{
                            ...styles.searchButton,
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Searching...' : 'Fetch Details'}
                    </button>
                </div>
                
                {error && (
                    <div style={styles.errorMessage}>
                        <p>{error}</p>
                    </div>
                )}

                {userDetails && (
                    <div className="animate-results" style={styles.resultsSection}>
                        <div style={styles.divider}></div>
                        <span style={styles.labelHeading}>IDENTIFIED PROFILE</span>
                        
                        <div style={styles.infoGrid}>
                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Username</label>
                                <p style={styles.highlightText}>{userDetails.username}</p>
                            </div>

                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Email Address</label>
                                <p style={styles.infoText}>{userDetails.email}</p>
                            </div>

                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Registration Date</label>
                                <p style={styles.infoText}>{userDetails.dateJoined || 'Jan 12, 2024'}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Professional Styling Object ---
const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '20px',
    },
    userCard: {
        backgroundColor: '#1e293b',
        width: '100%',
        maxWdith: '420px',
        padding: '2.5rem',
        borderRadius: '16px',
        border: '1px solid #334155',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '2rem',
    },
    accentBar: {
        width: '4px',
        height: '24px',
        backgroundColor: '#3b82f6',
        borderRadius: '2px',
    },
    headerTitle: {
        color: '#f8fafc',
        fontSize: '1.5rem',
        fontWeight: '700',
        margin: 0,
    },
    searchSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    searchInput: {
        backgroundColor: '#0f172a',
        border: '1px solid #334155',
        borderRadius: '8px',
        padding: '12px 16px',
        color: '#f8fafc',
        fontSize: '0.95rem',
        outline: 'none',
    },
    searchButton: {
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px',
        fontWeight: '600',
        transition: '0.2s ease',
    },
    resultsSection: {
        marginTop: '2rem',
    },
    divider: {
        height: '1px',
        background: 'linear-gradient(to right, transparent, #334155, transparent)',
        marginBottom: '1.5rem',
    },
    labelHeading: {
        display: 'block',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        color: '#64748b',
        fontWeight: '800',
        marginBottom: '1rem',
    },
    infoGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    infoItem: {
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        padding: '12px 16px',
        borderRadius: '10px',
        border: '1px solid #334155',
    },
    infoLabel: {
        display: 'block',
        fontSize: '0.75rem',
        color: '#94a3b8',
        marginBottom: '4px',
    },
    infoText: {
        color: '#e2e8f0',
        fontWeight: '500',
        margin: 0,
    },
    highlightText: {
        color: '#60a5fa',
        fontFamily: 'monospace',
        margin: 0,
    },
    errorMessage: {
        marginTop: '1.5rem',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        padding: '10px',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#f87171',
    }
};

export default UserDetails;