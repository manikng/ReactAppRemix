import React from "react";

interface PostData {
  id: number;
  avatarUrl: string;
  description: string;
  tags: string[];
  price: string;
  productName: string;
  imageUrl: string;
  isliked: boolean;
  likes: number;
  comments: number;
}

interface Post {
  dbid: string;
  postData: PostData;
}

interface FeedPostProps {
  post: Post;
}

const FeedPost: React.FC<FeedPostProps> = ({ post }) => {

  console.log("post data in feed post", post);
  
  // Add a guard clause to ensure the post data exists
  if (!post || !post.postData) {
    return null;
  }

  const [localPost, setLocalPost] = React.useState<Post>(post);

  const toggleLike = () => {
    setLocalPost((prevPost) => ({
      ...prevPost,
      postData: {
        ...prevPost.postData,
        isliked: !prevPost.postData.isliked,
        likes: prevPost.postData.isliked
          ? prevPost.postData.likes - 1
          : prevPost.postData.likes + 1,
      },
    }));
  };

  return (
    <div className="feed-post">
      <div>hi</div>
      <img
        src={localPost.postData.imageUrl}
        alt={localPost.postData.productName}
      />
      <h2>{localPost.postData.productName}</h2>
      <p>{localPost.postData.description}</p>
      <p>
        <strong>Price:</strong> {localPost.postData.price}
      </p>
      <div>
        <button onClick={toggleLike}>
          {localPost.postData.isliked ? "Unlike" : "Like"} (
          {localPost.postData.likes})
        </button>
      </div>
      <div>
        {/* Render the user avatar. The guard above ensures that postData exists */}
        <img
          src={localPost.postData.avatarUrl}
          alt="User Avatar"
          style={{ width: "50px" }}
        />
      </div>
    </div>
  );
};

export default FeedPost;


// import React from "react";
// import { Button } from "~/components/ui/button";
// import {
//   OpenHeartIcon,
//   FilledHeartIcon,
//   ShareIcon,
//   CommentIcon
// } from './../../icons/icons';




// interface Post {
//   dbid: string;
//   postData:{
//     id: number;
//     avatarUrl: string;
//     description: string;
//     tags: string[];
//     price: string;
//     productName: string;
//     imageUrl: string;
//     isliked: boolean;
//     likes: number;
//     comments: number;
//   }
// }
// interface FeedPostProps {
//   post:Post;
// }

// function FeedPost({ post }: FeedPostProps) {
//   const [localPost, setLocalPost] = React.useState(post.postData);

//   const toggleLike = () => {
//     setLocalPost(prev => ({
//       ...prev,
//       isliked: !prev.isliked,
//       likes: prev.isliked ? prev.likes - 1 : prev.likes + 1
//     }));
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center p-4 border-b">
//         <img
//           src={localPost.avatarUrl}
//           className="w-10 h-10 rounded-full"
//           alt="User avatar"
//         />
//         <div className="ml-3">
//           <h3 className="font-semibold text-lg">{localPost.description}</h3>
//           <div className="flex gap-2 text-sm text-gray-500">
//             {localPost.tags.map((tag, index) => (
//               <span key={index} className="bg-gray-100 px-2 py-1 rounded">
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <p className="text-gray-700 mb-4">{localPost.description}</p>
//         <img
//           src={localPost.imageUrl}
//           alt="Post content"
//           className="w-full h-96 object-cover rounded-lg"
//         />
//       </div>

//       {/* Actions */}
//       <div className="p-4 border-t">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={toggleLike}
//               className="flex items-center gap-1 text-red-500 hover:text-red-600"
//             >
//               {localPost.isliked ? <FilledHeartIcon /> : <OpenHeartIcon />}
//               <span>{localPost.likes}</span>
//             </button>
//             <button className="flex items-center gap-1 text-gray-600 hover:text-gray-700">
//               <CommentIcon />
//               <span>{localPost.comments}</span>
//             </button>
//           </div>
//           <div className="flex items-center gap-4">
//             <span className="text-xl font-bold text-orange-500">
//               {localPost.comments}
//             </span>
//             <Button variant="outline" className="gap-2">
//               <ShareIcon />
//               Share
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FeedPost;

// interface FeedPostProps {
//   dbid: string;
//   post: {
//     id: number;
//     avatarUrl: string;
//     description: string;
//     tags: string[];
//     price: string;
//     productName: string;
//     imageUrl: string;
//     isliked: boolean;
//     likes: number;
//     comments: number;
//   };
// }
// import React from "react";
// import { Button } from "~/components/ui/button";

// import {OpenHeartIcon,FilledHeartIcon,StarFilledIcon,StarOpenIcon,ShareIcon,AnalyticsIcon,CommentIcon} from './../../icons/icons';

// interface FeedPostProps {
//   post: {
//     id: number;
//     avatarUrl: string;
//     description: string;
//     tags: Array<string>;
//     price: string;
//     productName: string;
//     imageUrl: string;
//     isliked: boolean;
//     likes: number;
//     comments: number;
//   };
// }

