import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { storiesAPI } from "../utils/api";
import Skeleton from "../components/Skeleton";
import { useAuth } from "../contexts/AuthContext";
import { ArrowLeft, Heart, MessageCircle, Eye, Edit2, Trash2, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { formatDate } from '../utils/format';
import { SEO } from '../components/SEO';

const StoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [showComments, setShowComments] = useState(true);
    const [commentText, setCommentText] = useState("");

    const { data: storyData, isLoading } = useQuery(["story", id], () => storiesAPI.getById(id));

    const likeMutation = useMutation(() => storiesAPI.like(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["story", id]);
            queryClient.invalidateQueries("stories");
        },
        onError: () => toast.error(t("storyDetail.likeError")),
    });

    const commentMutation = useMutation(() => storiesAPI.addComment(id, commentText), {
        onSuccess: () => {
            queryClient.invalidateQueries(["story", id]);
            setCommentText("");
            toast.success(t("storyDetail.commentAdded"));
        },
        onError: () => toast.error(t("storyDetail.commentError")),
    });

    const deleteMutation = useMutation(() => storiesAPI.delete(id), {
        onSuccess: () => {
            toast.success(t("storyDetail.deleted"));
            navigate("/stories");
        },
        onError: () => toast.error(t("storyDetail.deleteError")),
    });

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        commentMutation.mutate();
    };

    const handleDelete = () => {
        if (window.confirm(t("storyDetail.deleteConfirm"))) {
            deleteMutation.mutate();
        }
    };

    const story = storyData?.data;
    const isAuthor = user && story && story.author?._id === user._id;
    const isLiked = user && story?.likes?.some((like) => like.user?._id === user._id);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-96 dark:bg-gray-700">
                <Skeleton variant="avatar" className="!h-32 !w-32" />
            </div>
        );
    }

    if (!story) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">{t("storyDetail.errorNotFound")}</p>
                <Link to="/stories" className="btn-primary mt-4">
                    {t('storyDetail.backToStories')}
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title={t('seo.storyDetailTitle', { title: story.title })}
                description={story.content ? story.content.substring(0, 160) : t('stories.description')}
                image={story.coverImage || story.author?.avatar}
                url={`/stories/${id}`}
            />
            {/* Header */}
            <div className="flex items-center justify-between">
                <Link to="/stories" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                {isAuthor && (
                    <div className="flex items-center gap-2">
                        <Link to={`/stories/${id}/edit`} className="btn-outline flex items-center gap-2">
                            <Edit2 className="h-4 w-4" />
                            <span>{t("common.edit")}</span>
                        </Link>
                        <button onClick={handleDelete} className="btn-secondary flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20">
                            <Trash2 className="h-4 w-4" />
                            <span>{t("common.delete")}</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Story Content */}
            <article className="card">
                {/* Story Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <img src={story.country?.flag} alt={story.country?.name} className="w-8 h-6 object-cover rounded" />
                        <Link to={`/countries/${story.country?._id}`} className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                            {story.country?.name}
                        </Link>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{story.title}</h1>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                            {story.author?.avatar ? (
                                <img src={story.author.avatar} alt={story.author.username} className="h-8 w-8 rounded-full" />
                            ) : (
                                <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                    <span className="text-primary-600 dark:text-primary-400 font-medium text-xs">
                                        {story.author?.firstName?.[0]}
                                        {story.author?.lastName?.[0]}
                                    </span>
                                </div>
                            )}
                            <span className="font-medium">
                                {story.author?.firstName} {story.author?.lastName}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(story.createdAt)}</span>
                        </div>
                        {story.tags && story.tags.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap">
                                {story.tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button onClick={() => likeMutation.mutate()} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isLiked ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20" : "text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"}`} disabled={!user}>
                            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                            <span>{story.likes?.length || 0}</span>
                        </button>
                        <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <MessageCircle className="h-5 w-5" />
                            <span>{story.comments?.length || 0}</span>
                        </button>
                        <div className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400">
                            <Eye className="h-5 w-5" />
                            <span>{story.views || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Story Content */}
                {story.coverImage && <img src={story.coverImage} alt={story.title} className="w-full h-64 md:h-96 object-cover rounded-lg mb-6" />}

                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: story.content }} />

                {story.excerpt && (
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-s-4 border-primary-500">
                        <p className="text-gray-700 dark:text-gray-300 italic">{story.excerpt}</p>
                    </div>
                )}
            </article>

            {/* Comments Section */}
            {showComments && (
                <div className="card">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("storyDetail.comments")}</h2>

                    {/* Add Comment */}
                    {user && (
                        <form onSubmit={handleAddComment} className="mb-6">
                            <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder={t('storyDetail.commentPlaceholder')} className="input-field mb-3" rows={3} maxLength={1000} />
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-500 dark:text-gray-400">{t('storyDetail.charCount', { count: commentText.length })}</p>
                                <button type="submit" disabled={!commentText.trim() || commentMutation.isLoading} className="btn-primary">
                                    {commentMutation.isLoading ? t('storyDetail.posting') : t('storyDetail.postComment')}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Comments List */}
                    {story.comments && story.comments.length > 0 ? (
                        <div className="space-y-4">
                            {story.comments.map((comment) => (
                                <div key={comment._id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                                    <div className="flex items-start gap-3">
                                        {comment.user?.avatar ? (
                                            <img src={comment.user.avatar} alt={comment.user.username} className="h-10 w-10 rounded-full" />
                                        ) : (
                                            <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                                <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
                                                    {comment.user?.firstName?.[0]}
                                                    {comment.user?.lastName?.[0]}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                                    {comment.user?.firstName} {comment.user?.lastName}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(comment.createdAt)}</span>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">{t("storyDetail.noComments")}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default StoryDetail;
