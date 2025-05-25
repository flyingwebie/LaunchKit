/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Collect user feedback",
    description:
      "Use your Insighto's board to let users submit features they want.",
    styles: "bg-primary text-primary-foreground",
    demo: (
      <div className="overflow-hidden h-full flex items-stretch">
        <div className="w-full translate-x-12 bg-secondary rounded-t-lg h-full p-6">
          <p className="font-medium uppercase tracking-wide text-muted-foreground text-sm mb-3">
            Suggest a feature
          </p>
          <div className="relative textarea py-4 h-full mr-12 bg-secondary group-hover:bg-background group-hover:border-border text-foreground">
            <div className="absolute left-4 top-4 group-hover:hidden flex items-center ">
              <span>Notifica</span>
              <span className="w-[2px] h-6 bg-primary animate-pulse"></span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 duration-500">
              Notifications should be visible only on certain pages.
            </div>
            <div className="opacity-0 group-hover:opacity-100 duration-1000 flex items-center gap-0.5">
              <span>Terms & privacy pages don&apos;t need them</span>
              <span className="w-[2px] h-6 bg-primary animate-pulse"></span>
            </div>
            <Button className="shadow-lg absolute right-4 bottom-6 opacity-0 group-hover:opacity-100 duration-1000">
              Submit
            </Button>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Prioritize features",
    description: "Users upvote features they want. You know what to ship next.",
    styles: "md:col-span-2 bg-muted text-foreground",
    demo: (
      <div className="px-6 max-w-[600px] flex flex-col gap-4 overflow-hidden">
        {[
          {
            text: "Add LemonSqueezy integration to the boilerplate",
            secondaryText: "Yes, ship this! ✅",
            votes: 48,
            transition: "group-hover:-mt-36 group-hover:md:-mt-28 duration-500",
          },
          {
            text: "A new pricing table for metered billing",
            secondaryText: "Maybe ship this 🤔",
            votes: 12,
          },
          {
            text: "A new UI library for the dashboard",
            secondaryText: "But don't ship that ❌",
            votes: 1,
          },
        ].map((feature, i) => (
          <div
            className={`p-4 bg-background text-foreground rounded-lg flex justify-between mb-2 gap-4 ${feature?.transition}`}
            key={i}
          >
            <div>
              <p className="font-semibold mb-1">{feature.text}</p>
              <p className="text-muted-foreground">
                {feature.secondaryText}
              </p>
            </div>
            <button
              className={`px-4 py-2 rounded-lg group text-center text-lg duration-150 border border-transparent bg-primary text-primary-foreground`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-5 h-5 ease-in-out duration-150 -translate-y-0.5 group-hover:translate-y-0`}
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
              {feature.votes}
            </button>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Your brand, your board",
    description: "Customize your Insighto board with 7 themes.",
    styles: "md:col-span-2 bg-background text-foreground",
    demo: (
      <div className="flex left-0 w-full h-full pt-0 lg:pt-8 overflow-hidden -mt-4">
        <div className="-rotate-[8deg] flex min-w-max overflow-x-visible h-full lg:pt-4">
          {[
            {
              buttonStyles: "bg-primary text-primary-foreground",
              css: "-ml-1 rotate-[6deg] w-72 h-72 z-30 bg-secondary text-foreground rounded-2xl group-hover:-ml-64 group-hover:opacity-0 group-hover:scale-75 transition-all duration-500 p-4",
            },
            {
              buttonStyles: "bg-secondary text-secondary-foreground",
              css: "rotate-[6deg] bg-secondary text-foreground w-72 h-72 -mr-20 -ml-20 z-20 rounded-xl p-4",
            },
            {
              buttonStyles: "bg-accent text-accent-foreground",
              css: "rotate-[6deg] bg-secondary text-foreground z-10 w-72 h-72 rounded-xl p-4",
            },
            {
              buttonStyles: "bg-muted text-muted-foreground",
              css: "rotate-[6deg] bg-secondary text-foreground w-72 h-72 -ml-20 rounded-xl p-4",
            },
            {
              buttonStyles: "bg-background text-foreground",
              css: "rotate-[6deg] bg-secondary text-foreground w-72 h-72 -ml-10 -z-10 rounded-xl p-4 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300",
            },
          ].map((theme, i) => (
            <div className={theme.css} key={i}>
              <div className="font-medium uppercase tracking-wide text-muted-foreground text-sm mb-3">
                Trending feedback
              </div>
              <div className="space-y-2">
                <div className="p-4 bg-background rounded-lg flex justify-between">
                  <div>
                    <p className="font-semibold mb-1">Clickable cards</p>
                    <p className="opacity-80">Make cards more accessible</p>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg group text-center text-lg duration-150 border border-transparent ${theme.buttonStyles}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-5 h-5 ease-in-out duration-150 -translate-y-0.5 group-hover:translate-y-0`}
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                    8
                  </button>
                </div>
                <div className="p-4 bg-background rounded-lg flex justify-between ">
                  <div>
                    <p className="font-semibold mb-1">Bigger images</p>
                    <p className="opacity-80">Make cards more accessible</p>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg group text-center text-lg duration-150 border border-transparent ${theme.buttonStyles}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-5 h-5 ease-in-out duration-150 -translate-y-0.5 group-hover:translate-y-0`}
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                    5
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Discover new ideas",
    description: "Users can chat and discuss features.",
    styles: "bg-muted text-foreground",
    demo: (
      <div className="text-foreground px-6 space-y-4">
        {[
          {
            id: 1,
            text: "Can we have a feature to add a custom domain to IndiePage?",
            userImg:
              "https://pbs.twimg.com/profile_images/1514863683574599681/9k7PqDTA_400x400.jpg",
            userName: "Davide Lou",
            createdAt: "2024-09-01T00:00:00Z",
          },
          {
            id: 2,
            text: "I'd love to see a dark mode option for the dashboard.",
            userImg:
              "https://pbs.twimg.com/profile_images/1514863683574599681/9k7PqDTA_400x400.jpg",
            userName: "Sarah Chen",
            createdAt: "2024-09-02T00:00:00Z",
          },
        ].map((comment, i) => (
          <div
            className={`p-4 bg-background rounded-lg flex gap-3 ${
              i === 1 ? "opacity-0 group-hover:opacity-100 duration-1000" : ""
            }`}
            key={comment.id}
          >
            <img
              src={comment.userImg}
              alt={comment.userName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-sm">{comment.userName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

const FeaturesGrid = () => {
  return (
    <section className="py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto bg-background">
      <div className="px-8">
        <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
          Ship features users{" "}
          <span className="bg-muted text-foreground px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
            actually want
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`${feature.styles} rounded-lg md:rounded-xl p-6 md:p-8 group overflow-hidden relative`}
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-bold text-xl lg:text-3xl tracking-tight mb-2 md:mb-4">
                    {feature.title}
                  </h3>
                  <p className="opacity-80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-end justify-center p-6 md:p-8">
                {feature.demo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
