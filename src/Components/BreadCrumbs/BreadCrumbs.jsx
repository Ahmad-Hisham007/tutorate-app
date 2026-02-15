import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { Link } from 'react-router';

const BreadCrumbs = ({ items = [] }) => {
    if (!items.length) return null;

    return (
        <nav aria-label="Breadcrumb" className="px-4 rounded-md">
            <ol className="flex items-center justify-center space-x-1 text-sm">
                {/* Home is always first */}
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>

                {/* Dynamic breadcrumb items */}
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={item.path || index} className="flex items-center">
                            <span className="mx-2 text-gray-400"><IoChevronForwardOutline /></span>
                            {isLast ? (
                                <span className="font-medium text-base-content0">
                                    {item.title}
                                </span>
                            ) : (
                                <Link to={item.path} className="text-primary hover:underline">
                                    {item.title}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default BreadCrumbs;