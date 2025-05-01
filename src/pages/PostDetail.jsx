import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Smile, Copy, Facebook, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `https://blog-post-project-api.vercel.app/posts/${postId}`
        );
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUnauthAction = () => setShowLoginModal(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied!", {
      description: "This article has been copied to your clipboard.",
      className: "bg-green-500 text-white font-medium rounded-xl shadow-lg px-6 py-4",
      closeButton: true,
      duration: 4000,
      style: {
        fontSize: "16px",
      },
    });
  };
  

  const shareUrl = encodeURIComponent(window.location.href);

  if (!post) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500 mb-4">
        {post.author} ·{" "}
        {new Date(post.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <img src={post.image} alt={post.title} className="rounded-lg mb-6" />

      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold mt-6 mb-2" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 text-gray-800" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc ml-6 mb-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal ml-6 mb-4" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
        }}
      >
        {post.content}
      </ReactMarkdown>

      {/* Reaction & Share Bar */}
      <div className="flex items-center justify-between bg-[#f0efec] mt-10 px-4 py-4 rounded-xl gap-3 flex-wrap">
        <Button
          variant="outline"
          className="rounded-full px-6 text-base hover:bg-[#e6e3df] cursor-pointer transition"
          onClick={handleUnauthAction}
        >
          <Smile className="w-5 h-5 mr-2" /> {post.likes || 321}
        </Button>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="rounded-full px-6 text-base hover:bg-[#e6e3df] cursor-pointer transition"
          >
            <Copy className="w-4 h-4 mr-2" /> Copy
          </Button>
          <a
            href={`https://www.facebook.com/share.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-black rounded-full p-2 hover:bg-[#e6e3df] transition cursor-pointer"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-black rounded-full p-2 hover:bg-[#e6e3df] transition cursor-pointer"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`https://twitter.com/share?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-black rounded-full p-2 hover:bg-[#e6e3df] transition cursor-pointer"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-2">Comment</h3>
        <textarea
          placeholder="What are your thoughts?"
          className="w-full h-28 p-4 border border-gray-400 rounded-xl text-sm text-gray-700 cursor-pointer"
          onFocus={handleUnauthAction}
          readOnly
        />
        <div className="text-right mt-4">
          <Button
            onClick={handleUnauthAction}
            className="bg-black text-white px-6 py-2 rounded-full cursor-pointer hover:bg-gray-900 transition"
          >
            Send
          </Button>
        </div>
      </div>

      {/* Login Modal */}
      <AlertDialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <AlertDialogContent className="flex flex-col justify-center items-center text-center max-w-md bg-white shadow-lg border border-gray-300 rounded-2xl py-10 px-6 transition-all duration-300">
          <AlertDialogHeader className="space-y-2">
            <AlertDialogTitle className="text-3xl font-bold leading-tight">
              <h1 className="text-center">Create an account to <br/> continue</h1>
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="mt-2 flex justify-center">
            <AlertDialogAction className="rounded-full px-10 py-6 text-base font-medium bg-black text-white hover:bg-white hover:text-black hover:border-1 active:scale-95 transition-all duration-300 cursor-pointer">
              Create account
            </AlertDialogAction>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Already have an account?{" "}
            <span
              className="text-black font-medium underline cursor-pointer hover:text-gray-800 transition-all duration-300"
              onClick={() => setShowLoginModal(false)}
            >
              Log in
            </span>
          </p>

          <button
            onClick={() => setShowLoginModal(false)}
            className="absolute top-4 right-4 text-black text-lg font-bold cursor-pointer hover:text-red-800 active:scale-95 transition-all duration-300"
          >
            ×
          </button>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
