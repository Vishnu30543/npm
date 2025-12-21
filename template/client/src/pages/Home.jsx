import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to React Express Auth</h1>
            <p>A boilerplate for building MERN stack applications with Authentication.</p>

            <div style={{ marginTop: '20px' }}>
                <Link to="/login" className="btn">Login</Link>
                <Link to="/register" className="btn" style={{ marginLeft: '10px' }}>Register</Link>
            </div>
        </div>
    );
};

export default Home;
