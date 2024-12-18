import React, { useContext } from 'react';
import { mainContext } from '/src/context/mainContex';
import { Link } from 'react-router-dom';

const ViewProfile = () => {
    const { user } = useContext(mainContext);

    return (
        <div className="min-h-screen pbg-gradient-to-r from-blue-50 via-gray-100 to-gray-200">
            {/* Header Section */}
            <div className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl px-2 font-bold text-gray-800">Profile</h1>
                    <Link to="/profile">
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700">
                        Edit Profile
                    </button>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Profile Section */}
                <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center md:flex-row md:items-start md:space-x-8">
                    {/* Profile Picture */}
                    <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 shadow">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="Profile"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 mt-6 md:mt-0">
                        <h2 className="text-3xl font-semibold text-gray-800">{user?.name || 'User Name'}</h2>
                        <p className="text-gray-600 text-sm">{user?.email || 'user@example.com'}</p>
                        <p className="text-gray-500 text-sm mt-1">
                            <strong>Role:</strong> {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                        </p>
                        <div className="mt-4">
                            <p className="text-gray-600 text-sm"><strong>Joined:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {/* Detailed Information */}
                <div className="bg-white rounded-lg shadow-md p-8 mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6">User Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-gray-600">
                        <div>
                            <strong className="text-gray-800">Username:</strong> {user?.username || 'N/A'}
                        </div>
                        <div>
                            <strong className="text-gray-800">Contact:</strong> {user?.contact || 'N/A'}
                        </div>
                        <div>
                            <strong className="text-gray-800">Qualification:</strong> {user?.qualification || 'N/A'}
                        </div>
                        <div>
                            <strong className="text-gray-800">Interest:</strong> {user?.interest || 'N/A'}
                        </div>
                        <div>
                            <strong className="text-gray-800">Verified:</strong> {user?.isVerified ? 'Yes' : 'No'}
                        </div>
                        <div>
                            <strong className="text-gray-800">Email Verified:</strong> {user?.isEmailVerified ? 'Yes' : 'No'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;
