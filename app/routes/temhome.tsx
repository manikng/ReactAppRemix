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

export default function Home({ loaderData }: Route.ComponentProps) {
  console.log("Loader Data is : ", loaderData.message);
  
  return (
    <>
    <Welcome message={loaderData.message} />
    </>
  );
}
