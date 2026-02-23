// src/Components/Errors/ErrorBoundary.jsx
import React from 'react';
import Forbidden from '../ForbiddenError/ForbiddenError';
import { useRouteError } from 'react-router';
import NotFound from '../NotFound/NotFound';
import ServerError from '../ServerError/ServerError';
import EmptyState from '../EmptyState/EmptyState';

const ErrorBoundary = () => {
    const error = useRouteError();
    console.error('Route Error:', error);

    // Handle different error types
    if (error?.status === 403) {
        return <Forbidden />;
    }

    if (error?.status === 404) {
        return <NotFound />;
    }

    if (error?.status === 500 || error?.status === 503) {
        return <ServerError />;
    }

    // For tuitions/tutors specific errors
    if (error?.data?.type === 'tuitions' || error?.data?.type === 'tutors') {
        return <EmptyState type={error.data.type} message={error.data.message} />;
    }

    // Default to server error for unknown errors
    return <ServerError />;
};

export default ErrorBoundary;