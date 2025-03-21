// import type { Route } from "./+types/home";
import Header from "./Header/Header";
import React from "react";
import NAVBAR from "./../../shared/components/nav/NAVBAR";
import {
  Form,
  redirect,
  useLoaderData,
  useActionData,
  useParams,
} from "react-router";
import { Button } from "~/components/ui/button";
import postDetails from "./../../shared/database/TEMPData/PostData";

// //fixed sidebars
import LeftSidebar from "../../shared/components/fixedsidebar/Leftsidebar/LeftSidebar";
import MiddleSidebar from "../../shared/components/fixedsidebar/Middleside/MiddlwSidebar";
import RightSidebar from "../../shared/components/fixedsidebar/RightSide/RightSidebar";

// Types
import type { Route } from "./+types/users";

//Db imports
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "shared/database/firebase";
import { CloudinaryUpload } from "./cloudUpload";







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

export function meta() {
  return [
    { title: "Arbor - The Social Marketplace" },
    { name: "description", content: "Connect and create with community" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  console.log("params", params.username);
  const username = params.username;
  // console.log("username",username);
  const querySnapshotPostData = await getDocs(collection(db, "posts"));

  // querySnapshotPostData.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // });
  // const AllPosts = querySnapshotPostData.docs.map((doc) => doc.data());
  const AllPosts = querySnapshotPostData.docs.map((doc) => {
    const  fetchedData= { dbid: doc.id, PostData: doc.data() };
    const postdata = {...fetchedData.PostData,id:doc.id}
    // console.log("Post data is : ", postdata);
    
    return postdata;
  });

  return { posts: AllPosts, username: username };
}

// export async function action({ request }: Route.ClientActionArgs) {
//   const formData = await request.formData();

//   // Extract form data with defaults
//   const newPost = {
//     id: postDetails.length + 1,
//     avatarUrl:
//       "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
//     description:
//       formData.get("Product-Description")?.toString() || "No description",
//     tags: (formData.get("Tags")?.toString() || "")
//       .split(",")
//       .map((t) => t.trim()),
//     price: `$${formData.get("Price")?.toString() || "0"}`,
//     productName: formData.get("Product-Name")?.toString() || "Unnamed Product",
//     imageUrl: await handleImageUpload(formData),
//     isliked: false,
//     likes: 0,
//     comments: 0,
//   };
//   postDetails.push(newPost);
//   return redirect("/");
// }
export async function action({ request }: Route.ClientActionArgs) {
  //when inserting into the db no dbid is present as it only generate after the data pushed into the db
  //so when user post a  img just take sample id and put  dbid as empty string
  //and when load it using loader then fetch its dbid and post data

  const formData = await request.formData();

  const imageUrlfromCloudinary = await CloudinaryUpload(formData);
  console.log("Image URL in cloudinary is :", imageUrlfromCloudinary);

  const newPost = {
    dbid: "",

    id: postDetails.length + 1,
    avatarUrl:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    description:
      formData.get("Product-Description")?.toString() || "No description",
    tags: (formData.get("Tags")?.toString() || "")
      .split(",")
      .map((t) => t.trim()),
    price: `$${formData.get("Price")?.toString() || "0"}`,
    productName: formData.get("Product-Name")?.toString() || "Unnamed Product",
    imageUrl: imageUrlfromCloudinary,
    isliked: false,
    likes: 0,
    comments: 0,
  };

  try {
    const docRef = await addDoc(collection(db, "posts"), newPost);
    console.log("Document written with ID: ", docRef.id);

    postDetails.push(newPost);

    // Return success instead of redirecting
    return { success: true, message: "Post created successfully" };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, message: "Failed to create post" };
  }
}

// async function handleImageUpload(formData: FormData) {
//   const imageFiles = formData.getAll("images") as File[];
//   if (imageFiles.length === 0) {
//     return "https://miro.medium.com/v2/resize:fit:700/1*wGMXTkdXX96kloQJf7wmbA.png";
//   }
//   return URL.createObjectURL(imageFiles[0]);
// }

export default function Home({ loaderData }: Route.ComponentProps) {
  console.log("lod is ", loaderData);
  const { posts } = loaderData;
  // const  {posts,username}  = loaderData;
  const [username, setUsername] = React.useState(loaderData.username);
  console.log("username is ", username);

  //   const { posts, username } = useLoaderData() as { posts: PostData[] ,username:string};
  const actionData = useActionData();
  //   console.log("post is ",posts);
  return (
    <div className="min-h-screen w-full mb-4">
      <Header />
      <NAVBAR />
      <div className="flex w-full mt-2  min-h-screen">
        <LeftSidebar username={username} />
        <MiddleSidebar posts={posts} />
        <RightSidebar />
      </div>
    </div>
  );
}
