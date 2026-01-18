import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecCard from '../components/RecCard';

const Home = () => {
    const [recs, setRecs] = useState([]);

    useEffect(() => {
        const fetchRecs = async () => {
            // Mocking data for now as backend might fail without valid auth/db initially in this flow
            try {
                const res = await axios.get('/api/recs');
                setRecs(res.data);
            } catch (error) {
                console.error("Error fetching recs", error);
            }
        };

        fetchRecs();
    }, []);

    return (
        <div>
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-serif italic mb-2">Editor's Picks</h1>
                <p className="text-gray-400 text-sm tracking-widest uppercase">Latest Curations</p>
            </div>

            <div className="space-y-12">
                {recs.length === 0 ? (
                    <p className="text-center text-gray-400">No recs yet. Be the first.</p>
                ) : (
                    recs.map(rec => (
                        <RecCard key={rec._id} rec={rec} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
