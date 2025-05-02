import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { AdminSidebar } from "@/components/AdminWebSection";
import { Textarea } from "@/components/ui/textarea";
import { DeleteModal } from "@/components/DeleteModal";

export default function AdminEditArticlePage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`https://fs-server-alpha.vercel.app/posts/${postId}`);
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error("Failed to load article", error);
      }
    }
    fetchArticle();
  }, [postId]);

  const handleSave = async () => {
    try {
      const res = await axios.put(`https://fs-server-alpha.vercel.app/posts/${postId}`, formData);
      if (res.status === 200) {
        toast.success("Article updated successfully", {
          className: "bg-green-500 text-white font-medium rounded-xl shadow-lg px-6 py-4",
        });
        navigate("/admin/article-management");
      }
    } catch (error) {
      toast.error("Failed to update article", {
        className: "bg-red-500 text-white font-medium rounded-xl shadow-lg px-6 py-4",
      });
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`https://fs-server-alpha.vercel.app/posts/${postId}`);
      if (res.status === 200) {
        toast.success("Article deleted successfully", {
          className: "bg-green-500 text-white font-medium rounded-xl shadow-lg px-6 py-4",
        });
        navigate("/admin/article-management");
      }
    } catch (error) {
      toast.error("Failed to delete article", {
        className: "bg-red-500 text-white font-medium rounded-xl shadow-lg px-6 py-4",
      });
      console.error("Delete failed:", error);
    }
  };

  if (!formData) return <div className="p-10 text-gray-500">Loading article data...</div>;

  return (
    <div className="flex h-screen bg-[#F9F8F6] font-sans">
      <AdminSidebar />
      <main className="flex-1 p-10 bg-[#F9F8F6] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1d1d1d]">Edit article</h2>
          <div className="space-x-2">
            <Button variant="outline" className="px-6 py-2 rounded-full border border-[#DAD6D1] text-sm cursor-pointer hover:bg-gray-100 transition">Save as draft</Button>
            <Button onClick={handleSave} className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 text-sm cursor-pointer transition">Save</Button>
          </div>
        </div>

        <form className="space-y-8 max-w-4xl">
          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">Thumbnail image</label>
            <div className="flex items-end space-x-4">
              <div className="flex justify-center items-center w-full max-w-lg h-64 px-6 py-20 border-2 border-dashed border-[#DAD6D1] rounded-md bg-white">
                {formData.image ? (
                  <img src={formData.image} alt="thumbnail" className="object-contain h-full" />
                ) : (
                  <div className="text-center space-y-2">
                    <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <label htmlFor="file-upload" className="px-6 py-2 border border-[#DAD6D1] rounded-full bg-white text-gray-800 hover:text-gray-600 cursor-pointer text-sm transition">
                Upload thumbnail image
                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <Select defaultValue={formData.category?.toLowerCase() || ""} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="max-w-lg py-2 px-3 rounded-md border border-[#DAD6D1] text-sm text-gray-600 bg-white cursor-pointer">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-[#DAD6D1] rounded-md shadow-sm transition duration-300">
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="inspiration">Inspiration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author name</label>
            <Input id="author" value={formData.author || "Thompson P."} disabled className="max-w-lg py-2 px-3 rounded-md border border-[#DAD6D1] text-sm bg-gray-100" />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Article title" className="max-w-3xl py-2 px-3 rounded-md border border-[#DAD6D1] text-sm bg-white" />
          </div>

          <div>
            <label htmlFor="introduction" className="block text-sm font-medium text-gray-700 mb-1">Introduction (max 120 letters)</label>
            <Textarea id="introduction" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} maxLength={120} className="max-w-3xl py-2 px-3 rounded-md border border-[#DAD6D1] text-sm bg-white" />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <Textarea id="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={20} className="max-w-5xl py-2 px-3 rounded-md border border-[#DAD6D1] text-sm bg-white" />
          </div>
        </form>

        <button onClick={() => setShowDeleteModal(true)} className="mt-6 text-sm font-medium text-red-600 hover:text-red-800 flex items-center gap-2 cursor-pointer transition">
          <Trash2 className="h-5 w-5" />
          Delete article
        </button>

        <DeleteModal
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
          onDelete={handleDelete}
          title="Are you sure?"
          description="Do you really want to delete this article? This process cannot be undone."
        />
      </main>
    </div>
  );
}
