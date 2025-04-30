const BlogCard = ({ image, category, title, description, author, date }) => (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-sm">
      {/* Article Image */}
      <a href="#" className="relative h-[212px] sm:h-[360px]">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={image}
          alt={title}
        />
      </a>
  
      <div className="flex flex-col">
        {/* Category */}
        <div className="mb-2">
          <span className="bg-[#dcfce7] text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
  
        {/* Title */}
        <a href="#">
          <h2 className="text-start font-bold text-lg sm:text-xl mb-2 line-clamp-2 hover:underline text-gray-900">
            {title}
          </h2>
        </a>
  
        {/* Description */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-3">
          {description}
        </p>
  
        {/* Author info */}
        <div className="flex items-center text-sm text-gray-700">
          <img
            className="w-8 h-8 rounded-full mr-2 object-cover"
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt={author}
          />
          <span className="font-medium">{author}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
  
  export default BlogCard;
  