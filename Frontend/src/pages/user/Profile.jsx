import React, { useContext, useState } from 'react';
import { mainContext } from '../../context/mainContex';
import { FaEdit } from 'react-icons/fa';

export default function ProfileComponent() {
  const { user, updateUserDetails } = useContext(mainContext);

  // Initialize formData with user details
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.contact || '',
    address: user?.address || '',
    bio: user?.bio || '',
    college: user?.college || '',
    graduationYear: user?.graduationYear || '',
    cgpa: user?.cgpa || '',
    company: user?.company || '',
    jobRole: user?.jobRole || '',
    links: user?.links || ['', ''], // GitHub and LinkedIn
  });

  const [editableSection, setEditableSection] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index] = value;
    setFormData((prev) => ({
      ...prev,
      links: updatedLinks,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    try {
      setLoading(true);
      await updateUserDetails(formData); // Send updated data to backend
      alert('Profile updated successfully!');
      setEditableSection(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile!');
    } finally {
      setLoading(false);
    }
  };

  // Render a section
  const renderSection = (title, fields, sectionKey) => (
    <div className="space-y-2 p-4 px-8 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold">{title}</h2>
        {editableSection !== sectionKey && (
          <button
            onClick={() => setEditableSection(sectionKey)}
            className="text-indigo-500 hover:text-indigo-700 transition"
          >
            <FaEdit size={14} />
          </button>
        )}
      </div>
      {editableSection === sectionKey ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          {fields.map(({ label, id, placeholder, type = 'text' }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium">
                {label}
              </label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={
                  id.startsWith('links')
                    ? formData.links[parseInt(id.split('[')[1])]
                    : formData[id]
                }
                onChange={(e) =>
                  id.startsWith('links')
                    ? handleLinkChange(parseInt(id.split('[')[1]), e.target.value)
                    : handleChange(e)
                }
                className="w-full px-6 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-3 py-1 text-sm rounded-md text-gray-500 hover:bg-gray-100"
              onClick={() => setEditableSection(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-1 text-sm">
          {fields.map(({ label, id }) => (
            <p key={id}>
              <span className="font-medium">{label}:</span>{' '}
              {id.startsWith('links')
                ? formData.links[parseInt(id.split('[')[1])] || 'Not provided'
                : formData[id] || 'Not provided'}
            </p>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen p-2 px-16">
      <div className="w-full px-6 py- space-y-8 bg-white rounded-lg">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center space-y-4 border-b pb-6">
          <img
            src={user?.profilePicture || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover"
          />
          <button
            onClick={() => alert('Change profile picture feature coming soon!')}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
          >
            Change Profile Picture
          </button>
        </div>

        {/* Personal Info Section */}
        {renderSection('Personal Info', [
          { label: 'Name', id: 'name', placeholder: 'Enter your name' },
          { label: 'Email', id: 'email', placeholder: 'Enter your email', type: 'email' },
          { label: 'Phone', id: 'phone', placeholder: 'Enter your phone number' },
        ], 'personal')}

        {/* Education Section */}
        {renderSection('Education', [
          { label: 'College', id: 'college', placeholder: 'Enter your college name' },
          { label: 'Graduation Year', id: 'graduationYear', placeholder: 'Enter your graduation year' },
          { label: 'CGPA', id: 'cgpa', placeholder: 'Enter your CGPA' },
        ], 'education')}

        {/* Employment Section */}
        {renderSection('Employment', [
          { label: 'Company', id: 'company', placeholder: 'Enter your company name' },
          { label: 'Job Role', id: 'jobRole', placeholder: 'Enter your job role' },
        ], 'employment')}

        {/* Links Section */}
        {renderSection('Links', [
          { label: 'GitHub', id: 'links[0]', placeholder: 'Enter your GitHub link' },
          { label: 'LinkedIn', id: 'links[1]', placeholder: 'Enter your LinkedIn link' },
        ], 'links')}
      </div>
    </div>
  );
}
