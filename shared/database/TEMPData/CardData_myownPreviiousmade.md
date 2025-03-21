
// CreatePostCard component
// function CreatePostCard() {
//   const [username ,setUsername] = React.useState(loaderData.username);
//     console.log("user IN card is ",username);
//   const [previewImages, setPreviewImages] = React.useState<string[]>([]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const files = Array.from(e.target.files);
//     const urls = files.map(file => URL.createObjectURL(file));
//     setPreviewImages(urls);
//   };

//   return (
//     <Form
//       method="post"
//       encType="multipart/form-data"
//       className="mb-6 bg-white rounded-lg shadow-sm border"
//     >
//       <div className="p-4">
//         <div className="flex items-center gap-4 mb-4">
//           <p>hi sfgiofn</p>
//           <img
//             src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
//             className="w-12 h-12 rounded-full"
//             alt="User"
//           />
//           <textarea
//             name="Product-Description"
//             placeholder="Share your creation with the community..."
//             className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows={3}
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <input
//             type="text"
//             name="Product-Name"
//             placeholder="Product Name"
//             className="p-2 border rounded"
//           />
//           <input
//             type="number"
//             name="Price"
//             placeholder="Price ($)"
//             className="p-2 border rounded"
//             step="0.01"
//           />
//           <input
//             type="text"
//             name="Tags"
//             placeholder="Tags (comma separated)"
//             className="p-2 border rounded"
//           />
//           <div className="relative">
//             <input
//               type="file"
//               name="images"
//               multiple
//               onChange={handleImageChange}
//               className="absolute opacity-0 w-full h-full cursor-pointer"
//               id="image-upload"
//               accept="image/*"
//             />
//             <label
//               htmlFor="image-upload"
//               className="block p-2 text-center border rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
//             >
//               Upload Images
//             </label>
//           </div>
//         </div>

//         {previewImages.length > 0 && (
//           <div className="flex gap-2 mb-4">
//             {previewImages.map((src, index) => (
//               <img
//                 key={index}
//                 src={src}
//                 alt={`Preview ${index}`}
//                 className="w-20 h-20 object-cover rounded border"
//               />
//             ))}
//           </div>
//         )}

//         <div className="flex justify-end">
//           <Button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
//           >
//             Post Creation
//           </Button>
//         </div>
//       </div>
//     </Form>
//   );
// }

// export { CreatePostCard };

// import type { Route } from "./+types/home";
// import Header from "./Header/Header";
// import React, { useState } from "react"; // Import useState
// import NAVBAR from "./../../shared/components/nav/NAVBAR";
// import SidebarLeft from "./../../shared/components/sidebar/SidebarLeft";
// //fixed sidebars
// import LeftSidebar from "../../shared/components/fixedsidebar/Leftsidebar/h/LeftSidebar";
// import MiddleSidebar from "../../shared/components/fixedsidebar/Middleside/MiddlwSidebar";
// import RightSidebar from "../../shared/components/fixedsidebar/RightSide/RightSidebar";

// import { Form } from "react-router";
// import { Button } from "~/components/ui/button";

// import postDetails from "./../../shared/database/TEMPData/PostData";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "New React Router App" },
//     { name: "description", content: "Welcome to React Router!" },
//   ];
// }

// export function loader({ context }: Route.LoaderArgs) {
//   return { message: "Hello from Vercel" };
// }

// export default function Home({ loaderData }: Route.ComponentProps) {
//   return (
//     <div>
//       <Header />
//       <NAVBAR />
//       <div className="flex mt-1">
//         <div className="leftside">
//           <LeftSidebar />
//         </div>
//         <div className="middleside">
//           <MiddleSidebar />
//         </div>
//         <div className="rightside">
//           <RightSidebar />
//         </div>
//       </div>
//       <CreatePostCard /> {/* Render CreatePostCard here */}
//     </div>
//   );
// }

// // Createpost  section

// export async function action({ request }: Route.ClientActionArgs) {
//   const formData = await request.formData();
//   console.log("Form Data:", formData);

