import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BlogCard from "./BlogCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

const categories = ["Highlight", "Cat", "Inspiration", "General"];

export default function ArticleSection() {
  const [activeCategory, setActiveCategory] = useState("Highlight");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const categoryParams =
        activeCategory === "Highlight" ? "" : activeCategory;

      const response = await axios.get(
        "https://blog-post-project-api.vercel.app/posts",
        {
          params: {
            page,
            limit,
            category: categoryParams,
            keyword: searchKeyword.trim() === "" ? undefined : searchKeyword,
          },
        }
      );

      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
      setHasMore(response.data.currentPage < response.data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchSuggestions = debounce(async (keyword) => {
    if (!keyword.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await axios.get(
        "https://blog-post-project-api.vercel.app/posts",
        {
          params: { keyword },
        }
      );
      setSearchResults(res.data.posts || []);
    } catch (err) {
      console.error("Search suggestion error:", err);
    }
  }, 300);

  useEffect(() => {
    fetchSearchSuggestions(searchKeyword);
  }, [searchKeyword]);

  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [activeCategory, searchKeyword]);

  useEffect(() => {
    fetchPosts();
  }, [page, activeCategory, searchKeyword]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <section className="py-6 sm:px-[120px]">
      <h2 className="text-xl font-semibold mb-4 px-4 sm:px-0">
        Latest articles
      </h2>

      <div className="bg-[#f3f2f0] p-4 rounded-xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="hidden md:flex gap-4 items-center">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const buttonClass = `
              rounded-xl px-6 py-2 font-medium cursor-pointer
              transition-colors duration-150 ease-in-out
              ${
                isActive
                  ? "bg-[#d7d3cd] text-black"
                  : "text-muted-foreground hover:bg-[#e6e3df] hover:text-black"
              }
              active:bg-[#ccc8c2] active:text-black
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#d7d3cd]
            `;

            return (
              <Button
                key={cat}
                variant={isActive ? "secondary" : "ghost"}
                className={buttonClass}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            );
          })}
        </div>

        <div className="relative w-full md:max-w-sm">
          <Input
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search"
            className="pl-4 pr-10 py-6 rounded-xl text-base transition-all duration-150 bg-white focus:bg-white/90 hover:bg-white/90 backdrop-blur-md
      border border-gray-200 hover:border-[#d7d3cd] focus:border-[#d7d3cd] focus:ring-1 focus:ring-[#b3aea7] focus:outline-none"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />

          {searchKeyword && searchResults.length > 0 && (
            <div className="absolute z-50 top-full mt-1 left-0 w-full bg-white border border-gray-200 shadow-lg rounded-xl max-h-72 overflow-y-auto">
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  to={`/post/${result.id}`}
                  onClick={() => setSearchKeyword("")}
                  className="block px-4 py-3 hover:bg-[#f3f2f0] text-sm text-black cursor-pointer transition"
                >
                  {result.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="md:hidden w-full">
          <p className="text-base font-semibold text-[#4d453f] mb-1">
            Category
          </p>
          <Select
            onValueChange={(value) => setActiveCategory(value)}
            defaultValue={activeCategory}
          >
            <SelectTrigger className="w-full rounded-xl text-base py-6 px-4 bg-white focus:bg-white/90 hover:bg-white/90 backdrop-blur-md border border-gray-200 focus:border-gray-300 hover:border-[#d7d3cd] focus:ring-0 transition-colors cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-md rounded-xl">
              <SelectGroup>
                {categories.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className={`px-4 py-2 text-sm rounded-md cursor-pointer transition-colors
                      data-[state=checked]:bg-[#d7d3cd] data-[state=checked]:text-black
                      hover:bg-[#e6e3df] hover:text-black
                      focus:bg-[#ccc8c2] focus:text-black`}
                  >
                    {cat}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-5 mt-12">
        {posts.map((post, index) => (
          <BlogCard
            key={`${post.id}-${index}`}
            image={post.image} // Pass the image URL directly
            category={post.category}
            title={post.title}
            description={post.description}
            author={post.author}
            date={new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            postId={post.id} // Pass postId for linking
          />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="hover:text-muted-foreground font-medium underline cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "View more"}
          </button>
        </div>
      )}
    </section>
  );
}
