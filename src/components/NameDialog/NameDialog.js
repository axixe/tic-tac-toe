import React from "react";

import Button from "../Button";
import Input from "../Input";

export default function NameDialog() {
    return (
        <dialog>
            <div>PLEASE, ENTER YOUR NAME</div>
            
            <form>
                <Input />
                <Button />
            </form>
        </dialog>
    )
}