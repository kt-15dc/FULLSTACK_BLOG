import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const categories = ["Highlight", "Cat", "Inspiration", "General"];

export default function ArticleSection() {
  const [activeCategory, setActiveCategory] = useState("Highlight");

  return (
    <section className="py-6 sm:px-[120px]">
      <h2 className="text-xl font-semibold mb-4 px-4 sm:px-0">
        Latest articles
      </h2>

      <div className="bg-[#f3f2f0] p-4 rounded-xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Desktop layout: category buttons */}
        <div className="hidden md:flex gap-4 items-center">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "secondary" : "ghost"}
              className={`rounded-xl px-6 py-2 font-medium ${
                activeCategory === cat
                  ? "bg-[#d7d3cd] text-black"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Desktop layout: search box */}
        <div className="hidden md:block relative w-full max-w-sm">
          <Input
            placeholder="Search"
            className="pl-4 pr-10 py-6 rounded-xl text-base transition-colors bg-white focus:bg-white/90 hover:bg-white/90 backdrop-blur-md border border-gray-200 focus:border-gray-300 hover:border-gray-300 focus:ring-0"
          />

          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
        </div>

        {/* Mobile layout */}
        <div className="md:hidden w-full flex flex-col gap-6">
          {/* Mobile Search */}
          <div className="relative">
            <Input
              placeholder="Search"
              className="pl-4 pr-10 py-6 rounded-xl text-base transition-colors bg-white focus:bg-white/90 hover:bg-white/90 backdrop-blur-md border border-gray-200 focus:border-gray-300 hover:border-gray-300 focus:ring-0 active:border-blue-500"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
          </div>

          {/* Mobile Dropdown */}
          <div>
            <p className="text-base font-semibold text-[#4d453f] mb-1">
              Category
            </p>
            <Select
              onValueChange={(value) => setActiveCategory(value)}
              defaultValue={activeCategory}
            >
              <SelectTrigger className="w-full rounded-xl text-base py-6 px-4 bg-white focus:bg-white/90 hover:bg-white/90 backdrop-blur-md border border-gray-200 focus:border-gray-300 hover:border-gray-300 focus:ring-0 transition-colors">
                <SelectValue />
              </SelectTrigger>

              <SelectContent className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-md rounded-xl">
                <SelectGroup>
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-200 focus:text-black rounded-md transition-colors"
                    >
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
