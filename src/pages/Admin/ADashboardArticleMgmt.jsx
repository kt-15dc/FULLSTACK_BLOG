import { useState } from "react";
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
import { AdminSidebar } from "@/components/AdminWebSection";

const articles = [
  {
    title: "Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do",
    category: "Cat",
    status: "Published",
  },
  {
    title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
    category: "Cat",
    status: "Published",
  },
  {
    title: "Finding Motivation: How to Stay Inspired Through Life's Challenges",
    category: "General",
    status: "Published",
  },
  {
    title: "The Science of the Cat's Purr: How It Benefits Cats and Humans Alike",
    category: "Cat",
    status: "Published",
  },
  {
    title: "Top 10 Health Tips to Keep Your Cat Happy and Healthy",
    category: "Cat",
    status: "Published",
  },
  {
    title: "Unlocking Creativity: Simple Habits to Spark Inspiration Daily",
    category: "Inspiration",
    status: "Published",
  },
];

export default function AdminArticleManagementPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-[#F9F8F6] font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 p-10 overflow-auto bg-[#F9F8F6]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1d1d1d]">Article management</h2>
          <Button
            className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800"
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
              className="w-full py-2 rounded-md border border-[#DAD6D1] text-sm placeholder:text-gray-500 bg-white"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[180px] py-2 rounded-md border border-[#DAD6D1] text-sm text-gray-600 bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-[#DAD6D1] rounded-md shadow-sm">
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px] py-2 rounded-md border border-[#DAD6D1] text-sm text-gray-600 bg-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-[#DAD6D1] rounded-md shadow-sm">
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
                key={index}
                className={`text-sm border-t border-[#DAD6D1] ${index % 2 === 1 ? "bg-[#F9F8F6]" : "bg-white"}`}
              >
                <TableCell className="font-medium text-[#1d1d1d]">{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {article.status}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="sm">
                    <PenSquare className="h-4 w-4 hover:text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 hover:text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}