import React from 'react'

const Modal = ( { content } ) => {
    return (
        <>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>open modal</button> */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    {content}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default Modal