//   // Extract data from form
//   const productName = formData.get("Product-Name")?.toString() || "";
//   const productDescription = formData.get("Product-Description")?.toString() || "";
//   const tags = formData.get("Tags")?.toString() || "";
//   const price = parseFloat(formData.get("Price")?.toString() || "0"); // Safely parse price
//   const imageFiles = formData.getAll("images") as File[]; // Get all image files

//   // Handle Images (Example - adapt as needed)
//   const imageUrls = await Promise.all(
//     imageFiles.map(async (file) => {
//       return URL.createObjectURL(file); // Create a temporary URL
//     })
//   );
//   console.log("Image URLs:", imageUrls);

//   // Create new post object
//   const newPost = {
//     id: postDetails.length + 1, // Simple ID generation (can improve)
//     productName: productName,
//     productDescription: productDescription,
//     tags: tags,
//     price: price,
//     imageUrl: imageUrls[0] || "https://miro.medium.com/v2/resize:fit:700/1*wGMXTkdXX96kloQJf7wmbA.png", // Use default if no image
//     likes: 0,
//     comments: 0,
//   };

//   // Update postDetails array (This modifies the array in memory - consider a database)
//   postDetails.push(newPost);
//   console.log("Updated postDetails:", postDetails);

//   return { success: true, message: "Post created successfully" };
// }

// function CreatePostCard() {
//   const [selectedImages, setSelectedImages] = useState<string[]>([]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;

//     const files = Array.from(e.target.files);

//     // Create URLs for the selected images
//     const imageUrls = files.map((file) => URL.createObjectURL(file));
//     setSelectedImages(imageUrls);
//   };

//   return (
//     <Form method="post" encType="multipart/form-data">
//       <div className="rounded-sm shadow-md border-b-4 border-t-4 min-h-[200px]">
//         <div className="productInput flex items-center mx-2 gap-4">
//           <div className="h-22 w-20 rounded-full overflow-hidden">
//             <img
//               src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
//               className="object-cover h-full w-full"
//               alt="User avatar"
//             />
//           </div>

//           <label htmlFor="Product-Description" className="flex w-full">
//             <textarea
//               name="Product-Description"
//               id="Product-Description"
//               placeholder="I have Buga Luga awesome under 5$ just for you"
//               aria-label="Product-Description"
//               className="border-4 text-2xl font-mono shadow-lg rounded-2xl w-full"
//             ></textarea>
//           </label>
//         </div>
//         <div className="productDetail flex justify-evenly items-center mb-2">
//           <label htmlFor="Tags" className="flex items-center">
//             <Button size="sm" className="font-mono">
//               Tags
//             </Button>
//             <input
//               type="text"
//               name="Tags"
//               id="Tags"
//               placeholder="Tags"
//               className="border-4 shadow-lg rounded-2xl w-22"
//             />
//             <input
//               type="number"
//               placeholder="Price$"
//               name="Price"
//               className="border-4 shadow-lg rounded-2xl w-22"
//             />
//           </label>
//           <input
//             type="text"
//             placeholder="Product Name"
//             name="Product-Name"
//             id="Product-Name"
//             className="border-4 shadow-lg rounded-2xl w-32"
//           />
//           <Button className="font-mono">Ai description</Button>
//         </div>
//         <div className="flex justify-between mx-4 items-center">
//           <div className="flex items-center gap-2">
//             <Button className="font-mono">
//               <label htmlFor="image-upload">
//                 <input
//                   type="file"
//                   name="images"
//                   multiple
//                   id="image-upload"
//                   className="hidden"
//                   onChange={handleImageChange}
//                   accept="image/*"
//                 />
//                 <span>Img</span>
//               </label>
//             </Button>
//             <Button className="font-mono">GIf</Button>
//             {selectedImages.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Selected ${index}`}
//                 style={{ width: "50px", height: "50px" }}
//               />
//             ))}
//           </div>
//           <Button className="font-mono" type="submit">
//             Create Post
//           </Button>
//         </div>
//       </div>
//     </Form>
//   );
// }

// export { CreatePostCard };
