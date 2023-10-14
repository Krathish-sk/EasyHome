import Spinner from "/spinner.gif";

export default function Loading(){
    return(
        <div className="flex justify-center items-center">
            <img src={Spinner} alt="Spinner" />
        </div>
    )
}