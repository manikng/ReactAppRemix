export async function CloudinaryUpload(formData: FormData){
    const image = new FormData();
    const img = formData.get('postimage') as File;
    image.append("file",img);
    image.append("cloud_name","dkxicfpye");
    image.append("upload_preset","postimg");
    let imgUrlfetched = "";
  
    const res  = await fetch('https://api-ap.cloudinary.com/v1_1/dkxicfpye/image/upload',
      {
        method: "post",
        body:image
      }
    )
    try {     
        const imgData = await res.json();
        const imgurl = imgData.url.toString();
        console.log("Image URL:",imgurl);
        imgUrlfetched = imgurl;
        console.log("Image  url fxn :",imgUrlfetched);
        return imgurl;
    } catch (error) {
        console.log(error);
        return "error";
    }
     
  
  }
