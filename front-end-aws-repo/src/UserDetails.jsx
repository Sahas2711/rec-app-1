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
            setError('Failed to get user details. Please check the User ID.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 text-slate-200">
            <div className="max-w-md w-full bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-700 p-8 transition-all hover:shadow-blue-500/10">
                
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold tracking-tight">User Explorer</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <input 
                            type="text"
                            placeholder="Enter Username/ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full bg-[#0f172a] border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all rounded-lg p-3 text-sm placeholder-slate-500"
                        />
                    </div>
                    
                    <button 
                        onClick={fetchUserDetails}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-blue-900/20"
                    >
                        {loading ? 'Searching...' : 'Search User'}
                    </button>
                </div>
                
                {error && (
                    <div className="mt-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                        <p className="text-red-400 text-sm text-center font-medium">⚠️ {error}</p>
                    </div>
                )}

                {userDetails && (
                    <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-6"></div>
                        
                        <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Profile Result</h3>
                        
                        <div className="space-y-3">
                            <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-slate-700/50">
                                <p className="text-xs text-slate-500 mb-1">Username</p>
                                <p className="text-blue-400 font-mono font-medium">{userDetails.username}</p>
                            </div>

                            <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-slate-700/50">
                                <p className="text-xs text-slate-500 mb-1">Email Address</p>
                                <p className="font-medium">{userDetails.email}</p>
                            </div>

                            <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-slate-700/50">
                                <p className="text-xs text-slate-500 mb-1">Member Since</p>
                                <p className="font-medium">{userDetails.dateJoined || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;