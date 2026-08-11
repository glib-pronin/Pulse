import Skeleton from './Skeleton'
import styles from './PostModalSkeleton.module.css'

export default function PostModalSkeleton() {
    return (
        <>
            <div className={styles.container} >
                <Skeleton
                    width="100%"
                    height="110px"
                    borderRadius="10px"
                />
                <div className={styles.images} >
                    <Skeleton width="100px" height="100px" borderRadius="10px" />
                    <Skeleton width="100px" height="100px" borderRadius="10px" />
                    <Skeleton width="100px" height="100px" borderRadius="10px" />
                </div>
                <Skeleton
                    width="60px"
                    height="20px"
                    borderRadius="10px"
                />
            </div>
            <Skeleton
                width="100%"
                height="44px"
                borderRadius="20px"
            />
        </>
    )
}