import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Switch from '../../components/Switch/Switch'
import { FaExclamationCircle, FaCommentDots, FaPaperPlane, FaUser, FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown, FaReply } from 'react-icons/fa';
import '../Comment/CommentSection.css'

export const CommentSection = ({ isLoggedIn, movieId, user }) => {
    const [switchValue, setSwitchValue] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visibleReplies, setVisibleReplies] = useState({});
    const [visibleSpoilers, setVisibleSpoilers] = useState({});
    const [visibleReplySpoilers, setVisibleReplySpoilers] = useState({});
    // New state to track which comment has reply input visible
    const [activeReplyId, setActiveReplyId] = useState(null);
    // State for reply input content and spoiler toggle
    const [replyContent, setReplyContent] = useState('');
    const [replySpoilerValue, setReplySpoilerValue] = useState(false);

    const toggleReplySpoiler = (replyId) => {
        setVisibleReplySpoilers(prev => ({
            ...prev,
            [replyId]: !prev[replyId]
        }));
    };

    const toggleReplies = (commentId) => {
        setVisibleReplies(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const handleSwitchToggle = () => {
        setSwitchValue(!switchValue);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleReplyContentChange = (e) => {
        setReplyContent(e.target.value);
    };

    const handleReplySpoilerToggle = () => {
        setReplySpoilerValue(!replySpoilerValue);
    };

    // Toggle reply input visibility for a specific comment
    const toggleReplyInput = (commentId) => {
        if (activeReplyId === commentId) {
            // If clicking the active reply, close it
            setActiveReplyId(null);
            setReplyContent('');
            setReplySpoilerValue(false);
        } else {
            // Otherwise open this one and reset input
            setActiveReplyId(commentId);
            setReplyContent('');
            setReplySpoilerValue(false);
        }
    };

    const handleSentComment = async () => {
        if (comment) {
            setLoading(true);
            try {
                const response = await axios.post(`http://localhost:8080/api/comments/addComment`, {
                    username: user.username,
                    content: comment,
                    containsSpoiler: switchValue,
                    movieId: movieId,
                    parentId: null // Assuming this is for a main comment
                });

                if (response && response.data) {
                    alert("Successfully added your comment.");
                    setComment('');
                    fetchComments();  // Refresh the comment list after posting a new comment
                } else {
                    setError("Cannot add comment");
                }
            } catch (error) {
                console.error('Error adding comment:', error);
                setError("Cannot add comment");
            } finally {
                setLoading(false);
            }
        } else {
            alert("You cannot send an empty comment.");
        }
    };

    const handleSendReply = async (parentId) => {
        if (replyContent) {
            setLoading(true);
            try {
                const response = await axios.post(`http://localhost:8080/api/comments/${parentId}/reply`, {
                    username: user.username,
                    content: replyContent,
                    containsSpoiler: replySpoilerValue,
                    movieId: movieId,
                    parentId: parentId
                });

                if (response && response.data) {
                    alert("Successfully added your reply.");
                    setReplyContent('');
                    setActiveReplyId(null); // Close reply input after sending
                    setReplySpoilerValue(false);
                    fetchComments();  // Refresh after reply
                } else {
                    setError("Cannot add reply");
                }
            } catch (error) {
                console.error('Error adding reply:', error);
                setError("Cannot add reply");
            } finally {
                setLoading(false);
            }
        } else {
            alert("You cannot send an empty reply.");
        }
    };

    const likeComment = async (commentId) => {
        try {
            await axios.post(`http://localhost:8080/api/comments/${commentId}/like`, null, {
                params: { username: user.username }
            });
            fetchComments();  // Refresh after like
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    };

    const dislikeComment = async (commentId) => {
        try {
            await axios.post(`http://localhost:8080/api/comments/${commentId}/dislike`, null, {
                params: { username: user.username }
            });
            fetchComments();  // Refresh after dislike
        } catch (error) {
            console.error('Error disliking comment:', error);
        }
    };

    const fetchComments = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/comments/movie/${movieId}`);
            if (response && response.data) {
                setComments(response.data);
            } else {
                setError("No comments found");
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            setError("Cannot fetch comments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [movieId]);

    const formatTimeAgo = (createdAt) => {
        const now = new Date();
        const commentDate = new Date(createdAt);
        const diffInMilliseconds = now - commentDate;
        const diffInSeconds = diffInMilliseconds / 1000;
        const diffInMinutes = diffInSeconds / 60;
        const diffInHours = diffInMinutes / 60;
        const diffInDays = diffInHours / 24;
        const diffInMonths = diffInDays / 30;
        const diffInYears = diffInDays / 365;

        if (diffInYears >= 1) return `${Math.floor(diffInYears)} years ago`;
        if (diffInMonths >= 1) return `${Math.floor(diffInMonths)} months ago`;
        if (diffInDays >= 7) return `${Math.floor(diffInDays / 7)} weeks ago`;
        if (diffInDays >= 1) return `${Math.floor(diffInDays)} days ago`;
        if (diffInHours >= 1) return `${Math.floor(diffInHours)} hours ago`;
        if (diffInMinutes >= 1) return `${Math.floor(diffInMinutes)} minutes ago`;
        return 'Just now';
    };
    
    const totalCommentCount = (comments ?? []).reduce((acc, comment) => {
        return acc + 1 + (comment?.replies?.length || 0);
    }, 0);

    const toggleSpoiler = (commentId) => {
        setVisibleSpoilers(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };
    
    return (
        <div className='commentSectionOuter'>
            <div className='relatedToContainer'>
                <p className='titleStyle2'>Comments ({totalCommentCount})</p>
                <FaCommentDots color='#ef4444' size={24}></FaCommentDots>
            </div>
            <div className='sizedBoxH'></div>
            {isLoggedIn ? (
                <div className='commentContainer'> 
                    <div className='sizedBoxH3'></div>
                    <input
                        type="text"
                        placeholder="Your thoughts"
                        className="modal-input"
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <div className='sizedBoxH3'></div>
                    <div className='commentBottomContainer'>
                        <div className='switchContainer'>
                            <Switch
                                isOn={switchValue}
                                handleToggle={handleSwitchToggle}
                                onColor="#06D6A0"
                            />
                            <p className='containSpoilerText'>Contains Spoiler</p>
                        </div>
                        <div className='sendCommentBtn'>
                            <button className="rounded-button" onClick={handleSentComment}>
                                <span className="button-text">Send Comment</span>
                                <FaPaperPlane className="sendIcon" />
                            </button>
                        </div>
                    </div> 
                    <div className='sizedBoxH3'></div>
                </div>
            ) : (
                <div className='noLoginContainer'>
                    <div className='spaceBetweenItems'></div>
                    <FaExclamationCircle color='rgb(252 165 165 )' />
                    <div className='spaceBetweenItems'></div>
                    <p className='noLoginText'>Only registered users can comment.</p>
                </div>
            )}

            {comments?.map((comment) => (
                <div key={comment.id} className="commentItem">
                    <div className='user-info-container'>
                        <FaUser className="icon" />
                        <p className='comment-user-info'>{comment.username}</p>
                        <p className='hours-ago'>• {formatTimeAgo(comment.createdAt)}</p>
                    </div>

                    {!comment.containsSpoiler ? (
                        <p className='comment-text-style'>{comment.content}</p>
                    ) : (
                        <div>
                            {!visibleSpoilers[comment.id] ? (
                                <div className='spoiler-container' onClick={() => toggleSpoiler(comment.id)}>
                                    <strong className='comment-spoiler-title-style'>
                                        This comment contains spoilers!
                                    </strong>
                                    <p className='comment-spoiler-subtitle-style'>
                                        Click to see the comment.
                                    </p>
                                </div>
                            ) : (
                                <div className='revealed-spoiler'>
                                    <p className='comment-text-style'>{comment.content}</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className='comment-actions-container'>
                        <FaRegThumbsUp
                            color='white'
                            cursor="pointer"
                            size={14}
                            onClick={() => likeComment(comment.id)}
                        />
                        <p className='comment-text-style'>{comment.likeCount}</p>
                        <div className='sized-box-w'></div>
                        <FaRegThumbsDown
                            color='white'
                            cursor="pointer"
                            size={14}
                            onClick={() => dislikeComment(comment.id)}
                        />
                        <p className='comment-text-style'>{comment.dislikeCount}</p>
                        <div className='sized-box-w'></div>
                        <FaReply 
                            color="white" 
                            cursor="pointer" 
                            size={14} 
                            onClick={() => isLoggedIn && toggleReplyInput(comment.id)} 
                        />
                        <p 
                            className='reply-text' 
                            style={{ cursor: isLoggedIn ? 'pointer' : 'default' }}
                            onClick={() => isLoggedIn && toggleReplyInput(comment.id)}
                        >
                            Reply
                        </p>
                    </div>

                    {/* Reply input section - only visible for the active comment */}
                    {isLoggedIn && activeReplyId === comment.id && (
                        <div>
                            <div className='sizedBoxH3'></div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Write your reply..."
                                    className="modal-input reply-input"
                                    value={replyContent}
                                    onChange={handleReplyContentChange}
                                />
                                <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                                    <button 
                                        className="rounded-button" 
                                        onClick={() => handleSendReply(comment.id)}
                                    >
                                        <span className="button-text">Send Reply</span>
                                        <FaPaperPlane className="sendIcon" />
                                    </button>
                                </div>
                            </div>
                            
                            <div className='commentBottomContainer'>
                                <div></div>
                                <div className='switchContainer'>
                                    <Switch
                                        isOn={replySpoilerValue}
                                        handleToggle={handleReplySpoilerToggle}
                                        onColor="#06D6A0"
                                    />
                                    <p className='containSpoilerText'>Contains Spoiler</p>
                                </div>
                            </div>
                          
                        </div>
                    )}

                    {comment?.replies?.length > 0 && (
                        <p
                            className='comment-text-style-hide-show'
                            style={{ cursor: 'pointer', marginTop: '10px', fontWeight: 500, }}
                            onClick={() => toggleReplies(comment.id)}
                        >
                            {visibleReplies[comment.id] ? 'Hide replies' : `Show replies (${comment.replies.length})`}
                        </p>
                    )}

                    {visibleReplies[comment.id] && comment.replies?.length > 0 && (
                        <div className='repliesContainer'>
                            {comment.replies.map((reply) => (
                                <div className='reply-item-outer' key={reply.id}>
                                    <div className="replyCommentItemDot"><p className='comment-user-info'>•</p></div>
                                    <div className="replyCommentItem">
                                        <div className='user-info-container'>
                                            <FaUser className="icon" />
                                            <p className='comment-user-info'>{reply?.username}</p>
                                            <p className='hours-ago'>• {formatTimeAgo(reply?.createdAt)}</p>
                                        </div>

                                        {!reply.containsSpoiler ? (
                                            <p className='comment-text-style'>{reply?.content}</p>
                                        ) : (
                                            <div>
                                                {!visibleReplySpoilers[reply.id] ? (
                                                    <div
                                                        className='spoiler-container reply-spoiler'
                                                        onClick={() => toggleReplySpoiler(reply.id)}
                                                    >
                                                        <strong className='comment-spoiler-title-style'>
                                                            This reply contains spoilers!
                                                        </strong>
                                                        <p className='comment-spoiler-subtitle-style'>
                                                            Click to see the reply.
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className='revealed-spoiler'>
                                                        <p className='comment-text-style'>{reply?.content}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className='comment-actions-container'>
                                            <FaRegThumbsUp 
                                                color='white' 
                                                cursor="pointer" 
                                                size={14} 
                                                onClick={() => likeComment(reply.id)}
                                            />
                                            <p className='comment-text-style'>{reply?.likeCount}</p>
                                            <div className='sized-box-w'></div>
                                            <FaRegThumbsDown 
                                                color='white' 
                                                cursor="pointer" 
                                                size={14} 
                                                onClick={() => dislikeComment(reply.id)}
                                            />
                                            <p className='comment-text-style'>{reply?.dislikeCount}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default CommentSection;