import useDocumentTitle from "../../Hook/useDocumentTitle";

function ErrorP(params) {

    useDocumentTitle('Error | 404 not found') 

    return(
        <div className="error-p">
            <div className="e-w">
                <div className="e-n">
                    <div data-text='404'>404</div>
                </div>
                <div className="e-b">
                    <span>there's nothing here, back to <a href="/">site.</a></span>
                </div>
            </div>
        </div>
    )
}

export default ErrorP;