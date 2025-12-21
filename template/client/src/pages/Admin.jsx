const Admin = () => {
    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <h1 style={{ color: '#ff6b6b' }}>Admin Portal</h1>
            <div style={{ padding: '20px', background: '#2a1a1a', borderRadius: '8px', border: '1px solid #ff6b6b' }}>
                <h3>Restricted Access</h3>
                <p>You are viewing this because you have the <strong>ADMIN</strong> role.</p>
                <p>Here you would manage users, settings, etc.</p>
            </div>
        </div>
    );
};

export default Admin;
