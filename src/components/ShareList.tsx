import React, { useState } from 'react';

interface ShareListProps {
    shareableUrl: string | null;
    onShareList: () => void;
}

const ShareList: React.FC<ShareListProps> = ({ shareableUrl, onShareList }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        if (shareableUrl) {
            navigator.clipboard.writeText(shareableUrl).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset "Copied" message after 2 seconds
            });
        }
    };

    return (
        <div className="share-list">
            {shareableUrl ? (
                <div>
                    <p>Your list has been shared! Share this link with others:</p>
                    <input
                        type="text"
                        readOnly
                        value={shareableUrl}
                    />
                    <button onClick={handleCopyClick}>
                        {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                </div>
            ) : (
                <button onClick={onShareList}>Share Your List</button>
            )}
        </div>
    );
};

export default ShareList;