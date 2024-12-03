// Compare this snippet from client-side/src/Pages/Dashboard/TaskBoard/TaskPopup.jsx:
import React, { useEffect, useRef, useState } from "react";

const TaskPopup = ({ task, onClose }) => {

    const [showUserModal, setShowUserModal] = useState(false);
    const [showTagModal, setShowTagModal] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [activeTab, setActiveTab] = useState('subtasks');
    const [subtasks, setSubtasks] = useState([]);
    const [newSubtask, setNewSubtask] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [dueDate, setDueDate] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    useRef
    const userModalRef = useRef(null);
    const tagModalRef = useRef(null);

    // Sample users data
    const users = [
        { id: 1, name: 'WPXPO', image: '/placeholder.svg?height=40&width=40' },
        { id: 2, name: 'Owadud Bhuiyan', image: '/placeholder.svg?height=40&width=40' },
        { id: 3, name: 'Shihab Uddin', image: '/placeholder.svg?height=40&width=40' },
        { id: 4, name: 'Md Al Mehedi Hasan', image: '/placeholder.svg?height=40&width=40' },
        { id: 5, name: 'Anik Biswas', image: '/placeholder.svg?height=40&width=40' },
    ];

    // Sample tags data
    const availableTags = [
        { id: 1, name: 'USER EXPERIENCE', color: 'blue' },
        { id: 2, name: 'HIGH PRIORITY', color: 'red' },
        { id: 3, name: 'USER REQUEST', color: 'purple' },
        { id: 4, name: 'BUG FIX', color: 'yellow' },
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (userModalRef.current && !userModalRef.current.contains(event.target)) {
                setShowUserModal(false);
            }
            if (tagModalRef.current && !tagModalRef.current.contains(event.target)) {
                setShowTagModal(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userModalRef, tagModalRef]);

    const handleUserToggle = (user) => {
        setSelectedUsers(prev =>
            prev.find(u => u.id === user.id)
                ? prev.filter(u => u.id !== user.id)
                : [...prev, user]
        );
    };

    const handleTagToggle = (tag) => {
        setSelectedTags(prev =>
            prev.find(t => t.id === tag.id)
                ? prev.filter(t => t.id !== tag.id)
                : [...prev, tag]
        );
    };

    const handleSubtaskSubmit = (e) => {
        e.preventDefault();
        if (newSubtask.trim()) {
            setSubtasks([...subtasks, { id: Date.now(), text: newSubtask, completed: false }]);
            setNewSubtask('');
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const now = new Date();
            setComments([
                ...comments,
                {
                    id: Date.now(),
                    text: newComment,
                    date: now.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    }),
                    user: 'Current User'
                }
            ]);
            setNewComment('');
        }
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newAttachments = files.map(file => ({
            id: Date.now(),
            name: file.name,
            url: URL.createObjectURL(file)
        }));
        setAttachments([...attachments, ...newAttachments]);
    };

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-end z-50"
            onClick={onClose} // Close popup when clicking outside the content
        >
            <div
                className="bg-white w-full max-w-xl h-full overflow-y-auto p-2 shadow-lg"
                style={{ marginTop: "55px" }} // Add margin-top for the menu gap
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
            >
                {/* Header */}
                <div className="p-2 flex justify-between items-center border-b sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold">Task Details</h2>
                    <button
                        className="text-gray-500 hover:text-black"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {/* Content start */}
                <div className="bg-white p-4 w-full max-w-xl h-full overflow-y-auto shadow-lg relative">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            <span className="text-lg font-bold mb-2">{task.title}</span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{task.description}</p>

                    <div className="mb-4">
                        <h3 className="text-sm font-bold text-gray-800 mb-1">Priority</h3>
                        <span className="text-red-600 text-xs font-semibold">
                            {task.priority}
                        </span>
                    </div>
                    {/* Main Content */}
                    <div className="space-y-6">
                        {/* Header with flex layout for assignees, tags, and date */}
                        <div className="flex items-center gap-4">
                            {/* Assignees Section */}
                            <div className="">
                                <span className="text-sm font-medium">Assignees</span>
                                {/* <br /> */}
                                <div className="flex -space-x-2">
                                    {selectedUsers.slice(0, 3).map(user => (
                                        <img
                                            key={user.id}
                                            src={user.image}
                                            alt=""
                                            className="w-8 h-8 rounded-full border-2 border-white"
                                        />
                                    ))}
                                    {selectedUsers.length > 3 && (
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                                            +{selectedUsers.length - 3}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowUserModal(true)}
                                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                                >
                                    +
                                </button>
                            </div>

                            {/* Tags Section */}
                            <div className="">
                                <span className="text-sm font-medium">Tags</span>
                                <div className="flex flex-wrap gap-2">
                                    {selectedTags.slice(0, 2).map(tag => (
                                        <span
                                            key={tag.id}
                                            className={`px-2 py-1 text-xs font-medium bg-${tag.color}-100 text-${tag.color}-800 rounded-full`}
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                    {selectedTags.length > 2 && (
                                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                            +{selectedTags.length - 2}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowTagModal(true)}
                                    className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-full"
                                >
                                    + Add
                                </button>
                            </div>

                            {/* Date Section */}
                            <div className="ml-auto">
                                <div className="text-sm font-medium">Due</div>
                                <input
                                    type="datetime-local"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="px-2 py-1 text-sm border rounded-md"
                                />
                            </div>
                        </div>
                        
                        {/* Tabs Section */}
                        <div className="space-y-4">
                            <div className="flex border-b">
                                {['subtasks', 'attachments', 'comments'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 text-sm font-medium capitalize ${activeTab === tab
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="mt-4">
                                {activeTab === 'subtasks' && (
                                    <div className="space-y-4">
                                        <form onSubmit={handleSubtaskSubmit}>
                                            <input
                                                type="text"
                                                value={newSubtask}
                                                onChange={(e) => setNewSubtask(e.target.value)}
                                                placeholder="Add a new subtask..."
                                                className="w-full px-3 py-2 border rounded-md"
                                            />
                                        </form>
                                        <div className="space-y-2">
                                            {subtasks.map(task => (
                                                <div key={task.id} className="flex items-center space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={task.completed}
                                                        onChange={() => {
                                                            setSubtasks(subtasks.map(t =>
                                                                t.id === task.id ? { ...t, completed: !t.completed } : t
                                                            ));
                                                        }}
                                                        className="h-4 w-4 rounded border-gray-300"
                                                    />
                                                    <span className={task.completed ? 'line-through text-gray-500 border-b bg-white w-full py-2' : 'border-b bg-white w-full py-2'}>
                                                        {task.text}
                                                    </span>
                                                    <br />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'attachments' && (
                                    <div className="space-y-4">
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="block w-full px-4 py-2 text-sm text-center text-gray-700 border-2 border-dashed rounded-md hover:border-gray-400 cursor-pointer"
                                        >
                                            + Add Attachments
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {attachments.map(file => (
                                                <div key={file.id} className="relative group">
                                                    <img
                                                        src={file.url}
                                                        alt={file.name}
                                                        className="w-full h-32 object-cover rounded-md"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                                                        <a
                                                            href={file.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-white hover:underline"
                                                        >
                                                            View
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'comments' && (
                                    <div className="space-y-4">
                                        <div className="space-y-4 mb-16">
                                            {comments.map(comment => (
                                                <div key={comment.id} className="bg-gray-50 p-3 rounded-md">
                                                    <div className="flex justify-between items-start">
                                                        <span className="font-medium">{comment.user}</span>
                                                        <span className="text-xs text-gray-500">{comment.date}</span>
                                                    </div>
                                                    <p className="mt-1 text-sm">{comment.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Comment input - Fixed at bottom */}
                    <div className="fixed w-full max-w-[555px] bottom-0 right-5px bg-white border-t p-2">
                        <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
                            <div className="flex items-center gap-2 w-full px-4 py-2 bg-white border rounded-full">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Post a comment..."
                                    className="flex-1 outline-none text-sm"
                                />
                                <button type="button" className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </form>
                    </div>

                    {/* Modals */}
                    {showUserModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-start justify-center pt-20">
                            <div ref={userModalRef} className="bg-white w-64 rounded-lg shadow-xl">
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-medium">ASSIGN TASK TO</h3>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search by name..."
                                        className="w-full px-3 py-2 border rounded-md mb-4"
                                    />
                                    <div className="space-y-2 max-h-64 overflow-y-auto">
                                        {users.map(user => (
                                            <div
                                                key={user.id}
                                                onClick={() => handleUserToggle(user)}
                                                className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-gray-50 
                      ${selectedUsers.find(u => u.id === user.id) ? 'bg-blue-50' : ''}`}
                                            >
                                                <img src={user.image} alt="" className="w-8 h-8 rounded-full" />
                                                <span className="text-sm">{user.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {showTagModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-start justify-center pt-20">
                            <div ref={tagModalRef} className="bg-white w-64 rounded-lg shadow-xl">
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-medium">SELECT TAGS</h3>
                                    </div>
                                    <div className="space-y-2 max-h-64 overflow-y-auto">
                                        {availableTags.map(tag => (
                                            <div
                                                key={tag.id}
                                                onClick={() => handleTagToggle(tag)}
                                                className={`p-2 rounded-md cursor-pointer hover:bg-gray-50
                      ${selectedTags.find(t => t.id === tag.id) ? 'bg-blue-50' : ''}`}
                                            >
                                                <span className={`px-2 py-1 text-xs font-medium bg-${tag.color}-100 text-${tag.color}-800 rounded-full`}>
                                                    {tag.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Emoji Picker Modal */}
                    {showEmojiPicker && (
                        <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-xl border p-4 z-50">
                            <div className="grid grid-cols-8 gap-2">
                                {['😀', '😂', '😊', '😍', '🤔', '😎', '👍', '❤️'].map((emoji, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setNewComment(prev => prev + emoji);
                                            setShowEmojiPicker(false);
                                        }}
                                        className="text-xl hover:bg-gray-100 p-1 rounded"
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">{task.title}</h2>
                    <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                    <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                    <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                    <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                    <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                    <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                    <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                    <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                    <p className="text-gray-600 text-sm mb-4">{task.description}</p>

                    <div className="mb-4">
                        <h3 className="text-sm font-bold text-gray-800 mb-1">Priority</h3>
                        <span className="text-red-600 text-xs font-semibold">
                            {task.priority}
                        </span>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-sm font-bold text-gray-800 mb-1">Assigned To</h3>
                        <div className="flex space-x-2">
                            {task.assignees &&
                                task.assignees.map((assignee, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-xs"
                                    >
                                        {assignee}
                                    </span>
                                ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-sm font-bold text-gray-800 mb-1">Tags</h3>
                        {task.tags &&
                            task.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-blue-600 bg-blue-100 rounded-full px-2 py-1 text-xs mr-2"
                                >
                                    {tag}
                                </span>
                            ))}
                    </div>

                    <div className="mb-4">
                        <h3 className="text-sm font-bold text-gray-800 mb-1">Created Date</h3>
                        <span className="text-gray-600 text-sm">{task.date}</span>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-sm font-bold text-gray-800 mb-1">Subtasks</h3>
                        <button className="text-blue-500 text-sm font-medium">
                            Add Subtask
                        </button>
                    </div>
                </div> */}


            </div>
        </div>
    );
};

export default TaskPopup;
