import { Link } from "react-router-dom";
import lightPageNotFoundImg from "../imgs/404-light.png";
import darkPageNotFoundImg from "../imgs/404-dark.png";
import lightFullLogo from "../imgs/full-logo-light.png"
import darkFullLogo from "../imgs/full-logo-dark.png"
import { useContext } from "react";
import { ThemeContext } from "../App";

const PageNotFound = () => {

    let {theme} = useContext(ThemeContext);

    return (
        <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">
            
            <img src={theme == "light" ? darkPageNotFoundImg : lightPageNotFoundImg } alt="pageNotFoundImage" className="select-none border-2 border-grey w-72 aspect-square object-cover rounded"/>

            <h1 className="text-4xl font-gelasio leading-7">Page not found</h1>
            <p className="text-dark-grey text-xl leading-7 -mt-8">The page you are looking for does not exists. Head back to the <Link className="text-black underline" to={"/"}>Home Page</Link> </p>

            <div className="mt-auto text-3xl font-bold">
                {/* <img src={theme == "light" ? darkFullLogo : lightFullLogo } alt="Logo" className="h-8 object-contain block mx-auto select-none" /> */}
                Write 
                <span className="text-dark-grey text-2xl font-normal">Wave</span>
                <p className="mt-5 mb-2 text-dark-grey font-normal">Read millions of stories around the world</p>
            </div>

        </section>
    )
}

export default PageNotFound;