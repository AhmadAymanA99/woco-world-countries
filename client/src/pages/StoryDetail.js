import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { storiesAPI } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import { ArrowLeft, Heart, MessageCircle, Eye, Edit2, Trash2, Calendar } from "lucide-react";
import toast from "react-hot-toast";

const StoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [showComments, setShowComments] = useState(true);
    const [commentText, setCommentText] = useState("");

    const { data: storyData, isLoading } = useQuery(["story", id], () => storiesAPI.getById(id));

    const likeMutation = useMutation(() => storiesAPI.like(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["story", id]);
            queryClient.invalidateQueries("stories");
        },
        onError: () => toast.error("Failed to like story"),
    });

    const commentMutation = useMutation(() => storiesAPI.addComment(id, commentText), {
        onSuccess: () => {
            queryClient.invalidateQueries(["story", id]);
            setCommentText("");
            toast.success("Comment added!");
        },
        onError: () => toast.error("Failed to add comment"),
    });

    const deleteMutation = useMutation(() => storiesAPI.delete(id), {
        onSuccess: () => {
            toast.success("Story deleted");
            navigate("/stories");
        },
        onError: () => toast.error("Failed to delete story"),
    });

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        commentMutation.mutate();
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this story?")) {
            deleteMutation.mutate();
        }
    };

    const story = storyData?.data;
    const isAuthor = user && story && story.author?._id === user._id;
    const isLiked = user && story?.likes?.some((like) => like.user?._id === user._id);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!story) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Story not found</p>
                <Link to="/stories" className="btn-primary mt-4">
                    Back to Stories
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Link to="/stories" className="text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                {isAuthor && (
                    <div className="flex items-center space-x-2">
                        <Link to={`/stories/${id}/edit`} className="btn-outline flex items-center space-x-2">
                            <Edit2 className="h-4 w-4" />
                            <span>Edit</span>
                        </Link>
                        <button onClick={handleDelete} className="btn-secondary flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Story Content */}
            <article className="card">
                {/* Story Header */}
                <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <img src={story.country?.flag} alt={story.country?.name} className="w-8 h-6 object-cover rounded" />
                        <Link to={`/countries/${story.country?._id}`} className="text-primary-600 hover:underline font-medium">
                            {story.country?.name}
                        </Link>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{story.title}</h1>

                    {/* Author Info */}
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                            {story.author?.avatar ? (
                                <img src={story.author.avatar} alt={story.author.username} className="h-8 w-8 rounded-full" />
                            ) : (
                                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                                    <span className="text-primary-600 font-medium text-xs">
                                        {story.author?.firstName?.[0]}
                                        {story.author?.lastName?.[0]}
                                    </span>
                                </div>
                            )}
                            <span className="font-medium">
                                {story.author?.firstName} {story.author?.lastName}
                            </span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                        </div>
                        {story.tags && story.tags.length > 0 && (
                            <div className="flex items-center space-x-2 flex-wrap">
                                {story.tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
                        <button onClick={() => likeMutation.mutate()} className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${isLiked ? "text-red-600 bg-red-50" : "text-gray-600 hover:text-red-600 hover:bg-red-50"}`} disabled={!user}>
                            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                            <span>{story.likes?.length || 0}</span>
                        </button>
                        <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                            <MessageCircle className="h-5 w-5" />
                            <span>{story.comments?.length || 0}</span>
                        </button>
                        <div className="flex items-center space-x-2 px-3 py-2 text-gray-600">
                            <Eye className="h-5 w-5" />
                            <span>{story.views || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Story Content */}
                {story.coverImage && <img src={story.coverImage} alt={story.title} className="w-full h-64 md:h-96 object-cover rounded-lg mb-6" />}

                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: story.content }} />

                {story.excerpt && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-primary-500">
                        <p className="text-gray-700 italic">{story.excerpt}</p>
                    </div>
                )}
            </article>

            {/* Comments Section */}
            {showComments && (
                <div className="card">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Comments</h2>

                    {/* Add Comment */}
                    {user && (
                        <form onSubmit={handleAddComment} className="mb-6">
                            <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="input-field mb-3" rows={3} maxLength={1000} />
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-500">{commentText.length}/1000 characters</p>
                                <button type="submit" disabled={!commentText.trim() || commentMutation.isLoading} className="btn-primary">
                                    {commentMutation.isLoading ? "Posting..." : "Post Comment"}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Comments List */}
                    {story.comments && story.comments.length > 0 ? (
                        <div className="space-y-4">
                            {story.comments.map((comment) => (
                                <div key={comment._id} className="border-b border-gray-200 pb-4 last:border-0">
                                    <div className="flex items-start space-x-3">
                                        {comment.user?.avatar ? (
                                            <img src={comment.user.avatar} alt={comment.user.username} className="h-10 w-10 rounded-full" />
                                        ) : (
                                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                                <span className="text-primary-600 font-medium text-sm">
                                                    {comment.user?.firstName?.[0]}
                                                    {comment.user?.lastName?.[0]}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="font-medium text-gray-900">
                                                    {comment.user?.firstName} {comment.user?.lastName}
                                                </span>
                                                <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-700">{comment.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default StoryDetail;
