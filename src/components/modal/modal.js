'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";

const ModalComponent = ({isVisible, children, onClose}) => {
    if(!isVisible) return null;

    return(
        <div className="modal is-active">
            <div className="modal-background">
                <div className="modal-content pt-6">
                    <div className="card">
                        <article class="message is-primary mt-6">
                            <div class="message-header">
                                <p>Log In</p>
                                <button onClick={onClose} className="delete" aria-label="delete"></button>
                            </div>
                            <div className="card-content">
                                {children}
                                <div className="message-body">
                                <p>If you don&apos;t have an account, <Link className="has-text-primary" href="/Sign-up"><button onClick={onClose}>Click Here!</button></Link></p>
                                </div>
                            </div>

                        </article>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ModalComponent;