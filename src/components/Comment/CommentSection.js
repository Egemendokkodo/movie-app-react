import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Switch from '../../components/Switch/Switch'
import { FaExclamationCircle, FaCommentDots, FaPaperPlane, FaUser, FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown, FaReply } from 'react-icons/fa';
import '../Comment/CommentSection.css'
export const CommentSection = ({ isLoggedIn, movieId }) => {
    const [switchValue, setSwitchValue] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const [visibleReplies, setVisibleReplies] = useState({});

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

    const handleSentComment = () => {

        if (comment) {
            console.log("comment yazılan : " + comment);
            console.log("switch value :" + switchValue)
        } else {
            alert("You cannot send an empty comment.")
        }

    }


    const fetchComments = async () => {

        if (!movieId) {

            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/comments/movie/${movieId}`);
            console.log("commentresponse ::" + JSON.stringify(response));
            if (response && response.data) {
                setComments(response.data)
                console.log("comment data3131 :: " + JSON.stringify(response.data));
            } else {
                setError("Film bilgileri alınamadı");
            }
        } catch (error) {
            console.error('Error fetching movie detail:', error);
            setError("Film detayları yüklenirken bir hata oluştu");
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

        // 1. Eğer 365 günden fazla ise yıllık gösterim
        if (diffInYears >= 1) {
            return `${Math.floor(diffInYears)} years ago`;
        }
        // 2. Eğer 30 günden fazla ise aylık gösterim
        if (diffInMonths >= 1) {
            return `${Math.floor(diffInMonths)} months ago`;
        }
        // 3. Eğer 7 günden fazla ise haftalık gösterim
        if (diffInDays >= 7) {
            return `${Math.floor(diffInDays / 7)} weeks ago`;
        }
        // 4. Eğer 7 günden azsa günlük gösterim
        if (diffInDays >= 1) {
            return `${Math.floor(diffInDays)} days ago`;
        }

        // 5. Eğer 1 günden azsa saatlik veya dakikalık gösterim
        if (diffInHours >= 1) {
            return `${Math.floor(diffInHours)} hours ago`;
        }
        if (diffInMinutes >= 1) {
            return `${Math.floor(diffInMinutes)} minutes ago`;
        }

        return 'Just now';  // Çok kısa süre önce
    };
    const totalCommentCount = (comments ?? []).reduce((acc, comment) => {
        return acc + 1 + (comment?.replies?.length || 0);
      }, 0);
      
      
    return (
        <div className='commentSectionOuter'>
            <div className='relatedToContainer'>
                <p className='titleStyle2'>Comments ({totalCommentCount})</p>
                <FaCommentDots color='#ef4444' size={24}></FaCommentDots>
            </div>
            <div className='sizedBoxH'></div>
            {isLoggedIn ? (<div className='commentContainer'> <div className='sizedBoxH3'></div>
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
                </div> <div className='sizedBoxH3'></div>


            </div>) : (<div className='noLoginContainer'>
                <div className='spaceBetweenItems'></div>
                <FaExclamationCircle color='rgb(252 165 165 )' />
                <div className='spaceBetweenItems'></div>
                <p className='noLoginText'>Only registered users can comment.</p>
            </div>)}


            {comments?.map((comment) => (
        <div key={comment.id} className="commentItem">
          <div className='user-info-container'>
            <FaUser className="icon" />
            <p className='comment-user-info'>{comment?.username}</p>
            <p className='hours-ago'>• {formatTimeAgo(comment?.createdAt)}</p>
          </div>
          <p className='comment-text-style'>{comment?.content}</p>

          <div className='comment-actions-container'>
            <FaRegThumbsUp color='white' cursor="pointer" size={14} />
            <p className='comment-text-style'>{comment?.likeCount}</p>
            <div className='sized-box-w'></div>
            <FaRegThumbsDown color='white' cursor="pointer" size={14} />
            <p className='comment-text-style'>{comment?.dislikeCount}</p>
            <div className='sized-box-w'></div>
            <div className='replyContainer'>
              <FaReply color='white' size={14} />
              <div className='sized-box-w'></div>
              <p className='comment-text-style'>Reply</p>
            </div>
          </div>

        
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
                    <p className='comment-text-style'>{reply?.content}</p>

                    <div className='comment-actions-container'>
                      <FaRegThumbsUp color='white' cursor="pointer" size={14} />
                      <p className='comment-text-style'>{reply?.likeCount}</p>
                      <div className='sized-box-w'></div>
                      <FaRegThumbsDown color='white' cursor="pointer" size={14} />
                      <p className='comment-text-style'>{reply?.dislikeCount}</p>
                      <div className='sized-box-w'></div>
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


/* {comment.replies.length > 0 && (
    <div className="replies">
        {comment.replies.map(reply => (
            <div key={reply.id} className="replyItem">
                <p><strong>{reply.username}</strong> {reply.content}</p>
            </div>
        ))}
    </div>
)} */