import React from "react";

function ProstoModalka (props: any)
{
    async function respondToVacancy() {
        let body = {
            jsonrpc: "2.0",
            id: 0,
            method: "respond_vacancy",
            params: {
                vacancy_id: props.vacancy_id,
                resume_id: localStorage.getItem("response_id"),
                message: getMessage()
            }
        }

        let response = await fetch('http://localhost:8000/api/v1/web/jsonrpc/respond_vacancy', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(body)
        });
    }

    function getMessage() {
        const text = document.getElementsByTagName('input')[0]
        return text.value
    }

    return(
    // <div className="modal fade" id="prostoModalka" role="dialog" aria-labelledby="exampleModalLabel"
    //      aria-hidden="true">
    //     <div className="modal-dialog" role="document">
    //         <div className="modal-content">
    //             <div className="modal-header">
    //                 <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
    //                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
    //                     <span aria-hidden="true">&times;</span>
    //                 </button>
    //             </div>
    //             <div className="modal-body">
    //                 <input className="form-control"/>
    //             </div>
    //             <div className="modal-footer">
    //                 <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
    //                 <button type="button" className="btn btn-primary">Save changes</button>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    // )
        <div className="modal fade" id="prostoModalka" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input className="form-control"/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={respondToVacancy}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProstoModalka;