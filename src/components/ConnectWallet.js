import React from 'react';

const ConnectWallet = ({ connectWallet, account }) => {
    return (
        <div className="text-center mb-4">
            {account ? (
                <p className="lead">Connected: <span className="badge bg-success">{account}</span></p>
            ) : (
                <button className="btn btn-primary btn-lg" onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default ConnectWallet;
