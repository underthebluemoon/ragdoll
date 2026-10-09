interface Props {
    content: string
}

function UserMessage({content}: Props) {

    return(
        <div className="text-right">
            유저 인풋
            <p>{content}</p>
        </div>
    )
}

export default UserMessage
