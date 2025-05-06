import React from "react";

const Home = () => {

    const styles = {
        display: "flex",
        flexDirection: "Column",
        justifyContent: "center",
        alignItems: "center",
        
    };
    return (
        <div style={styles}>
            <h1>Welcome to ABC Bank</h1>
            <p>Your trusted banking partner.</p>
        </div>
    );
}
export default Home;