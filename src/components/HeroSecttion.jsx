import React from "react";

const HeroSection = () => {
    return (
        <main className="container py-8 lg:py-16 mx-auto sm:px-20 px-5 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center mt-10">
          <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
            <h1 className="text-4xl lg:text-5xl font-semibold mb-4">
              Stay <br className="hidden lg:block" />
              Informed, <br />
              Stay Inspired,
            </h1>
            <p className="text-lg text-gray-500">
              Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
              Inspiration and Information.
            </p>
          </div>
          <img
            src="src/assets/PIC1.png"
            alt=""
            className="h-[530px] object-cover rounded-lg shadow-lg lg:w-1/3 mx-4 mb-8 lg:mb-0"
          />
          <div className="lg:w-1/3 lg:pl-8">
            <h2 className="text-xl font-semibold mb-2">-Author</h2>
            <h3 className="text-2xl font-bold mb-4">Fei KD.</h3>
            <p className="text-gray-500 mb-4">
              I am a pet enthusiast and freelance writer who specializes in animal
              behavior and care. With a deep love for cats, I enjoy sharing
              insights on feline companionship and wellness.
            </p>
            <p className="text-gray-500">
              When I&apos;m not writing, I spend time volunteering at my local
              animal shelter, helping cats find loving homes.
            </p>
          </div>
        </div>
      </main>
    );
    }

export default HeroSection;
