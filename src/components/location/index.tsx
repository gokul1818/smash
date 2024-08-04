import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import location from "../../assets/images/location.gif";
import Button from '../buttonComponent';

const LocationPrompt: React.FC<{ onEnableLocation: () => void }> = ({ onEnableLocation }) => {
    const [status, setStatus] = useState<'idle' | 'error' | 'permission-granted'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [redirectTo, setRedirectTo] = useState<string | null>(null);

    const handleEnableLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            setStatus('idle');
            navigator.geolocation.getCurrentPosition(
                () => {
                    setStatus('permission-granted');
                    onEnableLocation();
                    setLoading(false);
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
                    setLoading(false);
                }
            );
        } else {
            setStatus('error');
            setErrorMessage("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    };
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                },
                (error) => {
                    console.log("df", error)
                },
                { timeout: 10000 } // Optional: you can specify a timeout (in milliseconds)
            );
        } else {
            alert("sdf")
        }
    };
    // Handle redirection if required
    useEffect(() => {
        if (status === 'permission-granted' && redirectTo) {
            setRedirectTo(redirectTo);
        }
    }, [status, redirectTo]);

    if (redirectTo) {
        return <Navigate to={redirectTo} />;
    }

    return (
        <div className='d-flex align-items-center flex-column justify-content-center text-center' style={{ height: "70vh" }}>
            <img src={location} alt="Location Icon" />
            <h2 className='ubuntu-medium'>Location Required</h2>
            {status === 'idle' && (
                <div className='text-center'>
                    <p className='ubuntu-light'>Please enable location services to use this feature.</p>
                    <Button
                        label="Enable Location"
                        onClick={handleEnableLocation}
                        primaryBtn
                        className="mt-2 mx-auto"
                        loading={loading}
                    />
                </div>
            )}
            {status === 'error' && errorMessage && (
                <div>
                    <p className='ubuntu-light'>{errorMessage}</p>
                    <Button
                        label="Try Again"
                        onClick={getLocation}
                        primaryBtn
                        className="mt-2 mx-auto"
                        loading={loading}
                    />
                </div>
            )}
            {status === 'permission-granted' && !redirectTo && (
                <div>
                    <p className='ubuntu-light'>Location permissions granted. You can now proceed.</p>
                </div>
            )}
        </div>
    );
};

export default LocationPrompt;
