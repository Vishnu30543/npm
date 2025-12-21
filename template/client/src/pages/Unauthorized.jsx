import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ fontSize: '3rem', color: '#ff6b6b' }}>403</h1>
            <h2>Unauthorized Access</h2>
            <p>You do not have permission to view this page.</p>
            <Link to="/dashboard" className="btn" style={{ marginTop: '20px' }}>Go to Dashboard</Link>
        </div>
    );
};

export default Unauthorized;
