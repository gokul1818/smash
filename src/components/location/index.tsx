import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import location from "../../assets/images/location.gif"
import Button from '../buttonComponent';
const LocationPrompt: React.FC<{ onEnableLocation: () => void }> = ({ onEnableLocation }) => {
    const [status, setStatus] = useState<'idle' | 'error' | 'permission-granted'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [redirectTo, setRedirectTo] = useState<string | null>(null);

    const handleEnableLocation = () => {
        if (navigator.geolocation) {
            setStatus('idle');
            navigator.geolocation.getCurrentPosition(
                () => {
                    setStatus('permission-granted');
                    onEnableLocation();
                    setRedirectTo('/home'); // Set the redirect path here
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

    useEffect(() => {
        if (status === 'permission-granted' && redirectTo) {
            // Redirect to the target path
            setRedirectTo(redirectTo);
        }
    }, [status, redirectTo]);

    if (redirectTo) {
        return <Navigate to={redirectTo} />;
    }

    return (
        <div className='d-flex align-items-center flex-column justify-content-center text-center'
            style={{ height: "70vh" }}>
            <img src={location} />
            <h2 className='ubuntu-medium'>Location Required</h2>
            {status === 'idle' && (
                <div className='text-center '>
                    <p className=' ubuntu-light '>Please enable location services to use this feature.</p>
                    <Button
                        label="Enable Location"
                        onClick={() => handleEnableLocation()}
                        primaryBtn
                        className="mt-2 mx-auto"
                    // loading={isLoading}
                    />
                </div>
            )}
            {status === 'error' && errorMessage && (
                <div>
                    <p className='ubuntu-light  '> {errorMessage}</p>
                    <Button
                        label="Try Again"
                        onClick={() => handleEnableLocation()}
                        primaryBtn
                        className="mt-2 mx-auto"
                    // loading={isLoading}
                    />
                </div>
            )}
            {status === 'permission-granted' && !redirectTo && (
                <div>
                    <p className='ubuntu-light  '>Location permissions granted. You can now proceed.</p>
                </div>
            )}
        </div>
    );
};

export default LocationPrompt;