// function FeedPost({ post }: FeedPostProps) {
//   return (
//     <div>
//       <div className="mx-2  bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
//         {/* <!-- User Info Section --> */}
//         <div className="flex  items-center p-4 border-b">
//           <img
//             className="w-12 h-12 rounded-full"
//             src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
//             alt="User Avatar"
//           />
//           <div className="ml-4 flex items-center gap-2 ">
//             <h4 className="name text-2xl text-orange-400  font-semibold ">
//               {post.productName}
//             </h4>
//             <p className="productName text-sm text-gray-600">Creativecreata</p>
//             <p className="productName text-md ml-6">{post.tags}</p>
//           </div>
//         </div>

//         {/* <!-- Product Details --> */}
//         <div className="p-4">
//           <h5 className="text-xl font-bold text-gray-800 mb-2">{post.productName}</h5>
//           <p className="text-xl text-gray-600 mb-3">{post.description}</p>
//           <Button className="hover:scale-3d font-medium text-xl">
//             Ai Description and suggestion
//           </Button>
//         </div>

//         {/* <!-- Product Image --> */}
//         <div className="relative ">
//           <img
//             className="w-full  object-cover"
//             src={post.imageUrl}
//             alt="Product Image"
//           />
//         </div>
//         {/* <!-- Action Buttons --> */}
//         <div className="flex items-center border-t-2 border-b-2 my-2 space-x-3">
//           <Button className="text-xl">
//             <span>
//               Price : <span className="hover:text-orange-400">{post.price}$</span>
//             </span>
//           </Button>

//           <Button className="text-xl">Buy me</Button>
//           <Button className="text-xl">Personal chat</Button>
//         </div>

//         {/* <!-- Footer Icons --> */}
//         <div className="flex justify-around p-4 border-t">
//           <button className="text-red-500 hover:text-red-600 transition">
//             {post.isliked ? <FilledHeartIcon /> :<OpenHeartIcon />} 
//             <span>{post.likes}</span>
//           </button>
//           <button className="text-gray-500 hover:text-gray-600 transition">
//             {post.comments && <CommentIcon />} 
//             <span>{post.comments}</span> 
//           </button>
//           <button className="text-blue-500 hover:text-blue-600 transition">
//             <ShareIcon />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FeedPost;







//////////////////////middlesidebar mistake:
iam using nested object in the post object but i should use the post object directly


// import React from "react";
// import FeedPost from './../../PostCard/FeedPost';
// import { CreatePostCard } from "~/routes/home";
// // import type { PostData } from "~/routes/home";

// import PostData from './../../../database/TEMPData/PostData';

// interface Post {
//   dbid: string;
//   postData:{
//     id: number;
//     avatarUrl: string;
//     description: string;
//     tags: string[];
//     price: string;
//     productName: string;
//     imageUrl: string;
//     isliked: boolean;
//     likes: number;
//     comments: number;
//   }
// }
// interface MiddleSidebarProps {
//   posts: Post[];

// }

// function MiddleSidebar({ posts }: MiddleSidebarProps) {
//   // const postdata =
//   console.log("data in middle ",posts);
//   return (
//     <div className="flex-1 middleside ml-1 mr-2 h-screen">
//       <CreatePostCard />
//       <div className="space-y-6 h-screen ">
//         {posts.map((post,index) => (
//           <FeedPost key={index} post={post} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MiddleSidebar;

// import React from 'react'
// // import CreatePostCard from './../../PostCard/CreatePostCard';
// import FeedPost from './../../PostCard/FeedPost';
// import { CreatePostCard } from '~/routes/home';
// import postDetails from './../../../database/TEMPData/PostData';
// import Img from 'shared/tenp/Img';

// // Sample post data
// // const samplePost = {
// //   id: '1',
// //   productName: 'Sample Product',
// //   description: 'This is a sample product description.',
// //   price: 99,
// //   imageUrl: 'https://img.buzzfeed.com/buzzfeed-static/static/2021-10/18/21/asset/ad3b668d4767/sub-buzz-639-1634594115-27.jpg?output-format=auto&output-quality=auto',
// //   avatarUrl: 'https://example.com/avatar.jpg',
// //   tags: ['Sample,', 'Product'],
// //   isliked: true,
// //   likes: 10,
// //   comments: 5
// // };

// function MiddlwSidebar() {
//   return (
//     <div>
//       <div>
//       {/* <div className='bg-blue-600'>MiddlwSidebar</div> */}
//       <CreatePostCard />
//       {/* <Img /> */}
//       {/* <MyPostCard /> */}

//       {/* to use js in tsx use {} wrap js inside the {} */}

//       {postDetails.map((post)=>{
//         return <FeedPost key={post.id} post={post} />
//       })}

//       {/* <FeedPost post={samplePost} /> */}
//       {/* <SocialMediaCard /> */}
//       </div>
//     </div>
//   )
// }
// export default MiddlwSidebar
