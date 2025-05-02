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
import { Trash2 } from "lucide-react";

export function DeleteModal({ open, onOpenChange, onDelete, title = "Are you sure?", description = "Do you really want to delete this item? This process cannot be undone." }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="flex flex-col justify-center items-center bg-white rounded-xl p-8 text-center border border-gray-300 transition duration-300 ease-in-out">
        <AlertDialogHeader>
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-red-500">
              <Trash2 className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <AlertDialogTitle className="text-3xl font-semibold text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription className="mt-3 text-sm text-gray-500 text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 flex flex-row justify-center items-center">
          <AlertDialogCancel className="px-6 py-2 rounded-md bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300 transition">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="px-6 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer transition">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
