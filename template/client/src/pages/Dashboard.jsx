import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <h1>Dashboard</h1>
            <div style={{ padding: '20px', background: '#333', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {user?.avatar && (
                        <img
                            src={user.avatar}
                            alt="Profile"
                            style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                        />
                    )}
                    <h3>Welcome back, {user?.name}!</h3>
                </div>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> <span style={{ textTransform: 'uppercase' }}>{user?.role}</span></p>
                <p style={{ marginTop: '20px', color: '#ccc' }}>
                    This is a protected route. Only logged-in users can see this.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
