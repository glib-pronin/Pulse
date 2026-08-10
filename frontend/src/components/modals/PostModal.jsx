import { useModal } from "../../hooks/useModal"
import { useForm } from "../../hooks/useForm"
import { useDragScroll } from '../../hooks/useDragScroll'
import { useState, useRef, useEffect } from "react"
import { validatePostText } from '../../utils/validators'
import { Image, X } from 'lucide-react'
import TextareaField from "../form/TextareaField"
import styles from './PostModal.module.css'

const initialState = {
    text: ''
}

const validators = {
    text: validatePostText
}

const MAX_IMAGES = 5

export default function PostModal({ type }) {
    const { formData, errors, setError, handleBlur, handleChange, validateBeforeSubmit } = useForm(initialState, validators)
    const isCreation = type === 'create'

    const [post, setPost] = useState(null)
    const [newImages, setNewImages] = useState([]) 
    const [imagesError, setImagesError] = useState('')
    const [deletedImages, setDeletedImages] = useState([]) // only id
    const newImagesRef = useRef([])
    newImagesRef.current = newImages

    const scrollRef = useDragScroll()
    const fileInput = useRef(null)

    const handleAddImages = (e) => {
        const imgs = Array.from(e.target.files)

        if (getVisiblePostImages().length + imgs.length + newImages.length > MAX_IMAGES) {
            setImagesError(`You can add a maximum of ${MAX_IMAGES} images`)
            e.target.value = ''
            return
        }

        setImagesError('')
        const newImgs = imgs.map(file => ({
            id: crypto.randomUUID(),
            file,
            previewUrl: URL.createObjectURL(file)
        }))
        setNewImages(prev => [...prev ,...newImgs])

        e.target.value = ''
    }

    const handleDeleteImage = (id) => {
        setImagesError('')
        const image = newImages.find(img => img.id === id)
        if (image) {
            URL.revokeObjectURL(image.previewUrl)
            setNewImages(prev => prev.filter(img => img.id !== id))
            return
        }
        setDeletedImages(prev => [...prev, id])
    }

    const getVisiblePostImages = () => {
        return (post?.images ?? []).filter(
            image => !deletedImages.includes(image.id)
        )
    }

    useEffect(() => {
        return () => newImagesRef.current.forEach(img => URL.revokeObjectURL(img.previewUrl))
    }, [])

    const visibleImages = [
        ...getVisiblePostImages(),
        ...newImages
    ]

    return (
        <form action="">
            <h2>{isCreation ? 'Create post' : 'Update post'}</h2>
            {errors.formError && <p className='error-msg text-center'>{errors.formError}</p>}
            <div className="inputs-container">
                <TextareaField 
                    label='Post text'
                    placeholder='Enter post text'
                    name='text'
                    value={formData.text}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors.text}
                />
                <input 
                    ref={fileInput}
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={handleAddImages}
                />
                {visibleImages.length > 0 && (
                    <div className={styles.imgsConatiner} ref={scrollRef} >
                        {visibleImages.map(img => (
                            <div key={img.id} className={styles.image} >
                                <img src={img.previewUrl ?? img.image} alt="" />
                                <button type="button" onClick={() => handleDeleteImage(img.id)}>
                                    <X />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <div className={styles.imgsWrapper}>
                    <button
                        type="button" 
                        className={styles.imgBtn} 
                        onClick={() => fileInput.current?.click()}
                        disabled={visibleImages.length >= MAX_IMAGES}
                    >
                        <Image />
                        Add
                    </button>
                    {imagesError && <p className="error-msg">{imagesError}</p>}
                </div>
            </div>
            <button className="primary-btn form-btn">{isCreation ? 'Post' : 'Update'}</button>
        </form>
    )
}