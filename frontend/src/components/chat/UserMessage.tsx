/**
 * 채팅 영역 - 유저 메세지
 */

interface Props {
    content: string
}

function UserMessage({content}: Props) {

    return(
        <div className="flex justify-end">
            <p className="max-w-[85%] rounded-2xl bg-primary-soft px-3 py-2 text-sm">{content}</p>
        </div>
    )
}

export default UserMessage
