import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Header from "./Header/Header";
import React, { useEffect, useState } from "react";
import NAVBAR from "../../shared/components/nav/NAVBAR";

import { Form, useLoaderData, useActionData } from "react-router";
import { Button } from "~/components/ui/button";
import postDetails from "../../shared/database/TEMPData/PostData";

import { CloudinaryUpload } from "./cloudUpload";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "shared/database/firebase";


// 3 column ui 
import LeftSidebar from "../../shared/components/fixedsidebar/Leftsidebar/LeftSidebar";
import MiddleSidebar from "../../shared/components/fixedsidebar/Middleside/MiddlwSidebar";
import RightSidebar from "../../shared/components/fixedsidebar/RightSide/RightSidebar";
import { CheckCircleIcon, UploadIcon, XIcon } from "lucide-react";
import type { Post } from "shared/types/post";

const User_Avatar_image = "https://res.cloudinary.com/dkxicfpye/image/upload/v1742461554/ifwnkigstnfx5vwdu8la.jpg";
// console.log("User Avatar image is : ", User_Avatar_image);




// This is the route configuration for the home page.
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const querySnapshotPostData = await getDocs(collection(db, "posts")); 
  
  const AllPosts = querySnapshotPostData.docs.map((doc) => {
    const fetchedData = { dbid: doc.id, PostData: doc.data() };
    const postdata = { ...fetchedData.PostData, id: doc.id };
    console.log("Post Data is : ", postdata);
    
    return postdata;
  });
  const res = Object.values(AllPosts);
  console.log("All Posts are : ", res);
  return { posts: res, message: "Hello from Vercel" };
}

export async function clientAction({request,}: Route.ClientActionArgs) {
    let formData = await request.formData();
    let imageUrlfromCloudinary = await CloudinaryUpload(formData);
    console.log("Image URL in cloudinary is :", imageUrlfromCloudinary);
    let user_avatar_url = User_Avatar_image;
    let newPost = {
        dbid: "",
        id: postDetails.length + 1,
        avatarUrl: user_avatar_url,
        description:
          formData.get("Product-Description")?.toString() || "No description",
        tags: (formData.get("Tags")?.toString() || "")
          .split(",")
          .map((t) => t.trim()),
        price: `${formData.get("Price")?.toString() || "0"}`,
        productName: formData.get("Product-Name")?.toString() || "Unnamed Product",
        imageUrl: imageUrlfromCloudinary,
        isliked: false,
        likes: 0,
        comments: 0,
      };

      try {
        let docRef = await addDoc(collection(db, "posts"), newPost);
        console.log("Document written with ID: ", docRef.id);
    
        postDetails.push(newPost);
    
        // Return success instead of redirecting
        return {
          success: true,
          message: "Post created successfully!",
          
        };
      } catch (error) {
        console.error("Error adding document: ", error);
        return {
          success: false,
          message: "Failed to create post",
          
        };
      }
    
}

export default function Home({ loaderData ,actionData }: Route.ComponentProps) {
  console.log("Loader Data s : ", loaderData.posts);
  
  return (
    <>
    <Welcome message={loaderData.message} />
    </>
  );
}
