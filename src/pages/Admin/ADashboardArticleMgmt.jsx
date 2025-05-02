import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PenSquare, Trash2 } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AdminSidebar } from "@/components/AdminWebSection";
import { debounce } from "lodash";

export default function AdminArticleManagementPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");

  const fetchArticles = async (params) => {
    try {
      const query = new URLSearchParams({
        page: params.page || 1,
        limit: 6,
        search: params.search || "",
        status: params.status === "all" ? "" : params.status,
        category: params.category === "all" ? "" : params.category,
      }).toString();
      const res = await fetch(`https://fs-server-alpha.vercel.app/posts?${query}`);
      const data = await res.json();
      setArticles(data.posts);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    }
  };

  useEffect(() => {
    fetchArticles({ page, search, status, category });
  }, [page, status, category]);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setPage(1);
      fetchArticles({ page: 1, search, status, category });
    }, 300);

    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [search]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`https://fs-server-alpha.vercel.app/posts/${deleteId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setArticles((prev) => prev.filter((article) => article.id !== deleteId));
        setShowDeleteModal(false);
      }
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === page}
            onClick={() => setPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return (
      <Pagination className="mt-6 justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => page > 1 && setPage(page - 1)}
            />
          </PaginationItem>
          {pages}
          {totalPages > 3 && <PaginationEllipsis />}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => page < totalPages && setPage(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="flex h-screen bg-[#F9F8F6] font-sans">
      <AdminSidebar />
      <main className="flex-1 p-10 overflow-auto bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1d1d1d]">Article management</h2>
          <Button
            className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 cursor-pointer transition"
            onClick={() => navigate("/admin/article-management/create")}
          >
            <PenSquare className="mr-2 h-4 w-4" /> Create article
          </Button>
        </div>

        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2 rounded-md border border-[#DAD6D1] text-sm placeholder:text-gray-500 bg-white"
            />
          </div>
          <Select onValueChange={(val) => { setStatus(val); setPage(1); }} value={status}>
            <SelectTrigger className="w-[180px] py-2 rounded-md border border-[#DAD6D1] text-sm text-gray-600 bg-white cursor-pointer">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-[#DAD6D1] rounded-md shadow-sm">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="publish">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(val) => { setCategory(val); setPage(1); }} value={category}>
            <SelectTrigger className="w-[180px] py-2 rounded-md border border-[#DAD6D1] text-sm text-gray-600 bg-white cursor-pointer">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-[#DAD6D1] rounded-md shadow-sm">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="inspiration">Inspiration</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table className="rounded-xl border border-[#DAD6D1] overflow-hidden">
          <TableHeader>
            <TableRow className="bg-[#F9F8F6] text-[#5f5f5f]">
              <TableHead className="w-[50%]">Article title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article, index) => (
              <TableRow
                key={article.id}
                className={`text-sm border-t border-[#DAD6D1] ${index % 2 === 1 ? "bg-[#F9F8F6]" : "bg-white"}`}
              >
                <TableCell className="font-medium text-[#1d1d1d]">
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => navigate(`/admin/edit-article/${article.id}`)}
                  >
                    {article.title}
                  </span>
                </TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${article.status === 'publish' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {article.status}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="sm" className="cursor-pointer hover:bg-gray-100 transition" onClick={() => navigate(`/admin/edit-article/${article.id}`)}>
                    <PenSquare className="h-4 w-4 hover:text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="sm" className="cursor-pointer hover:bg-gray-100 transition" onClick={() => { setDeleteId(article.id); setShowDeleteModal(true); }}>
                    <Trash2 className="h-4 w-4 hover:text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {renderPagination()}
      </main>

      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent className="bg-white rounded-xl p-8 text-center border border-gray-300 transition duration-300 ease-in-out">
          <AlertDialogHeader>
            <div className="flex justify-center items-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-red-500">
                <Trash2 className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <AlertDialogTitle className="text-xl font-bold">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-sm text-gray-500">
              Do you really want to delete this article? This process cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex justify-center gap-4">
            <AlertDialogCancel className="px-6 py-2 rounded-md bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300 transition">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="px-6 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer transition">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
