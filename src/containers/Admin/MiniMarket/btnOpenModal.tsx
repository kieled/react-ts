import React, {FC} from 'react'

type Props = {
    text: string
    onClick: (value: boolean) => void
}


const BtnOpenModal: FC<Props> = ({text, onClick}) => {
    return (
        <button className="admin-mini-btn-editor-prices"
                onClick={() => onClick(true)}>
            {text}
        </button>
    )
}

export default BtnOpenModal