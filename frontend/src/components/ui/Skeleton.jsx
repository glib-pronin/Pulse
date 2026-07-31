import styles from './Skeleton.module.css'

export default function Skeleton({ width, height, borderRadius }) {
    return (
        <div
            className={styles.skeleton}
            style={{
                width,
                height,
                borderRadius
            }}
        ></div>
    )
}