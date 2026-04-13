"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const AVATAR_COLORS = [
  { from: "from-rose-500", to: "to-rose-600" },
  { from: "from-orange-500", to: "to-orange-600" },
  { from: "from-amber-500", to: "to-amber-600" },
  { from: "from-green-500", to: "to-green-600" },
  { from: "from-teal-500", to: "to-teal-600" },
  { from: "from-cyan-500", to: "to-cyan-600" },
  { from: "from-blue-500", to: "to-blue-600" },
  { from: "from-red-500", to: "to-red-600" },
  { from: "from-pink-500", to: "to-pink-600" },
  { from: "from-indigo-500", to: "to-indigo-600" },
  { from: "from-yellow-500", to: "to-yellow-600" },
  { from: "from-lime-500", to: "to-lime-600" },
];

function getColorForUser(name?: string | null, email?: string | null): typeof AVATAR_COLORS[0] {
  const str = name || email || "user";
  const hash = str.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

interface CommentSectionProps {
  productId: string;
}

export default function CommentSection({ productId }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/comments?productId=${productId}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Failed to fetch comments:", error));
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      window.location.href = "/auth/signin";
      return;
    }

    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, content: newComment }),
      });
      const comment = await res.json();
      setComments([comment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (commentId: string) => {
    try {
      await fetch(`/api/comments?id=${commentId}`, { method: "DELETE" });
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-xl font-bold text-zinc-900 dark:text-zinc-50">
        Comments ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="mb-8">
        {session ? (
          <div className="flex gap-3">
            {(() => {
              const avatarColor = getColorForUser(session.user?.name, session.user?.email);
              return (
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarColor.from} ${avatarColor.to} text-white font-semibold`}>
                  {session.user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              );
            })()}
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows={3}
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
              <button
                type="submit"
                disabled={loading || !newComment.trim()}
                className="mt-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {loading ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-600 dark:text-zinc-400">
              <Link href="/auth/signin" className="font-medium text-zinc-900 underline dark:text-zinc-50">
                Sign in
              </Link>{" "}
              to leave a comment
            </p>
          </div>
        )}
      </form>

      <div className="space-y-6">
        {comments.map((comment) => {
          const avatarColor = getColorForUser(comment.user.name, comment.user.email);
          return (
          <div key={comment.id} className="flex gap-3">
            {comment.user.image ? (
              <Image
                src={comment.user.image}
                alt={comment.user.name || "User"}
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full"
              />
            ) : (
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarColor.from} ${avatarColor.to} text-white font-semibold`}>
                {comment.user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-zinc-900 dark:text-zinc-50">
                  {comment.user.name || comment.user.email}
                </span>
                <span className="text-sm text-zinc-500">{formatDate(comment.createdAt)}</span>
                {session?.user?.id === comment.user.id && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="ml-auto text-sm text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="mt-1 text-zinc-700 dark:text-zinc-300">{comment.content}</p>
            </div>
          </div>
          );
        })}

        {comments.length === 0 && (
          <p className="text-center text-zinc-500 dark:text-zinc-400">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
