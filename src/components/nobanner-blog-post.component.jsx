import { Link } from "react-router-dom";
import { getDay } from "../common/date";
import React, { useContext } from 'react';
import { ThemeContext } from "../App";

// const MinimalBlogPost = ({blog , index}) =>{

//     let { title, blog_i: id, author: { personal_info: { fullname, username, profile_img } }, publishedAt } = blog;

//     return(
//         <Link to={`/blog/${id}`} className="flex gap-5 items-center mb-8">
//             <h1 className="blog-index">{ index < 10 ? "0" + (index + 1) : index}</h1>

//             <div>
//                 <div className="flex gap-2 items-center mb-7">
//                     <img src={profile_img} alt="profile image" className="w-6 h-6 rounded-full" />
//                     <p className="line-clamp-1"> {fullname} @{username} </p>
//                     <p className="min-w-fit">{ getDay(publishedAt) }</p>
//                 </div>

//                 <h1 className="blog-title"> {title} </h1>

//             </div>
//         </Link>
//     )
// }



// const MinimalBlogPost = ({blog , index}) =>{

//     let { title, banner, blog_i: id, author: { personal_info: { fullname, username,  profile_img } }, publishedAt } = blog;

//     return(
//          <Link to={`/blog/${id}`} className="flex items-center pb-3 mb-8">
//             <div className="relative flex items-center">
//                 <h1 className="text-2xl text-gray-200 z-10 font-bold pl-3">{index < 10 ? "0" + (index + 1) : index}</h1>
//             </div>
//                 <img src={banner} alt="banner" className="absolute opacity-75 w-14 h-14 rounded-full object-cover"/>
//             <div className="ml-12 bg-cover relative text-black">
//                 <h1 className="blog-title">{title}</h1>
//                 <div className="flex gap-2 items-center mt-2">
//                     <img src={profile_img} alt="profile image" className="w-6 h-6 rounded-full" />
//                     <p className="line-clamp-1">{fullname}</p>
//                     <p className="min-w-fit">{getDay(publishedAt)}</p>
//                 </div>
//             </div>
//         </Link>
        
//      )
// }


const MinimalBlogPost = ({ blog, index }) => {

    let {
        title,
        banner,
        blog_id: id,
        author: {
            personal_info: { fullname, username, profile_img },
        },
        publishedAt,
    } = blog;

    let { theme } = useContext(ThemeContext);

    return (
        <Link to={`/blog/${id}`} className="relative block mb-8 transition duration-300 ease-in-out transform hover:scale-105">
            {/* Banner Image */}
            <img
                src={banner}
                alt="banner"
                className="w-full h-48 rounded-lg object-cover"
            />

            {/* Overlay Text */}
            <div className={"absolute inset-0 flex flex-col justify-end p-4 bg-opacity-50 " + ( theme == "light" ? "text-white bg-black " : theme == "dark" ? "text-black bg-white" : "" ) }>
                <h1 className="text-xl">{title}</h1>
                <div className="flex items-center gap-2 mt-2">
                    <img src={profile_img} alt="profile image" className="w-6 h-6 rounded-full" />
                    <p className="line-clamp-1">{fullname}</p>
                    <p className="min-w-fit">{getDay(publishedAt)}</p>
                </div>
            </div>

            {/* Index Number */}
            <div className={"absolute top-0 left-0 p-3 font-bold text-2xl " + ( theme == "light" ? "text-white" : theme == "dark" ? "text-black" : "" )}>
                {index < 10 ? "0" + (index + 1) : index}
            </div>
        </Link>
    );
};



// const MinimalBlogPost = ({ blog, index }) => {
//     let {
//         title,
//         banner,
//         des, // Destructure the description
//         blog_i: id,
//         author: {
//             personal_info: { fullname, username, profile_img },
//         },
//         publishedAt,
//     } = blog;

//     return (
//         <Link to={`/blog/${id}`} className="relative block mb-8 transition duration-300 ease-in-out transform hover:scale-105 group">
//             {/* Banner Image */}
//             <div className="relative">
//                 <img
//                     src={banner}
//                     alt="banner"
//                     className="w-full h-48 rounded-lg object-cover transition-opacity group-hover:opacity-80"
//                 />

//                 {/* Index Number */}
//                 {index < 10 && (
//                     <div className="absolute top-0 left-0 p-3 font-bold text-2xl text-white transition-opacity duration-300 opacity-100 group-hover:opacity-0">
//                         {"0" + (index + 1)}
//                     </div>
//                 )}

//                 {/* Overlay Text */}
//                 <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 ">
//                     <h1 className="text-xl mb-2">{title}</h1>
                    
//                     {/* Description */}
//                     <p className="text-sm line-clamp-2 mb-2">{des}</p>

//                     {/* Author Info */}
//                     <div className="flex items-center gap-2">
//                         <img src={profile_img} alt="profile image" className="w-6 h-6 rounded-full" />
//                         <p className="text-sm">{fullname}</p>
//                         <p className="text-sm">{getDay(publishedAt)}</p>
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     );
// };

export default MinimalBlogPost;

