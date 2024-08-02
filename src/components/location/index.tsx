import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const LocationPrompt: React.FC<{ onEnableLocation: () => void }> = ({ onEnableLocation }) => {
    const [status, setStatus] = useState<'idle' | 'error' | 'permission-granted'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleEnableLocation = () => {
        if (navigator.geolocation) {
            setStatus('idle');
            navigator.geolocation.getCurrentPosition(
                () => {
                    setStatus('permission-granted');
                    onEnableLocation();
                },
                (error) => {
                    setStatus('error');
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setErrorMessage("Permission to access location was denied.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            setErrorMessage("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            setErrorMessage("The request to access location timed out.");
                            break;

                        default:
                            setErrorMessage("An error occurred.");
                    }
                }
            );
        } else {
            setStatus('error');
            setErrorMessage("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div>
            <h2>Location Required</h2>
            {status === 'idle' && (
                <div>
                    <p>Please enable location services to use this feature.</p>
                    <button onClick={handleEnableLocation}>Enable Location</button>
                </div>
            )}
            {status === 'error' && errorMessage && (
                <div>
                    <p>{errorMessage}</p>
                    <button onClick={handleEnableLocation}>Try Again</button>
                </div>
            )}
            {status === 'permission-granted' && (
                <div>
                    <p>Location permissions granted. You can now proceed.</p>
                </div>
            )}
        </div>
    );
};

export default LocationPrompt;
