import styles from './UserMessage.module.css'

interface Props {
    content: string
}

function UserMessage({content}: Props) {

    return(
        <div className={styles.container}>
            유저 인풋
            <p>{content}</p>
        </div>
    )
}

export default UserMessage
