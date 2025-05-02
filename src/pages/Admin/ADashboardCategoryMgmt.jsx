import { PenSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminSidebar } from "@/components/AdminWebSection";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Cat" },
  { name: "General" },
  { name: "Inspiration" },
];

export default function AdminCategoryManagementPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-[#F9F8F6] font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 p-10 bg-white overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1d1d1d]">Category management</h2>
          <Button
            className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800"
            onClick={() => navigate("/admin/category-management/create")}
          >
            <PenSquare className="mr-2 h-4 w-4" /> Create category
          </Button>
        </div>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md py-2 rounded-md border border-[#DAD6D1] text-sm placeholder:text-gray-500 bg-white"
          />
        </div>

        <Table className="rounded-xl border border-[#DAD6D1] overflow-hidden">
          <TableHeader>
            <TableRow className="bg-[#F9F8F6] text-[#5f5f5f]">
              <TableHead className="w-full">Category</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow
                key={index}
                className={`text-sm border-t border-[#DAD6D1] ${index % 2 === 1 ? "bg-[#F9F8F6]" : "bg-white"}`}
              >
                <TableCell className="font-medium text-[#1d1d1d]">{category.name}</TableCell>
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