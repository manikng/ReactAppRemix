import React from "react";
import FeedPost from "./../../PostCard/FeedPost";
import { CreatePostCard } from "~/routes/home";
import type { Post } from "shared/types/post";



interface MiddleSidebarProps {
posts: Post[];
className?: string;
}



function MiddleSidebar ({ posts,className }: MiddleSidebarProps) {
console.log("data in middle ", posts);
return (
<div className={`flex-1 middleside ml-1 mr-2 h-auto ${className}`}>
<CreatePostCard />
<div className="space-y-6 h-screen">
{posts.map((post, index) => (
<FeedPost key={index} post={post} />
))}
</div>
</div>
);
};

export default MiddleSidebar;
